import { createClient } from "@supabase/supabase-js";

type CreateJobPayload = {
  service_slug: string;

  customer_name: string;
  customer_phone: string;
  customer_email?: string | null;

  address_text: string;
  place_id?: string | null;
  lat?: number | null;
  lng?: number | null;

  sqm?: number | null;
  sqm_source?: "user_estimate" | "property_api" | "manual_override" | null;

  access_notes?: string | null;

  // learning-focused quote inputs (optional)
  storeys?: string | null;
  job_complexity?: string | null;
  urgency?: string | null;
};

function badRequest(message: string, details?: unknown) {
  return Response.json({ error: message, details }, { status: 400 });
}

function serverError(message: string, details?: unknown) {
  return Response.json({ error: message, details }, { status: 500 });
}

function normalizePhone(phone: string) {
  return phone.trim().replace(/\s+/g, "");
}

export async function POST(req: Request) {
  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceKey) {
      return serverError("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in env.");
    }

    const supabase = createClient(supabaseUrl, serviceKey, {
      auth: { persistSession: false },
    });

    const body = (await req.json()) as Partial<CreateJobPayload>;

    // Basic validation (keep it strict, you can relax later)
    const service_slug = body.service_slug?.trim();
    const customer_name = body.customer_name?.trim();
    const customer_phone = body.customer_phone ? normalizePhone(body.customer_phone) : "";
    const customer_email = (body.customer_email ?? null)?.toString().trim() || null;

    const address_text = body.address_text?.trim();
    const place_id = (body.place_id ?? null)?.toString().trim() || null;

    const lat = body.lat ?? null;
    const lng = body.lng ?? null;

    const sqm = body.sqm ?? null;
    const sqm_source = body.sqm_source ?? null;

    const access_notes = (body.access_notes ?? null)?.toString().trim() || null;

    if (!service_slug) return badRequest("service_slug is required");
    if (!customer_name) return badRequest("customer_name is required");
    if (!customer_phone) return badRequest("customer_phone is required");
    if (!address_text) return badRequest("address_text is required");

    if (sqm_source && !["user_estimate", "property_api", "manual_override"].includes(sqm_source)) {
      return badRequest("sqm_source must be user_estimate | property_api | manual_override");
    }

    // Derive first_name and last_name from full_name
    let customer_first_name: string | null = null;
    let customer_last_name: string | null = null;
    
    if (customer_name && customer_name.trim()) {
      const nameParts = customer_name.trim().split(/\s+/);
      customer_first_name = nameParts[0] || null;
      customer_last_name = nameParts.length > 1 ? nameParts.slice(1).join(" ").trim() || null : null;
    }

    // 1) Upsert customer by phone
    const { data: customer, error: customerErr } = await supabase
      .from("customers")
      .upsert(
        {
          phone: customer_phone,
          full_name: customer_name,
          first_name: customer_first_name,
          last_name: customer_last_name,
          email: customer_email,
        },
        { onConflict: "phone" }
      )
      .select("id")
      .single();

    if (customerErr || !customer?.id) {
      return serverError("Failed to upsert customer", customerErr);
    }

    // 2) LINZ parcel enrichment (optional)
    let parcelEnrichment:
      | {
          id: string | null;
          appellation: string | null;
          areaSqm: number | null;
          land_district: string | null;
          titles: string | null;
          status: string | null;
        }
      | null = null;

    const linzBaseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    if (lat !== null && lng !== null && Number.isFinite(lat) && Number.isFinite(lng)) {
      try {
        const linzRes = await fetch(
          `${linzBaseUrl}/api/linz/parcel?lat=${lat}&lng=${lng}`,
          { cache: "no-store" }
        );
        const linzJson = await linzRes.json().catch(() => ({}));
        if (linzRes.ok && linzJson?.parcel) {
          parcelEnrichment = {
            id: linzJson.parcel.id ?? null,
            appellation: linzJson.parcel.appellation ?? null,
            areaSqm: linzJson.parcel.areaSqm ?? null,
            land_district: linzJson.parcel.land_district ?? null,
            titles: linzJson.parcel.titles ?? null,
            status: linzJson.parcel.status ?? null,
          };
        }
      } catch (e) {
        // swallow enrichment failures; do not block job creation
      }
    }

    const parcelAreaSqm =
      parcelEnrichment && typeof parcelEnrichment.areaSqm === "number"
        ? parcelEnrichment.areaSqm
        : parcelEnrichment && parcelEnrichment.areaSqm != null
        ? Number(parcelEnrichment.areaSqm)
        : null;

    const isNonStandard = parcelAreaSqm != null ? parcelAreaSqm > 1000 : null;
    const nonStandardReason = isNonStandard ? "parcel_area_sqm > 1000" : null;

    // 3) Upsert property by place_id (if provided). Otherwise, skip.
    let propertyId: string | null = null;

    if (place_id) {
      const { data: property, error: propertyErr } = await supabase
        .from("properties")
        .upsert(
          {
            place_id,
            address_text,
            lat,
            lng,
            sqm,
            sqm_source,
          },
          { onConflict: "place_id" }
        )
        .select("id")
        .single();

      if (propertyErr || !property?.id) {
        return serverError("Failed to upsert property", propertyErr);
      }

      propertyId = property.id;
    }

    // 4) Insert job (snapshot + foreign keys)
    const { data: job, error: jobErr } = await supabase
      .from("jobs")
      .insert({
        service_slug,

        customer_id: customer.id,
        property_id: propertyId,

        customer_name,
        customer_phone,
        customer_email,

        address_text,
        place_id,
        lat,
        lng,

        sqm,
        sqm_source,

        access_notes,
        status: "new",

        // parcel enrichment snapshot
        parcel_id: parcelEnrichment?.id ?? null,
        parcel_appellation: parcelEnrichment?.appellation ?? null,
        parcel_area_sqm: parcelEnrichment?.areaSqm ?? null,
        parcel_land_district: parcelEnrichment?.land_district ?? null,
        parcel_titles: parcelEnrichment?.titles ?? null,
        parcel_status: parcelEnrichment?.status ?? null,

        is_non_standard: isNonStandard,
        non_standard_reason: nonStandardReason,

        // learning-focused quote inputs
        storeys: body.storeys ?? null,
        job_complexity: body.job_complexity ?? null,
        urgency: body.urgency ?? null,
      })
      .select("id")
      .single();

    if (jobErr || !job?.id) {
      console.error("Failed to create job - Supabase error:", jobErr);
      const errorMessage = jobErr?.message || "Failed to create job";
      return serverError(errorMessage, jobErr);
    }

    return Response.json({ jobId: job.id }, { status: 200 });
  } catch (err) {
    return serverError("Unhandled error creating job", err instanceof Error ? err.message : err);
  }
}

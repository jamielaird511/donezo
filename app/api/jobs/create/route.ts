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

    // 1) Upsert customer by phone
    const { data: customer, error: customerErr } = await supabase
      .from("customers")
      .upsert(
        {
          phone: customer_phone,
          full_name: customer_name,
          email: customer_email,
        },
        { onConflict: "phone" }
      )
      .select("id")
      .single();

    if (customerErr || !customer?.id) {
      return serverError("Failed to upsert customer", customerErr);
    }

    // 2) Upsert property by place_id (if provided). Otherwise, skip.
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

    // 3) Insert job (snapshot + foreign keys)
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
      })
      .select("id")
      .single();

    if (jobErr || !job?.id) {
      return serverError("Failed to create job", jobErr);
    }

    return Response.json({ jobId: job.id }, { status: 200 });
  } catch (err) {
    return serverError("Unhandled error creating job", err instanceof Error ? err.message : err);
  }
}

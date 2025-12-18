import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ADDRESS_LAYER = 105689;
const PARCEL_LAYER = 51571;

async function fetchJson(url: string) {
  const res = await fetch(url, { cache: "no-store" });
  const text = await res.text();

  try {
    return { ok: res.ok, json: JSON.parse(text) };
  } catch {
    return { ok: false, json: null };
  }
}

export async function GET(req: Request) {
  const key = process.env.LINZ_API_KEY;
  if (!key) {
    return NextResponse.json({ ok: false, error: "Missing LINZ_API_KEY" }, { status: 500 });
  }

  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");
  if (!q) {
    return NextResponse.json({ ok: false, error: "Missing ?q=address" }, { status: 400 });
  }

  /* ---------------- Address lookup ---------------- */

  // Make search forgiving:
  // - Use full_address_ascii (normalized)
  // - Token AND match so "9 shelduck road queenstown" still matches if LINZ stores it differently
  const cleaned = q
    .trim()
    .toLowerCase()
    .replace(/[^\w\s]/g, " ") // drop punctuation
    .replace(/\s+/g, " ");

  const tokens = cleaned.split(" ").filter(Boolean).slice(0, 6); // cap tokens to keep CQL sane

  // Build: ILIKE(full_address_ascii,'%tok1%') AND ILIKE(full_address_ascii,'%tok2%') ...
  const tokenFilter =
    tokens.length > 0
      ? tokens.map((t) => `ILIKE(full_address_ascii,'%${t.replace(/'/g, "''")}%')`).join(" AND ")
      : `ILIKE(full_address_ascii,'%${cleaned.replace(/'/g, "''")}%')`;

  const addressUrl =
    `https://data.linz.govt.nz/services;key=${encodeURIComponent(key)}/wfs` +
    `?service=WFS&version=2.0.0&request=GetFeature` +
    `&typeNames=layer-${ADDRESS_LAYER}` +
    `&outputFormat=application/json` +
    `&cql_filter=${encodeURIComponent(tokenFilter)}` +
    `&count=5`;

  const addressRes = await fetchJson(addressUrl);

  if (!addressRes.ok || !addressRes.json?.features?.length) {
    return NextResponse.json(
      { ok: false, error: "Address not found", debug: { cleaned, tokens, tokenFilter } },
      { status: 404 }
    );
  }

  // Pick the first match (later we can score/sort)
  const address = addressRes.json.features[0];

  // Also return candidate matches for visibility (safe to remove later)
  const candidates = addressRes.json.features.slice(0, 5).map((f: any) => ({
    address_id: f.properties?.address_id ?? null,
    full_address: f.properties?.full_address ?? null,
    full_address_ascii: f.properties?.full_address_ascii ?? null,
  }));
  const [lng, lat] = address.geometry.coordinates;

  /* ---------------- Parcel lookup ---------------- */

  const parcelUrl =
    `https://data.linz.govt.nz/services;key=${encodeURIComponent(key)}/wfs` +
    `?service=WFS&version=2.0.0&request=GetFeature` +
    `&typeNames=layer-${PARCEL_LAYER}` +
    `&outputFormat=application/json` +
    `&cql_filter=${encodeURIComponent(`INTERSECTS(shape,POINT(${lng} ${lat}))`)}` +
    `&count=1`;

  const parcelRes = await fetchJson(parcelUrl);

  const parcel = parcelRes.json?.features?.[0] ?? null;

  return NextResponse.json({
    ok: true,
    address: {
      addressId: address.properties.address_id,
      full: address.properties.full_address,
      lat,
      lng,
      candidates,
    },
    parcel: parcel
      ? {
          id: parcel.properties.id,
          appellation: parcel.properties.appellation,
          areaSqm: parcel.properties.calc_area ?? parcel.properties.survey_area ?? null,
        }
      : null,
  });
}


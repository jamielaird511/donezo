import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PARCEL_LAYER = 51571;

async function fetchJsonOrXml(url: string) {
  const res = await fetch(url, { cache: "no-store" });
  const contentType = res.headers.get("content-type") || "";
  const text = await res.text();

  const looksJson =
    contentType.includes("json") || text.trim().startsWith("{") || text.trim().startsWith("[");

  if (!looksJson) {
    return { ok: false, status: res.status, contentType, text, json: null as any };
  }

  try {
    return { ok: res.ok, status: res.status, contentType, text, json: JSON.parse(text) };
  } catch {
    return { ok: false, status: res.status, contentType, text, json: null as any };
  }
}

export async function GET(req: Request) {
  const key = process.env.LINZ_API_KEY;
  if (!key) {
    return NextResponse.json({ ok: false, error: "Missing LINZ_API_KEY in environment" }, { status: 500 });
  }

  // TypeScript guard: ensure key is a definite string
  const linzApiKey: string = key;

  const { searchParams } = new URL(req.url);
  const latStr = searchParams.get("lat");
  const lngStr = searchParams.get("lng");
  const debugFlag = searchParams.get("debug") === "1";

  const lat = latStr ? Number(latStr) : NaN;
  const lng = lngStr ? Number(lngStr) : NaN;

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return NextResponse.json(
      { ok: false, error: "Missing/invalid ?lat= and ?lng=" },
      { status: 400 }
    );
  }

  // LINZ expects POINT(lon lat)
  const pointWkt = `SRID=4326;POINT(${lng} ${lat})`;
  const cqlPrimary = `INTERSECTS(shape,${pointWkt})`;

  async function run(cql: string) {
    const url =
      `https://data.linz.govt.nz/services;key=${encodeURIComponent(linzApiKey)}/wfs` +
      `?service=WFS&version=2.0.0&request=GetFeature` +
      `&typeNames=layer-${PARCEL_LAYER}` +
      `&outputFormat=application/json` +
      `&cql_filter=${encodeURIComponent(cql)}` +
      `&count=20`;
    return fetchJsonOrXml(url);
  }

  // 1) exact point-in-polygon
  let r = await run(cqlPrimary);

  if (!r.ok || !r.json?.features) {
    // If LINZ returned XML (exception), return a short snippet for debugging
    return NextResponse.json(
      {
        ok: false,
        error: "LINZ query failed",
        debug: debugFlag
          ? { status: r.status, contentType: r.contentType, snippet: r.text.slice(0, 400) }
          : undefined,
      },
      { status: 502 }
    );
  }

  // 2) fallback: stepped radius (meters)
  let usedCql = cqlPrimary;
  let matchedRadius: number | null = null;
  if (!r.json.features?.length) {
    const radii = [5, 10, 20, 40]; // tight → wider
    for (const radiusM of radii) {
      const cqlFallback = `DWITHIN(shape,${pointWkt},${radiusM},meters)`;
      usedCql = cqlFallback;

      r = await run(cqlFallback);

    if (!r.ok || !r.json?.features) {
        return NextResponse.json(
          {
            ok: false,
            error: "LINZ query failed (fallback)",
          debug: debugFlag
            ? {
                status: r.status,
                contentType: r.contentType,
                snippet: r.text.slice(0, 400),
                tried: [cqlPrimary, usedCql],
              }
            : undefined,
          },
          { status: 502 }
        );
      }

      if (r.json.features?.length) {
        matchedRadius = radiusM;
        break;
      }
    }
  }

  const features = r.json.features ?? [];
  if (!features.length) {
    return NextResponse.json(
      {
        ok: false,
        error: "No parcel found near that point",
        debug: debugFlag ? { tried: [cqlPrimary, usedCql] } : undefined,
      },
      { status: 404 }
    );
  }

  // Prefer non-historic parcels
  const nonHistoric = features.filter((f: any) => {
    const s = String(f.properties?.status ?? "").toLowerCase();
    return s !== "historic";
  });

  // Helper: area value (prefer calc_area, then survey_area)
  const areaOf = (f: any) => {
    const p = f.properties ?? {};
    const a = p.calc_area ?? p.survey_area;
    return typeof a === "number" ? a : Number(a);
  };

  // Choose best:
  // - first try smallest non-historic by area (usually the actual lot)
  // - else smallest overall by area
  const pickSmallest = (arr: any[]) =>
    arr
      .map((f) => ({ f, a: areaOf(f) }))
      .filter((x) => Number.isFinite(x.a))
      .sort((x, y) => x.a - y.a)[0]?.f ?? arr[0];

  const best = nonHistoric.length ? pickSmallest(nonHistoric) : pickSmallest(features);

  const p = best.properties ?? {};

  return NextResponse.json({
    ok: true,
    input: { lat, lng },
    parcel: {
      id: p.id ?? null,
      appellation: p.appellation ?? null,
      // This is the money field for sqm (often already square metres)
      areaSqm: p.calc_area ?? p.survey_area ?? null,
      land_district: p.land_district ?? null,
      titles: p.titles ?? null,
      status: p.status ?? null,
    },
    debug: debugFlag
      ? {
          usedCql,
          matchedRadius,
          candidates: features.slice(0, 5).map((f: any) => ({
            id: f.properties?.id ?? null,
            status: f.properties?.status ?? null,
            areaSqm: f.properties?.calc_area ?? f.properties?.survey_area ?? null,
            appellation: f.properties?.appellation ?? null,
          })),
        }
      : undefined,
  });
}


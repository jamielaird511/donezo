import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Overpass returns building polygons in WGS84 (lat/lon).
 * We'll approximate area in m² by projecting to a local tangent plane (equirectangular)
 * around the query point. For buildings (small areas), this is accurate enough for pricing.
 */
function polygonAreaSqmEquirectangular(
  coords: Array<{ lat: number; lon: number }>,
  originLat: number,
  originLon: number
): number {
  if (!coords || coords.length < 3) return 0;

  const R = 6378137; // meters
  const lat0 = (originLat * Math.PI) / 180;
  const cosLat0 = Math.cos(lat0);

  // Ensure closed ring
  const ring =
    coords[0].lat === coords[coords.length - 1].lat && coords[0].lon === coords[coords.length - 1].lon
      ? coords
      : [...coords, coords[0]];

  let sum = 0;
  for (let i = 0; i < ring.length - 1; i++) {
    const a = ring[i];
    const b = ring[i + 1];

    // Equirectangular projection relative to origin
    const ax = ((a.lon - originLon) * Math.PI) / 180 * R * cosLat0;
    const ay = ((a.lat - originLat) * Math.PI) / 180 * R;
    const bx = ((b.lon - originLon) * Math.PI) / 180 * R * cosLat0;
    const by = ((b.lat - originLat) * Math.PI) / 180 * R;

    sum += ax * by - bx * ay;
  }
  return Math.abs(sum) / 2;
}

function centroidEquirectangular(
  coords: Array<{ lat: number; lon: number }>,
  originLat: number,
  originLon: number
) {
  const R = 6378137;
  const lat0 = (originLat * Math.PI) / 180;
  const cosLat0 = Math.cos(lat0);

  let x = 0,
    y = 0;
  const n = coords.length;
  for (const p of coords) {
    x += ((p.lon - originLon) * Math.PI) / 180 * R * cosLat0;
    y += ((p.lat - originLat) * Math.PI) / 180 * R;
  }
  return { x: x / n, y: y / n };
}

function distMetersFromOriginXY(x: number, y: number) {
  return Math.sqrt(x * x + y * y);
}

async function postOverpass(query: string) {
  const endpoint = "https://overpass-api.de/api/interpreter";
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "User-Agent": "donezo-osm/1.0 (contact: local-dev)",
    },
    body: `data=${encodeURIComponent(query)}`,
    cache: "no-store",
  });

  const text = await res.text();
  try {
    return { ok: res.ok, status: res.status, json: JSON.parse(text), text };
  } catch {
    return { ok: false, status: res.status, json: null as any, text };
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const latStr = searchParams.get("lat");
  const lngStr = searchParams.get("lng");
  const radiusStr = searchParams.get("radius"); // meters, optional

  const lat = latStr ? Number(latStr) : NaN;
  const lng = lngStr ? Number(lngStr) : NaN;
  const radius = radiusStr ? Math.max(10, Math.min(200, Number(radiusStr))) : 60;

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return NextResponse.json(
      { ok: false, error: "Missing/invalid ?lat= and ?lng=" },
      { status: 400 }
    );
  }

  // Query OSM for building ways near the point.
  // We ask for geometry so we get polygon coordinates back.
  const overpassQuery = `
[out:json][timeout:25];
(
  way["building"](around:${radius},${lat},${lng});
);
out body geom;
`;

  const r = await postOverpass(overpassQuery);

  if (!r.ok || !r.json?.elements) {
    return NextResponse.json(
      {
        ok: false,
        error: "Overpass query failed",
        debug: { status: r.status, snippet: (r.text || "").slice(0, 300) },
      },
      { status: 502 }
    );
  }

  const ways = (r.json.elements as any[])
    .filter((e) => e.type === "way" && Array.isArray(e.geometry) && e.geometry.length >= 3)
    .map((e) => {
      const geom = e.geometry as Array<{ lat: number; lon: number }>;
      const areaSqm = polygonAreaSqmEquirectangular(geom, lat, lng);
      const c = centroidEquirectangular(geom, lat, lng);
      const distM = distMetersFromOriginXY(c.x, c.y);
      return {
        id: e.id,
        tags: e.tags ?? {},
        areaSqm,
        distM,
      };
    })
    // drop weird tiny polygons + non-sensical huge ones
    .filter((w) => w.areaSqm >= 5 && w.areaSqm <= 5000)
    .sort((a, b) => a.distM - b.distM);

  if (!ways.length) {
    return NextResponse.json(
      {
        ok: false,
        error: "No OSM building footprint found nearby",
        debug: { radius, count: 0 },
      },
      { status: 404 }
    );
  }

  const best = ways[0];

  // Simple confidence heuristic:
  // - very close centroid => higher confidence
  // - if multiple very close buildings => lower confidence (could be garage/shed/neighbor)
  const close = ways.filter((w) => w.distM <= 15);
  let confidence = "low";
  if (best.distM <= 8 && close.length === 1) confidence = "high";
  else if (best.distM <= 15 && close.length <= 2) confidence = "medium";

  return NextResponse.json({
    ok: true,
    input: { lat, lng, radius },
    footprint: {
      source: "openstreetmap",
      osmWayId: best.id,
      areaSqm: Math.round(best.areaSqm),
      centroidDistanceM: Math.round(best.distM * 10) / 10,
      buildingTag: best.tags.building ?? null,
      confidence,
    },
    candidates: ways.slice(0, 5).map((w) => ({
      osmWayId: w.id,
      areaSqm: Math.round(w.areaSqm),
      centroidDistanceM: Math.round(w.distM * 10) / 10,
      buildingTag: w.tags.building ?? null,
    })),
  });
}



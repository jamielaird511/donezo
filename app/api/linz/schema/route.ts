import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const key = process.env.LINZ_API_KEY;
  if (!key) {
    return NextResponse.json({ ok: false, error: "Missing env var LINZ_API_KEY" }, { status: 500 });
  }

  const { searchParams } = new URL(req.url);
  const layer = searchParams.get("layer"); // e.g. 105689
  if (!layer) {
    return NextResponse.json({ ok: false, error: "Missing ?layer=####" }, { status: 400 });
  }

  const url =
    `https://data.linz.govt.nz/services;key=${encodeURIComponent(key)}/wfs` +
    `?service=WFS&version=2.0.0&request=DescribeFeatureType&typeNames=layer-${encodeURIComponent(layer)}`;

  const res = await fetch(url, { cache: "no-store" });
  const text = await res.text();

  // Extract field names from xsd:element name="..." type="..."
  const fieldRegex = /<xsd:element[^>]*name="([^"]+)"[^>]*type="([^"]+)"/g;
  const fields: Array<{ name: string; type: string }> = [];

  let match: RegExpExecArray | null;
  while ((match = fieldRegex.exec(text))) {
    fields.push({ name: match[1], type: match[2] });
  }

  return NextResponse.json({
    ok: res.ok,
    status: res.status,
    contentType: res.headers.get("content-type"),
    layer,
    fieldCount: fields.length,
    fields,
  });
}


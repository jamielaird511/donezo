import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const key = process.env.LINZ_API_KEY;

  if (!key) {
    return NextResponse.json(
      { ok: false, error: "Missing env var LINZ_API_KEY" },
      { status: 500 }
    );
  }

  const url = `https://data.linz.govt.nz/services;key=${encodeURIComponent(
    key
  )}/wfs?service=WFS&version=2.0.0&request=GetCapabilities`;

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "donezo-linz-test/1.0",
        Accept: "application/xml,text/xml,*/*",
      },
      cache: "no-store",
    });

    const contentType = res.headers.get("content-type");
    const text = await res.text();

    return NextResponse.json({
      ok: res.ok,
      status: res.status,
      contentType,
      // small snippet so we can confirm it's XML + not an error page
      snippet: text.slice(0, 300),
    });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}



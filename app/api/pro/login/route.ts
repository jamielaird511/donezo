import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function POST(request: NextRequest) {
  // Buffer cookies to apply to final response
  const cookiesToSet: Array<{ name: string; value: string; options?: any }> = [];

  const { email, password } = await request.json().catch(() => ({}));

  if (!email || !password) {
    const res = NextResponse.json({ error: "Missing email or password" }, { status: 400 });
    cookiesToSet.forEach(({ name, value, options }) => {
      res.cookies.set(name, value, options);
    });
    return res;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    const res = NextResponse.json({ error: "Missing Supabase env vars" }, { status: 500 });
    cookiesToSet.forEach(({ name, value, options }) => {
      res.cookies.set(name, value, options);
    });
    return res;
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (list: Array<{ name: string; value: string; options?: any }>) => {
        cookiesToSet.push(...list);
      },
    },
  });

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  let res: NextResponse;
  if (error) {
    res = NextResponse.json({ error: error.message }, { status: 401 });
  } else {
    res = NextResponse.json({ ok: true });
  }

  // Apply buffered cookies to the response
  cookiesToSet.forEach(({ name, value, options }) => {
    res.cookies.set(name, value, options);
  });

  return res;
}


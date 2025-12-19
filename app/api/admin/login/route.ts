import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function POST(request: NextRequest) {
  // Buffer cookies to apply to final response
  const cookiesToSet: Array<{ name: string; value: string; options?: any }> = [];

  // Helper to apply buffered cookies to a response
  const withCookies = (res: NextResponse) => {
    cookiesToSet.forEach((c) => {
      res.cookies.set(c.name, c.value, c.options);
    });
    return res;
  };

  const { email, password } = await request.json().catch(() => ({}));

  if (!email || !password) {
    return withCookies(NextResponse.json({ error: "Missing email or password" }, { status: 400 }));
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return withCookies(NextResponse.json({ error: "Missing Supabase env vars" }, { status: 500 }));
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (list: Array<{ name: string; value: string; options?: any }>) => {
        cookiesToSet.push(...list);
      },
    },
  });

  const { error, data } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return withCookies(NextResponse.json({ error: error.message }, { status: 401 }));
  }

  // Check if user is admin
  if (data.user) {
    const { data: adminData, error: adminError } = await supabase
      .from("admin_users")
      .select("user_id")
      .eq("user_id", data.user.id)
      .single();

    if (adminError || !adminData) {
      // Not an admin - sign out immediately
      await supabase.auth.signOut();
      return withCookies(NextResponse.json({ error: "Not authorized" }, { status: 403 }));
    }
  }

  return withCookies(NextResponse.json({ ok: true }));
}


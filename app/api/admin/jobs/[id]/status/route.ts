import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

const VALID_STATUSES = ["available", "assigned", "in_progress", "completed", "closed"];

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  // Buffer cookies to apply to final response
  const cookiesToSet: Array<{ name: string; value: string; options?: any }> = [];

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

  // Check authentication
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) {
    const res = NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    cookiesToSet.forEach(({ name, value, options }) => {
      res.cookies.set(name, value, options);
    });
    return res;
  }

  // Check admin status
  const { data: adminData, error: adminError } = await supabase
    .from("admin_users")
    .select("user_id")
    .eq("user_id", user.id)
    .single();

  if (adminError || !adminData) {
    const res = NextResponse.json({ error: "Forbidden" }, { status: 403 });
    cookiesToSet.forEach(({ name, value, options }) => {
      res.cookies.set(name, value, options);
    });
    return res;
  }

  // Handle both sync and async params (Next.js 15+)
  const resolvedParams = params instanceof Promise ? await params : params;
  const jobId = resolvedParams.id;

  if (!jobId) {
    const res = NextResponse.json({ error: "Job ID is required" }, { status: 400 });
    cookiesToSet.forEach(({ name, value, options }) => {
      res.cookies.set(name, value, options);
    });
    return res;
  }

  const body = await request.json().catch(() => ({}));
  const status = body.status;

  if (!status || !VALID_STATUSES.includes(status)) {
    const res = NextResponse.json(
      { error: `Status must be one of: ${VALID_STATUSES.join(", ")}` },
      { status: 400 }
    );
    cookiesToSet.forEach(({ name, value, options }) => {
      res.cookies.set(name, value, options);
    });
    return res;
  }

  // Update job status
  const { error: updateError } = await supabase
    .from("jobs")
    .update({ status })
    .eq("id", jobId);

  if (updateError) {
    const res = NextResponse.json({ error: updateError.message }, { status: 500 });
    cookiesToSet.forEach(({ name, value, options }) => {
      res.cookies.set(name, value, options);
    });
    return res;
  }

  const res = NextResponse.json({ ok: true });
  cookiesToSet.forEach(({ name, value, options }) => {
    res.cookies.set(name, value, options);
  });
  return res;
}


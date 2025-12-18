import { createClient } from "@supabase/supabase-js";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";

function badRequest(message: string, details?: unknown) {
  return Response.json({ error: message, details }, { status: 400 });
}

function unauthorized(message: string = "Unauthorized") {
  return Response.json({ error: message }, { status: 401 });
}

function forbidden(message: string = "Forbidden") {
  return Response.json({ error: message }, { status: 403 });
}

function notFound(message: string = "Not found") {
  return Response.json({ error: message }, { status: 404 });
}

function serverError(message: string, details?: unknown) {
  return Response.json({ error: message, details }, { status: 500 });
}

// Status transition rules
const ALLOWED_TRANSITIONS: Record<string, string[]> = {
  assigned: ["in_progress"],
  in_progress: ["completed"],
  completed: [], // No further transitions from pro UI
};

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ jobId: string }> | { jobId: string } }
) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return serverError("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in env.");
    }

    // Create Supabase client with session from request headers/cookies
    const cookieStore = await cookies();
    const authHeader = req.headers.get("authorization");
    
    // Try to get access token from Authorization header or cookies
    let accessToken: string | undefined;
    if (authHeader?.startsWith("Bearer ")) {
      accessToken = authHeader.substring(7);
    } else {
      // Try to find Supabase auth cookie
      const allCookies = cookieStore.getAll();
      for (const cookie of allCookies) {
        if (cookie.name.includes("supabase.auth") || cookie.name.includes("sb-")) {
          try {
            const parsed = JSON.parse(cookie.value);
            accessToken = parsed?.access_token || parsed?.token;
            if (accessToken) break;
          } catch {
            // Not JSON, continue
          }
        }
      }
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: accessToken ? {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      } : {},
    });

    // Get authenticated user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return unauthorized();
    }

    // Handle both sync and async params (Next.js 15+)
    const resolvedParams = params instanceof Promise ? await params : params;
    const jobId = resolvedParams.jobId;
    if (!jobId) {
      return badRequest("jobId is required");
    }

    const body = await req.json();
    const nextStatus = body.next_status;

    if (!nextStatus || (nextStatus !== "in_progress" && nextStatus !== "completed")) {
      return badRequest("next_status must be 'in_progress' or 'completed'");
    }

    // Get current job status and pro_id
    const { data: job, error: fetchError } = await supabase
      .from("jobs")
      .select("status, pro_id")
      .eq("id", jobId)
      .single();

    if (fetchError) {
      console.log("Supabase fetch error:", { message: fetchError.message, code: fetchError.code });
      return serverError("Failed to fetch job", { message: fetchError.message });
    }

    if (!job) {
      return notFound("Job not found");
    }

    // Enforce ownership
    if (!job.pro_id || job.pro_id !== user.id) {
      return forbidden();
    }

    // Validate transition
    const allowedNextStatuses = ALLOWED_TRANSITIONS[job.status] || [];
    if (!allowedNextStatuses.includes(nextStatus)) {
      return badRequest(
        `Invalid status transition: cannot transition from '${job.status}' to '${nextStatus}'`
      );
    }

    // Update job status with defensive filter
    const { data: updatedJob, error: updateError } = await supabase
      .from("jobs")
      .update({ status: nextStatus })
      .eq("id", jobId)
      .eq("pro_id", user.id)
      .select("id, status")
      .single();

    if (updateError) {
      console.log("Supabase update error:", { message: updateError.message, code: updateError.code });
      return serverError("Failed to update job status", { message: updateError.message });
    }

    if (!updatedJob) {
      return forbidden("Job not found or you do not have permission to update it");
    }

    return Response.json(
      { ok: true, jobId: updatedJob.id, status: updatedJob.status },
      { status: 200 }
    );
  } catch (err) {
    return serverError(
      "Unhandled error updating job status",
      err instanceof Error ? err.message : err
    );
  }
}


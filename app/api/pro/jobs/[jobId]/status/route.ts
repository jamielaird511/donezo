import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

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
    // Create Supabase server client with cookies
    const supabase = await createClient();

    // Debug logging (non-production only)
    if (process.env.NODE_ENV !== "production") {
      const pathname = req.nextUrl.pathname;
      const cookieNames = req.cookies.getAll().map(c => c.name);
      console.log("[API]", pathname, "cookies:", cookieNames);
    }

    // Get authenticated user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    // Debug logging (non-production only)
    if (process.env.NODE_ENV !== "production") {
      const pathname = req.nextUrl.pathname;
      console.log("[API]", pathname, "user?", !!user, "err:", userError?.message);
    }

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


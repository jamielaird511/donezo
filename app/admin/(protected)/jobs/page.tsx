import { createClient } from "@/lib/supabase/server";
import AdminJobsClient from "./AdminJobsClient";

interface Job {
  id: string;
  created_at: string;
  service_slug: string;
  address_text: string;
  status: string;
  pro_id: string | null;
  customers: Array<{
    first_name: string | null;
    last_name: string | null;
    full_name: string | null;
    email: string | null;
  }> | null;
}

export default async function AdminJobsPage() {
  const supabase = await createClient();

  // Get current user for debug logging
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  const userId = user?.id || null;

  // Debug: Log user and query details
  console.log("[AdminJobs] Current user ID:", userId);
  const queryDescription = "from('jobs').select('id, created_at, service_slug, address_text, status, pro_id, customers(first_name, last_name, full_name, email)').order('created_at', { ascending: false })";
  console.log("[AdminJobs] Query:", queryDescription);

  // Fetch jobs
  const { data: jobs, error: jobsError } = await supabase
    .from("jobs")
    .select("id, created_at, service_slug, address_text, status, pro_id, customers(first_name, last_name, full_name, email)")
    .order("created_at", { ascending: false });

  // Debug: Log results
  if (jobsError) {
    console.error("[AdminJobs] Query error:", {
      message: jobsError.message,
      code: jobsError.code,
      details: jobsError.details,
      hint: jobsError.hint,
    });
  } else {
    console.log("[AdminJobs] Query success - row count:", jobs?.length || 0);
  }

  // Prepare error object for client component
  const errorObj = jobsError
    ? {
        message: jobsError.message,
        code: jobsError.code || undefined,
      }
    : null;

  return <AdminJobsClient initialJobs={jobs || []} initialError={errorObj} />;
}


import { createClient } from "@/lib/supabase/server";
import AdminDashboardClient from "../AdminDashboardClient";

interface Job {
  id: string;
  created_at: string;
  service_slug: string;
  address_text: string;
  status: string;
  pro_id: string | null;
}

export default async function AdminPage() {
  const supabase = await createClient();

  // Fetch jobs server-side
  // Note: Auth is already checked in the layout
  const { data: jobs, error: jobsError } = await supabase
    .from("jobs")
    .select("id, created_at, service_slug, address_text, status, pro_id")
    .order("created_at", { ascending: false });

  if (jobsError) {
    return (
      <main className="flex flex-1 flex-col">
        <div className="flex min-h-screen items-center justify-center">
          <div className="flex flex-col gap-4 items-center">
            <h1 className="text-2xl font-semibold text-[#0B1220]">Error</h1>
            <p className="text-base text-[#374151]/70">Failed to load jobs.</p>
          </div>
        </div>
      </main>
    );
  }

  return <AdminDashboardClient initialJobs={jobs || []} />;
}


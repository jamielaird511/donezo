import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import Container from "@/components/layout/Container";

interface ProProfile {
  id: string;
  user_id: string;
  business_name: string | null;
  city: string | null;
  phone: string | null;
  email: string | null;
  created_at: string;
}

export default async function AdminProsPage() {
  const supabase = await createClient();

  // Get current user for debug logging
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  const userId = user?.id || null;

  // Debug: Log user and query details
  console.log("[AdminPros] Current user ID:", userId);
  console.log("[AdminPros] Query: from('pro_profiles').select('*').order('created_at', { ascending: false })");

  // Fetch pro profiles
  const { data: pros, error: prosError } = await supabase
    .from("pro_profiles")
    .select("*")
    .order("created_at", { ascending: false });

  // Debug: Log results
  if (prosError) {
    console.error("[AdminPros] Query error:", {
      message: prosError.message,
      code: prosError.code,
      details: prosError.details,
      hint: prosError.hint,
    });
  } else {
    console.log("[AdminPros] Query success - row count:", pros?.length || 0);
  }


  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-NZ", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <main className="flex flex-1 flex-col">
      <Container className="py-8">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-semibold text-[#0B1220]">Pros</h1>
              <p className="text-base text-[#374151]/70">Manage professional profiles.</p>
            </div>
            <Link
              href="/admin/pros/new"
              className="inline-flex items-center justify-center rounded-lg bg-donezo-orange px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Add Pro Profile
            </Link>
          </div>

          {/* Dev-only debug error box */}
          {process.env.NODE_ENV !== "production" && prosError && (
            <div className="rounded-lg border border-orange-300 bg-orange-50 p-4">
              <p className="text-sm font-semibold text-orange-900 mb-2">Debug (dev only)</p>
              <div className="text-xs text-orange-800 space-y-1">
                <p><strong>Error message:</strong> {prosError.message}</p>
                {prosError.code && <p><strong>Error code:</strong> {prosError.code}</p>}
                {(prosError.message?.toLowerCase().includes("permission denied") || prosError.code === "42501") && (
                  <p className="mt-2 text-orange-900 font-medium">⚠️ This looks like an RLS/permission denied error. Check admin_users table and RLS policies.</p>
                )}
              </div>
            </div>
          )}

          {/* Pros List */}
          {prosError ? (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4">
              <p className="text-sm text-red-800">Failed to load pros: {prosError.message}</p>
            </div>
          ) : !pros || pros.length === 0 ? (
            <p className="text-base text-[#374151]/70">No pro profiles found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-[#E5E7EB]">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#6B7280]">User ID</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#6B7280]">Business Name</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#6B7280]">City</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#6B7280]">Phone</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#6B7280]">Email</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#6B7280]">Created</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#6B7280]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pros.map((pro) => (
                    <tr key={pro.id} className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB]">
                      <td className="py-3 px-4 text-sm text-[#0B1220] font-mono text-xs">{pro.user_id}</td>
                      <td className="py-3 px-4 text-sm text-[#0B1220]">{pro.business_name || "—"}</td>
                      <td className="py-3 px-4 text-sm text-[#0B1220]">{pro.city || "—"}</td>
                      <td className="py-3 px-4 text-sm text-[#0B1220]">{pro.phone || "—"}</td>
                      <td className="py-3 px-4 text-sm text-[#0B1220]">{pro.email || "—"}</td>
                      <td className="py-3 px-4 text-sm text-[#0B1220]">{formatDate(pro.created_at)}</td>
                      <td className="py-3 px-4">
                        <Link
                          href={`/admin/pros/${pro.id}`}
                          className="inline-flex items-center justify-center rounded-lg border border-[#E5E7EB] bg-white px-3 py-1.5 text-xs font-semibold text-[#0B1220] transition-colors hover:bg-[#F9FAFB]"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </Container>
    </main>
  );
}


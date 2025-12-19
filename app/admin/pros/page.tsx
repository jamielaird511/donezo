"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase/browser";
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

export default function AdminProsPage() {
  const router = useRouter();
  const [pros, setPros] = useState<ProProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPros();
  }, []);

  const loadPros = async () => {
    try {
      setIsLoading(true);
      const { data, error: prosError } = await supabase
        .from("pro_profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (prosError) throw prosError;
      setPros(data || []);
    } catch (err: any) {
      console.error("Error loading pros:", err);
      setError(err.message || "Failed to load pros");
    } finally {
      setIsLoading(false);
    }
  };


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

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {/* Pros List */}
          {isLoading ? (
            <p className="text-base text-[#374151]/70">Loading pros...</p>
          ) : pros.length === 0 ? (
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


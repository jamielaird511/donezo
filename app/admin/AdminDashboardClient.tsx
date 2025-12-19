"use client";

import { useState } from "react";
import Container from "@/components/layout/Container";

interface Job {
  id: string;
  created_at: string;
  service_slug: string;
  address_text: string;
  status: string;
  pro_id: string | null;
}

interface AdminDashboardClientProps {
  initialJobs: Job[];
}

export default function AdminDashboardClient({ initialJobs }: AdminDashboardClientProps) {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [error, setError] = useState<string | null>(null);
  const [updatingJobId, setUpdatingJobId] = useState<string | null>(null);
  const [statusUpdates, setStatusUpdates] = useState<Record<string, string>>(() => {
    // Initialize status updates with current statuses
    const initial: Record<string, string> = {};
    initialJobs.forEach((job) => {
      initial[job.id] = job.status;
    });
    return initial;
  });

  const handleStatusUpdate = async (jobId: string) => {
    const newStatus = statusUpdates[jobId];
    if (!newStatus) return;

    setUpdatingJobId(jobId);
    setError(null);
    try {
      const response = await fetch(`/api/admin/jobs/${jobId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || "Failed to update job status");
      }

      // Reload page to refresh jobs list
      window.location.reload();
    } catch (err: any) {
      console.error("Error updating job status:", err);
      setError(err.message || "Failed to update job status");
    } finally {
      setUpdatingJobId(null);
    }
  };

  const parseLocation = (addressText: string) => {
    const parts = addressText.split(",").map((p) => p.trim()).filter((p) => p.length > 0);
    if (parts.length < 2) return addressText;
    
    // Remove street and country
    const withoutStreet = parts.slice(1);
    const countryPattern = /^(New Zealand|NZ|Australia|AU|United States|USA|US)$/i;
    let withoutCountry = withoutStreet;
    if (withoutCountry.length > 1 && countryPattern.test(withoutCountry[withoutCountry.length - 1])) {
      withoutCountry = withoutCountry.slice(0, -1);
    }
    
    if (withoutCountry.length === 0) return addressText;
    
    // Strip postcodes
    const cleaned = withoutCountry.map((segment) => segment.replace(/\s*\d{4}\s*$/, "").trim()).filter((s) => s.length > 0);
    
    if (cleaned.length >= 2) {
      return `${cleaned[0]} | ${cleaned[cleaned.length - 1]}`;
    } else if (cleaned.length === 1) {
      return cleaned[0];
    }
    return addressText;
  };

  const formatServiceName = (slug: string) => {
    return slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-NZ", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <main className="flex flex-1 flex-col">
      <Container className="py-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-semibold text-[#0B1220]">Admin Dashboard</h1>
            <p className="text-base text-[#374151]/70">Manage all jobs in the system.</p>
          </div>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {jobs.length === 0 ? (
            <p className="text-base text-[#374151]/70">No jobs found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-[#E5E7EB]">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#6B7280]">ID</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#6B7280]">Service</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#6B7280]">City</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#6B7280]">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#6B7280]">Pro ID</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#6B7280]">Created</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#6B7280]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((job) => (
                    <tr key={job.id} className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB]">
                      <td className="py-3 px-4 text-sm text-[#0B1220] font-mono text-xs">{job.id.slice(0, 8)}...</td>
                      <td className="py-3 px-4 text-sm text-[#0B1220]">{formatServiceName(job.service_slug)}</td>
                      <td className="py-3 px-4 text-sm text-[#0B1220]">{parseLocation(job.address_text)}</td>
                      <td className="py-3 px-4">
                        <select
                          value={statusUpdates[job.id] || job.status}
                          onChange={(e) => setStatusUpdates({ ...statusUpdates, [job.id]: e.target.value })}
                          className="rounded-lg border border-[#E5E7EB] bg-white px-2 py-1 text-xs text-[#0B1220] focus:border-donezo-orange focus:outline-none focus:ring-2 focus:ring-donezo-orange/20"
                        >
                          <option value="available">available</option>
                          <option value="assigned">assigned</option>
                          <option value="in_progress">in_progress</option>
                          <option value="completed">completed</option>
                          <option value="closed">closed</option>
                        </select>
                      </td>
                      <td className="py-3 px-4 text-sm text-[#0B1220] font-mono text-xs">{job.pro_id ? `${job.pro_id.slice(0, 8)}...` : "—"}</td>
                      <td className="py-3 px-4 text-sm text-[#0B1220]">{formatDate(job.created_at)}</td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleStatusUpdate(job.id)}
                          disabled={updatingJobId === job.id || (statusUpdates[job.id] || job.status) === job.status}
                          className={`inline-flex items-center justify-center rounded-lg px-3 py-1.5 text-xs font-semibold transition-opacity ${
                            updatingJobId === job.id || (statusUpdates[job.id] || job.status) === job.status
                              ? "bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed"
                              : "bg-donezo-orange text-white hover:opacity-90"
                          }`}
                        >
                          {updatingJobId === job.id ? "Saving..." : "Save"}
                        </button>
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


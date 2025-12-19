"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/browser";
import Container from "@/components/layout/Container";

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

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [updatingJobId, setUpdatingJobId] = useState<string | null>(null);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      setIsLoading(true);
      const { data, error: jobsError } = await supabase
        .from("jobs")
        .select("id, created_at, service_slug, address_text, status, pro_id, customers(first_name, last_name, full_name, email)")
        .order("created_at", { ascending: false });

      if (jobsError) throw jobsError;
      setJobs(data || []);
    } catch (err: any) {
      console.error("Error loading jobs:", err);
      setError(err.message || "Failed to load jobs");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusUpdate = async (jobId: string, newStatus: string) => {
    setUpdatingJobId(jobId);
    try {
      const { error: updateError } = await supabase
        .from("jobs")
        .update({ status: newStatus })
        .eq("id", jobId);

      if (updateError) throw updateError;
      await loadJobs();
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

  const getFilteredJobs = () => {
    let filtered = jobs;

    // Status filter
    if (statusFilter === "open") {
      filtered = filtered.filter((job) => !["closed", "completed"].includes(job.status));
    } else if (statusFilter === "closed") {
      filtered = filtered.filter((job) => ["closed", "completed"].includes(job.status));
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((job) => {
        const addressMatch = job.address_text.toLowerCase().includes(query);
        const customer = job.customers?.[0] ?? null;
        const customerName = customer
          ? `${customer.first_name || ""} ${customer.last_name || ""} ${customer.full_name || ""}`.toLowerCase()
          : "";
        const customerEmail = customer?.email?.toLowerCase() || "";
        return addressMatch || customerName.includes(query) || customerEmail.includes(query);
      });
    }

    return filtered;
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

  const getCustomerDisplay = (job: Job) => {
    const customer = job.customers?.[0] ?? null;
    if (!customer) return "—";
    const name = customer.first_name && customer.last_name
      ? `${customer.first_name} ${customer.last_name}`
      : customer.full_name || customer.first_name || customer.last_name || "—";
    return name;
  };

  const filteredJobs = getFilteredJobs();

  return (
    <main className="flex flex-1 flex-col">
      <Container className="py-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-semibold text-[#0B1220]">Jobs</h1>
            <p className="text-base text-[#374151]/70">Manage all jobs in the system.</p>
          </div>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {/* Filters */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <label htmlFor="status-filter" className="text-sm font-medium text-[#6B7280]">
                  Status:
                </label>
                <select
                  id="status-filter"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="rounded-lg border border-[#E5E7EB] bg-white px-3 py-2 text-sm text-[#0B1220] focus:border-donezo-orange focus:outline-none focus:ring-2 focus:ring-donezo-orange/20"
                >
                  <option value="all">All</option>
                  <option value="open">Open</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                <label htmlFor="search" className="text-sm font-medium text-[#6B7280]">
                  Search:
                </label>
                <input
                  id="search"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Address or customer..."
                  className="flex-1 rounded-lg border border-[#E5E7EB] bg-white px-3 py-2 text-sm text-[#0B1220] focus:border-donezo-orange focus:outline-none focus:ring-2 focus:ring-donezo-orange/20"
                />
              </div>
            </div>

            <p className="text-sm text-[#6B7280]">
              Showing {filteredJobs.length} of {jobs.length} jobs
            </p>
          </div>

          {/* Jobs Table */}
          {isLoading ? (
            <p className="text-base text-[#374151]/70">Loading jobs...</p>
          ) : filteredJobs.length === 0 ? (
            <p className="text-base text-[#374151]/70">No jobs found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-[#E5E7EB]">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#6B7280]">Created</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#6B7280]">Service</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#6B7280]">Location</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#6B7280]">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#6B7280]">Pro ID</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#6B7280]">Customer</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#6B7280]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredJobs.map((job) => (
                    <tr key={job.id} className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB]">
                      <td className="py-3 px-4 text-sm text-[#0B1220]">{formatDate(job.created_at)}</td>
                      <td className="py-3 px-4 text-sm text-[#0B1220]">{formatServiceName(job.service_slug)}</td>
                      <td className="py-3 px-4 text-sm text-[#0B1220]">{parseLocation(job.address_text)}</td>
                      <td className="py-3 px-4 text-sm text-[#0B1220]">
                        <span className="inline-flex items-center rounded-md bg-[#F3F4F6] border border-[#E5E7EB] px-2.5 py-1 text-xs font-medium text-[#6B7280]">
                          {job.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-[#0B1220]">{job.pro_id || "—"}</td>
                      <td className="py-3 px-4 text-sm text-[#0B1220]">
                        <div className="flex flex-col">
                          <span>{getCustomerDisplay(job)}</span>
                          {job.customers?.[0]?.email && (
                            <span className="text-xs text-[#6B7280]">{job.customers[0].email}</span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <select
                          value={job.status}
                          onChange={(e) => handleStatusUpdate(job.id, e.target.value)}
                          disabled={updatingJobId === job.id}
                          className="rounded-lg border border-[#E5E7EB] bg-white px-2 py-1 text-xs text-[#0B1220] focus:border-donezo-orange focus:outline-none focus:ring-2 focus:ring-donezo-orange/20 disabled:opacity-50"
                        >
                          <option value="available">available</option>
                          <option value="assigned">assigned</option>
                          <option value="in_progress">in_progress</option>
                          <option value="completed">completed</option>
                          <option value="closed">closed</option>
                        </select>
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


"use client";

import { useState, useEffect, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import Container from "@/components/layout/Container";
import { displayCity } from "@/lib/location/displayName";

interface Job {
  id: string;
  created_at: string;
  service_slug: string;
  address_text: string;
  access_notes: string | null;
  status: string;
  pro_id: string | null;
  customers: {
    first_name: string | null;
    last_name: string | null;
    full_name: string | null;
    phone: string | null;
    email: string | null;
  } | null | Array<{
    first_name: string | null;
    last_name: string | null;
    full_name: string | null;
    phone: string | null;
    email: string | null;
  }>;
}

export default function ProMyJobsPage() {
  const supabase = useMemo(() => createClient(), []);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showClosed, setShowClosed] = useState<boolean>(false);
  const [jobToUpdateStatus, setJobToUpdateStatus] = useState<Job | null>(null);
  const [newStatus, setNewStatus] = useState<string>("");
  const [statusUpdateMessage, setStatusUpdateMessage] = useState<string | null>(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [statusUpdateError, setStatusUpdateError] = useState<string | null>(null);

  useEffect(() => {
    loadJobs();
  }, [showClosed]);

  const loadJobs = async () => {
    try {
      setIsLoading(true);
      // TODO: Replace with server API call to get user's jobs
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setError("You must be logged in to view your jobs");
        setIsLoading(false);
        return;
      }

      let query = supabase
        .from("jobs")
        .select("id, created_at, service_slug, address_text, access_notes, status, pro_id, customers(first_name, last_name, full_name, phone, email)")
        .eq("pro_id", user.id);

      // By default, exclude closed jobs
      if (!showClosed) {
        query = query.in("status", ["assigned", "in_progress", "completed"]);
      } else {
        // When showing closed, include all statuses including closed
        query = query.in("status", ["assigned", "in_progress", "completed", "closed"]);
      }

      const { data, error: jobsError } = await query.order("created_at", { ascending: false });

      if (jobsError) throw jobsError;
      setJobs(data || []);
    } catch (err: any) {
      console.error("Error loading jobs:", err);
      setError(err.message || "Failed to load jobs");
    } finally {
      setIsLoading(false);
    }
  };

  const parseAddress = (addressText: string) => {
    // Parse address_text to extract suburb and city, excluding street and country
    const parts = addressText.split(",").map((p) => p.trim()).filter((p) => p.length > 0);
    
    if (parts.length === 0) {
      return "Location unavailable";
    }
    
    // Remove first segment (street/road address)
    const withoutStreet = parts.slice(1);
    
    if (withoutStreet.length === 0) {
      return "Location unavailable";
    }
    
    // Remove last segment if it looks like a country
    const countryPattern = /^(New Zealand|NZ|Australia|AU|United States|USA|US)$/i;
    let withoutCountry = withoutStreet;
    if (withoutCountry.length > 1 && countryPattern.test(withoutCountry[withoutCountry.length - 1])) {
      withoutCountry = withoutCountry.slice(0, -1);
    }
    
    if (withoutCountry.length === 0) {
      return "Location unavailable";
    }
    
    // Strip postcodes (4 digits) from all segments
    const cleaned = withoutCountry.map((segment) => segment.replace(/\s*\d{4}\s*$/, "").trim()).filter((s) => s.length > 0);
    
    if (cleaned.length === 0) {
      return "Location unavailable";
    }
    
    // If 2+ segments: first = suburb, last = city
    // If 1 segment: treat as city
    if (cleaned.length >= 2) {
      const suburb = cleaned[0];
      const city = cleaned[cleaned.length - 1];
      return `${suburb} | ${displayCity(city)}`;
    } else {
      const city = cleaned[0];
      return displayCity(city);
    }
  };

  const formatServiceName = (slug: string) => {
    return slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString("en-NZ", { month: "short", day: "numeric" });
  };

  // Helper to safely extract customer data (handles both object and array)
  const getCustomer = (job: Job) => {
    if (!job.customers) return null;
    if (Array.isArray(job.customers)) {
      return job.customers[0] || null;
    }
    return job.customers;
  };

  // Parse access notes to extract bedrooms, storeys, and remaining notes
  const parseAccessNotes = (accessNotes: string | null) => {
    if (!accessNotes) return { bedrooms: null, storeys: null, notes: null };

    let bedrooms: number | null = null;
    let storeys: number | null = null;

    // Extract bedrooms from "Home size: 3" pattern
    const homeSizeMatch = accessNotes.match(/Home size:\s*(\d+)/i);
    if (homeSizeMatch) {
      bedrooms = parseInt(homeSizeMatch[1], 10);
    }

    // Extract storeys from "Storeys: single" or "Storeys: double" pattern
    const storeysMatch = accessNotes.match(/Storeys:\s*(single|double|split)/i);
    if (storeysMatch) {
      const storeyValue = storeysMatch[1].toLowerCase();
      if (storeyValue === "single") {
        storeys = 1;
      } else if (storeyValue === "double" || storeyValue === "split") {
        storeys = 2;
      }
    }

    // Extract remaining notes by removing Home size and Storeys lines
    let notes: string | null = accessNotes
      .split("\n")
      .map(line => line.trim())
      .filter(line => {
        // Keep lines that don't match Home size or Storeys patterns
        return !/^Home size:\s*\d+/i.test(line) && 
               !/^Storeys:\s*(single|double|split)/i.test(line) &&
               line.length > 0;
      })
      .join("\n")
      .trim();

    if (notes.length === 0) notes = null;

    return { bedrooms, storeys, notes };
  };

  // Check if a status is considered closed
  const isClosedStatus = (status: string): boolean => {
    return status.toLowerCase() === "closed";
  };

  // Get human-readable status label
  const getStatusLabel = (status: string): string => {
    const labels: Record<string, string> = {
      assigned: "Assigned",
      in_progress: "In progress",
      completed: "Completed",
      closed: "Closed",
    };
    return labels[status] || status;
  };

  // Get the next status in the linear flow
  const getNextStatus = (currentStatus: string): string | null => {
    if (currentStatus === "assigned") {
      return "in_progress";
    }
    if (currentStatus === "in_progress") {
      return "completed";
    }
    // No further actions for completed or closed
    return null;
  };

  // Get helper text based on the transition
  const getStatusUpdateHelperText = (currentStatus: string, nextStatus: string): string => {
    if (currentStatus === "assigned" && nextStatus === "in_progress") {
      return "No customer email will be sent.";
    }
    if (currentStatus === "in_progress" && nextStatus === "completed") {
      return "Customer will be emailed when you confirm.";
    }
    return "";
  };

  const handleUpdateStatusClick = (job: Job, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    const nextStatus = getNextStatus(job.status);
    if (!nextStatus) {
      return; // Should not happen if button is hidden correctly
    }
    setJobToUpdateStatus(job);
    setNewStatus(nextStatus);
    setStatusUpdateMessage(null);
  };

  const handleConfirmStatusUpdate = async () => {
    if (!jobToUpdateStatus || !newStatus) {
      return;
    }
    
    // Guard: if status is already the same, show message and return
    if (newStatus === jobToUpdateStatus.status) {
      setStatusUpdateMessage(`This job is already marked as ${getStatusLabel(jobToUpdateStatus.status)}.`);
      return;
    }
    
    setIsUpdatingStatus(true);
    setStatusUpdateError(null);
    setStatusUpdateMessage(null);
    
    try {
      const response = await fetch(`/api/pro/jobs/${jobToUpdateStatus.id}/status`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ next_status: newStatus }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        const errorMessage = data.error || "Failed to update job status";
        
        // Map specific errors to user-friendly messages
        if (errorMessage.includes("Unauthorized") || response.status === 401) {
          throw new Error("Your session expired. Please log out and log back in.");
        } else if (errorMessage.includes("Invalid status transition") || errorMessage.includes("cannot transition")) {
          throw new Error("That status change is no longer valid. Refresh the page and try again.");
        } else {
          throw new Error(errorMessage);
        }
      }
      
      // Update the job in local state immediately
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.id === jobToUpdateStatus.id ? { ...job, status: newStatus } : job
        )
      );
      
      // Show success message
      setStatusUpdateMessage(`Status updated to ${getStatusLabel(newStatus)}.`);
      
      // Close the modal after 800ms
      setTimeout(() => {
        setJobToUpdateStatus(null);
        setNewStatus("");
        setStatusUpdateMessage(null);
        setStatusUpdateError(null);
      }, 800);
    } catch (err) {
      setStatusUpdateError(err instanceof Error ? err.message : "Failed to update job status");
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  // Get unique statuses from jobs with human-readable labels
  const getStatusOptions = () => {
    const statuses = new Set<string>();
    jobs.forEach((job) => {
      if (job.status && job.status !== "closed") {
        statuses.add(job.status);
      }
    });
    return Array.from(statuses).sort();
  };

  // Filter jobs based on status filter
  const getFilteredJobs = () => {
    if (statusFilter === "all") {
      return jobs;
    }
    return jobs.filter((job) => job.status === statusFilter);
  };

  if (isLoading) {
    return (
      <main className="flex flex-1 flex-col">
        <Container className="py-16">
          <p className="text-base text-[#374151]/70">Loading...</p>
        </Container>
      </main>
    );
  }

  return (
    <main className="flex flex-1 flex-col">
      <Container className="py-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-3xl font-semibold text-[#0B1220]">
              My Jobs
            </h1>
            <p className="text-base text-[#374151]/70">
              Jobs you&apos;ve accepted and are working on.
            </p>
          </div>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {jobs.length === 0 ? (
            <p className="text-base text-[#374151]/70">
              You haven&apos;t accepted any jobs yet.
            </p>
          ) : (
            <>
              {/* Filters */}
              <div className="mx-auto max-w-[680px] w-full">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-center gap-4 flex-wrap">
                    <div className="flex items-center gap-2">
                      <label htmlFor="status-filter" className="text-xs font-medium text-[#6B7280]">
                        Status:
                      </label>
                      <select
                        id="status-filter"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="rounded-lg border border-[#E5E7EB] bg-white px-3 py-1.5 text-sm text-[#0B1220] focus:border-donezo-orange focus:outline-none focus:ring-2 focus:ring-donezo-orange/20"
                      >
                        <option value="all">All active</option>
                        {getStatusOptions().map((status) => (
                          <option key={status} value={status}>
                            {getStatusLabel(status)}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="show-closed"
                        checked={showClosed}
                        onChange={(e) => setShowClosed(e.target.checked)}
                        className="h-4 w-4 rounded border-[#E5E7EB] text-donezo-orange focus:ring-donezo-orange/20 focus:ring-2"
                      />
                      <label htmlFor="show-closed" className="text-xs text-[#6B7280] cursor-pointer">
                        Show closed jobs
                      </label>
                    </div>
                  </div>

                  <p className="text-xs text-[#6B7280] text-center">
                    Showing {getFilteredJobs().length} of {jobs.length} jobs
                  </p>
                </div>
              </div>

              {/* Job Cards */}
              {getFilteredJobs().length === 0 ? (
                <p className="text-base text-[#374151]/70 text-center">
                  No jobs match the selected status filter.
                </p>
              ) : (
                <div className="mx-auto max-w-[680px] w-full">
                  <div className="flex flex-col space-y-3">
                    {getFilteredJobs().map((job) => {
                      const serviceName = formatServiceName(job.service_slug);
                      // Combine customer first and last name from customers join
                      const customer = getCustomer(job);
                      const customerFullName = 
                        customer?.first_name && customer?.last_name
                          ? `${customer.first_name} ${customer.last_name}`
                          : customer?.first_name || customer?.last_name || null;
                      
                      return (
                        <div
                          key={job.id}
                          className="w-full rounded-lg border border-[#E5E7EB] border-l-[3px] border-l-donezo-orange/40 bg-white shadow-sm p-5 hover:shadow-md transition-all duration-200"
                        >
                          <div className="flex items-start gap-4">
                            {/* Payout badge */}
                            <div className="flex-shrink-0">
                              <span className="inline-flex items-center rounded-full bg-orange-100 px-3 py-1.5 text-sm font-semibold text-orange-800">
                                TBD
                              </span>
                            </div>
                            
                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              {/* Top row: job title + status */}
                              <div className="flex items-start justify-between gap-4 mb-2">
                                <div className="flex-1 min-w-0">
                                  <button
                                    onClick={() => setSelectedJob(job)}
                                    className="text-left w-full"
                                  >
                                    <h3 className="text-lg font-bold text-[#0B1220] hover:text-donezo-orange transition-colors">
                                      {serviceName}
                                    </h3>
                                    {customerFullName && (
                                      <p className="text-sm font-medium text-[#374151] mt-1">
                                        {customerFullName}
                                      </p>
                                    )}
                                    <p className="text-sm text-[#6B7280] mt-1">
                                      {job.address_text}
                                    </p>
                                  </button>
                                </div>
                                <span className="inline-flex items-center rounded-md bg-[#F3F4F6] border border-[#E5E7EB] px-2.5 py-1 text-xs font-medium text-[#6B7280] whitespace-nowrap">
                                  {getStatusLabel(job.status)}
                                </span>
                              </div>
                              
                              {/* Second row: accepted time */}
                              <button
                                onClick={() => setSelectedJob(job)}
                                className="text-left"
                              >
                                <p className="text-xs text-[#6B7280]">
                                  Accepted {formatDate(job.created_at)}
                                </p>
                              </button>
                            </div>

                            {/* Update status button - only show if there's a next status */}
                            {getNextStatus(job.status) && (
                              <div className="flex-shrink-0">
                                <button
                                  onClick={(e) => handleUpdateStatusClick(job, e)}
                                  className="inline-flex items-center justify-center rounded-lg border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-medium text-[#0B1220] transition-colors hover:bg-[#F9FAFB] hover:border-[#D1D5DB]"
                                >
                                  Update status
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </Container>

      {/* Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <h2 className="text-2xl font-semibold text-[#0B1220]">
                  Job Details
                </h2>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="text-[#6B7280] hover:text-[#0B1220]"
                >
                  ✕
                </button>
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <p className="text-sm font-medium text-[#6B7280] mb-1">Service</p>
                  <p className="text-base text-[#0B1220]">
                    {formatServiceName(selectedJob.service_slug)}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-[#6B7280] mb-1">Address</p>
                  <p className="text-base text-[#0B1220]">{selectedJob.address_text}</p>
                </div>

                {/* Customer section */}
                {(() => {
                  const customer = getCustomer(selectedJob);
                  if (!customer) return null;
                  
                  const customerName = 
                    customer.first_name && customer.last_name
                      ? `${customer.first_name} ${customer.last_name}`
                      : customer.first_name || customer.last_name || customer.full_name || null;
                  
                  if (!customerName && !customer.phone && !customer.email) return null;
                  
                  return (
                    <div className="pt-4 border-t border-[#E5E7EB]">
                      <p className="text-sm font-medium text-[#6B7280] mb-2">Customer</p>
                      <div className="flex flex-col gap-2">
                        {customerName && (
                          <p className="text-base text-[#0B1220]">{customerName}</p>
                        )}
                        {customer.phone && (
                          <a
                            href={`tel:${customer.phone}`}
                            className="text-sm text-donezo-orange hover:underline"
                          >
                            {customer.phone}
                          </a>
                        )}
                        {customer.email && (
                          <a
                            href={`mailto:${customer.email}`}
                            className="text-sm text-donezo-orange hover:underline"
                          >
                            {customer.email}
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })()}

                {selectedJob.access_notes && (() => {
                  const { bedrooms, storeys, notes } = parseAccessNotes(selectedJob.access_notes);
                  
                  // Build summary line
                  const summaryParts: string[] = [];
                  if (bedrooms !== null) {
                    summaryParts.push(`${bedrooms} ${bedrooms === 1 ? "Bedroom" : "Bedrooms"}`);
                  }
                  if (storeys !== null) {
                    summaryParts.push(`${storeys} ${storeys === 1 ? "Storey" : "Storeys"}`);
                  }
                  
                  // Only render if there's at least a summary or notes
                  if (summaryParts.length === 0 && !notes) return null;
                  
                  return (
                    <div>
                      <p className="text-sm font-medium text-[#6B7280] mb-1">Access notes</p>
                      <div className="flex flex-col gap-1">
                        {summaryParts.length > 0 && (
                          <p className="text-sm font-medium text-[#0B1220]">
                            {summaryParts.join(" | ")}
                          </p>
                        )}
                        {notes && (
                          <p className="text-sm text-[#6B7280]">
                            Notes: {notes}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })()}

                <div>
                  <p className="text-sm font-medium text-[#6B7280] mb-1">Status</p>
                  <span className="inline-flex items-center rounded-md bg-[#F3F4F6] border border-[#E5E7EB] px-2.5 py-1 text-xs font-medium text-[#6B7280]">
                    {getStatusLabel(selectedJob.status)}
                  </span>
                </div>

                <div>
                  <p className="text-sm font-medium text-[#6B7280] mb-1">Accepted</p>
                  <p className="text-base text-[#0B1220]">
                    {new Date(selectedJob.created_at).toLocaleDateString("en-NZ", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>

                <div className="flex gap-3 pt-4 border-t border-[#E5E7EB]">
                  <button
                    onClick={() => setSelectedJob(null)}
                    className="inline-flex items-center justify-center rounded-lg border border-[#E5E7EB] bg-white px-6 py-2.5 text-sm font-semibold text-[#0B1220] transition-colors hover:bg-[#F9FAFB]"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Status Update Modal */}
      {jobToUpdateStatus && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <h2 className="text-2xl font-semibold text-[#0B1220]">
                  Update Status
                </h2>
                  <button
                  onClick={() => {
                    setJobToUpdateStatus(null);
                    setNewStatus("");
                    setStatusUpdateMessage(null);
                    setStatusUpdateError(null);
                  }}
                  className="text-[#6B7280] hover:text-[#0B1220] text-xl leading-none disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isUpdatingStatus || !!statusUpdateMessage}
                >
                  ✕
                </button>
              </div>

              {statusUpdateError && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4 mb-4">
                  <p className="text-sm text-red-800">{statusUpdateError}</p>
                </div>
              )}

              {statusUpdateMessage ? (
                <div className="rounded-lg border border-green-200 bg-green-50 p-4 mb-4">
                  <p className="text-sm text-green-800">{statusUpdateMessage}</p>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {/* Status transition display */}
                  <div className="flex items-center gap-4">
                    <div className="inline-flex items-center rounded-md bg-[#F3F4F6] border border-[#E5E7EB] px-3 py-2 text-sm font-medium text-[#6B7280]">
                      {getStatusLabel(jobToUpdateStatus.status)}
                    </div>
                    <span className="text-[#6B7280] text-lg">→</span>
                    <div className="inline-flex items-center rounded-md bg-donezo-orange/10 border border-donezo-orange/30 px-3 py-2 text-sm font-medium text-donezo-orange">
                      {getStatusLabel(newStatus)}
                    </div>
                  </div>

                  {/* Notice box */}
                  {newStatus && (
                    <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                      <p className="text-sm text-blue-800">
                        {getStatusUpdateHelperText(jobToUpdateStatus.status, newStatus)}
                      </p>
                    </div>
                  )}

                  {/* Buttons */}
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => {
                        setJobToUpdateStatus(null);
                        setNewStatus("");
                        setStatusUpdateMessage(null);
                        setStatusUpdateError(null);
                      }}
                      className="flex-1 inline-flex items-center justify-center rounded-lg border border-[#E5E7EB] bg-white px-6 py-2.5 text-sm font-semibold text-[#0B1220] transition-colors hover:bg-[#F9FAFB]"
                      disabled={isUpdatingStatus}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleConfirmStatusUpdate}
                      disabled={!newStatus || newStatus === jobToUpdateStatus.status || isUpdatingStatus}
                      className="flex-1 inline-flex items-center justify-center rounded-lg bg-donezo-orange px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isUpdatingStatus ? "Updating..." : "Confirm"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}


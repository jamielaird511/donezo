"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/browser";
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
}

export default function ProAvailablePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAccepting, setIsAccepting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [selectedJobType, setSelectedJobType] = useState<string>("all");

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (user) {
      loadJobs();
    }
  }, [user]);

  const checkAuth = async () => {
    try {
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      if (!currentUser) {
        router.push("/pro/login");
        return;
      }
      setUser(currentUser);
    } catch (err) {
      console.error("Auth check error:", err);
      router.push("/pro/login");
    } finally {
      setIsLoading(false);
    }
  };

  const loadJobs = async () => {
    try {
      const { data, error: jobsError } = await supabase
        .from("jobs")
        .select("id, created_at, service_slug, address_text, access_notes, status, pro_id")
        .eq("status", "available")
        .is("pro_id", null)
        .order("created_at", { ascending: false });

      if (jobsError) throw jobsError;
      setJobs(data || []);
    } catch (err: any) {
      console.error("Error loading jobs:", err);
      setError(err.message || "Failed to load jobs");
    }
  };

  const handleAcceptJob = async () => {
    if (!user || !selectedJob) return;

    setIsAccepting(true);
    setError(null);

    try {
      const { data, error: updateError } = await supabase
        .from("jobs")
        .update({ pro_id: user.id, status: "assigned" })
        .eq("id", selectedJob.id)
        .eq("status", "available")
        .is("pro_id", null)
        .select();

      if (updateError) throw updateError;

      if (!data || data.length === 0) {
        setError("This job has already been claimed by another professional.");
        await loadJobs();
      } else {
        setSelectedJob(null);
        await loadJobs();
      }
    } catch (err: any) {
      console.error("Error accepting job:", err);
      setError(err.message || "Failed to accept job");
    } finally {
      setIsAccepting(false);
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

  const parsePropertySummary = (accessNotes: string | null) => {
    if (!accessNotes) return { bedroomLabel: null, storeyLabel: null };

    let bedroomLabel: string | null = null;
    let storeyLabel: string | null = null;

    // Extract bedrooms from "Home size: 3" pattern
    const homeSizeMatch = accessNotes.match(/Home size:\s*(\d+)/i);
    if (homeSizeMatch) {
      const bedrooms = parseInt(homeSizeMatch[1], 10);
      if (bedrooms === 1 || bedrooms === 2) {
        bedroomLabel = "1–2 Bedrooms";
      } else if (bedrooms === 3) {
        bedroomLabel = "3 Bedrooms";
      } else if (bedrooms === 4) {
        bedroomLabel = "4 Bedrooms";
      } else if (bedrooms >= 5) {
        bedroomLabel = "5+ Bedrooms";
      }
    }

    // Extract storeys from "Storeys: single" or "Storeys: double" pattern
    const storeysMatch = accessNotes.match(/Storeys:\s*(single|double|split)/i);
    if (storeysMatch) {
      const storeyValue = storeysMatch[1].toLowerCase();
      if (storeyValue === "single") {
        storeyLabel = "Single storey";
      } else if (storeyValue === "double" || storeyValue === "split") {
        storeyLabel = "Double storey / split-level";
      }
    }

    return { bedroomLabel, storeyLabel };
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

  // Extract city from location string (part after "|" if present)
  const extractCityFromLocation = (location: string): string => {
    const parts = location.split("|").map((p) => p.trim());
    return parts.length > 1 ? parts[parts.length - 1] : location;
  };

  // Get unique cities and job types from jobs
  const getFilterOptions = () => {
    const cities = new Set<string>();
    const jobTypes = new Set<string>();

    jobs.forEach((job) => {
      const location = parseAddress(job.address_text);
      const city = extractCityFromLocation(location);
      if (city && city !== "Location unavailable") {
        cities.add(city);
      }
      const serviceName = formatServiceName(job.service_slug);
      if (serviceName) {
        jobTypes.add(serviceName);
      }
    });

    return {
      cities: Array.from(cities).sort(),
      jobTypes: Array.from(jobTypes).sort(),
    };
  };

  // Filter jobs based on selected filters
  const getFilteredJobs = () => {
    return jobs.filter((job) => {
      const location = parseAddress(job.address_text);
      const city = extractCityFromLocation(location);
      const serviceName = formatServiceName(job.service_slug);

      const cityMatch = selectedCity === "all" || city === selectedCity;
      const jobTypeMatch = selectedJobType === "all" || serviceName === selectedJobType;

      return cityMatch && jobTypeMatch;
    });
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

  if (!user) {
    return null;
  }

  return (
    <main className="flex flex-1 flex-col">
      <Container className="py-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-3xl font-semibold text-[#0B1220]">
              Available Jobs
            </h1>
            <p className="text-base text-[#374151]/70">
              Accept jobs to add them to your work queue.
            </p>
          </div>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {jobs.length === 0 ? (
            <p className="text-base text-[#374151]/70">
              No available jobs at the moment.
            </p>
          ) : (
            <div className="mx-auto max-w-[680px] w-full">
              {/* Filters */}
              <div className="flex flex-col gap-4 mb-6">
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-2">
                    <label htmlFor="city-filter" className="text-sm font-medium text-[#6B7280]">
                      City:
                    </label>
                    <select
                      id="city-filter"
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="rounded-lg border border-[#E5E7EB] bg-white px-3 py-2 text-sm text-[#0B1220] focus:border-donezo-orange focus:outline-none focus:ring-2 focus:ring-donezo-orange/20"
                    >
                      <option value="all">All cities</option>
                      {getFilterOptions().cities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <label htmlFor="job-type-filter" className="text-sm font-medium text-[#6B7280]">
                      Job type:
                    </label>
                    <select
                      id="job-type-filter"
                      value={selectedJobType}
                      onChange={(e) => setSelectedJobType(e.target.value)}
                      className="rounded-lg border border-[#E5E7EB] bg-white px-3 py-2 text-sm text-[#0B1220] focus:border-donezo-orange focus:outline-none focus:ring-2 focus:ring-donezo-orange/20"
                    >
                      <option value="all">All job types</option>
                      {getFilterOptions().jobTypes.map((jobType) => (
                        <option key={jobType} value={jobType}>
                          {jobType}
                        </option>
                      ))}
                    </select>
                  </div>

                  {(selectedCity !== "all" || selectedJobType !== "all") && (
                    <button
                      onClick={() => {
                        setSelectedCity("all");
                        setSelectedJobType("all");
                      }}
                      className="text-sm text-[#6B7280] hover:text-[#0B1220] underline"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <p className="text-sm text-[#6B7280]">
                  Showing {getFilteredJobs().length} of {jobs.length} jobs
                </p>
              </div>

              {/* Job Cards */}
              {getFilteredJobs().length === 0 ? (
                <p className="text-base text-[#374151]/70">
                  No jobs match the selected filters.
                </p>
              ) : (
                <div className="flex flex-col space-y-3">
                  {getFilteredJobs().map((job) => {
                const location = parseAddress(job.address_text);
                const { bedroomLabel, storeyLabel } = parsePropertySummary(job.access_notes);
                const serviceName = formatServiceName(job.service_slug);
                
                const propertyParts: string[] = [];
                if (bedroomLabel) propertyParts.push(bedroomLabel);
                if (storeyLabel) propertyParts.push(storeyLabel);
                
                return (
                  <button
                    key={job.id}
                    onClick={() => setSelectedJob(job)}
                    className="text-left w-full rounded-lg border border-[#E5E7EB] border-l-[3px] border-l-donezo-orange/40 bg-white shadow-sm p-5 hover:shadow-md hover:-translate-y-0.5 cursor-pointer transition-all duration-200"
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
                        {/* Top row: job title + location */}
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <h3 className="text-lg font-bold text-[#0B1220]">
                            {serviceName}
                          </h3>
                          <span className="text-sm text-[#374151] whitespace-nowrap">
                            {location}
                          </span>
                        </div>
                        
                        {/* Second row: bedrooms + storey */}
                        {propertyParts.length > 0 && (
                          <p className="text-sm text-[#6B7280]">
                            {propertyParts.join(" · ")}
                          </p>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
                </div>
              )}
            </div>
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
                    {selectedJob.service_slug.replace("-", " ")}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-[#6B7280] mb-1">Address</p>
                  <p className="text-base text-[#0B1220]">{selectedJob.address_text}</p>
                </div>

                {selectedJob.access_notes && (
                  <div>
                    <p className="text-sm font-medium text-[#6B7280] mb-1">Access notes</p>
                    <p className="text-base text-[#0B1220]">{selectedJob.access_notes}</p>
                  </div>
                )}

                <div>
                  <p className="text-sm font-medium text-[#6B7280] mb-1">Posted</p>
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
                    onClick={handleAcceptJob}
                    disabled={isAccepting}
                    className={`font-space-grotesk inline-flex items-center justify-center rounded-lg bg-donezo-orange px-6 py-2.5 text-sm font-semibold text-[#FFFFFF] transition-opacity shadow-md ${
                      isAccepting
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:opacity-90 cursor-pointer"
                    }`}
                  >
                    {isAccepting ? "Accepting..." : "Accept"}
                  </button>
                  <button
                    onClick={() => setSelectedJob(null)}
                    className="inline-flex items-center justify-center rounded-lg border border-[#E5E7EB] bg-white px-6 py-2.5 text-sm font-semibold text-[#0B1220] transition-colors hover:bg-[#F9FAFB]"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}


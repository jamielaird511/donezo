"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Container from "@/components/layout/Container";

interface BookingDraft {
  service: string;
  options: {
    beds: string | null;
    storeys: string | null;
  };
  price: number | null;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
  };
  address: {
    formatted: string;
    placeId: string | null;
    lat: number | null;
    lng: number | null;
    streetNumber: string;
    route: string;
    subpremise: string;
    locality: string;
    sublocality: string;
    adminArea1: string;
    postalCode: string;
    country: string;
  };
  notes: string | null;
}

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  const [bookingDraft, setBookingDraft] = useState<BookingDraft | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const draft = localStorage.getItem("donezo_booking_draft");
    if (draft) {
      try {
        setBookingDraft(JSON.parse(draft));
      } catch (e) {
        console.error("Failed to parse booking draft:", e);
      }
    }
  }, []);

  const handlePayAndBook = async () => {
    if (!bookingDraft || !bookingDraft.price) return;
    if (!jobId) {
      setError("Missing job reference. Please restart your booking.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service: bookingDraft.service,
          beds: bookingDraft.options?.beds || null,
          storeys: bookingDraft.options?.storeys || null,
          customerEmail: bookingDraft.customer.email,
          jobId,
          metadata: {
            customer_name: `${bookingDraft.customer.firstName} ${bookingDraft.customer.lastName}`,
            customer_mobile: bookingDraft.customer.mobile || "",
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create checkout session");
      }

      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (error: any) {
      console.error("Error creating checkout session:", error);
      setError(error.message || "Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  if (!bookingDraft) {
    return (
      <main className="flex min-h-screen flex-col bg-white">
        <div className="relative z-10 flex flex-1 flex-col">
          <section className="flex flex-1 items-start">
            <Container className="pt-8 pb-16">
              <div className="flex flex-col gap-6 max-w-2xl">
                <h1 className="text-3xl font-semibold text-[#0B1220]">
                  No booking found
                </h1>
                <p className="text-base text-[#374151]/70">
                  We couldn&apos;t find your booking details. Please start a new booking.
                </p>
                <div className="flex gap-4">
                  <Link
                    href="/services"
                    className="font-space-grotesk inline-flex items-center justify-center rounded-lg bg-[#7FCB00] px-6 py-3 text-base font-semibold text-[#FFFFFF] transition-colors hover:bg-[#6FB800]"
                  >
                    Browse services
                  </Link>
                  <Link
                    href="/gutter-cleaning"
                    className="font-space-grotesk inline-flex items-center justify-center rounded-lg border border-[#E5E7EB] bg-white px-6 py-3 text-base font-semibold text-[#0B1220] transition-colors hover:bg-[#F9FAFB]"
                  >
                    Gutter cleaning
                  </Link>
                </div>
              </div>
            </Container>
          </section>
        </div>
      </main>
    );
  }

  const serviceName = bookingDraft.service === "gutter_cleaning" ? "Gutter cleaning" : bookingDraft.service;
  const bedsLabel = bookingDraft.options.beds === "1-2" ? "1–2 bed" : bookingDraft.options.beds === "5+" ? "5+ bed" : bookingDraft.options.beds ? `${bookingDraft.options.beds} bed` : "";
  const storeysLabel = bookingDraft.options.storeys === "single" ? "Single storey" : bookingDraft.options.storeys === "double" ? "Double storey / split-level" : "";

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <div className="relative z-10 flex flex-1 flex-col">
        <section className="flex flex-1 items-start">
          <Container className="pt-4 pb-8">
            <div className="flex flex-col gap-5 max-w-2xl">
              <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-semibold tracking-[-0.01em] text-[#0B1220] sm:text-4xl leading-snug">
                  Review your booking
                </h1>
                <p className="text-base text-[#374151]/70">
                  Please review your details before payment.
                </p>
              </div>

              <div className="rounded-xl border border-[#E5E7EB] bg-white p-4 shadow-sm">
                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Left column: Service and Price */}
                  <div className="flex flex-col gap-4">
                    {/* Service */}
                    <div className="flex flex-col gap-1">
                      <h2 className="text-sm font-semibold text-[#6B7280] uppercase tracking-wide">
                        Service
                      </h2>
                      <div className="flex flex-col gap-1">
                        <p className="text-lg font-semibold text-[#0B1220]">{serviceName}</p>
                        {(bedsLabel || storeysLabel) && (
                          <p className="text-sm text-[#374151]/70">
                            {[bedsLabel, storeysLabel].filter(Boolean).join(" • ")}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Price */}
                    {bookingDraft.price !== null && (
                      <div className="flex flex-col gap-1">
                        <h2 className="text-sm font-semibold text-[#6B7280] uppercase tracking-wide">
                          Price
                        </h2>
                        <p className="text-3xl font-semibold text-[#0B1220]">
                          ${bookingDraft.price}
                        </p>
                        <p className="text-sm text-[#374151]/70">
                          Fixed price includes all Donezo platform services. No hidden fees.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Right column: Customer details, Address, Notes */}
                  <div className="flex flex-col gap-4">
                    {/* Customer details */}
                    <div className="flex flex-col gap-1">
                      <h2 className="text-sm font-semibold text-[#6B7280] uppercase tracking-wide">
                        Customer details
                      </h2>
                      <div className="flex flex-col gap-1">
                        <p className="text-base text-[#0B1220]">
                          {bookingDraft.customer.firstName} {bookingDraft.customer.lastName}
                        </p>
                        <p className="text-sm text-[#374151]/70">{bookingDraft.customer.email}</p>
                        <p className="text-sm text-[#374151]/70">{bookingDraft.customer.mobile}</p>
                      </div>
                    </div>

                    {/* Address */}
                    {bookingDraft.address.formatted && (
                      <div className="flex flex-col gap-1">
                        <h2 className="text-sm font-semibold text-[#6B7280] uppercase tracking-wide">
                          Address
                        </h2>
                        <p className="text-base text-[#0B1220]">{bookingDraft.address.formatted}</p>
                      </div>
                    )}

                    {/* Notes */}
                    {bookingDraft.notes && (
                      <div className="flex flex-col gap-1">
                        <h2 className="text-sm font-semibold text-[#6B7280] uppercase tracking-wide">
                          Access notes
                        </h2>
                        <p className="text-base text-[#0B1220]">{bookingDraft.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Error message */}
              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              {/* Pay & book button */}
              <div className="sticky bottom-0 bg-white/90 backdrop-blur border-t border-[#E5E7EB] py-3 sm:mt-0 mt-4">
                <button
                  onClick={handlePayAndBook}
                  disabled={isLoading || !bookingDraft.price}
                  className={`font-space-grotesk inline-flex items-center justify-center rounded-lg bg-donezo-orange px-10 py-3.5 text-base font-semibold text-[#FFFFFF] transition-opacity shadow-md ${
                    isLoading || !bookingDraft.price
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:opacity-90 cursor-pointer"
                  }`}
                >
                  {isLoading ? "Processing..." : "Confirm & pay"}
                </button>
              </div>
            </div>
          </Container>
        </section>
      </div>
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={null}>
      <CheckoutContent />
    </Suspense>
  );
}


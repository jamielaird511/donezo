"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Container from "@/components/layout/Container";

export default function SuccessClient() {
  const searchParams = useSearchParams();
  const [bookingDraft, setBookingDraft] = useState<any>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Try to get booking details from localStorage
    const draft = localStorage.getItem("donezo_booking_draft");
    if (draft) {
      try {
        setBookingDraft(JSON.parse(draft));
      } catch (e) {
        console.error("Failed to parse booking draft:", e);
      }
    }
  }, []);

  const sessionId = searchParams.get("session_id");
  const serviceName = bookingDraft?.service === "gutter_cleaning" ? "Gutter cleaning" : bookingDraft?.service || "Service";
  const price = bookingDraft?.price;

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <div className="relative z-10 flex flex-1 flex-col">
        <section className="flex flex-1 items-start">
          <Container className="pt-8 pb-16">
            <div className="flex flex-col gap-8 max-w-2xl">
              <div className="flex flex-col gap-4">
                <h1 className="text-4xl font-semibold tracking-[-0.01em] text-[#0B1220] sm:text-5xl leading-tight">
                  Booking confirmed
                </h1>
                <p className="text-base text-[#374151]/70">
                  Thank you for your booking! We&apos;ve received your payment and your booking is confirmed.
                </p>
              </div>

              <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-4">
                  <div>
                    <p className="text-sm text-[#374151]/70 mb-2">What happens next?</p>
                    <ul className="flex flex-col gap-2 text-base text-[#0B1220]">
                      <li className="flex items-start gap-2">
                        <span className="text-[#7ED321] mt-1">✓</span>
                        <span>You&apos;ll receive a confirmation email shortly with all the details</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#7ED321] mt-1">✓</span>
                        <span>A local donezo pro will contact you to arrange the work</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#7ED321] mt-1">✓</span>
                        <span>If we can&apos;t match your job, you&apos;ll be automatically refunded within 72 hours</span>
                      </li>
                    </ul>
                  </div>

                  {(serviceName || price) && (
                    <div className="pt-4 border-t border-[#E5E7EB]">
                      <div className="flex flex-col gap-1">
                        {serviceName && (
                          <p className="text-sm text-[#374151]/70">
                            Service: <span className="text-[#0B1220] font-medium">{serviceName}</span>
                          </p>
                        )}
                        {price && (
                          <p className="text-sm text-[#374151]/70">
                            Amount paid: <span className="text-[#0B1220] font-medium">${price}</span>
                          </p>
                        )}
                        {sessionId && (
                          <p className="text-xs text-[#9CA3AF] mt-2">
                            Session ID: {sessionId}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-start">
                <Link
                  href="/"
                  className="font-space-grotesk inline-flex items-center justify-center rounded-lg bg-donezo-orange px-12 py-4 text-lg font-semibold text-[#FFFFFF] transition-opacity shadow-md hover:opacity-90"
                >
                  Back to home
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </div>
    </main>
  );
}


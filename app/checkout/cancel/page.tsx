"use client";

import { useEffect } from "react";
import Link from "next/link";
import Container from "@/components/layout/Container";

export default function CheckoutCancelPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <div className="relative z-10 flex flex-1 flex-col">
        <section className="flex flex-1 items-start">
          <Container className="pt-8 pb-16">
            <div className="flex flex-col gap-8 max-w-2xl">
              <div className="flex flex-col gap-4">
                <h1 className="text-4xl font-semibold tracking-[-0.01em] text-[#0B1220] sm:text-5xl leading-tight">
                  Payment cancelled
                </h1>
                <p className="text-base text-[#374151]/70">
                  Your payment was cancelled. No charges have been made.
                </p>
              </div>

              <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
                <p className="text-base text-[#0B1220]">
                  If you&apos;d like to complete your booking, you can return to checkout and try again.
                </p>
              </div>

              <div className="flex justify-start">
                <Link
                  href="/checkout"
                  className="font-space-grotesk inline-flex items-center justify-center rounded-lg bg-[#7FCB00] px-12 py-4 text-lg font-semibold text-[#FFFFFF] transition-colors shadow-md hover:bg-[#6FB800]"
                >
                  Return to checkout
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </div>
    </main>
  );
}


import { Home as HomeIcon, Leaf, Wrench, Plus, Shield, Users, RefreshCw, XCircle } from "lucide-react";
import Link from "next/link";
import Container from "@/components/layout/Container";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <div className="relative z-10 flex flex-1 flex-col">
        <section id="services" className="relative flex items-center h-[420px] md:h-[560px] overflow-hidden">
          {/* Background image */}
          <div className="absolute inset-0">
            <img
              src="/hero/gutter-cleaning.png"
              alt=""
              className="w-full h-full object-cover"
              style={{ filter: "saturate(0.85)" }}
            />
          </div>
          
          {/* Gradient overlay */}
          <div 
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to right, rgba(0,0,0,0.55), rgba(0,0,0,0.15))"
            }}
          />

          {/* Content */}
          <Container className="relative z-10 py-8 md:py-12">
            <div className="flex flex-col max-w-3xl">
              {/* Hero headline */}
              <h1 className="text-4xl font-semibold tracking-[-0.01em] text-white sm:text-5xl md:text-6xl lg:text-6xl m-0 leading-tight">
                Fixed-price home jobs,
                <br />
                without the quote runaround.
              </h1>

              {/* Subline */}
              <p className="mt-6 text-base text-white/90 max-w-xl">
                Starting with gutter cleaning in Queenstown — more services on the way.
              </p>

              {/* Primary CTA */}
              <div className="mt-8">
                <a href="/services" className="font-space-grotesk inline-flex items-center justify-center rounded-lg bg-donezo-orange px-8 py-4 text-base font-semibold text-[#FFFFFF] transition-colors hover:opacity-90 shadow-md">
                  Book Gutter Cleaning
                </a>
              </div>

              {/* Trust line */}
              <p className="mt-3 text-base text-white/95 bg-black/30 rounded-md px-3 py-2 inline-block">
                Fixed price • No quotes • Book in under 2 minutes
              </p>
            </div>
          </Container>
        </section>

        {/* Category tiles grid - moved below the fold */}
        <section className="border-t border-[#E5E7EB] bg-white">
          <Container className="pt-20 md:pt-24 pb-24 md:pb-32">
            <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Home maintenance */}
              <Link href="/services" className="h-32 flex flex-col items-center justify-center gap-3 rounded-xl border border-[#E5E7EB] bg-white p-4 shadow-sm transition-all duration-150 ease-out hover:border-[#D1D5DB] hover:shadow-md focus:border-[#D1D5DB] focus:shadow-md focus:outline-none">
                <HomeIcon className="h-9 w-9 text-[#111827] stroke-[1.5]" />
                <span className="text-sm font-medium text-[#111827] text-center leading-tight">Home<br />maintenance</span>
              </Link>
              
              {/* Garden services */}
              <Link href="/services" className="h-32 flex flex-col items-center justify-center gap-3 rounded-xl border border-[#E5E7EB] bg-white p-4 shadow-sm transition-all duration-150 ease-out hover:border-[#D1D5DB] hover:shadow-md focus:border-[#D1D5DB] focus:shadow-md focus:outline-none">
                <Leaf className="h-9 w-9 text-[#111827] stroke-[1.5]" />
                <span className="text-sm font-medium text-[#111827] text-center leading-tight">Garden services</span>
              </Link>
              
              {/* Handyman jobs */}
              <Link href="/services" className="h-32 flex flex-col items-center justify-center gap-3 rounded-xl border border-[#E5E7EB] bg-white p-4 shadow-sm transition-all duration-150 ease-out hover:border-[#D1D5DB] hover:shadow-md focus:border-[#D1D5DB] focus:shadow-md focus:outline-none">
                <Wrench className="h-9 w-9 text-[#111827] stroke-[1.5]" />
                <span className="text-sm font-medium text-[#111827] text-center leading-tight">Handyman jobs</span>
              </Link>
              
              {/* More services */}
              <Link href="/services" className="h-32 flex flex-col items-center justify-center gap-3 rounded-xl border border-[#E5E7EB] bg-white p-4 shadow-sm transition-all duration-150 ease-out hover:border-[#D1D5DB] hover:shadow-md focus:border-[#D1D5DB] focus:shadow-md focus:outline-none">
                <Plus className="h-9 w-9 text-[#111827] stroke-[1.5]" />
                <span className="text-sm font-medium text-[#111827] text-center leading-tight">More services</span>
              </Link>
            </div>
          </Container>
        </section>

        {/* Offer section */}
        <section 
          id="booking"
          className="bg-donezo-orange py-12 sm:py-14"
        >
          <Container>
            <div className="flex flex-col items-center max-w-3xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-semibold text-white">
                Gutter cleaning from $149
              </h2>
              <p className="mt-4 text-base text-white/85">
                Fixed price • No quotes • Book in under 2 minutes
              </p>
              <a href="/services" className="mt-6 inline-flex items-center justify-center rounded-lg border-2 border-white px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-white/10">
                Book Gutter Cleaning
              </a>
            </div>
          </Container>
        </section>

        <section className="border-t border-[#E5E7EB] bg-[#F9FAFB]">
          <Container className="py-16">
            <div className="flex flex-col gap-10">
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6B7280]">
                  HOW donezo WORKS
                </h2>

                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#0B1220]">
                  From &quot;I should sort that&quot; to booked — in three simple steps.
                </h2>
              </div>

              <div className="grid gap-6 sm:grid-cols-3">
                <div className="relative flex flex-col gap-2.5 rounded-xl border-t-2 border-t-donezo-orange border border-[#E5E7EB] bg-white p-5 sm:p-6 shadow-sm transition-all duration-150 ease-out hover:border-[#D1D5DB] hover:shadow-md">
                  <div className="absolute -top-2 -left-2 flex h-6 w-6 items-center justify-center rounded-full bg-donezo-orange text-xs font-bold text-[#0B1220]">
                    1
                  </div>
                  <p className="font-semibold text-[#0B1220]">Clear, upfront pricing.</p>
                  <p className="text-sm text-[#374151]/80">
                    Answer a few basic questions about your place to get a fixed price instantly. No quotes. No waiting around.
                  </p>
                </div>

                <div className="relative flex flex-col gap-2.5 rounded-xl border-t-2 border-t-donezo-orange border border-[#E5E7EB] bg-white p-5 sm:p-6 shadow-sm transition-all duration-150 ease-out hover:border-[#D1D5DB] hover:shadow-md">
                  <div className="absolute -top-2 -left-2 flex h-6 w-6 items-center justify-center rounded-full bg-donezo-orange text-xs font-bold text-[#0B1220]">
                    2
                  </div>
                  <p className="font-semibold text-[#0B1220]">Pay once. We handle the rest.</p>
                  <p className="text-sm text-[#374151]/80">
                    Secure payment confirms your job and sends it to vetted local donezo pros in your area.
                  </p>
                </div>

                <div className="relative flex flex-col gap-2.5 rounded-xl border-t-2 border-t-donezo-orange border border-[#E5E7EB] bg-white p-5 sm:p-6 shadow-sm transition-all duration-150 ease-out hover:border-[#D1D5DB] hover:shadow-md">
                  <div className="absolute -top-2 -left-2 flex h-6 w-6 items-center justify-center rounded-full bg-donezo-orange text-xs font-bold text-[#0B1220]">
                    3
                  </div>
                  <p className="font-semibold text-[#0B1220]">A local pro gets in touch.</p>
                  <p className="text-sm text-[#374151]/80">
                    A trusted provider accepts your job and contacts you directly to arrange the work. If we can&apos;t match your job, you&apos;re automatically refunded within 72 hours.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Reassurance section */}
        <section className="border-t border-[#E5E7EB] bg-donezo-orange py-16">
          <Container>
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl sm:text-3xl font-semibold text-white/95">
                Simple. Fair. Predictable.
              </h2>

              <div className="flex flex-col gap-4">
                <div className="flex gap-4 rounded-xl border border-[#E5E7EB] bg-white p-5 sm:p-6 shadow-sm transition-all duration-150 ease-out hover:border-[#D1D5DB] hover:shadow-md">
                  <Shield className="h-5 w-5 text-[#374151] flex-shrink-0 mt-0.5" />
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-semibold text-[#0B1220]">
                      What the price covers
                    </h3>
                    <p className="text-sm text-[#374151]/80">
                      Your upfront price includes Donezo&apos;s platform services — matching you with a vetted local pro, handling payment securely, and managing the admin so you don&apos;t have to. No hidden extras or surprise add-ons.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 rounded-xl border border-[#E5E7EB] bg-white p-5 sm:p-6 shadow-sm transition-all duration-150 ease-out hover:border-[#D1D5DB] hover:shadow-md">
                  <Users className="h-5 w-5 text-[#374151] flex-shrink-0 mt-0.5" />
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-semibold text-[#0B1220]">
                      Pros opt in (no forced assignments)
                    </h3>
                    <p className="text-sm text-[#374151]/80">
                      Jobs go to vetted local pros who choose to accept based on availability and fit. That means better outcomes and fewer cancellations.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 rounded-xl border border-[#E5E7EB] bg-white p-5 sm:p-6 shadow-sm transition-all duration-150 ease-out hover:border-[#D1D5DB] hover:shadow-md">
                  <RefreshCw className="h-5 w-5 text-[#374151] flex-shrink-0 mt-0.5" />
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-semibold text-[#0B1220]">
                      No match? Automatic refund
                    </h3>
                    <p className="text-sm text-[#374151]/80">
                      If we can&apos;t find the right provider, your payment is automatically refunded within 72 hours. No chasing, no hassle.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 rounded-xl border border-[#E5E7EB] bg-white p-5 sm:p-6 shadow-sm transition-all duration-150 ease-out hover:border-[#D1D5DB] hover:shadow-md">
                  <XCircle className="h-5 w-5 text-[#374151] flex-shrink-0 mt-0.5" />
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-semibold text-[#0B1220]">
                      No quote games
                    </h3>
                    <p className="text-sm text-[#374151]/80">
                      Because the price is set upfront, there&apos;s no renegotiation after booking. Everyone knows the deal before the work starts.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Donezo Pro provider enquiry */}
        <section id="donezo-pro" aria-label="For service providers" className="border-t border-[#E5E7EB] bg-white py-12">
          <Container>
            <div className="w-full rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] p-5 sm:p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex flex-col gap-2.5">
                  <h2 className="text-2xl sm:text-3xl font-semibold text-[#0B1220]">
                    Become a Donezo Pro
                  </h2>
                  <p className="text-base text-[#374151]/90 leading-relaxed">
                    Fixed-price jobs. No quoting. Local customers.
                  </p>
                  <p className="text-sm text-[#374151]/80 max-w-xl leading-relaxed">
                    Join Donezo Pro and get paid jobs sent directly to you. Set your availability and accept work that suits you.
                  </p>
                  <p className="text-sm text-[#6B7280]">
                    Currently onboarding Queenstown providers.
                  </p>
                </div>
                <a 
                  href="/for-pros"
                  className="inline-flex items-center justify-center rounded-md bg-donezo-orange px-6 py-2.5 text-sm font-semibold text-[#FFFFFF] transition-colors hover:opacity-90 sm:w-auto"
                >
                  Enquire about Donezo Pro →
                </a>
              </div>
            </div>
          </Container>
        </section>

        {/* FAQs */}
        <section className="border-t border-[#E5E7EB] bg-white py-16">
          <Container>
            <div className="flex flex-col gap-10 max-w-3xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#0B1220]">
                Frequently Asked Questions
              </h2>

              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-3">
                  <h3 className="text-lg font-semibold text-[#0B1220]">
                    Who actually does the work?
                  </h3>
                  <p className="text-base text-[#374151]/80 leading-relaxed">
                    Donezo connects you with vetted local professionals. Services are carried out by independent providers.
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <h3 className="text-lg font-semibold text-[#0B1220]">
                    Does Donezo guarantee the work?
                  </h3>
                  <p className="text-base text-[#374151]/80 leading-relaxed">
                    The professional you book is responsible for the work they carry out. Donezo handles pricing, booking, and payment, and helps coordinate next steps if something doesn&apos;t feel right.
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <h3 className="text-lg font-semibold text-[#0B1220]">
                    What happens if my home isn&apos;t a standard job?
                  </h3>
                  <p className="text-base text-[#374151]/80 leading-relaxed">
                    Some larger or more complex homes need a quick site check to price accurately. In those cases, Donezo arranges next steps and comes back with a clear price before you decide.
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <h3 className="text-lg font-semibold text-[#0B1220]">
                    Can I talk to someone if I have a question?
                  </h3>
                  <p className="text-base text-[#374151]/80 leading-relaxed">
                    Yes — Donezo stays involved throughout the booking and helps keep things moving.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </div>
    </main>
  );
}

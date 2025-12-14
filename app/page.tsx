import { Home as HomeIcon, Leaf, Wrench, Plus, Shield, Users, RefreshCw, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/layout/Container";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <div className="relative z-10 flex flex-1 flex-col">
        <section id="services" className="flex flex-1 items-start">
          <Container className="py-16">
            <div className="relative flex flex-col">
              {/* Hero text */}
              <div className="flex flex-col">
                <p className="text-base font-medium text-[#374151] lg:whitespace-nowrap m-0">
                  Fixed-price home jobs, without the quote runaround.
                </p>

                <h1 className="text-4xl font-semibold tracking-[-0.01em] text-[#0B1220] sm:text-5xl md:text-6xl lg:text-6xl m-0 leading-tight">
                  <span className="block lg:whitespace-nowrap">Transparent pricing.</span>
                  <span className="block lg:whitespace-nowrap -mt-1">Easy booking.</span>
                </h1>

                <div className="mt-6 lg:hidden">
                  <a href="/gutter-cleaning" className="font-space-grotesk inline-flex items-center justify-center rounded-lg bg-[#7FCB00] px-12 py-4 text-lg font-semibold text-[#FFFFFF] transition-colors hover:bg-[#6FB800] shadow-md">
                    Book now
                  </a>
                </div>

                <Image
                  src="/brand/logo.svg"
                  alt="donezo."
                  width={320}
                  height={104}
                  className="my-6"
                />

                <div className="flex flex-col gap-3 text-base text-[#374151]/70 mb-10">
                  <p className="max-w-xl m-0">
                    Starting with gutter cleaning in Queenstown — more services on the way.
                  </p>
                </div>
              </div>

              {/* CTA positioned above Handyman jobs card (desktop only) */}
              <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 left-[55%]">
                <a href="/gutter-cleaning" className="font-space-grotesk inline-flex items-center justify-center rounded-lg bg-[#7FCB00] px-12 py-4 text-lg font-semibold text-[#FFFFFF] transition-colors hover:bg-[#6FB800] shadow-md">
                  Book now
                </a>
              </div>

              {/* Category tiles grid */}
              <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Home maintenance */}
                <div className="h-32 flex flex-col items-center justify-center gap-3 rounded-xl border border-[#E5E7EB] bg-white p-4 shadow-sm transition-all duration-150 ease-out cursor-default hover:border-[#D1D5DB] hover:shadow-md focus:border-[#D1D5DB] focus:shadow-md focus:outline-none">
                  <HomeIcon className="h-9 w-9 text-[#111827] stroke-[1.5]" />
                  <span className="text-sm font-medium text-[#111827] text-center leading-tight">Home<br />maintenance</span>
                </div>
                
                {/* Garden services */}
                <div className="h-32 flex flex-col items-center justify-center gap-3 rounded-xl border border-[#E5E7EB] bg-white p-4 shadow-sm transition-all duration-150 ease-out cursor-default hover:border-[#D1D5DB] hover:shadow-md focus:border-[#D1D5DB] focus:shadow-md focus:outline-none">
                  <Leaf className="h-9 w-9 text-[#111827] stroke-[1.5]" />
                  <span className="text-sm font-medium text-[#111827] text-center leading-tight">Garden services</span>
                </div>
                
                {/* Handyman jobs */}
                <div className="h-32 flex flex-col items-center justify-center gap-3 rounded-xl border border-[#E5E7EB] bg-white p-4 shadow-sm transition-all duration-150 ease-out cursor-default hover:border-[#D1D5DB] hover:shadow-md focus:border-[#D1D5DB] focus:shadow-md focus:outline-none">
                  <Wrench className="h-9 w-9 text-[#111827] stroke-[1.5]" />
                  <span className="text-sm font-medium text-[#111827] text-center leading-tight">Handyman jobs</span>
                </div>
                
                {/* More services */}
                <div className="h-32 flex flex-col items-center justify-center gap-3 rounded-xl border border-[#E5E7EB] bg-white p-4 shadow-sm transition-all duration-150 ease-out cursor-default hover:border-[#D1D5DB] hover:shadow-md focus:border-[#D1D5DB] focus:shadow-md focus:outline-none">
                  <Plus className="h-9 w-9 text-[#111827] stroke-[1.5]" />
                  <span className="text-sm font-medium text-[#111827] text-center leading-tight">More services</span>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Promotional strip */}
        <div 
          id="booking"
          className="relative block border-y border-[#E5E7EB] py-14 sm:py-20 lg:py-28 overflow-hidden"
        >
          {/* Background image */}
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 1,
            }}
          />
          
          {/* Content */}
          <Container className="relative z-10">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <Link href="/gutter-cleaning" className="rounded-lg bg-[#F4FAEE] border-[3px] border-[#7ED321] shadow-lg px-4 py-4 sm:px-6 sm:py-5 block">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <h2 className="text-2xl sm:text-3xl font-semibold text-[#0B1220] drop-shadow-sm">
                      Gutter cleaning from $149
                    </h2>
                    <span className="inline-flex items-center gap-2 rounded-md bg-white border border-slate-300 px-3 py-1 text-xs font-medium text-slate-900 w-fit">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#7ED321]"></span>
                      Live in Queenstown
                    </span>
                  </div>
                  <p className="text-base text-[#374151] drop-shadow-sm">
                    Fixed price • No quotes • Book in under 2 minutes
                  </p>
                </div>
              </Link>
              <a href="/gutter-cleaning" className="font-space-grotesk inline-flex items-center justify-center rounded-md bg-[#7FCB00] px-8 py-3 text-base font-semibold text-[#FFFFFF] transition-colors hover:bg-[#6FB800]">
                Book now
              </a>
            </div>
          </Container>
        </div>

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
                <div className="relative flex flex-col gap-2.5 rounded-xl border-t-2 border-t-[#7FCB00] border border-[#E5E7EB] bg-white p-5 sm:p-6 shadow-sm transition-all duration-150 ease-out hover:border-[#D1D5DB] hover:shadow-md">
                  <div className="absolute -top-2 -left-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#7FCB00] text-xs font-bold text-[#0B1220]">
                    1
                  </div>
                  <p className="font-semibold text-[#0B1220]">Clear, upfront pricing.</p>
                  <p className="text-sm text-[#374151]/80">
                    Answer a few basic questions about your place to get a fixed price instantly. No quotes. No waiting around.
                  </p>
                </div>

                <div className="relative flex flex-col gap-2.5 rounded-xl border-t-2 border-t-[#7FCB00] border border-[#E5E7EB] bg-white p-5 sm:p-6 shadow-sm transition-all duration-150 ease-out hover:border-[#D1D5DB] hover:shadow-md">
                  <div className="absolute -top-2 -left-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#7FCB00] text-xs font-bold text-[#0B1220]">
                    2
                  </div>
                  <p className="font-semibold text-[#0B1220]">Pay once. We handle the rest.</p>
                  <p className="text-sm text-[#374151]/80">
                    Secure payment confirms your job and sends it to vetted local donezo pros in your area.
                  </p>
                </div>

                <div className="relative flex flex-col gap-2.5 rounded-xl border-t-2 border-t-[#7FCB00] border border-[#E5E7EB] bg-white p-5 sm:p-6 shadow-sm transition-all duration-150 ease-out hover:border-[#D1D5DB] hover:shadow-md">
                  <div className="absolute -top-2 -left-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#7FCB00] text-xs font-bold text-[#0B1220]">
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
        <section className="border-t border-[#E5E7EB] bg-[#7ED321] py-16">
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
                  href="/for-tradies"
                  className="inline-flex items-center justify-center rounded-md bg-[#7FCB00] px-6 py-2.5 text-sm font-semibold text-[#FFFFFF] transition-colors hover:bg-[#6FB800] sm:w-auto"
                >
                  Enquire about Donezo Pro →
                </a>
              </div>
            </div>
          </Container>
        </section>

        <footer className="border-t border-[#E5E7EB] bg-white">
          <Container className="flex items-center justify-between py-4 text-xs text-[#6B7280]">
            <p>© {new Date().getFullYear()} donezo.</p>
            <p className="hidden sm:block">
              Built for busy people who just want it sorted.
            </p>
          </Container>
        </footer>
      </div>
    </main>
  );
}

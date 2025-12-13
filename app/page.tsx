import { Home as HomeIcon, Leaf, Wrench, Plus } from "lucide-react";
import { Space_Grotesk } from "next/font/google";
import Link from "next/link";
import Container from "@/components/layout/Container";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-space-grotesk",
});

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <div className="relative z-10 flex flex-1 flex-col">
        <header className="sticky top-0 z-50 w-full border-b border-[#E5E7EB] bg-white shadow-sm transition-all">
          <Container className="grid grid-cols-3 items-center py-3">
            <div className="flex h-14 items-center justify-center rounded-md bg-white px-5 justify-self-start">
              <Link href="/">
                <span className={`${spaceGrotesk.className} text-4xl font-extrabold tracking-wider text-[#7FCB00]`}>
                  donezo.
                </span>
              </Link>
            </div>

            <nav className="hidden gap-6 text-sm text-[#0B1220] md:flex justify-self-center">
              <a href="#services" className="transition-colors hover:text-[#111827] hover:underline">
                Services
              </a>
            </nav>

            <div className="justify-self-end">
              <a href="/pro" className="rounded-md bg-[#7FCB00] px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#FFFFFF] transition-colors hover:bg-[#6FB800]">
                Donezo Pro Login
              </a>
            </div>
          </Container>
        </header>

        <section id="services" className="flex flex-1 items-start">
          <Container className="pt-8 pb-8">
            <div className="flex flex-col">
              {/* Hero text */}
              <div className="flex flex-col">
                <p className="text-lg sm:text-xl font-medium text-[#374151] lg:whitespace-nowrap m-0">
                  Fixed-price home jobs, without the quote runaround.
                </p>

                <h1 className="text-4xl font-bold tracking-tight text-[#0B1220] sm:text-5xl md:text-6xl lg:text-6xl mt-3 m-0">
                  <span className="block lg:whitespace-nowrap leading-none">Transparent pricing.</span>
                  <span className="block lg:whitespace-nowrap leading-none -mt-1">Easy booking.</span>
                </h1>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <span className={`${spaceGrotesk.className} text-5xl sm:text-7xl text-[#7FCB00] font-bold tracking-wide leading-tight my-6`}>donezo.</span>
                  <div className="flex justify-end sm:flex-1">
                    <a href="#booking" className="inline-flex items-center justify-center rounded-md bg-[#7FCB00] px-8 py-3 text-base font-semibold text-[#FFFFFF] transition-colors hover:bg-[#6FB800] shadow-md sm:w-auto">
                      Book now
                    </a>
                  </div>
                </div>

                <div className="flex flex-col gap-3 text-base text-[#374151] sm:text-lg mt-2">
                  <p className="lg:whitespace-nowrap m-0">
                    Starting with gutter cleaning in Queenstown — more services on the way.
                  </p>
                </div>
              </div>

              {/* Category tiles grid */}
              <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-6 mt-5">
                {/* Home maintenance */}
                <div className="h-32 flex flex-col items-center justify-center gap-3 rounded-lg border border-[#E5E7EB] bg-white p-4 shadow-sm transition-all duration-150 ease-out cursor-default hover:border-[#7FCB00] hover:bg-[rgba(127,203,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] focus:border-[#7FCB00] focus:bg-[rgba(127,203,0,0.04)] focus:shadow-[0_4px_12px_rgba(0,0,0,0.06)] focus:outline-none">
                  <HomeIcon className="h-9 w-9 text-[#111827] stroke-[1.5]" />
                  <span className="text-sm font-medium text-[#111827] text-center leading-tight">Home<br />maintenance</span>
                </div>
                
                {/* Garden services */}
                <div className="h-32 flex flex-col items-center justify-center gap-3 rounded-lg border border-[#E5E7EB] bg-white p-4 shadow-sm transition-all duration-150 ease-out cursor-default hover:border-[#7FCB00] hover:bg-[rgba(127,203,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] focus:border-[#7FCB00] focus:bg-[rgba(127,203,0,0.04)] focus:shadow-[0_4px_12px_rgba(0,0,0,0.06)] focus:outline-none">
                  <Leaf className="h-9 w-9 text-[#111827] stroke-[1.5]" />
                  <span className="text-sm font-medium text-[#111827] text-center leading-tight">Garden services</span>
                </div>
                
                {/* Handyman jobs */}
                <div className="h-32 flex flex-col items-center justify-center gap-3 rounded-lg border border-[#E5E7EB] bg-white p-4 shadow-sm transition-all duration-150 ease-out cursor-default hover:border-[#7FCB00] hover:bg-[rgba(127,203,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] focus:border-[#7FCB00] focus:bg-[rgba(127,203,0,0.04)] focus:shadow-[0_4px_12px_rgba(0,0,0,0.06)] focus:outline-none">
                  <Wrench className="h-9 w-9 text-[#111827] stroke-[1.5]" />
                  <span className="text-sm font-medium text-[#111827] text-center leading-tight">Handyman jobs</span>
                </div>
                
                {/* More services */}
                <div className="h-32 flex flex-col items-center justify-center gap-3 rounded-lg border border-[#E5E7EB] bg-white p-4 shadow-sm transition-all duration-150 ease-out cursor-default hover:border-[#7FCB00] hover:bg-[rgba(127,203,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] focus:border-[#7FCB00] focus:bg-[rgba(127,203,0,0.04)] focus:shadow-[0_4px_12px_rgba(0,0,0,0.06)] focus:outline-none">
                  <Plus className="h-9 w-9 text-[#111827] stroke-[1.5]" />
                  <span className="text-sm font-medium text-[#111827] text-center leading-tight">More services</span>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Promotional strip */}
        <a 
          id="booking"
          href="/gutter-cleaning" 
          className="relative block border-y border-[#E5E7EB] py-14 sm:py-20 lg:py-28 cursor-pointer overflow-hidden transition-all hover:brightness-105"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Gradient overlay */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to right, rgba(255, 255, 255, 0.60), rgba(255, 255, 255, 0.40))',
            }}
          />
          
          {/* Content */}
          <Container className="relative z-10">
            <div className="flex flex-col sm:flex-row items-center gap-10">
              <div className="rounded-lg bg-white/90 backdrop-blur-md border border-[#E5E7EB] shadow-lg px-4 py-4 sm:px-6 sm:py-5">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1220] drop-shadow-sm">
                      Gutter cleaning from $149
                    </h2>
                    <span className="inline-flex items-center rounded-full bg-[#6B5A4A]/20 backdrop-blur-sm border border-[#6B5A4A]/30 px-3 py-1 text-xs font-medium text-[#0B1220] w-fit">
                      Live in Queenstown
                    </span>
                  </div>
                  <p className="text-base text-[#374151] drop-shadow-sm">
                    Fixed price • No quotes • Book in under 2 minutes
                  </p>
                </div>
              </div>
              <div className="flex justify-end sm:flex-1">
                <button className="inline-flex items-center justify-center rounded-md bg-[#7FCB00] px-8 py-3 text-base font-semibold text-[#FFFFFF] transition-colors hover:bg-[#6FB800] sm:w-auto shadow-md">
                  Book now
                </button>
              </div>
            </div>
          </Container>
        </a>

        <section className="border-t border-[#E5E7EB] bg-[#F9FAFB]">
          <Container className="py-12">
            <div className="flex flex-col gap-10">
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6B7280] mb-3">
                  HOW donezo WORKS
                </h2>

                <p className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#0B1220]">
                  From &quot;I should sort that&quot; to booked — in three simple steps.
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-3">
                <div className="relative flex flex-col gap-2 rounded border-t-2 border-t-[#7FCB00] border border-[#E5E7EB] bg-white p-5 shadow-sm">
                  <div className="absolute -top-2 -left-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#7FCB00] text-xs font-bold text-[#0B1220]">
                    1
                  </div>
                  <p className="font-bold text-[#0B1220]">Clear, upfront pricing.</p>
                  <p className="text-sm text-[#374151]">
                    Answer a few basic questions about your place to get a fixed price instantly. No quotes. No waiting around.
                  </p>
                </div>

                <div className="relative flex flex-col gap-2 rounded border-t-2 border-t-[#7FCB00] border border-[#E5E7EB] bg-white p-5 shadow-sm">
                  <div className="absolute -top-2 -left-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#7FCB00] text-xs font-bold text-[#0B1220]">
                    2
                  </div>
                  <p className="font-bold text-[#0B1220]">Pay once. We handle the rest.</p>
                  <p className="text-sm text-[#374151]">
                    Secure payment confirms your job and sends it to vetted local donezo pros in your area.
                  </p>
                </div>

                <div className="relative flex flex-col gap-2 rounded border-t-2 border-t-[#7FCB00] border border-[#E5E7EB] bg-white p-5 shadow-sm">
                  <div className="absolute -top-2 -left-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#7FCB00] text-xs font-bold text-[#0B1220]">
                    3
                  </div>
                  <p className="font-bold text-[#0B1220]">A local pro gets in touch.</p>
                  <p className="text-sm text-[#374151]">
                    A trusted provider accepts your job and contacts you directly to arrange the work. If we can&apos;t match your job, you&apos;re automatically refunded within 72 hours.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Reassurance section */}
        <section className="border-t border-[#E5E7EB] bg-[#F4FAEE] py-12">
          <Container>
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-3">
                <h2 className="text-3xl sm:text-4xl font-semibold text-[#0B1220]">
                  Simple. Fair. Predictable.
                </h2>
                <p className="text-lg sm:text-xl text-[#374151] max-w-2xl">
                  You pay a clear upfront price. If we can&apos;t complete your job, you&apos;re automatically refunded — no chasing, no hassle.
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="flex flex-col gap-2 rounded border border-[#E5E7EB] bg-white p-5 shadow-sm">
                  <h3 className="font-semibold text-[#0B1220]">
                    What the price covers
                  </h3>
                  <p className="text-sm text-[#374151]">
                    Your upfront price includes Donezo&apos;s platform services — matching you with a vetted local pro, handling payment securely, and managing the admin so you don&apos;t have to. No hidden extras or surprise add-ons.
                  </p>
                </div>

                <div className="flex flex-col gap-2 rounded border border-[#E5E7EB] bg-white p-5 shadow-sm">
                  <h3 className="font-semibold text-[#0B1220]">
                    Pros opt in (no forced assignments)
                  </h3>
                  <p className="text-sm text-[#374151]">
                    Jobs go to vetted local pros who choose to accept based on availability and fit. That means better outcomes and fewer cancellations.
                  </p>
                </div>

                <div className="flex flex-col gap-2 rounded border border-[#E5E7EB] bg-white p-5 shadow-sm">
                  <h3 className="font-semibold text-[#0B1220]">
                    No match? Automatic refund
                  </h3>
                  <p className="text-sm text-[#374151]">
                    If we can&apos;t find the right provider, your payment is automatically refunded within 72 hours. No chasing, no hassle.
                  </p>
                </div>

                <div className="flex flex-col gap-2 rounded border border-[#E5E7EB] bg-white p-5 shadow-sm">
                  <h3 className="font-semibold text-[#0B1220]">
                    No quote games
                  </h3>
                  <p className="text-sm text-[#374151]">
                    Because the price is set upfront, there&apos;s no renegotiation after booking. Everyone knows the deal before the work starts.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Donezo Pro provider enquiry */}
        <section id="donezo-pro" aria-label="For service providers" className="border-t border-[#E5E7EB] bg-white py-12">
          <Container>
            <div className="w-full rounded-md border border-[#E5E7EB] bg-[#F9FAFB] p-8 shadow-md md:p-10">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div className="flex flex-col gap-3">
                  <h2 className="text-3xl sm:text-4xl font-semibold text-[#0B1220]">
                    Become a Donezo Pro
                  </h2>
                  <p className="text-lg sm:text-xl text-[#374151] mt-2">
                    Fixed-price jobs. No quoting. Local customers.
                  </p>
                  <p className="text-base sm:text-lg text-[#374151] max-w-xl">
                    Join Donezo Pro and get paid jobs sent directly to you. Set your availability and accept work that suits you.
                  </p>
                  <p className="text-sm text-[#6B7280] mt-2">
                    Currently onboarding Queenstown providers.
                  </p>
                </div>
                <a 
                  href="/for-tradies"
                  className="inline-flex items-center justify-center rounded-md bg-[#7FCB00] px-6 py-3 text-base font-medium text-[#FFFFFF] transition-colors hover:bg-[#6FB800] sm:w-auto"
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

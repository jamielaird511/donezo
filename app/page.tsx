import { Home as HomeIcon, Leaf, Wrench, Plus } from "lucide-react";
import { Space_Grotesk } from "next/font/google";
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
        <header className="sticky top-0 z-50 w-full border-b border-blue-600/30 bg-white shadow-sm transition-all">
          <Container className="grid grid-cols-3 items-center py-3">
            <div className="flex h-14 items-center justify-center rounded-md bg-white px-5 justify-self-start">
              <span className={`${spaceGrotesk.className} text-4xl font-extrabold tracking-wider text-[#2563EB]`}>
                donezo.
              </span>
            </div>

            <nav className="hidden gap-6 text-sm text-slate-900 md:flex justify-self-center">
              <button className="transition-colors hover:text-[#2563EB] hover:underline">
                How it works
              </button>
              <button className="transition-colors hover:text-[#2563EB] hover:underline">
                For tradies
              </button>
              <button className="transition-colors hover:text-[#2563EB] hover:underline">
                Pricing
              </button>
            </nav>

            <div className="justify-self-end">
              <button className="rounded-md border border-[#2563EB] bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#2563EB] transition-colors hover:bg-blue-50">
                Donezo Pro login
              </button>
            </div>
          </Container>
        </header>

        <section className="flex flex-1 items-start">
          <Container className="pt-8 pb-8">
            <div className="flex flex-col">
              {/* Hero text */}
              <div className="flex flex-col">
                <p className="text-lg sm:text-xl font-medium text-neutral-600 lg:whitespace-nowrap m-0">
                  Fixed-price home jobs, without the quote runaround.
                </p>

                <h1 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl md:text-6xl lg:text-6xl mt-3 m-0">
                  <span className="block lg:whitespace-nowrap leading-none">Transparent pricing.</span>
                  <span className="block lg:whitespace-nowrap leading-none -mt-1">Easy booking.</span>
                  <span className={`${spaceGrotesk.className} block mt-3 mb-0.5 text-[#2563EB] font-semibold tracking-wide leading-normal`}>donezo.</span>
                </h1>

                <div className="flex flex-col gap-3 text-base text-neutral-600 sm:text-lg mt-2">
                  <p className="lg:whitespace-nowrap m-0">
                    Starting with gutter cleaning in Queenstown — more services on the way.
                  </p>
                </div>
              </div>

              {/* Category tiles grid */}
              <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-6 mt-5">
                {/* Home maintenance */}
                <div className="h-32 flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-[#2563EB] bg-[#F5F8FF] p-4 shadow-sm transition-all cursor-default hover:border-2 hover:border-[#2563EB] hover:shadow-lg">
                  <HomeIcon className="h-9 w-9 text-[#2563EB] stroke-[1.5]" />
                  <span className="text-sm font-medium text-[#2563EB] text-center leading-tight">Home<br />maintenance</span>
                </div>
                
                {/* Garden services */}
                <div className="h-32 flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-[#2563EB] bg-[#F5F8FF] p-4 shadow-sm transition-all cursor-default hover:border-2 hover:border-[#2563EB] hover:shadow-lg">
                  <Leaf className="h-9 w-9 text-[#2563EB] stroke-[1.5]" />
                  <span className="text-sm font-medium text-[#2563EB] text-center leading-tight">Garden services</span>
                </div>
                
                {/* Handyman jobs */}
                <div className="h-32 flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-[#2563EB] bg-[#F5F8FF] p-4 shadow-sm transition-all cursor-default hover:border-2 hover:border-[#2563EB] hover:shadow-lg">
                  <Wrench className="h-9 w-9 text-[#2563EB] stroke-[1.5]" />
                  <span className="text-sm font-medium text-[#2563EB] text-center leading-tight">Handyman jobs</span>
                </div>
                
                {/* More services */}
                <div className="h-32 flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-[#2563EB] bg-[#F5F8FF] p-4 shadow-sm transition-all cursor-default hover:border-2 hover:border-[#2563EB] hover:shadow-lg">
                  <Plus className="h-9 w-9 text-[#2563EB] stroke-[1.5]" />
                  <span className="text-sm font-medium text-[#2563EB] text-center leading-tight">More services</span>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Promotional strip */}
        <a 
          href="/gutter-cleaning" 
          className="relative block border-y border-blue-200 py-14 sm:py-20 lg:py-28 cursor-pointer overflow-hidden transition-all hover:brightness-105"
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
              background: 'linear-gradient(to right, rgba(37, 99, 235, 0.30), rgba(37, 99, 235, 0.20))',
            }}
          />
          
          {/* Content */}
          <Container className="relative z-10">
            <div className="flex flex-col sm:flex-row items-center gap-10">
              <div className="rounded-lg bg-black/40 backdrop-blur-md border border-white/15 shadow-lg px-4 py-4 sm:px-6 sm:py-5">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-sm">
                      Gutter cleaning from $149
                    </h2>
                    <span className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-sm border border-white/30 px-3 py-1 text-xs font-medium text-white w-fit">
                      Live in Queenstown
                    </span>
                  </div>
                  <p className="text-base text-white/90 drop-shadow-sm">
                    Fixed price • No quotes • Book in under 2 minutes
                  </p>
                </div>
              </div>
              <button className="inline-flex items-center justify-center rounded-md bg-white px-6 py-2.5 text-sm font-semibold text-[#2563EB] transition-colors hover:bg-blue-50 sm:w-auto shadow-md">
                Book now →
              </button>
            </div>
          </Container>
        </a>

        <section className="border-t border-neutral-200 bg-neutral-50">
          <Container className="py-20 sm:py-24">
            <div className="flex flex-col gap-10">
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-600 mb-3">
                  HOW donezo WORKS
                </h2>

                <p className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900">
                  From &quot;I should sort that&quot; to booked — in three simple steps.
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-3">
                <div className="relative flex flex-col gap-2 rounded border-t-2 border-t-[#2563EB] border border-blue-200 bg-[#F5F8FF] p-5 shadow-sm">
                  <div className="absolute -top-2 -left-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#2563EB] text-xs font-bold text-white">
                    1
                  </div>
                  <p className="font-bold text-neutral-900">Clear, upfront pricing.</p>
                  <p className="text-sm text-neutral-600">
                    Answer a few basic questions about your place to get a fixed price instantly. No quotes. No waiting around.
                  </p>
                </div>

                <div className="relative flex flex-col gap-2 rounded border-t-2 border-t-[#2563EB] border border-blue-200 bg-[#F5F8FF] p-5 shadow-sm">
                  <div className="absolute -top-2 -left-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#2563EB] text-xs font-bold text-white">
                    2
                  </div>
                  <p className="font-bold text-neutral-900">Pay once. We handle the rest.</p>
                  <p className="text-sm text-neutral-600">
                    Secure payment confirms your job and sends it to vetted local donezo pros in your area.
                  </p>
                </div>

                <div className="relative flex flex-col gap-2 rounded border-t-2 border-t-[#2563EB] border border-blue-200 bg-[#F5F8FF] p-5 shadow-sm">
                  <div className="absolute -top-2 -left-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#2563EB] text-xs font-bold text-white">
                    3
                  </div>
                  <p className="font-bold text-neutral-900">A local pro gets in touch.</p>
                  <p className="text-sm text-neutral-600">
                    A trusted provider accepts your job and contacts you directly to arrange the work. If we can&apos;t match your job, you&apos;re automatically refunded within 72 hours.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Donezo Pro provider enquiry */}
        <section aria-label="For service providers" className="border-t border-white/15 bg-[#2563EB] py-16 md:py-20">
          <Container>
            <div className="w-full rounded-md border border-neutral-200 bg-white p-8 shadow-md md:p-10">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div className="flex flex-col gap-3">
                  <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900">
                    Become a Donezo Pro
                  </h2>
                  <p className="text-lg sm:text-xl text-slate-600 mt-2">
                    Fixed-price jobs. No quoting. Local customers.
                  </p>
                  <p className="text-base sm:text-lg text-slate-600 max-w-xl">
                    Join Donezo Pro and get paid jobs sent directly to you. Set your availability and accept work that suits you.
                  </p>
                  <p className="text-sm text-slate-500 mt-2">
                    Currently onboarding Queenstown providers.
                  </p>
                </div>
                <a 
                  href="/for-tradies"
                  className="inline-flex items-center justify-center rounded-md bg-[#2563EB] px-6 py-3 text-base font-medium text-white transition-colors hover:bg-[#1D4ED8] sm:w-auto"
                >
                  Enquire about Donezo Pro →
                </a>
              </div>
            </div>
          </Container>
        </section>

        <footer className="border-t border-neutral-200 bg-white">
          <Container className="flex items-center justify-between py-4 text-xs text-neutral-500">
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

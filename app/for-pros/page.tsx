import Link from "next/link";
import Container from "@/components/layout/Container";

export default function ForProsPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <div className="relative z-10 flex flex-1 flex-col">
        {/* Hero */}
        <section className="border-b border-[#E5E7EB] bg-white">
          {/* Hero image */}
          <div className="w-full h-[400px] overflow-hidden">
            <img
              src="/hero/pro-hero.jpg"
              alt=""
              className="w-full h-full object-cover object-center"
            />
          </div>
          
          <Container className="pt-8 md:pt-12 pb-20 md:pb-24">
            <div className="flex flex-col max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-semibold tracking-[-0.01em] text-[#0B1220] sm:text-5xl md:text-6xl m-0 leading-tight">
                More paid jobs. Less admin.
              </h1>
              <p className="mt-6 text-lg text-[#374151]/80 max-w-2xl mx-auto">
                Donezo sends you fixed-price jobs that make sense for your business — no quoting, no chasing, no surprises.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="/for-pros/apply"
                  className="font-space-grotesk inline-flex items-center justify-center rounded-lg bg-donezo-orange px-8 py-4 text-base font-semibold text-[#FFFFFF] transition-colors hover:opacity-90 shadow-md"
                >
                  Apply to become a Donezo Pro
                </a>
                <Link
                  href="/pro/login"
                  className="font-space-grotesk text-base font-medium text-[#0B1220] hover:text-donezo-orange transition-colors underline"
                >
                  Already approved? Log in
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Why Pros like Donezo */}
        <section className="border-b border-[#E5E7EB]" style={{ backgroundColor: "#D4631E" }}>
          <Container className="py-12 md:py-14">
            <div className="flex flex-col gap-6">
              <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
                  Why Pros like Donezo
                </h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-4 rounded-xl border border-white/20 bg-white/10 p-5 transition-all duration-150 ease-out hover:bg-white/14 hover:border-white/30">
                  <svg className="w-6 h-6 text-white opacity-90 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-white mb-1">No quoting</h3>
                    <p className="text-sm text-white/90">
                      Every job comes with an upfront price.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-xl border border-white/20 bg-white/10 p-5 transition-all duration-150 ease-out hover:bg-white/14 hover:border-white/30">
                  <svg className="w-6 h-6 text-white opacity-90 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-white mb-1">Jobs that fit your schedule</h3>
                    <p className="text-sm text-white/90">
                      Only accept what you want.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-xl border border-white/20 bg-white/10 p-5 transition-all duration-150 ease-out hover:bg-white/14 hover:border-white/30">
                  <svg className="w-6 h-6 text-white opacity-90 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-white mb-1">No undercutting</h3>
                    <p className="text-sm text-white/90">
                      You&apos;re not bidding against others.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-xl border border-white/20 bg-white/10 p-5 transition-all duration-150 ease-out hover:bg-white/14 hover:border-white/30">
                  <svg className="w-6 h-6 text-white opacity-90 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-white mb-1">Admin handled</h3>
                    <p className="text-sm text-white/90">
                      We help with customer comms and payments.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Fair pricing, handled for you */}
        <section className="border-b border-[#E5E7EB] bg-[#F9FAFB]">
          <Container className="py-16">
            <div className="flex flex-col gap-6 max-w-3xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#0B1220]">
                Fair pricing, handled for you
              </h2>
              <div className="flex flex-col gap-4 text-base text-[#374151]/80">
                <p>
                  Every job on Donezo comes with an upfront fixed price. Customers see this price before booking, so there&apos;s no negotiation or re-quoting after you accept.
                </p>
                <p>
                  If we need to adjust pricing behind the scenes to ensure fair rates for pros, we handle that. You don&apos;t need to worry about it — just focus on the work.
                </p>
                <p>
                  Pros never negotiate or re-quote. The price is set, and you know what you&apos;re getting paid before you start.
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* How it works */}
        <section className="border-b border-[#E5E7EB] bg-white">
          <Container className="py-16">
            <div className="flex flex-col gap-10">
              <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#0B1220]">
                  How it works
                </h2>
              </div>

              <div className="grid gap-6 sm:grid-cols-3">
                <div className="relative flex flex-col gap-2.5 rounded-xl border-t-2 border-t-donezo-orange border border-[#E5E7EB] bg-white p-6 shadow-sm transition-all duration-150 ease-out hover:border-[#D1D5DB] hover:shadow-md">
                  <div className="absolute -top-2 -left-2 flex h-6 w-6 items-center justify-center rounded-full bg-donezo-orange text-xs font-bold text-[#0B1220]">
                    1
                  </div>
                  <h3 className="font-semibold text-[#0B1220]">Get notified</h3>
                  <p className="text-sm text-[#374151]/80">
                    When a job matches your area and services, we send you a notification.
                  </p>
                </div>

                <div className="relative flex flex-col gap-2.5 rounded-xl border-t-2 border-t-donezo-orange border border-[#E5E7EB] bg-white p-6 shadow-sm transition-all duration-150 ease-out hover:border-[#D1D5DB] hover:shadow-md">
                  <div className="absolute -top-2 -left-2 flex h-6 w-6 items-center justify-center rounded-full bg-donezo-orange text-xs font-bold text-[#0B1220]">
                    2
                  </div>
                  <h3 className="font-semibold text-[#0B1220]">Accept or skip</h3>
                  <p className="text-sm text-[#374151]/80">
                    Review the job details and decide if it works for you. No pressure to accept.
                  </p>
                </div>

                <div className="relative flex flex-col gap-2.5 rounded-xl border-t-2 border-t-donezo-orange border border-[#E5E7EB] bg-white p-6 shadow-sm transition-all duration-150 ease-out hover:border-[#D1D5DB] hover:shadow-md">
                  <div className="absolute -top-2 -left-2 flex h-6 w-6 items-center justify-center rounded-full bg-donezo-orange text-xs font-bold text-[#0B1220]">
                    3
                  </div>
                  <h3 className="font-semibold text-[#0B1220]">Do the work & get paid</h3>
                  <p className="text-sm text-[#374151]/80">
                    Once you accept, contact the customer and arrange the work. Payment is handled automatically.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Final CTA */}
        <section className="bg-donezo-orange py-16 sm:py-20">
          <Container>
            <div className="flex flex-col items-center max-w-3xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-semibold text-white">
                Ready to join?
              </h2>
              <a
                href="/for-pros/apply"
                className="mt-6 inline-flex items-center justify-center rounded-lg border-2 border-white px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-white/10"
              >
                Apply to become a Donezo Pro
              </a>
            </div>
          </Container>
        </section>
      </div>
    </main>
  );
}


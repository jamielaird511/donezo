export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-black text-neutral-100">
      {/* Minimal background gradient */}
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-br from-lime-900/10 via-black to-emerald-900/10" />

      <div className="relative z-10 flex flex-1 flex-col">
        <header className="sticky top-0 z-50 w-full border-b border-neutral-800/60 bg-black/40 backdrop-blur-xl supports-[backdrop-filter]:bg-black/30 transition-all">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-lime-400" />
              <span className="text-lg font-semibold tracking-tight">
                <span className="text-lime-400">done</span>
                <span>zo</span>
              </span>
            </div>

            <nav className="hidden gap-6 text-sm text-neutral-300 md:flex">
              <button className="transition-colors hover:text-lime-400">
                How it works
              </button>
              <button className="transition-colors hover:text-lime-400">
                For tradies
              </button>
              <button className="transition-colors hover:text-lime-400">
                Pricing
              </button>
            </nav>

            <button className="rounded-md bg-lime-400 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-black transition-colors hover:bg-lime-300">
              Donezo Pro login
            </button>
          </div>
        </header>

        <section className="flex flex-1 items-start">
          <div className="mx-auto w-full max-w-5xl px-4 py-20 sm:px-6 sm:py-28">
            <div className="flex flex-col gap-8">
              {/* Hero text */}
              <div className="flex flex-col gap-6">
                <p className="text-lg sm:text-xl font-medium text-neutral-400">
                  Fixed-price home jobs, without the quote runaround.
                </p>

                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                  <span className="block leading-none">Transparent pricing.</span>
                  <span className="block leading-none -mt-1">Easy booking.</span>
                  <span className="block mt-8 mb-2 text-lime-400 leading-normal">Donezo.</span>
                </h1>

                <div className="flex flex-col gap-3 text-base text-neutral-300 sm:text-lg mt-4">
                  <p>
                    Starting with gutter cleaning in Queenstown — more services on the way.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 pt-2">
                  <button className="inline-flex items-center justify-center rounded-md bg-lime-400 px-6 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-lime-300 sm:w-auto">
                    Check gutter cleaning prices
                  </button>
                </div>
              </div>

              {/* Feature cards */}
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="flex flex-col gap-2 rounded-md border border-neutral-800 bg-neutral-950/50 p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-lime-400">
                    Clear, upfront pricing.
                  </p>
                  <p className="text-sm text-neutral-300">
                    Know what you&apos;ll pay before anyone comes out.
                  </p>
                </div>
                <div className="flex flex-col gap-2 rounded-md border border-neutral-800 bg-neutral-950/50 p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-lime-400">
                    No phone-tag.
                  </p>
                  <p className="text-sm text-neutral-300">
                    Answer a few questions online whenever it suits you.
                  </p>
                </div>
                <div className="flex flex-col gap-2 rounded-md border border-neutral-800 bg-neutral-950/50 p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-lime-400">
                    Starting with gutter cleaning.
                  </p>
                  <p className="text-sm text-neutral-300">
                    We&apos;re trialling Donezo with gutter cleans in Queenstown first, with more home jobs to come.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-neutral-800 bg-neutral-950">
          <div className="mx-auto w-full max-w-5xl px-4 py-20 sm:px-6 sm:py-24">
            <div className="flex flex-col gap-10">
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-lime-400 mb-3">
                  How Donezo works
                </h2>

                <p className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
                  From &quot;I should sort that&quot; to booked, in three steps.
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-3">
                <div className="flex flex-col gap-2 rounded-md border border-neutral-800 bg-neutral-900/50 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-400">
                    Step 1
                  </p>
                  <p className="font-semibold text-white">Tell us about your place.</p>
                  <p className="text-sm text-neutral-300">
                    A few quick questions about your home and gutters — no sign-up, no phone calls.
                  </p>
                </div>

                <div className="flex flex-col gap-2 rounded-md border border-neutral-800 bg-neutral-900/50 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-400">
                    Step 2
                  </p>
                  <p className="font-semibold text-white">Get your fixed price instantly.</p>
                  <p className="text-sm text-neutral-300">
                    We calculate a clear, upfront price for your gutter clean based on your answers.
                  </p>
                </div>

                <div className="flex flex-col gap-2 rounded-md border border-neutral-800 bg-neutral-900/50 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-400">
                    Step 3
                  </p>
                  <p className="font-semibold text-white">Book a local Donezo pro.</p>
                  <p className="text-sm text-neutral-300">
                    We match you with a trusted local cleaner and lock in a time that works for you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-neutral-900">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 text-xs text-neutral-500">
            <p>© {new Date().getFullYear()} donezo.</p>
            <p className="hidden sm:block">
              Built for busy people who just want it sorted.
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}

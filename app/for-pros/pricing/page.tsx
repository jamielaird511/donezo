import Container from "@/components/layout/Container";

export default function ProsPricingPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Container className="py-16">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-[-0.01em] text-[#0B1220] mb-4">
            Pricing for Pros
          </h1>
          <p className="text-xl text-[#374151] leading-relaxed mb-12">
            Simple. Transparent. No surprises.
          </p>
          <p className="text-base text-[#374151] leading-relaxed mb-12">
            Donezo is designed to help service professionals take on the right work — without wasting time quoting jobs that don&apos;t convert.
          </p>

          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-semibold text-[#0B1220] mb-4">
                How pricing works
              </h2>
              <ul className="space-y-3 text-base text-[#374151] leading-relaxed">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Each job on Donezo has a clearly defined payout.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>You see the payout before deciding whether to accept the job.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Customers pay at booking, and payouts to pros are made after the job is completed.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Donezo includes a platform fee in the booking price.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>There are no subscriptions or lock-in contracts.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>If you accept a job, you&apos;re agreeing to complete the work for the stated payout.</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#0B1220] mb-4">
                You stay in control
              </h2>
              <ul className="space-y-3 text-base text-[#374151] leading-relaxed">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>You choose which jobs to engage with.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>You decide whether the payout makes sense for you.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>You&apos;re free to accept or decline any opportunity.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Donezo never requires exclusivity.</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#0B1220] mb-4">
                What Donezo does not do
              </h2>
              <ul className="space-y-3 text-base text-[#374151] leading-relaxed">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>We don&apos;t undercut agreed payouts after acceptance.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>We don&apos;t force you to accept jobs.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>We don&apos;t interfere with how you carry out your work.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>We don&apos;t take control of customer relationships.</span>
                </li>
              </ul>
              <p className="text-base text-[#374151] leading-relaxed mt-4">
                Donezo is a connection platform — not an employer or manager.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#0B1220] mb-4">
                Why pros use Donezo
              </h2>
              <ul className="space-y-3 text-base text-[#374151] leading-relaxed">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>No time wasted on quoting</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Clear payouts upfront</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Local jobs matched to your services</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>No upfront fees</span>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </Container>
    </main>
  );
}


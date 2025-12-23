import Container from "@/components/layout/Container";

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Container className="py-16">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-[-0.01em] text-[#0B1220] mb-6">
            About Donezo
          </h1>
          <p className="text-base text-[#374151] leading-relaxed mb-12">
            Donezo was created to make it easier to get everyday home jobs sorted — without the hassle of chasing quotes or unclear expectations.
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-[#0B1220] mb-4">
                What we do
              </h2>
              <p className="text-base text-[#374151] leading-relaxed">
                Donezo connects homeowners with local, independent service professionals for common home services. We focus on clear job details, upfront pricing where possible, and simple booking — so everyone knows where they stand.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#0B1220] mb-4">
                How Donezo fits in
              </h2>
              <p className="text-base text-[#374151] leading-relaxed mb-3">
                Donezo is a connection platform. We don&apos;t carry out home services ourselves, and we don&apos;t manage how work is performed.
              </p>
              <p className="text-base text-[#374151] leading-relaxed">
                Service professionals on Donezo are independent businesses who choose which jobs to accept. Homeowners decide whether to proceed based on the information provided.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#0B1220] mb-4">
                Why Donezo exists
              </h2>
              <p className="text-base text-[#374151] leading-relaxed mb-3">
                Getting small to medium home jobs done shouldn&apos;t feel complicated or uncertain.
              </p>
              <p className="text-base text-[#374151] leading-relaxed mb-3">
                Donezo aims to reduce friction on both sides by:
              </p>
              <ul className="space-y-3 text-base text-[#374151] leading-relaxed">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>showing prices or payouts upfront where possible</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>removing unnecessary back-and-forth</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>making expectations clear before work begins</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#0B1220] mb-4">
                Built for everyday jobs
              </h2>
              <p className="text-base text-[#374151] leading-relaxed">
                Donezo focuses on practical home services — the kind of work homeowners need done regularly, and professionals want to complete efficiently.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </main>
  );
}


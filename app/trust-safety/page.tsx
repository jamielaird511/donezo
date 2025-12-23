import Container from "@/components/layout/Container";

export default function TrustSafetyPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Container className="py-16">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-[-0.01em] text-[#0B1220] mb-6">
            Trust & Safety
          </h1>
          <p className="text-base text-[#374151] leading-relaxed mb-12">
            Donezo is designed to make it easier to connect with local service professionals in a clear and transparent way.
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-[#0B1220] mb-4">
                Working with service professionals
              </h2>
              <p className="text-base text-[#374151] leading-relaxed mb-3">
                Service professionals on Donezo are independent businesses. Before allowing professionals to engage with jobs, Donezo takes reasonable steps to confirm basic business details and service suitability.
              </p>
              <p className="text-base text-[#374151] leading-relaxed">
                Donezo does not employ service professionals and does not supervise or control the work they carry out.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#0B1220] mb-4">
                Clear expectations
              </h2>
              <ul className="space-y-3 text-base text-[#374151] leading-relaxed mb-3">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Job details and payouts are shown upfront</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Service professionals choose which jobs to accept</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Homeowners decide whether to proceed</span>
                </li>
              </ul>
              <p className="text-base text-[#374151] leading-relaxed">
                This transparency helps reduce misunderstandings on both sides.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#0B1220] mb-4">
                Payments and refunds
              </h2>
              <p className="text-base text-[#374151] leading-relaxed">
                Customers are charged at booking. If Donezo is unable to connect your job with a suitable service professional, we&apos;ll arrange a refund in line with our refund policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#0B1220] mb-4">
                If something doesn&apos;t feel right
              </h2>
              <p className="text-base text-[#374151] leading-relaxed">
                If you experience an issue or have a concern about a job, you can contact Donezo and we&apos;ll help coordinate next steps where appropriate.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#0B1220] mb-4">
                Important note
              </h2>
              <p className="text-base text-[#374151] leading-relaxed">
                All work is carried out by independent service professionals. Responsibility for the work, including quality and compliance, rests with the professional providing the service.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </main>
  );
}


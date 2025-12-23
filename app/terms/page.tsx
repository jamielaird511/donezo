import Container from "@/components/layout/Container";

export default function TermsPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Container className="py-16">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-[-0.01em] text-[#0B1220] mb-6">
            Terms of Use
          </h1>
          <p className="text-base text-[#374151] leading-relaxed mb-2">
            Terms of use for Donezo services.
          </p>
          <p className="text-sm text-[#6B7280] mb-8">
            Last updated: 23 December 2025
          </p>
          <p className="text-base text-[#374151] leading-relaxed mb-8">
            These Terms of Use govern your use of the Donezo website and services. By accessing or using Donezo, you agree to these terms.
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-[#0B1220] mb-3">
                1. What Donezo Does
              </h2>
              <p className="text-base text-[#374151] leading-relaxed mb-3">
                Donezo is a platform that connects homeowners with independent service professionals. Donezo does not carry out home services itself and is not a party to any agreement between homeowners and service providers.
              </p>
              <p className="text-base text-[#374151] leading-relaxed">
                Donezo does not employ, endorse, supervise, or control service professionals, and makes no representations regarding the quality, safety, or legality of their services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0B1220] mb-3">
                2. Using Donezo
              </h2>
              <p className="text-base text-[#374151] leading-relaxed mb-3">
                You agree to use Donezo in good faith and provide accurate information when submitting a job request or registering as a service professional.
              </p>
              <p className="text-base text-[#374151] leading-relaxed">
                You must not use Donezo for unlawful, misleading, or abusive purposes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0B1220] mb-3">
                3. Homeowners
              </h2>
              <p className="text-base text-[#374151] leading-relaxed">
                Submitting a request through Donezo does not create an obligation to proceed with a booking. Any agreement, pricing, and work carried out is between you and the service professional.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0B1220] mb-3">
                4. Service Professionals
              </h2>
              <p className="text-base text-[#374151] leading-relaxed mb-3">
                Service professionals are independent businesses. You are responsible for:
              </p>
              <ul className="list-disc list-inside space-y-2 text-base text-[#374151] leading-relaxed ml-4">
                <li>the work you carry out</li>
                <li>pricing and quotes you provide</li>
                <li>compliance with applicable laws, licences, and insurance requirements</li>
              </ul>
              <p className="text-base text-[#374151] leading-relaxed mt-3 mb-3">
                Donezo does not oversee, inspect, or verify work carried out by service professionals.
              </p>
              <p className="text-base text-[#374151] leading-relaxed">
                Donezo does not guarantee job volume or outcomes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0B1220] mb-3">
                5. Payments
              </h2>
              <p className="text-base text-[#374151] leading-relaxed">
                Any payment arrangements are agreed directly between homeowners and service professionals unless explicitly stated otherwise by Donezo.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0B1220] mb-3">
                6. No Warranties
              </h2>
              <p className="text-base text-[#374151] leading-relaxed">
                Donezo provides the platform &quot;as is&quot; and makes no warranties regarding availability, suitability of service providers, or outcomes of any work carried out.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0B1220] mb-3">
                7. Limitation of Liability
              </h2>
              <p className="text-base text-[#374151] leading-relaxed mb-3">
                To the maximum extent permitted by law, Donezo is not liable for any loss, damage, or dispute arising from services provided by independent professionals.
              </p>
              <p className="text-base text-[#374151] leading-relaxed">
                This includes, without limitation, property damage, personal injury, financial loss, or disputes between users.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0B1220] mb-3">
                8. Privacy
              </h2>
              <p className="text-base text-[#374151] leading-relaxed">
                Your use of Donezo is also governed by our Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0B1220] mb-3">
                9. Changes to These Terms
              </h2>
              <p className="text-base text-[#374151] leading-relaxed">
                We may update these terms from time to time. Continued use of Donezo constitutes acceptance of any updated terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0B1220] mb-3">
                10. Contact
              </h2>
              <p className="text-base text-[#374151] leading-relaxed">
                If you have questions about these terms, you can contact us via the Donezo website.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </main>
  );
}


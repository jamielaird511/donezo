import Container from "@/components/layout/Container";

export default function PrivacyPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Container className="py-16">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-[-0.01em] text-[#0B1220] mb-6">
            Privacy Policy
          </h1>
          <p className="text-base text-[#374151] leading-relaxed mb-2">
            Donezo respects your privacy. This policy explains how we collect, use, and protect your personal information when you use our website and services.
          </p>
          <p className="text-sm text-[#6B7280] mb-8">
            Last updated: 23 December 2025
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-[#0B1220] mb-3">
                1. Information We Collect
              </h2>
              <p className="text-base text-[#374151] leading-relaxed mb-3">
                We may collect personal information you provide when you:
              </p>
              <ul className="list-disc list-inside space-y-2 text-base text-[#374151] leading-relaxed ml-4">
                <li>submit a job request</li>
                <li>register as a service professional</li>
                <li>contact us through the website</li>
              </ul>
              <p className="text-base text-[#374151] leading-relaxed mt-3">
                This may include your name, contact details, location, and information related to the services requested or offered.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0B1220] mb-3">
                2. How We Use Your Information
              </h2>
              <p className="text-base text-[#374151] leading-relaxed mb-3">
                We use your information to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-base text-[#374151] leading-relaxed ml-4">
                <li>connect homeowners with suitable service professionals</li>
                <li>communicate with you about your requests or account</li>
                <li>operate and improve the Donezo platform</li>
                <li>respond to enquiries and support requests</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0B1220] mb-3">
                3. Sharing Your Information
              </h2>
              <p className="text-base text-[#374151] leading-relaxed mb-3">
                We may share relevant information with service professionals for the purpose of responding to a job request.
              </p>
              <p className="text-base text-[#374151] leading-relaxed mb-3">
                We do not sell your personal information to third parties.
              </p>
              <p className="text-base text-[#374151] leading-relaxed">
                We may use trusted third-party service providers (such as hosting, authentication, and analytics tools) to operate Donezo. These providers only access information necessary to perform their services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0B1220] mb-3">
                4. Service Professionals
              </h2>
              <p className="text-base text-[#374151] leading-relaxed">
                If you are a service professional, information you provide may be visible to homeowners when responding to job requests.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0B1220] mb-3">
                5. Data Storage and Security
              </h2>
              <p className="text-base text-[#374151] leading-relaxed">
                We take reasonable steps to protect your personal information using industry-standard security practices. No system is completely secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0B1220] mb-3">
                6. Cookies and Analytics
              </h2>
              <p className="text-base text-[#374151] leading-relaxed">
                Donezo may use cookies or similar technologies to understand how the website is used and to improve functionality. You can control cookies through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0B1220] mb-3">
                7. Your Rights
              </h2>
              <p className="text-base text-[#374151] leading-relaxed">
                You may request access to, correction of, or deletion of your personal information by contacting us through the Donezo website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0B1220] mb-3">
                8. Changes to This Policy
              </h2>
              <p className="text-base text-[#374151] leading-relaxed">
                We may update this Privacy Policy from time to time. Continued use of Donezo constitutes acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0B1220] mb-3">
                9. Contact
              </h2>
              <p className="text-base text-[#374151] leading-relaxed">
                If you have questions about this Privacy Policy or how your information is handled, you can contact us via the Donezo website.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </main>
  );
}


import Container from "@/components/layout/Container";
import Link from "next/link";

export default function HowItWorksPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Container className="py-16">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-[-0.01em] text-[#0B1220] mb-6">
            How it works
          </h1>
          <p className="text-base text-[#374151] leading-relaxed mb-12">
            Donezo helps you book everyday home services in a clear and straightforward way.
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-[#0B1220] mb-4">
                1. Choose a service
              </h2>
              <p className="text-base text-[#374151] leading-relaxed mb-3">
                Browse available services and provide a few details about your job and property.
              </p>
              <p className="text-base text-[#374151] leading-relaxed mb-3">
                For standard jobs, pricing is shown upfront.
              </p>
              <p className="text-base text-[#374151] leading-relaxed">
                For non-standard jobs, we&apos;ll confirm pricing before any work proceeds.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#0B1220] mb-4">
                2. Book and confirm
              </h2>
              <p className="text-base text-[#374151] leading-relaxed mb-3">
                Customers pay at booking to confirm the job.
              </p>
              <p className="text-base text-[#374151] leading-relaxed">
                This helps ensure availability and avoids time wasted on unconfirmed requests.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#0B1220] mb-4">
                3. A service professional accepts
              </h2>
              <p className="text-base text-[#374151] leading-relaxed mb-3">
                Your job is shared with suitable local, independent service professionals.
              </p>
              <p className="text-base text-[#374151] leading-relaxed">
                A professional chooses to accept the job and will contact you directly to confirm details or timing.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#0B1220] mb-4">
                If we can&apos;t place your job
              </h2>
              <p className="text-base text-[#374151] leading-relaxed">
                If Donezo is unable to connect your job with a suitable professional, we&apos;ll arrange a refund in line with our refund policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#0B1220] mb-4">
                Important to know
              </h2>
              <ul className="space-y-3 text-base text-[#374151] leading-relaxed">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Service professionals are independent businesses</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Donezo does not carry out or supervise work</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>You decide whether to proceed once contacted</span>
                </li>
              </ul>
            </section>

            <section className="pt-4">
              <Link
                href="/services"
                className="font-space-grotesk inline-flex items-center justify-center rounded-lg bg-donezo-orange px-6 py-3 text-base font-semibold text-[#FFFFFF] transition-opacity hover:opacity-90"
              >
                Browse available services
              </Link>
            </section>
          </div>
        </div>
      </Container>
    </main>
  );
}


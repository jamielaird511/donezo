import Container from "@/components/layout/Container";
import Link from "next/link";

export default function RequestPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Container className="py-16">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-[-0.01em] text-[#0B1220] mb-6">
            Request a job
          </h1>
          <p className="text-base text-[#374151] leading-relaxed mb-12">
            Need a service that&apos;s not listed, or a job that doesn&apos;t quite fit our standard options? Donezo can help.
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-[#0B1220] mb-4">
                When to use this
              </h2>
              <p className="text-base text-[#374151] leading-relaxed mb-3">
                Use this option if:
              </p>
              <ul className="space-y-3 text-base text-[#374151] leading-relaxed mb-3">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>your job is non-standard or more complex</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>your property doesn&apos;t fit typical sizing</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>you&apos;re not sure which service applies</span>
                </li>
              </ul>
              <p className="text-base text-[#374151] leading-relaxed">
                If your job fits a listed service, you&apos;ll usually get faster pricing by choosing from our available services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#0B1220] mb-4">
                How it works
              </h2>
              <ul className="space-y-3 text-base text-[#374151] leading-relaxed">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Tell us what you need done and where the job is located</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>We review the details and identify suitable service professionals</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>If pricing needs to be confirmed, you&apos;ll see it before any work proceeds</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>You&apos;re never obligated to move forward.</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#0B1220] mb-4">
                What to expect
              </h2>
              <ul className="space-y-3 text-base text-[#374151] leading-relaxed">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>No upfront commitment</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Clear pricing before work begins</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Direct contact with a service professional if the job proceeds</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>If we&apos;re unable to connect your job with a suitable professional, there&apos;s no charge.</span>
                </li>
              </ul>
            </section>

            <section className="pt-4 flex flex-col sm:flex-row gap-4">
              <Link
                href="/services"
                className="font-space-grotesk inline-flex items-center justify-center rounded-lg bg-donezo-orange px-6 py-3 text-base font-semibold text-[#FFFFFF] transition-opacity hover:opacity-90"
              >
                View available services
              </Link>
              <Link
                href="/custom-quote"
                className="font-space-grotesk inline-flex items-center justify-center rounded-lg border-2 border-donezo-orange px-6 py-3 text-base font-semibold text-donezo-orange transition-opacity hover:opacity-90"
              >
                Request a custom quote
              </Link>
            </section>
          </div>
        </div>
      </Container>
    </main>
  );
}


import Container from "@/components/layout/Container";
import Link from "next/link";

export default function PricingPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Container className="py-16">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-[-0.01em] text-[#0B1220] mb-6">
            How pricing works
          </h1>
          <p className="text-base text-[#374151] leading-relaxed mb-12">
            Donezo offers clear, upfront pricing for common home services.
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-[#0B1220] mb-4">
                Fixed-price jobs
              </h2>
              <p className="text-base text-[#374151] leading-relaxed mb-3">
                For standard services, Donezo uses fixed pricing based on the service type and basic property details. This means:
              </p>
              <ul className="space-y-3 text-base text-[#374151] leading-relaxed mb-3">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>You see the price before booking</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>The price is confirmed upfront</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>There&apos;s no back-and-forth quoting</span>
                </li>
              </ul>
              <p className="text-base text-[#374151] leading-relaxed">
                Fixed pricing applies to jobs that meet our standard criteria.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#0B1220] mb-4">
                Non-standard jobs
              </h2>
              <p className="text-base text-[#374151] leading-relaxed mb-3">
                Some jobs or properties don&apos;t fit standard pricing. In these cases:
              </p>
              <ul className="space-y-3 text-base text-[#374151] leading-relaxed">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>We&apos;ll let you know upfront</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Pricing is confirmed before any work proceeds</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#0B1220] mb-4">
                Payment
              </h2>
              <p className="text-base text-[#374151] leading-relaxed mb-3">
                Customers pay at booking. This helps ensure availability and avoids time wasted on unconfirmed jobs.
              </p>
              <p className="text-base text-[#374151] leading-relaxed">
                If Donezo is unable to connect your job with a suitable service professional, we&apos;ll arrange a refund in line with our refund policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#0B1220] mb-4">
                No surprises
              </h2>
              <ul className="space-y-3 text-base text-[#374151] leading-relaxed">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Prices are shown before you commit</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>There are no hidden fees</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>You&apos;re never obligated to proceed</span>
                </li>
              </ul>
            </section>

            <section className="pt-4">
              <Link
                href="/services"
                className="font-space-grotesk inline-flex items-center justify-center rounded-lg bg-donezo-orange px-6 py-3 text-base font-semibold text-[#FFFFFF] transition-opacity hover:opacity-90"
              >
                View available services
              </Link>
            </section>
          </div>
        </div>
      </Container>
    </main>
  );
}


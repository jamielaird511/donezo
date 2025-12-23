import Container from "@/components/layout/Container";

export default function ContactPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Container className="py-16">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-[-0.01em] text-[#0B1220] mb-6">
            Contact Us
          </h1>
          <div className="space-y-6">
            <p className="text-base text-[#374151] leading-relaxed">
              If you have a question about a booking, the quickest way to resolve it is usually to contact your service professional directly.
            </p>
            <p className="text-base text-[#374151] leading-relaxed">
              For general questions, support issues, or if something doesn&apos;t feel right, you can reach Donezo at:
            </p>
            <p className="text-base text-[#374151] leading-relaxed">
              <a
                href="mailto:support@donezo.co.nz"
                className="text-donezo-orange hover:underline font-medium"
              >
                support@donezo.co.nz
              </a>
            </p>
            <p className="text-base text-[#374151] leading-relaxed">
              We aim to respond as quickly as possible during business hours.
            </p>
          </div>
        </div>
      </Container>
    </main>
  );
}


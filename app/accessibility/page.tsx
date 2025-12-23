import Container from "@/components/layout/Container";

export default function AccessibilityPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Container className="py-16">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-[-0.01em] text-[#0B1220] mb-6">
            Accessibility
          </h1>
          <div className="prose prose-gray max-w-none space-y-4">
            <p className="text-base text-[#374151] leading-relaxed">
              Donezo is committed to making our website accessible to as many users as possible.
            </p>
            <p className="text-base text-[#374151] leading-relaxed">
              We aim to design and build our platform using accessibility best practices. If you experience any difficulty using Donezo or notice an accessibility issue, please contact us so we can work to improve it.
            </p>
          </div>
        </div>
      </Container>
    </main>
  );
}


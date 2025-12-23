import Container from "@/components/layout/Container";
import Link from "next/link";

export default function ProsFaqsPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Container className="py-16">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-[-0.01em] text-[#0B1220] mb-6">
            Pro FAQs
          </h1>
          <div className="prose prose-gray max-w-none space-y-4">
            <p className="text-base text-[#374151] leading-relaxed">
              Frequently asked questions for Donezo service professionals.
            </p>
            <p className="text-base text-[#374151] leading-relaxed">
              <Link href="/for-pros/apply" className="text-donezo-orange hover:underline">
                Apply to become a Donezo Pro
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </main>
  );
}


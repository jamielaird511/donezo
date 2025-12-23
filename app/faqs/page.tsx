import Container from "@/components/layout/Container";

export default function FaqsPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Container className="py-16">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-[-0.01em] text-[#0B1220] mb-6">
            FAQs
          </h1>
          <p className="text-base text-[#374151] leading-relaxed mb-12">
            Common questions about Donezo for homeowners and service professionals.
          </p>

          {/* For Homeowners Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-[#0B1220] mb-6">
              For Homeowners
            </h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-[#0B1220] mb-2">
                  What is Donezo?
                </h3>
                <p className="text-base text-[#374151] leading-relaxed">
                  Donezo connects homeowners with local, vetted service professionals for common home jobs — without the back-and-forth of chasing quotes.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#0B1220] mb-2">
                  How does Donezo work?
                </h3>
                <p className="text-base text-[#374151] leading-relaxed">
                  You tell us what you need done. We share the job with suitable local pros, who can review the details and get in touch if they&apos;re available.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#0B1220] mb-2">
                  Do I have to commit to a booking?
                </h3>
                <p className="text-base text-[#374151] leading-relaxed">
                  No. Submitting a request doesn&apos;t lock you into anything. You decide whether to proceed after speaking with a pro.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#0B1220] mb-2">
                  Is Donezo free to use?
                </h3>
                <p className="text-base text-[#374151] leading-relaxed">
                  Yes. Homeowners don&apos;t pay to request a job through Donezo.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#0B1220] mb-2">
                  Who carries out the work?
                </h3>
                <p className="text-base text-[#374151] leading-relaxed">
                  All work is carried out by independent service professionals, not Donezo itself.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#0B1220] mb-2">
                  Does Donezo guarantee the work?
                </h3>
                <p className="text-base text-[#374151] leading-relaxed">
                  No. Pros are responsible for the work they carry out. Donezo helps connect you and, if needed, assists with next steps if something doesn&apos;t feel right.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#0B1220] mb-2">
                  What services does Donezo support?
                </h3>
                <p className="text-base text-[#374151] leading-relaxed">
                  We focus on everyday home services. Availability may vary by location and service type.
                </p>
              </div>
            </div>
          </section>

          {/* For Service Pros Section */}
          <section>
            <h2 className="text-2xl font-semibold text-[#0B1220] mb-6">
              For Service Pros
            </h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-[#0B1220] mb-2">
                  Who can join Donezo as a Pro?
                </h3>
                <p className="text-base text-[#374151] leading-relaxed">
                  Donezo is open to independent tradespeople and service businesses who meet our basic requirements.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#0B1220] mb-2">
                  How do I receive jobs?
                </h3>
                <p className="text-base text-[#374151] leading-relaxed">
                  When a job matches your services and location, you&apos;ll be notified and can choose whether to engage.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#0B1220] mb-2">
                  Do I have to accept every job?
                </h3>
                <p className="text-base text-[#374151] leading-relaxed">
                  No. You stay in control — accept the jobs that suit your availability and pricing.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#0B1220] mb-2">
                  How does pricing work for Pros?
                </h3>
                <p className="text-base text-[#374151] leading-relaxed">
                  Pricing is simple and transparent. Details are shown clearly before you engage with a job.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#0B1220] mb-2">
                  Is Donezo exclusive?
                </h3>
                <p className="text-base text-[#374151] leading-relaxed">
                  No. You&apos;re free to run your business however you like outside of Donezo.
                </p>
              </div>
            </div>
          </section>
        </div>
      </Container>
    </main>
  );
}


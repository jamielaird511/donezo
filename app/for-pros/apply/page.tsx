"use client";

import { useState } from "react";
import Container from "@/components/layout/Container";

export default function ProApplyPage() {
  const [fullName, setFullName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [primaryService, setPrimaryService] = useState("");
  const [serviceArea, setServiceArea] = useState("");
  const [nzbn, setNzbn] = useState("");
  const [website, setWebsite] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just show success message
    setIsSubmitted(true);
  };

  const isFormValid =
    fullName.trim().length > 0 &&
    businessName.trim().length > 0 &&
    email.trim().length > 0 &&
    phone.trim().length > 0 &&
    primaryService.trim().length > 0 &&
    serviceArea.trim().length > 0;

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <div className="relative z-10 flex flex-1 flex-col">
        <section className="flex flex-1 items-start">
          <Container className="py-16">
            <div className="flex flex-col gap-8 max-w-2xl mx-auto">
              <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-semibold tracking-[-0.01em] text-[#0B1220] sm:text-5xl leading-tight">
                  Apply to Become a Donezo Pro
                </h1>
                <p className="text-base text-[#374151]/70">
                  We work with a small number of reliable local professionals. Apply below and we&apos;ll be in touch if it&apos;s a fit.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="fullName" className="text-sm font-medium text-[#0B1220]">
                      Full name <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-base text-[#0B1220] placeholder:text-[#9CA3AF] focus:border-donezo-orange focus:outline-none focus:ring-2 focus:ring-donezo-orange/20"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="businessName" className="text-sm font-medium text-[#0B1220]">
                      Business name <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="businessName"
                      type="text"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      required
                      className="rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-base text-[#0B1220] placeholder:text-[#9CA3AF] focus:border-donezo-orange focus:outline-none focus:ring-2 focus:ring-donezo-orange/20"
                      placeholder="Enter your business name"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm font-medium text-[#0B1220]">
                      Email <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-base text-[#0B1220] placeholder:text-[#9CA3AF] focus:border-donezo-orange focus:outline-none focus:ring-2 focus:ring-donezo-orange/20"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="phone" className="text-sm font-medium text-[#0B1220]">
                      Phone <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-base text-[#0B1220] placeholder:text-[#9CA3AF] focus:border-donezo-orange focus:outline-none focus:ring-2 focus:ring-donezo-orange/20"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="primaryService" className="text-sm font-medium text-[#0B1220]">
                      Primary service <span className="text-red-600">*</span>
                    </label>
                    <select
                      id="primaryService"
                      value={primaryService}
                      onChange={(e) => setPrimaryService(e.target.value)}
                      required
                      className="rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-base text-[#0B1220] focus:border-donezo-orange focus:outline-none focus:ring-2 focus:ring-donezo-orange/20"
                    >
                      <option value="">Select a service</option>
                      <option value="Gutter Cleaning">Gutter Cleaning</option>
                      <option value="Window Cleaning">Window Cleaning</option>
                      <option value="Lawn Mowing">Lawn Mowing</option>
                      <option value="Pressure Washing">Pressure Washing</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="serviceArea" className="text-sm font-medium text-[#0B1220]">
                      Service area <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="serviceArea"
                      type="text"
                      value={serviceArea}
                      onChange={(e) => setServiceArea(e.target.value)}
                      required
                      className="rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-base text-[#0B1220] placeholder:text-[#9CA3AF] focus:border-donezo-orange focus:outline-none focus:ring-2 focus:ring-donezo-orange/20"
                      placeholder="Queenstown, Frankton, Arrowtown"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="nzbn" className="text-sm font-medium text-[#0B1220]">
                      NZBN <span className="text-[#6B7280] font-normal">(optional)</span>
                    </label>
                    <input
                      id="nzbn"
                      type="text"
                      value={nzbn}
                      onChange={(e) => setNzbn(e.target.value)}
                      className="rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-base text-[#0B1220] placeholder:text-[#9CA3AF] focus:border-donezo-orange focus:outline-none focus:ring-2 focus:ring-donezo-orange/20"
                      placeholder="Enter your NZBN"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="website" className="text-sm font-medium text-[#0B1220]">
                      Website / Facebook page <span className="text-[#6B7280] font-normal">(optional)</span>
                    </label>
                    <input
                      id="website"
                      type="url"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      className="rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-base text-[#0B1220] placeholder:text-[#9CA3AF] focus:border-donezo-orange focus:outline-none focus:ring-2 focus:ring-donezo-orange/20"
                      placeholder="https://..."
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="notes" className="text-sm font-medium text-[#0B1220]">
                      Notes <span className="text-[#6B7280] font-normal">(optional)</span>
                    </label>
                    <textarea
                      id="notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={4}
                      className="rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-base text-[#0B1220] placeholder:text-[#9CA3AF] focus:border-donezo-orange focus:outline-none focus:ring-2 focus:ring-donezo-orange/20 resize-none"
                      placeholder="Any additional information about your business..."
                    />
                  </div>
                </div>

                {isSubmitted ? (
                  <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                    <p className="text-sm text-green-800">
                      Thanks — we&apos;ve received your application. We&apos;ll be in touch.
                    </p>
                  </div>
                ) : (
                  <div className="flex justify-start">
                    <button
                      type="submit"
                      disabled={!isFormValid}
                      className={`font-space-grotesk inline-flex items-center justify-center rounded-lg bg-donezo-orange px-8 py-4 text-base font-semibold text-[#FFFFFF] transition-opacity shadow-md ${
                        isFormValid
                          ? "hover:opacity-90 cursor-pointer"
                          : "opacity-50 cursor-not-allowed"
                      }`}
                    >
                      Submit application
                    </button>
                  </div>
                )}
              </form>
            </div>
          </Container>
        </section>
      </div>
    </main>
  );
}


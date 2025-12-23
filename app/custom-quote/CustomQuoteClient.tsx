"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Container from "@/components/layout/Container";
import AddressAutocomplete, { AddressComponents } from "@/components/AddressAutocomplete";

export default function CustomQuoteClient() {
  const searchParams = useSearchParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [bedrooms, setBedrooms] = useState(searchParams.get("bedrooms") || "");
  const [storeys, setStoreys] = useState(searchParams.get("storeys") || "");
  const [notes, setNotes] = useState("");
  const [placeId, setPlaceId] = useState<string | null>(null);
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [manualAddressMode, setManualAddressMode] = useState(false);
  const [streetAddress, setStreetAddress] = useState("");
  const [suburb, setSuburb] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleAddressChange = (components: AddressComponents) => {
    setAddress(components.addressFormatted);
    setPlaceId(components.placeId);
    setLat(components.lat);
    setLng(components.lng);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const finalAddress = manualAddressMode
        ? `${streetAddress}, ${suburb}, ${city}${postcode ? ` ${postcode}` : ""}`
        : address;

      const res = await fetch("/api/custom-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          address: finalAddress,
          bedrooms,
          storeys,
          notes: notes.trim() || null,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.error || "Failed to submit quote request");
      }

      setIsSuccess(true);
    } catch (error: any) {
      console.error("Error submitting quote request:", error);
      setSubmitError(error.message || "Failed to submit request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = name.trim().length > 0 &&
    email.trim().length > 0 &&
    phone.trim().length > 0 &&
    (manualAddressMode
      ? streetAddress.trim().length > 0 && suburb.trim().length > 0 && city.trim().length > 0
      : address.trim().length > 0) &&
    bedrooms.trim().length > 0 &&
    storeys.trim().length > 0;

  if (isSuccess) {
    return (
      <main className="flex min-h-screen flex-col bg-white">
        <div className="relative z-10 flex flex-1 flex-col">
          <section className="flex flex-1 items-start">
            <Container className="py-16">
              <div className="flex flex-col gap-6 max-w-2xl mx-auto">
                <div className="rounded-xl border border-[#E5E7EB] bg-white p-8 shadow-sm">
                  <h1 className="text-2xl font-semibold text-[#0B1220] mb-4">
                    Thanks — we&apos;ll send this to providers and come back with pricing.
                  </h1>
                  <p className="text-base text-[#374151]/70">
                    We&apos;ve received your custom quote request and will be in touch soon.
                  </p>
                </div>
              </div>
            </Container>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <div className="relative z-10 flex flex-1 flex-col">
        <section className="flex flex-1 items-start">
          <Container className="py-16">
            <div className="flex flex-col gap-8 max-w-3xl mx-auto">
              <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-semibold tracking-[-0.01em] text-[#0B1220] sm:text-5xl leading-tight">
                  Request a Custom Quote
                </h1>
                <p className="text-base text-[#374151]/70">
                  We&apos;ll send your request to providers and get back to you with pricing.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-sm font-medium text-[#0B1220]">
                      Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-base text-[#0B1220] placeholder:text-[#9CA3AF] focus:border-donezo-orange focus:outline-none focus:ring-2 focus:ring-donezo-orange/20"
                      placeholder="Enter your full name"
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
                    <label htmlFor="address" className="text-sm font-medium text-[#0B1220]">
                      Address <span className="text-red-600">*</span>
                    </label>
                    {!manualAddressMode ? (
                      <>
                        <AddressAutocomplete
                          id="address"
                          value={address}
                          onChange={handleAddressChange}
                          placeholder="Enter your address"
                          className="rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-base text-[#0B1220] placeholder:text-[#9CA3AF] focus:border-donezo-orange focus:outline-none focus:ring-2 focus:ring-donezo-orange/20"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setManualAddressMode(true);
                            setAddress("");
                            setPlaceId(null);
                            setLat(null);
                            setLng(null);
                          }}
                          className="text-sm text-[#374151]/70 hover:text-[#374151] underline text-left w-fit"
                        >
                          Can&apos;t find your address? Enter it manually
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="flex flex-col gap-4">
                          <input
                            type="text"
                            value={streetAddress}
                            onChange={(e) => setStreetAddress(e.target.value)}
                            placeholder="Street address"
                            required
                            className="rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-base text-[#0B1220] placeholder:text-[#9CA3AF] focus:border-donezo-orange focus:outline-none focus:ring-2 focus:ring-donezo-orange/20"
                          />
                          <input
                            type="text"
                            value={suburb}
                            onChange={(e) => setSuburb(e.target.value)}
                            placeholder="Suburb"
                            required
                            className="rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-base text-[#0B1220] placeholder:text-[#9CA3AF] focus:border-donezo-orange focus:outline-none focus:ring-2 focus:ring-donezo-orange/20"
                          />
                          <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="City"
                            required
                            className="rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-base text-[#0B1220] placeholder:text-[#9CA3AF] focus:border-donezo-orange focus:outline-none focus:ring-2 focus:ring-donezo-orange/20"
                          />
                          <input
                            type="text"
                            value={postcode}
                            onChange={(e) => setPostcode(e.target.value)}
                            placeholder="Postcode (optional)"
                            className="rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-base text-[#0B1220] placeholder:text-[#9CA3AF] focus:border-donezo-orange focus:outline-none focus:ring-2 focus:ring-donezo-orange/20"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setManualAddressMode(false);
                            setStreetAddress("");
                            setSuburb("");
                            setCity("");
                            setPostcode("");
                          }}
                          className="text-sm text-[#374151]/70 hover:text-[#374151] underline text-left w-fit"
                        >
                          Use address autocomplete instead
                        </button>
                      </>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="bedrooms" className="text-sm font-medium text-[#0B1220]">
                        Bedrooms <span className="text-red-600">*</span>
                      </label>
                      <select
                        id="bedrooms"
                        value={bedrooms}
                        onChange={(e) => setBedrooms(e.target.value)}
                        required
                        className="rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-base text-[#0B1220] focus:border-donezo-orange focus:outline-none focus:ring-2 focus:ring-donezo-orange/20"
                      >
                        <option value="">Select bedrooms</option>
                        <option value="1-2">1-2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5+">5+</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="storeys" className="text-sm font-medium text-[#0B1220]">
                        Storeys <span className="text-red-600">*</span>
                      </label>
                      <select
                        id="storeys"
                        value={storeys}
                        onChange={(e) => setStoreys(e.target.value)}
                        required
                        className="rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-base text-[#0B1220] focus:border-donezo-orange focus:outline-none focus:ring-2 focus:ring-donezo-orange/20"
                      >
                        <option value="">Select storeys</option>
                        <option value="single">Single storey</option>
                        <option value="double">Double storey / split-level</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="notes" className="text-sm font-medium text-[#0B1220]">
                      Notes <span className="text-[#6B7280] font-normal">(optional)</span>
                    </label>
                    <textarea
                      id="notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Any additional details about your home or requirements..."
                      rows={4}
                      className="rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-base text-[#0B1220] placeholder:text-[#9CA3AF] focus:border-donezo-orange focus:outline-none focus:ring-2 focus:ring-donezo-orange/20 resize-none"
                    />
                  </div>
                </div>

                {submitError && (
                  <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                    <p className="text-sm text-red-800">{submitError}</p>
                  </div>
                )}

                <div className="flex justify-start">
                  <button
                    type="submit"
                    disabled={!isFormValid || isSubmitting}
                    className={`font-space-grotesk inline-flex items-center justify-center rounded-lg bg-donezo-orange px-8 py-4 text-base font-semibold text-[#FFFFFF] transition-opacity shadow-md ${
                      isFormValid && !isSubmitting
                        ? "hover:opacity-90 cursor-pointer"
                        : "opacity-50 cursor-not-allowed"
                    }`}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Request"}
                  </button>
                </div>
              </form>
            </div>
          </Container>
        </section>
      </div>
    </main>
  );
}

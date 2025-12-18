"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Container from "@/components/layout/Container";
import AddressAutocomplete, { AddressComponents } from "@/components/AddressAutocomplete";

type HomeSize = "1-2" | "3" | "4" | "5+" | null;
type Storeys = "single" | "double" | null;
type JobComplexity = "simple" | "medium" | "complex" | null;
type Urgency = "not_urgent" | "soon" | "asap" | null;

const basePricing: Record<string, number> = {
  "1-2": 129,
  "3": 149,
  "4": 169,
  "5+": 189,
};

function calculatePrice(homeSize: HomeSize, storeys: Storeys): number | null {
  if (!homeSize || !storeys) return null;
  const basePrice = basePricing[homeSize];
  if (!basePrice) return null;
  return storeys === "double" ? basePrice + 100 : basePrice;
}

export default function GutterCleaningPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [homeSize, setHomeSize] = useState<HomeSize>(null);
  const [storeys, setStoreys] = useState<Storeys>(null);
  const [jobComplexity, setJobComplexity] = useState<JobComplexity>(null);
  const [urgency, setUrgency] = useState<Urgency>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [placeId, setPlaceId] = useState<string | null>(null);
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [addressStreetNumber, setAddressStreetNumber] = useState("");
  const [addressRoute, setAddressRoute] = useState("");
  const [addressSubpremise, setAddressSubpremise] = useState("");
  const [addressLocality, setAddressLocality] = useState("");
  const [addressSublocality, setAddressSublocality] = useState("");
  const [addressAdminArea1, setAddressAdminArea1] = useState("");
  const [addressPostalCode, setAddressPostalCode] = useState("");
  const [addressCountry, setAddressCountry] = useState("");
  const [manualAddressMode, setManualAddressMode] = useState(false);
  const [streetAddress, setStreetAddress] = useState("");
  const [suburb, setSuburb] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  const price = calculatePrice(homeSize, storeys);
  const isSelectionComplete = homeSize !== null && storeys !== null;
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(email);
  const showEmailError = emailTouched && !isEmailValid && email.trim().length > 0;
  
  const canContinueStep2 = 
    firstName.trim().length > 0 &&
    lastName.trim().length > 0 &&
    isEmailValid &&
    mobile.trim().length > 0 &&
    (manualAddressMode 
      ? streetAddress.trim().length > 0 && suburb.trim().length > 0 && city.trim().length > 0
      : placeId !== null);

  const handleAddressChange = (components: AddressComponents) => {
    setAddress(components.addressFormatted);
    setPlaceId(components.placeId);
    setLat(components.lat);
    setLng(components.lng);
    setAddressStreetNumber(components.addressStreetNumber);
    setAddressRoute(components.addressRoute);
    setAddressSubpremise(components.addressSubpremise);
    setAddressLocality(components.addressLocality);
    setAddressSublocality(components.addressSublocality);
    setAddressAdminArea1(components.addressAdminArea1);
    setAddressPostalCode(components.addressPostalCode);
    setAddressCountry(components.addressCountry);
  };

  async function createJob(payload: {
    customer_name: string;
    customer_phone: string;
    customer_email?: string | null;
    address_text: string;
    place_id?: string | null;
    lat?: number | null;
    lng?: number | null;
    access_notes?: string | null;
    storeys?: string | null;
    job_complexity?: string | null;
    urgency?: string | null;
  }) {
    const res = await fetch("/api/jobs/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_slug: "gutter-cleaning",
        ...payload,
      }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error(data?.error || "Failed to create job");
    }

    if (!data?.jobId) {
      throw new Error("Job created but jobId missing");
    }

    return data.jobId as string;
  }

  const handleContinueStep2 = async () => {
    // Validate email before proceeding
    if (!isEmailValid) {
      setEmailTouched(true);
      return;
    }
    
    if (!canContinueStep2 || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const finalAddress = manualAddressMode
        ? `${streetAddress}, ${suburb}, ${city}${postcode ? ` ${postcode}` : ""}`
        : address;

      const accessNotesCombined = [
        homeSize ? `Home size: ${homeSize}` : null,
        storeys ? `Storeys: ${storeys}` : null,
        notes?.trim() ? `Notes: ${notes.trim()}` : null,
      ].filter(Boolean).join(". ");

      const jobId = await createJob({
        customer_name: `${firstName} ${lastName}`.trim(),
        customer_phone: mobile,
        customer_email: email || null,
        address_text: finalAddress,
        place_id: manualAddressMode ? null : placeId,
        lat: manualAddressMode ? null : lat,
        lng: manualAddressMode ? null : lng,
        access_notes: accessNotesCombined || null,
        storeys: null,
        job_complexity: jobComplexity,
        urgency: urgency,
      });

      const bookingDraft = {
        service: "gutter_cleaning",
        options: {
          beds: homeSize,
          storeys: storeys,
        },
        price: price,
        customer: {
          firstName,
          lastName,
          email,
          mobile,
        },
        address: {
          formatted: manualAddressMode ? finalAddress : address,
          placeId: manualAddressMode ? null : placeId,
          lat: manualAddressMode ? null : lat,
          lng: manualAddressMode ? null : lng,
          streetNumber: manualAddressMode ? "" : addressStreetNumber,
          route: manualAddressMode ? "" : addressRoute,
          subpremise: manualAddressMode ? "" : addressSubpremise,
          locality: manualAddressMode ? "" : addressLocality,
          sublocality: manualAddressMode ? "" : addressSublocality,
          adminArea1: manualAddressMode ? "" : addressAdminArea1,
          postalCode: manualAddressMode ? "" : addressPostalCode,
          country: manualAddressMode ? "" : addressCountry,
        },
        notes: notes || null,
      };

      localStorage.setItem("donezo_booking_draft", JSON.stringify(bookingDraft));
      router.push(`/checkout?jobId=${jobId}`);
    } catch (error: any) {
      console.error("Error creating job:", error);
      setSubmitError(error.message || "Failed to create booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <div className="relative z-10 flex flex-1 flex-col">
        <section className="flex flex-1 items-start">
          <Container className="py-16">
            <div className="flex flex-col gap-8 max-w-3xl">
              {/* Header */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <h1 className="text-4xl font-semibold tracking-[-0.01em] text-[#0B1220] sm:text-5xl leading-tight">
                    Gutter cleaning
                  </h1>
                  <span className="inline-flex items-center gap-2 rounded-md bg-white border border-slate-300 px-3 py-1 text-xs font-medium text-slate-900">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#7ED321]"></span>
                    Live in Queenstown
                  </span>
                </div>
                <p className="text-base text-[#374151]/70">
                  Fixed price. No quotes. Book in minutes.
                </p>
              </div>

              {/* Home size selection */}
              <div className="flex flex-col gap-4">
                <h2 className="text-lg font-semibold text-[#0B1220]">
                  Home size
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {(["1-2", "3", "4", "5+"] as const).map((size) => (
                    <button
                      key={size}
                      onClick={() => setHomeSize(size)}
                      className={`flex flex-col items-center justify-center gap-2 rounded-xl border-2 p-4 transition-all duration-150 ease-out ${
                        homeSize === size
                          ? "border-donezo-orange bg-donezo-orange/10 shadow-sm"
                          : "border-[#E5E7EB] bg-white hover:border-[#D1D5DB] hover:shadow-sm"
                      }`}
                    >
                      <span className="text-base font-semibold text-[#0B1220]">
                        {size === "1-2" ? "1–2 bed" : size === "5+" ? "5+ bed" : `${size} bed`}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Storeys selection */}
              <div className="flex flex-col gap-4">
                <h2 className="text-lg font-semibold text-[#0B1220]">
                  Storeys
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {([
                    { value: "single", label: "Single storey" },
                    { value: "double", label: "Double storey / split-level" },
                  ] as const).map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setStoreys(option.value)}
                      className={`flex flex-col items-center justify-center gap-2 rounded-xl border-2 p-4 transition-all duration-150 ease-out ${
                        storeys === option.value
                          ? "border-donezo-orange bg-donezo-orange/10 shadow-sm"
                          : "border-[#E5E7EB] bg-white hover:border-[#D1D5DB] hover:shadow-sm"
                      }`}
                    >
                      <span className="text-base font-semibold text-[#0B1220] text-center">
                        {option.label}
                      </span>
                    </button>
                  ))}
                </div>
                {!isSelectionComplete && (
                  <p className="text-sm text-[#374151]/70">
                    Select home size and storeys to continue.
                  </p>
                )}
              </div>

              {/* Price summary */}
              {price !== null && (
                <div className="mx-auto max-w-2xl my-8 rounded-xl bg-donezo-orange p-5 shadow-sm">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <span className="text-5xl font-bold text-white">
                      ${price}
                    </span>
                    <p className="text-xs text-white/80 text-center">
                      Fixed price includes all Donezo platform services. No hidden fees.
                    </p>
                  </div>
                </div>
              )}

              {/* Your details section */}
              <div
                className={`transition-all duration-300 overflow-hidden ${
                  isSelectionComplete
                    ? "max-h-[1000px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="flex flex-col gap-6 pt-4">
                  <div className="flex flex-col gap-1">
                    <h2 className="text-lg font-semibold text-[#0B1220]">
                      Your details
                    </h2>
                    <p className="text-sm text-[#374151]/70">
                      We&apos;ll use this to confirm your booking and keep you updated.
                    </p>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="firstName" className="text-sm font-medium text-[#0B1220]">
                          First name
                        </label>
                        <input
                          id="firstName"
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="Enter your first name"
                          className="rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-base text-[#0B1220] placeholder:text-[#9CA3AF] focus:border-donezo-orange focus:outline-none focus:ring-2 focus:ring-donezo-orange/20"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="lastName" className="text-sm font-medium text-[#0B1220]">
                          Last name
                        </label>
                        <input
                          id="lastName"
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Enter your last name"
                          className="rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-base text-[#0B1220] placeholder:text-[#9CA3AF] focus:border-donezo-orange focus:outline-none focus:ring-2 focus:ring-donezo-orange/20"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-sm font-medium text-[#0B1220]">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (emailTouched) {
                            // Re-validate on change if already touched
                          }
                        }}
                        onBlur={() => setEmailTouched(true)}
                        placeholder="Enter your email"
                        className={`rounded-xl border px-4 py-3 text-base text-[#0B1220] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 ${
                          showEmailError
                            ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/20"
                            : "border-[#E5E7EB] bg-white focus:border-donezo-orange focus:ring-donezo-orange/20"
                        }`}
                      />
                      {showEmailError && (
                        <p className="text-sm text-red-600">
                          Please enter a valid email address — we&apos;ll send your booking confirmation here.
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="mobile" className="text-sm font-medium text-[#0B1220]">
                        Mobile
                      </label>
                      <input
                        id="mobile"
                        type="tel"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        placeholder="Enter your mobile number"
                            className="rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-base text-[#0B1220] placeholder:text-[#9CA3AF] focus:border-donezo-orange focus:outline-none focus:ring-2 focus:ring-donezo-orange/20"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Address section */}
              <div
                className={`transition-all duration-300 overflow-hidden ${
                  isSelectionComplete
                    ? "max-h-[1000px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="flex flex-col gap-6">
                  <h2 className="text-lg font-semibold text-[#0B1220]">
                    Address
                  </h2>

                  <div className="flex flex-col gap-4">
                    {!manualAddressMode ? (
                      <>
                        <div className="flex flex-col gap-2">
                          <label htmlFor="address" className="text-sm font-medium text-[#0B1220]">
                            Address
                          </label>
                          <AddressAutocomplete
                            id="address"
                            value={address}
                            onChange={handleAddressChange}
                            placeholder="Enter your address"
                            className="rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-base text-[#0B1220] placeholder:text-[#9CA3AF] focus:border-donezo-orange focus:outline-none focus:ring-2 focus:ring-donezo-orange/20"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setManualAddressMode(true);
                            setAddress("");
                            setPlaceId(null);
                            setLat(null);
                            setLng(null);
                            setAddressStreetNumber("");
                            setAddressRoute("");
                            setAddressSubpremise("");
                            setAddressLocality("");
                            setAddressSublocality("");
                            setAddressAdminArea1("");
                            setAddressPostalCode("");
                            setAddressCountry("");
                          }}
                          className="text-sm text-[#374151]/70 hover:text-[#374151] underline text-left w-fit"
                        >
                          Can&apos;t find your address? Enter it manually
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="flex flex-col gap-4">
                          <div className="flex flex-col gap-2">
                            <label htmlFor="streetAddress" className="text-sm font-medium text-[#0B1220]">
                              Street address
                            </label>
                            <input
                              id="streetAddress"
                              type="text"
                              value={streetAddress}
                              onChange={(e) => setStreetAddress(e.target.value)}
                              placeholder="Enter street address"
                              className="rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-base text-[#0B1220] placeholder:text-[#9CA3AF] focus:border-donezo-orange focus:outline-none focus:ring-2 focus:ring-donezo-orange/20"
                            />
                          </div>

                          <div className="flex flex-col gap-2">
                            <label htmlFor="suburb" className="text-sm font-medium text-[#0B1220]">
                              Suburb
                            </label>
                            <input
                              id="suburb"
                              type="text"
                              value={suburb}
                              onChange={(e) => setSuburb(e.target.value)}
                              placeholder="Enter suburb"
                              className="rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-base text-[#0B1220] placeholder:text-[#9CA3AF] focus:border-donezo-orange focus:outline-none focus:ring-2 focus:ring-donezo-orange/20"
                            />
                          </div>

                          <div className="flex flex-col gap-2">
                            <label htmlFor="city" className="text-sm font-medium text-[#0B1220]">
                              City
                            </label>
                            <input
                              id="city"
                              type="text"
                              value={city}
                              onChange={(e) => setCity(e.target.value)}
                              placeholder="Enter city"
                              className="rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-base text-[#0B1220] placeholder:text-[#9CA3AF] focus:border-donezo-orange focus:outline-none focus:ring-2 focus:ring-donezo-orange/20"
                            />
                          </div>

                          <div className="flex flex-col gap-2">
                            <label htmlFor="postcode" className="text-sm font-medium text-[#0B1220]">
                              Postcode <span className="text-[#6B7280] font-normal">(optional)</span>
                            </label>
                            <input
                              id="postcode"
                              type="text"
                              value={postcode}
                              onChange={(e) => setPostcode(e.target.value)}
                              placeholder="Enter postcode"
                              className="rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-base text-[#0B1220] placeholder:text-[#9CA3AF] focus:border-donezo-orange focus:outline-none focus:ring-2 focus:ring-donezo-orange/20"
                            />
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setManualAddressMode(false);
                            setStreetAddress("");
                            setSuburb("");
                            setCity("");
                            setPostcode("");
                            // Clear structured fields when switching back to autocomplete
                            setAddressStreetNumber("");
                            setAddressRoute("");
                            setAddressSubpremise("");
                            setAddressLocality("");
                            setAddressSublocality("");
                            setAddressAdminArea1("");
                            setAddressPostalCode("");
                            setAddressCountry("");
                          }}
                          className="text-sm text-[#374151]/70 hover:text-[#374151] underline text-left w-fit"
                        >
                          Use address autocomplete instead
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Learning-focused quote inputs (optional, not used for pricing) */}
              <div
                className={`transition-all duration-300 overflow-hidden ${
                  isSelectionComplete
                    ? "max-h-[1200px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="flex flex-col gap-6 pt-4">
                  <div className="flex flex-col gap-1">
                    <h2 className="text-lg font-semibold text-[#0B1220]">
                      Help us match the right provider <span className="text-[#6B7280] font-normal">(optional)</span>
                    </h2>
                    <p className="text-sm text-[#374151]/70">
                      These questions don&apos;t change your price — they just help us plan access and assign the best team.
                    </p>
                  </div>

                  {/* Job complexity */}
                  <div className="flex flex-col gap-3">
                    <span className="text-sm font-medium text-[#0B1220]">
                      Job complexity
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        {
                          value: "simple" as JobComplexity,
                          label: "Simple (straightforward gutters)",
                        },
                        {
                          value: "medium" as JobComplexity,
                          label: "Medium (corners / garage)",
                        },
                        {
                          value: "complex" as JobComplexity,
                          label: "Complex (multiple levels / angles)",
                        },
                      ].map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setJobComplexity(option.value)}
                          className={`flex items-center justify-center rounded-xl border px-4 py-3 text-sm font-medium transition-all duration-150 ${
                            jobComplexity === option.value
                              ? "border-donezo-orange bg-donezo-orange/10 text-[#0B1220] shadow-sm"
                              : "border-[#E5E7EB] bg-white text-[#111827] hover:border-[#D1D5DB] hover:shadow-sm"
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Urgency */}
                  <div className="flex flex-col gap-3">
                    <span className="text-sm font-medium text-[#0B1220]">
                      Urgency
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { value: "not_urgent" as Urgency, label: "Not urgent" },
                        { value: "soon" as Urgency, label: "Soon (1–2 weeks)" },
                        { value: "asap" as Urgency, label: "ASAP" },
                      ].map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setUrgency(option.value)}
                          className={`flex items-center justify-center rounded-xl border px-4 py-3 text-sm font-medium transition-all duration-150 ${
                            urgency === option.value
                              ? "border-donezo-orange bg-donezo-orange/10 text-[#0B1220] shadow-sm"
                              : "border-[#E5E7EB] bg-white text-[#111827] hover:border-[#D1D5DB] hover:shadow-sm"
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Access notes section */}
              <div
                className={`transition-all duration-300 overflow-hidden ${
                  isSelectionComplete
                    ? "max-h-[1000px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="notes" className="text-sm font-medium text-[#0B1220]">
                      Access notes <span className="text-[#6B7280] font-normal">(optional)</span>
                    </label>
                    <textarea
                      id="notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Gate code, pets, parking, etc."
                      rows={3}
                      className="rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-base text-[#0B1220] placeholder:text-[#9CA3AF] focus:border-donezo-orange focus:outline-none focus:ring-2 focus:ring-donezo-orange/20 resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Continue button */}
              {isSelectionComplete && (
                <div className="flex flex-col gap-4">
                  {submitError && (
                    <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                      <p className="text-sm text-red-800">{submitError}</p>
                    </div>
                  )}
                  <div className="flex justify-start">
                    <button
                      onClick={handleContinueStep2}
                      disabled={!canContinueStep2 || isSubmitting}
                      className={`font-space-grotesk inline-flex items-center justify-center rounded-lg bg-donezo-orange px-12 py-4 text-lg font-semibold text-[#FFFFFF] transition-opacity shadow-md ${
                        canContinueStep2 && !isSubmitting
                          ? "hover:opacity-90 cursor-pointer"
                          : "opacity-50 cursor-not-allowed"
                      }`}
                    >
                      {isSubmitting ? "Creating booking..." : "Continue booking"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </Container>
        </section>
      </div>
    </main>
  );
}


"use client";

import Link from "next/link";
import Container from "@/components/layout/Container";

export default function Footer() {
  return (
    <footer className="border-t border-[#E5E7EB] bg-white py-12 mt-auto">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6 mb-8">
          {/* Column 1 — Donezo */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-[#0B1220]">Donezo</h3>
            <nav className="flex flex-col gap-2">
              <Link
                href="/about"
                className="text-sm text-[#6B7280] hover:text-[#0B1220] hover:underline transition-colors"
              >
                About Donezo
              </Link>
              <Link
                href="/how-it-works"
                className="text-sm text-[#6B7280] hover:text-[#0B1220] hover:underline transition-colors"
              >
                How it works
              </Link>
              <Link
                href="/services"
                className="text-sm text-[#6B7280] hover:text-[#0B1220] hover:underline transition-colors"
              >
                Services
              </Link>
              <Link
                href="/contact"
                className="text-sm text-[#6B7280] hover:text-[#0B1220] hover:underline transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Column 2 — For Homeowners */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-[#0B1220]">For Homeowners</h3>
            <nav className="flex flex-col gap-2">
              <Link
                href="/request"
                className="text-sm text-[#6B7280] hover:text-[#0B1220] hover:underline transition-colors"
              >
                Request a job
              </Link>
              <Link
                href="/services"
                className="text-sm text-[#6B7280] hover:text-[#0B1220] hover:underline transition-colors"
              >
                Popular services
              </Link>
              <Link
                href="/pricing"
                className="text-sm text-[#6B7280] hover:text-[#0B1220] hover:underline transition-colors"
              >
                How pricing works
              </Link>
              <Link
                href="/trust-safety"
                className="text-sm text-[#6B7280] hover:text-[#0B1220] hover:underline transition-colors"
              >
                Trust & safety
              </Link>
            </nav>
          </div>

          {/* Column 3 — For Service Pros */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-[#0B1220]">For Service Pros</h3>
            <nav className="flex flex-col gap-2">
              <Link
                href="/pros/join"
                className="text-sm text-[#6B7280] hover:text-[#0B1220] hover:underline transition-colors"
              >
                Join as a Pro
              </Link>
              <Link
                href="/pros/how-it-works"
                className="text-sm text-[#6B7280] hover:text-[#0B1220] hover:underline transition-colors"
              >
                How Donezo works for Pros
              </Link>
              <Link
                href="/pros/pricing"
                className="text-sm text-[#6B7280] hover:text-[#0B1220] hover:underline transition-colors"
              >
                Pricing for Pros
              </Link>
            </nav>
          </div>

          {/* Column 4 — Legal & Support */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-[#0B1220]">Legal & Support</h3>
            <nav className="flex flex-col gap-2">
              <Link
                href="/faqs"
                className="text-sm text-[#6B7280] hover:text-[#0B1220] hover:underline transition-colors"
              >
                FAQs
              </Link>
              <Link
                href="/terms"
                className="text-sm text-[#6B7280] hover:text-[#0B1220] hover:underline transition-colors"
              >
                Terms of Use
              </Link>
              <Link
                href="/privacy"
                className="text-sm text-[#6B7280] hover:text-[#0B1220] hover:underline transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/accessibility"
                className="text-sm text-[#6B7280] hover:text-[#0B1220] hover:underline transition-colors"
              >
                Accessibility
              </Link>
              <Link
                href="/admin"
                className="text-sm text-[#6B7280] hover:text-[#0B1220] hover:underline transition-colors"
              >
                Admin login
              </Link>
            </nav>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#E5E7EB] pt-6">
          <p className="text-sm text-[#6B7280] text-center">
            © {new Date().getFullYear()} Donezo. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}



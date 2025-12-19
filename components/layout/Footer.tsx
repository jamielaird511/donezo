"use client";

import Link from "next/link";
import Container from "@/components/layout/Container";

export default function Footer() {
  return (
    <footer className="border-t border-[#E5E7EB] bg-white py-8 mt-auto">
      <Container>
        <div className="flex items-center justify-between">
          <p className="text-sm text-[#6B7280]">
            © {new Date().getFullYear()} Donezo. All rights reserved.
          </p>
          <Link
            href="/admin/login"
            className="text-xs text-[#6B7280] hover:text-[#0B1220] transition-colors"
          >
            Admin login
          </Link>
        </div>
      </Container>
    </footer>
  );
}


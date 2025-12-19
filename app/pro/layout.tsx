"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase/browser";
import Container from "@/components/layout/Container";

export default function ProLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await supabase.auth.signOut();
      router.replace("/pro/login");
      router.refresh();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Bypass layout on login page
  if (pathname === "/pro/login") {
    return <>{children}</>;
  }

  const navItems = [
    { href: "/pro/available", label: "Available jobs" },
    { href: "/pro/my-jobs", label: "My jobs" },
    { href: "/pro/profile", label: "Profile settings" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <div className="border-b border-[#E5E7EB] bg-white">
        <Container>
          <nav className="flex items-center justify-between gap-6 py-4">
            <div className="flex gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? "text-donezo-orange border-b-2 border-donezo-orange pb-1"
                      : "text-[#6B7280] hover:text-[#0B1220]"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className={`inline-flex items-center justify-center rounded-lg bg-donezo-orange px-4 py-2 text-sm font-semibold text-white transition-opacity ${
                isLoggingOut
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:opacity-90"
              }`}
            >
              {isLoggingOut ? "Logging out..." : "Log out"}
            </button>
          </nav>
        </Container>
      </div>
      {children}
    </div>
  );
}


"use client";

import { useEffect, useState } from "react";
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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/pro/login");
        return;
      }
      setIsAuthenticated(true);
    };
    checkAuth();
  }, [router]);

  if (isAuthenticated === null) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-base text-[#374151]/70">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect
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
          <nav className="flex gap-6 py-4">
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
          </nav>
        </Container>
      </div>
      {children}
    </div>
  );
}


"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase/browser";
import Container from "@/components/layout/Container";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Bypass auth check on login page
    if (pathname === "/admin/login") {
      setIsAdmin(false);
      setIsChecking(false);
      return;
    }

    const checkAdmin = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          router.push("/admin/login");
          return;
        }

        // Check if user is in admin_users table
        const { data: adminData, error: adminError } = await supabase
          .from("admin_users")
          .select("user_id")
          .eq("user_id", user.id)
          .single();

        if (adminError || !adminData) {
          setIsAdmin(false);
        } else {
          setIsAdmin(true);
        }
      } catch (err) {
        console.error("Admin check error:", err);
        setIsAdmin(false);
      } finally {
        setIsChecking(false);
      }
    };

    checkAdmin();
  }, [router, pathname]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  // Bypass layout on login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-base text-[#374151]/70">Loading...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Container>
          <div className="flex flex-col gap-4 items-center">
            <h1 className="text-2xl font-semibold text-[#0B1220]">Not authorized</h1>
            <p className="text-base text-[#374151]/70">You do not have access to the admin portal.</p>
            <button
              onClick={() => router.push("/admin/login")}
              className="inline-flex items-center justify-center rounded-lg bg-donezo-orange px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Back to Login
            </button>
          </div>
        </Container>
      </div>
    );
  }

  const navItems = [
    { href: "/admin/jobs", label: "Jobs" },
    { href: "/admin/pros", label: "Pros" },
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
              className="inline-flex items-center justify-center rounded-lg bg-donezo-orange px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Log out
            </button>
          </nav>
        </Container>
      </div>
      {children}
    </div>
  );
}


"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/browser";
import Container from "@/components/layout/Container";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const isProPage = pathname?.startsWith("/pro");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isChecking, setIsChecking] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isCheckingAdmin, setIsCheckingAdmin] = useState<boolean>(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isProPage) {
      checkAuth();
    }
  }, [isProPage]);

  useEffect(() => {
    checkAdmin();
  }, []);

  const checkAuth = async () => {
    setIsChecking(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      setIsAuthenticated(!!user);
    } catch (err) {
      setIsAuthenticated(false);
    } finally {
      setIsChecking(false);
    }
  };

  const checkAdmin = async () => {
    setIsCheckingAdmin(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsAdmin(false);
        return;
      }

      const { data: adminData, error: adminError } = await supabase
        .from("admin_users")
        .select("user_id")
        .eq("user_id", user.id)
        .single();

      setIsAdmin(!adminError && !!adminData);
    } catch (err) {
      setIsAdmin(false);
    } finally {
      setIsCheckingAdmin(false);
    }
  };

  const handleLoginClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    // If on /pro/* route and authenticated, sign out first
    if (isProPage && isAuthenticated) {
      await supabase.auth.signOut();
    }
    
    setIsMobileMenuOpen(false);
    router.push("/pro/login");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-[#E5E7EB] transition-all">
      <Container className="grid grid-cols-3 items-center py-3">
        <div className="flex h-14 items-center justify-center justify-self-start">
          <Link href="/" className="inline-flex items-center">
            <Image
              src="/brand/logo.svg"
              alt="donezo."
              height={56}
              width={171}
              className="h-14 w-auto"
            />
          </Link>
        </div>

        <nav className="hidden gap-6 text-sm text-[#0B1220] md:flex justify-self-center">
          <Link href="/services" className="font-space-grotesk transition-colors hover:text-[#111827] hover:underline">
            Services
          </Link>
        </nav>

        {/* Desktop: Admin and Pro Login buttons */}
        <div className="hidden md:flex justify-self-end items-center gap-3">
          {!isCheckingAdmin && isAdmin && (
            <Link
              href="/admin"
              className="font-space-grotesk rounded-md bg-donezo-orange px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#FFFFFF] transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-donezo-orange/40"
            >
              Admin
            </Link>
          )}
          <button
            onClick={handleLoginClick}
            className="font-space-grotesk rounded-md bg-donezo-orange px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#FFFFFF] transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-donezo-orange/40"
          >
            Donezo Pro Login
          </button>
        </div>

        {/* Mobile: Hamburger menu button */}
        <div className="flex md:hidden justify-self-end items-center">
          <button
            onClick={toggleMobileMenu}
            className="p-2 text-[#0B1220] transition-colors hover:text-[#111827] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-donezo-orange/40 rounded-md"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-[#E5E7EB] bg-white">
          <Container className="py-4">
            <nav className="flex flex-col gap-4">
              <Link
                href="/services"
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-space-grotesk text-sm text-[#0B1220] transition-colors hover:text-[#111827] hover:underline"
              >
                Services
              </Link>
              {!isCheckingAdmin && isAdmin && (
                <Link
                  href="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-space-grotesk rounded-md bg-donezo-orange px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#FFFFFF] transition-opacity hover:opacity-90 w-fit"
                >
                  Admin
                </Link>
              )}
              <button
                onClick={handleLoginClick}
                className="font-space-grotesk rounded-md bg-donezo-orange px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#FFFFFF] transition-opacity hover:opacity-90 w-fit text-left"
              >
                Donezo Pro Login
              </button>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}


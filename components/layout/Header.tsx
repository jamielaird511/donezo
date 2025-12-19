"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/browser";
import Container from "@/components/layout/Container";
import PreHeroBanner from "@/components/PreHeroBanner";
import { useState, useEffect } from "react";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const isProPage = pathname?.startsWith("/pro");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isChecking, setIsChecking] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isCheckingAdmin, setIsCheckingAdmin] = useState<boolean>(true);

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
    
    router.push("/pro/login");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm transition-all">
      <Container className="grid grid-cols-3 items-center py-2">
        <div className="flex h-10 items-center justify-center justify-self-start">
          <Link href="/" className="inline-flex items-center">
            <Image
              src="/brand/logo.svg"
              alt="donezo."
              height={40}
              width={122}
            />
          </Link>
        </div>

        <nav className="hidden gap-6 text-sm text-[#0B1220] md:flex justify-self-center">
          <Link href="/services" className="font-space-grotesk transition-colors hover:text-[#111827] hover:underline">
            Services
          </Link>
        </nav>

        <div className="justify-self-end flex items-center gap-3">
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
      </Container>
      <PreHeroBanner />
    </header>
  );
}


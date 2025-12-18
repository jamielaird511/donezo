"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/browser";

export default function ProIndexPage() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser();

      if (data.user) {
        router.replace("/pro/available");
      } else {
        router.replace("/pro/login");
      }
    };

    checkAuth();
  }, [router]);

  return null;
}


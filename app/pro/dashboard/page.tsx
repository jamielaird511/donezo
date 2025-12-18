"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProDashboardPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/pro/available");
  }, [router]);

  return null;
}

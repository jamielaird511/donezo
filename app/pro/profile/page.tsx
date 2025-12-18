"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/browser";
import Container from "@/components/layout/Container";

interface ProProfile {
  business_name: string | null;
  trade_type: string | null;
}

export default function ProProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<ProProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const checkAuth = async () => {
    try {
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      if (!currentUser) {
        router.push("/pro/login");
        return;
      }
      setUser(currentUser);
    } catch (err) {
      console.error("Auth check error:", err);
      router.push("/pro/login");
    } finally {
      setIsLoading(false);
    }
  };

  const loadProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("pro_profiles")
        .select("business_name, trade_type")
        .eq("user_id", user.id)
        .single();

      if (error && error.code !== "PGRST116") {
        // PGRST116 is "not found" - that's okay
        console.error("Error loading profile:", error);
      } else {
        setProfile(data);
      }
    } catch (err) {
      console.error("Error loading profile:", err);
    }
  };

  if (isLoading) {
    return (
      <main className="flex flex-1 flex-col">
        <Container className="py-16">
          <p className="text-base text-[#374151]/70">Loading...</p>
        </Container>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="flex flex-1 flex-col">
      <Container className="py-8">
        <div className="flex flex-col gap-6 max-w-2xl">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-3xl font-semibold text-[#0B1220]">
              Profile Settings
            </h1>
            <p className="text-base text-[#374151]/70">
              Manage your professional profile information.
            </p>
          </div>

          <div className="rounded-xl border border-[#E5E7EB] bg-white p-6">
            <div className="flex flex-col gap-4">
              {profile?.business_name && (
                <div>
                  <p className="text-sm font-medium text-[#6B7280] mb-1">Business name</p>
                  <p className="text-base text-[#0B1220]">{profile.business_name}</p>
                </div>
              )}

              {profile?.trade_type && (
                <div>
                  <p className="text-sm font-medium text-[#6B7280] mb-1">Trade type</p>
                  <p className="text-base text-[#0B1220]">{profile.trade_type}</p>
                </div>
              )}

              {!profile?.business_name && !profile?.trade_type && (
                <p className="text-base text-[#374151]/70">
                  No profile information available.
                </p>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-[#E5E7EB] bg-white p-6">
            <p className="text-base text-[#374151]/70">
              Settings coming soon.
            </p>
          </div>
        </div>
      </Container>
    </main>
  );
}


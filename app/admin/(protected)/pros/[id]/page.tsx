"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/browser";
import Container from "@/components/layout/Container";
import ProProfileForm from "@/components/admin/ProProfileForm";

interface ProProfile {
  id: string;
  user_id: string;
  business_name: string | null;
  city: string | null;
  phone: string | null;
  email: string | null;
  created_at: string;
}

export default function EditProProfilePage() {
  const params = useParams();
  const router = useRouter();
  const profileId = params.id as string;
  const [profile, setProfile] = useState<ProProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    loadProfile();
  }, [profileId]);

  const loadProfile = async () => {
    try {
      setIsLoading(true);
      const { data, error: profileError } = await supabase
        .from("pro_profiles")
        .select("*")
        .eq("id", profileId)
        .single();

      if (profileError) throw profileError;
      if (!data) {
        setError("Pro profile not found");
        return;
      }
      setProfile(data);
    } catch (err: any) {
      console.error("Error loading pro profile:", err);
      setError(err.message || "Failed to load pro profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this pro profile? This action cannot be undone.")) {
      return;
    }

    setIsDeleting(true);
    try {
      const { error: deleteError } = await supabase
        .from("pro_profiles")
        .delete()
        .eq("id", profileId);

      if (deleteError) throw deleteError;
      router.push("/admin/pros");
    } catch (err: any) {
      console.error("Error deleting pro profile:", err);
      setError(err.message || "Failed to delete pro profile");
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <main className="flex flex-1 flex-col">
        <Container className="py-8">
          <p className="text-base text-[#374151]/70">Loading...</p>
        </Container>
      </main>
    );
  }

  if (error && !profile) {
    return (
      <main className="flex flex-1 flex-col">
        <Container className="py-8">
          <div className="flex flex-col gap-4">
            <div className="rounded-lg border border-red-200 bg-red-50 p-4">
              <p className="text-sm text-red-800">{error}</p>
            </div>
            <button
              onClick={() => router.push("/admin/pros")}
              className="inline-flex items-center justify-center rounded-lg bg-donezo-orange px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Back to Pros
            </button>
          </div>
        </Container>
      </main>
    );
  }

  if (!profile) {
    return (
      <main className="flex flex-1 flex-col">
        <Container className="py-8">
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-semibold text-[#0B1220]">Pro profile not found</h1>
            <button
              onClick={() => router.push("/admin/pros")}
              className="inline-flex items-center justify-center rounded-lg bg-donezo-orange px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Back to Pros
            </button>
          </div>
        </Container>
      </main>
    );
  }

  return (
    <main className="flex flex-1 flex-col">
      <Container className="py-8">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-semibold text-[#0B1220]">Edit Pro Profile</h1>
              <p className="text-base text-[#374151]/70">Update professional profile information.</p>
            </div>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className={`inline-flex items-center justify-center rounded-lg border border-red-300 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition-opacity hover:bg-red-100 ${
                isDeleting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <ProProfileForm initialData={profile} mode="edit" profileId={profileId} />
        </div>
      </Container>
    </main>
  );
}


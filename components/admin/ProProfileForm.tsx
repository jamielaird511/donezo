"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/browser";

interface ProProfile {
  id?: string;
  user_id: string;
  business_name: string | null;
  city: string | null;
  phone: string | null;
  email: string | null;
}

interface ProProfileFormProps {
  initialData: ProProfile | null;
  mode: "create" | "edit";
  profileId?: string;
}

export default function ProProfileForm({ initialData, mode, profileId }: ProProfileFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    user_id: initialData?.user_id || "",
    business_name: initialData?.business_name || "",
    city: initialData?.city || "",
    phone: initialData?.phone || "",
    email: initialData?.email || "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSaving(true);

    try {
      const payload: any = {
        user_id: formData.user_id.trim(),
        business_name: formData.business_name.trim() || null,
        city: formData.city.trim() || null,
      };

      if (formData.phone.trim()) {
        payload.phone = formData.phone.trim();
      } else {
        payload.phone = null;
      }

      if (formData.email.trim()) {
        payload.email = formData.email.trim();
      } else {
        payload.email = null;
      }

      if (mode === "create") {
        const { error: insertError } = await supabase
          .from("pro_profiles")
          .insert([payload]);

        if (insertError) throw insertError;
      } else {
        if (!profileId) throw new Error("Profile ID is required for edit mode");
        
        const { error: updateError } = await supabase
          .from("pro_profiles")
          .update(payload)
          .eq("id", profileId);

        if (updateError) throw updateError;
      }

      router.push("/admin/pros");
    } catch (err: any) {
      console.error("Error saving pro profile:", err);
      setError(err.message || "Failed to save pro profile");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="rounded-xl border border-[#E5E7EB] bg-white p-6">
      <h2 className="text-xl font-semibold text-[#0B1220] mb-4">
        {mode === "create" ? "Add Pro Profile" : "Edit Pro Profile"}
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <label htmlFor="user_id" className="text-sm font-medium text-[#0B1220]">
            User ID <span className="text-red-500">*</span>
          </label>
          <input
            id="user_id"
            type="text"
            value={formData.user_id}
            onChange={(e) => setFormData({ ...formData, user_id: e.target.value })}
            placeholder="UUID from auth.users"
            required
            disabled={mode === "edit"}
            className="rounded-lg border border-[#E5E7EB] bg-white px-4 py-2 text-sm text-[#0B1220] focus:border-donezo-orange focus:outline-none focus:ring-2 focus:ring-donezo-orange/20 disabled:bg-[#F9FAFB] disabled:text-[#6B7280]"
          />
          <p className="text-xs text-[#6B7280]">
            {mode === "create" 
              ? "User must already exist in auth.users" 
              : "User ID cannot be changed"}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="business_name" className="text-sm font-medium text-[#0B1220]">
            Business Name <span className="text-red-500">*</span>
          </label>
          <input
            id="business_name"
            type="text"
            value={formData.business_name}
            onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
            placeholder="Business name"
            required
            className="rounded-lg border border-[#E5E7EB] bg-white px-4 py-2 text-sm text-[#0B1220] focus:border-donezo-orange focus:outline-none focus:ring-2 focus:ring-donezo-orange/20"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="city" className="text-sm font-medium text-[#0B1220]">
            City
          </label>
          <input
            id="city"
            type="text"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            placeholder="City"
            className="rounded-lg border border-[#E5E7EB] bg-white px-4 py-2 text-sm text-[#0B1220] focus:border-donezo-orange focus:outline-none focus:ring-2 focus:ring-donezo-orange/20"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="text-sm font-medium text-[#0B1220]">
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="Phone number"
            className="rounded-lg border border-[#E5E7EB] bg-white px-4 py-2 text-sm text-[#0B1220] focus:border-donezo-orange focus:outline-none focus:ring-2 focus:ring-donezo-orange/20"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-[#0B1220]">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Email address"
            className="rounded-lg border border-[#E5E7EB] bg-white px-4 py-2 text-sm text-[#0B1220] focus:border-donezo-orange focus:outline-none focus:ring-2 focus:ring-donezo-orange/20"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={() => router.push("/admin/pros")}
            className="flex-1 inline-flex items-center justify-center rounded-lg border border-[#E5E7EB] bg-white px-6 py-2.5 text-sm font-semibold text-[#0B1220] transition-colors hover:bg-[#F9FAFB]"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className={`flex-1 inline-flex items-center justify-center rounded-lg bg-donezo-orange px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 ${
              isSaving ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSaving ? "Saving..." : mode === "create" ? "Add Pro Profile" : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}



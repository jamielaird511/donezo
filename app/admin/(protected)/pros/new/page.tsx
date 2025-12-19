"use client";

import Container from "@/components/layout/Container";
import ProProfileForm from "@/components/admin/ProProfileForm";

export default function NewProProfilePage() {
  return (
    <main className="flex flex-1 flex-col">
      <Container className="py-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-semibold text-[#0B1220]">New Pro Profile</h1>
            <p className="text-base text-[#374151]/70">Create a new professional profile.</p>
          </div>

          <ProProfileForm initialData={null} mode="create" />
        </div>
      </Container>
    </main>
  );
}


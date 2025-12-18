"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/browser";
import Container from "@/components/layout/Container";

export default function ProLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message);
        setIsLoading(false);
        return;
      }

      if (data.user) {
        router.push("/pro/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during login");
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <div className="relative z-10 flex flex-1 flex-col">
        <section className="flex flex-1 items-start">
          <Container className="py-16">
            <div className="flex flex-col gap-8 max-w-md">
              <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-semibold tracking-[-0.01em] text-[#0B1220] sm:text-5xl leading-tight">
                  Donezo Pro Login
                </h1>
                <p className="text-base text-[#374151]/70">
                  Sign in to access your dashboard
                </p>
              </div>

              <form onSubmit={handleLogin} className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-medium text-[#0B1220]">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-base text-[#0B1220] placeholder:text-[#9CA3AF] focus:border-donezo-orange focus:outline-none focus:ring-2 focus:ring-donezo-orange/20"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="password" className="text-sm font-medium text-[#0B1220]">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-base text-[#0B1220] placeholder:text-[#9CA3AF] focus:border-donezo-orange focus:outline-none focus:ring-2 focus:ring-donezo-orange/20"
                  />
                </div>

                {error && (
                  <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                    <p className="text-sm text-red-800">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`font-space-grotesk inline-flex items-center justify-center rounded-lg bg-donezo-orange px-6 py-3 text-base font-semibold text-[#FFFFFF] transition-opacity shadow-md ${
                    isLoading
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:opacity-90 cursor-pointer"
                  }`}
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </button>
              </form>
            </div>
          </Container>
        </section>
      </div>
    </main>
  );
}


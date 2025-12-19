import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Container from "@/components/layout/Container";
import AdminNav from "../AdminNav";

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  // Check authentication
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) {
    redirect("/admin/login");
  }

  // Check admin status
  const { data: adminData, error: adminError } = await supabase
    .from("admin_users")
    .select("user_id")
    .eq("user_id", user.id)
    .single();

  if (adminError || !adminData) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <div className="border-b border-[#E5E7EB] bg-white">
        <Container>
          <nav className="flex items-center justify-between gap-6 py-4">
            <AdminNav />
            <form action="/api/admin/logout" method="post">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-lg bg-donezo-orange px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Log out
              </button>
            </form>
          </nav>
        </Container>
      </div>
      {children}
    </div>
  );
}


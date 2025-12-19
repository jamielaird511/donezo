import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Allow login through
  if (pathname === "/admin/login" || pathname === "/pro/login") {
    return NextResponse.next();
  }

  let response = NextResponse.next();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return response;
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (cookiesToSet: Array<{ name: string; value: string; options?: any }>) => {
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const isProtectedAdmin = pathname.startsWith("/admin") && pathname !== "/admin/login";
  const isProtectedPro = pathname.startsWith("/pro") && pathname !== "/pro/login";

  if (isProtectedAdmin || isProtectedPro) {
    const { data, error } = await supabase.auth.getUser();

    if (process.env.NODE_ENV !== "production") {
      console.log("[MW]", pathname, "user?", !!data.user, "err:", error?.message);
    }

    if (!data.user) {
      if (process.env.NODE_ENV !== "production") {
        console.log("[MW]", pathname, "redirecting to login");
      }

      const redirectTo = isProtectedAdmin ? "/admin/login" : "/pro/login";
      return NextResponse.redirect(new URL(redirectTo, request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/pro/:path*"],
};


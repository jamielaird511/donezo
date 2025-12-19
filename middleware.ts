import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Early return for login routes to prevent redirect loops
  if (
    pathname === "/admin/login" ||
    pathname.startsWith("/admin/login/") ||
    pathname === "/pro/login" ||
    pathname.startsWith("/pro/login/") ||
    pathname === "/api/admin/login" ||
    pathname.startsWith("/api/admin/login/") ||
    pathname === "/api/pro/login" ||
    pathname.startsWith("/api/pro/login/")
  ) {
    return NextResponse.next();
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.next();
  }

  // Buffer cookies to apply to final response
  const cookiesToSet: Array<{ name: string; value: string; options?: any }> = [];

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (list: Array<{ name: string; value: string; options?: any }>) => {
        cookiesToSet.push(...list);
      },
    },
  });

  const isAdminLogin = pathname === "/admin/login";
  const isProLogin = pathname === "/pro/login";
  const isProtectedAdmin = pathname.startsWith("/admin") && !isAdminLogin;
  const isProtectedPro = pathname.startsWith("/pro") && !isProLogin;

  // Always call getUser() (even on login pages) so SSR can refresh session/cookies
  const { data } = await supabase.auth.getUser();

  let res: NextResponse;
  if ((isProtectedAdmin || isProtectedPro) && !data.user) {
    const redirectTo = isProtectedAdmin ? "/admin/login" : "/pro/login";
    const redirectUrl = new URL(redirectTo, request.url);
    redirectUrl.searchParams.set("_t", Date.now().toString());
    res = NextResponse.redirect(redirectUrl);
  } else {
    res = NextResponse.next();
  }

  // Apply buffered cookies to whichever response we ended up returning
  cookiesToSet.forEach(({ name, value, options }) => {
    res.cookies.set(name, value, options);
  });

  return res;
}

export const config = {
  matcher: ["/admin/:path*", "/pro/:path*", "/api/admin/:path*", "/api/pro/:path*"],
};


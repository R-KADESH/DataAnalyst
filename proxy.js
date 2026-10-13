import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

// Runs before every /admin request: refreshes your login session and
// sends visitors who aren't logged in to the login page.
// (Real protection is in the database rules; this is the friendly redirect.)
export async function proxy(request) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data } = await supabase.auth.getClaims();
  const isLoggedIn = Boolean(data?.claims);
  const isLoginPage = request.nextUrl.pathname === "/admin/login";

  if (!isLoggedIn && !isLoginPage) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  if (isLoggedIn && isLoginPage) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};

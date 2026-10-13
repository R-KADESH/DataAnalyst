import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Client for the admin area (server side). It reads your login cookie,
// so Supabase knows it's you and allows writes.
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from a Server Component, where cookies are read-only.
            // proxy.js refreshes the session, so this is safe to ignore.
          }
        },
      },
    }
  );
}

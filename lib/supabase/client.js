import { createBrowserClient } from "@supabase/ssr";

// Client for interactive components in the browser (e.g. the login form, uploads).
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  );
}

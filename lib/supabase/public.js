import { createClient } from "@supabase/supabase-js";

// Client for public pages. It never reads cookies, so results can be cached
// and visitors always get a fast page. Row Level Security limits it to public content.
export function createPublicClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    { auth: { persistSession: false } }
  );
}

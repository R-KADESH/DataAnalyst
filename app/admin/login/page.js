import Link from "next/link";
import LoginForm from "@/components/admin/LoginForm";
import { hasSupabase } from "@/lib/supabase/config";

export const metadata = { title: "Sign in", robots: { index: false } };

export default function LoginPage() {
  return (
    <main className="flex flex-1 items-center justify-center bg-gradient-to-b from-accent-soft to-background px-4 py-16">
      <div className="w-full max-w-md rounded-3xl border border-line bg-surface p-8 shadow-xl shadow-navy/10 sm:p-10">
        <p className="font-display text-3xl font-bold text-navy">
          NC<span className="text-sky">.</span>
        </p>
        <h1 className="mt-6 text-2xl font-bold text-navy">Dashboard sign in</h1>
        <p className="mt-1 text-muted">Manage your projects, learning log and profile.</p>

        <div className="mt-8">
          {hasSupabase ? (
            <LoginForm />
          ) : (
            <p className="rounded-xl border border-sun/40 bg-sun/10 px-4 py-3 text-sm text-ink">
              Supabase isn&apos;t connected yet. Follow the setup steps in <strong>README.md</strong>,
              add your keys to <code>.env.local</code>, then restart <code>npm run dev</code>.
            </p>
          )}
        </div>

        <Link href="/" className="mt-8 block text-center text-sm text-muted hover:text-accent">
          ← Back to the site
        </Link>
      </div>
    </main>
  );
}

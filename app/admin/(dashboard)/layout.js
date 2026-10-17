import { Suspense } from "react";
import Sidebar from "@/components/admin/Sidebar";
import { requireAdmin } from "@/lib/admin";

export const metadata = { title: "Dashboard", robots: { index: false } };

// Only shows the page if you're logged in as the admin.
async function AdminOnly({ children }) {
  const { email, isAdmin } = await requireAdmin();

  if (!isAdmin) {
    return (
      <div className="max-w-xl rounded-2xl border border-sun/40 bg-sun/10 p-6">
        <h1 className="text-xl font-bold text-navy">Almost there</h1>
        <p className="mt-2 text-ink">
          You&apos;re signed in as <strong>{email}</strong>, but this account isn&apos;t an admin yet.
          In Supabase → SQL Editor, run the <code>insert into admins</code> line from README.md with your user UID.
        </p>
      </div>
    );
  }
  return children;
}

function Loading() {
  return (
    <div className="space-y-4" aria-busy="true">
      <div className="h-9 w-56 animate-pulse rounded-xl bg-line" />
      <div className="h-40 animate-pulse rounded-2xl bg-line/60" />
    </div>
  );
}

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-background lg:flex-row">
      <Sidebar />
      <main id="main" className="flex-1 px-4 py-8 sm:px-8 lg:px-12 lg:py-12">
        <div className="mx-auto max-w-5xl">
          <Suspense fallback={<Loading />}>
            <AdminOnly>{children}</AdminOnly>
          </Suspense>
        </div>
      </main>
    </div>
  );
}

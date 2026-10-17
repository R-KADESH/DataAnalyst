import Link from "next/link";
import { Suspense } from "react";
import ActiveNavLinks from "@/components/admin/ActiveNavLinks";
import { linkClass, navLinks } from "@/components/admin/navLinks";
import { signOut } from "@/app/admin/actions";

// Shown instantly while the highlighted version loads
function PlainNavLinks() {
  return navLinks.map((link) => (
    <Link key={link.href} href={link.href} className={linkClass(false)}>
      <span aria-hidden="true" className="w-4 text-center">{link.icon}</span>
      {link.label}
    </Link>
  ));
}

export default function Sidebar() {
  return (
    <aside className="bg-navy-deep text-white lg:sticky lg:top-0 lg:h-screen lg:w-64 lg:shrink-0">
      <div className="flex h-full flex-col gap-6 p-4 lg:p-6">
        <Link href="/admin" className="font-display text-2xl font-bold">
          NC<span className="text-sky">.</span> <span className="text-base font-medium text-white/60">Dashboard</span>
        </Link>

        <nav className="-mx-1 flex gap-1 overflow-x-auto lg:mx-0 lg:flex-col">
          <Suspense fallback={<PlainNavLinks />}>
            <ActiveNavLinks />
          </Suspense>
        </nav>

        <div className="flex gap-1 lg:mt-auto lg:block lg:space-y-1">
          <a href="/" target="_blank" className="block rounded-xl px-4 py-2.5 text-sm text-white/75 hover:bg-white/10 hover:text-white">
            View site ↗
          </a>
          <form action={signOut}>
            <button type="submit" className="w-full rounded-xl px-4 py-2.5 text-left text-sm text-white/75 hover:bg-white/10 hover:text-white">
              Sign out
            </button>
          </form>
        </div>
      </div>
    </aside>
  );
}

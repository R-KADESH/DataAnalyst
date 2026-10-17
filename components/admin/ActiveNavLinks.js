"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { linkClass, navLinks } from "@/components/admin/navLinks";

// Same links as the sidebar, with the current page highlighted.
export default function ActiveNavLinks() {
  const pathname = usePathname();
  const isActive = (href) => (href === "/admin" ? pathname === href : pathname.startsWith(href));

  return navLinks.map((link) => (
    <Link key={link.href} href={link.href} className={linkClass(isActive(link.href))}>
      <span aria-hidden="true" className="w-4 text-center">{link.icon}</span>
      {link.label}
    </Link>
  ));
}

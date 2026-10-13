"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "/#projects", label: "Projects" },
  { href: "/#learning", label: "Learning Log" },
  { href: "/#skills", label: "Skills" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar({ initials }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Turn the bar solid once the visitor scrolls past the top
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "bg-surface/85 shadow-sm shadow-navy/10 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
        <Link
          href="/"
          className="font-display text-2xl font-bold text-navy transition-transform hover:-rotate-3 hover:scale-110"
        >
          {initials}
          <span className="text-sky">.</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-full px-4 py-2.5 text-base font-medium text-muted transition-colors hover:bg-accent-soft hover:text-navy"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="rounded-lg p-2 text-navy md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </nav>

      {open && (
        <ul className="space-y-1 px-4 pb-4 md:hidden">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-4 py-3 text-lg text-ink hover:bg-accent-soft"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}

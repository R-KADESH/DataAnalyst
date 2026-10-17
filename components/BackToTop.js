"use client";

import { useEffect, useState } from "react";

// Round button that appears after scrolling down and jumps back to the top.
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 800);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0 })}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      className={`fixed right-4 bottom-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-navy text-xl text-white shadow-lg shadow-navy/30 transition duration-300 hover:-translate-y-1 hover:bg-accent sm:right-6 sm:bottom-6 ${
        visible ? "opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      ↑
    </button>
  );
}

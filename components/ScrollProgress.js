"use client";

import { useEffect, useState } from "react";

// Thin bar at the top of the page that fills up as you read.
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-1" aria-hidden="true">
      <div
        className="h-full origin-left bg-gradient-to-r from-sky to-accent"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}

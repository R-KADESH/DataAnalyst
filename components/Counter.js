"use client";

import { useEffect, useRef, useState } from "react";

// Counts up from 0 to `value` when it scrolls into view.
// The real number is rendered first, so it's correct even before JavaScript loads.
export default function Counter({ value, suffix = "", duration = 1600 }) {
  const ref = useRef(null);
  const [current, setCurrent] = useState(value);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();

      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // fast start, soft landing
        setCurrent(Math.round(value * eased));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    });

    observer.observe(ref.current);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, duration]);

  return (
    <span ref={ref}>
      {current.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}

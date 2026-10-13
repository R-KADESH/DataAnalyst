"use client";

import { useEffect, useState } from "react";

// Cycles through words with a little blur-in animation.
export default function RotatingWords({ words, interval = 2200 }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  return (
    <span key={index} className="animate-word inline-block text-accent">
      {words[index]}
    </span>
  );
}

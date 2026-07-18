"use client";

import { useEffect, useState } from "react";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const height = el.scrollHeight - el.clientHeight;
      setProgress(height > 0 ? Math.min(100, (scrolled / height) * 100) : 0);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed left-0 top-0 z-[60] h-0.5 w-full bg-transparent"
      aria-hidden
    >
      <div
        className="h-full bg-accent transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

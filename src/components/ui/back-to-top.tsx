"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function BackToTop({ threshold = 480 }: { threshold?: number }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > threshold);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return (
    <button
      type="button"
      aria-label="Lên đầu trang"
      title="Lên đầu trang"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={cn(
        "fixed bottom-5 right-4 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full border border-card-border bg-card text-foreground shadow-lg transition",
        "hover:bg-accent-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
        "md:bottom-8 md:right-8",
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-2 opacity-0",
      )}
    >
      <ArrowUp className="h-5 w-5" aria-hidden />
    </button>
  );
}

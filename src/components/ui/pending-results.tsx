"use client";

import { usePendingNavigation } from "@/lib/hooks/use-pending-navigation";
import { Loader2 } from "lucide-react";
import type { ReactNode } from "react";

export function PendingResults({
  children,
  label = "Đang lọc kết quả...",
}: {
  children: ReactNode;
  label?: string;
}) {
  const { isPending } = usePendingNavigation();

  return (
    <div className="relative min-h-40">
      {isPending ? (
        <div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 rounded-xl bg-background/70 backdrop-blur-[1px]"
          role="status"
          aria-live="polite"
          aria-busy="true"
        >
          <Loader2 className="h-6 w-6 animate-spin text-accent" aria-hidden />
          <p className="text-sm font-medium text-foreground">{label}</p>
        </div>
      ) : null}
      <div
        className={
          isPending ? "pointer-events-none opacity-45 transition-opacity" : ""
        }
      >
        {children}
      </div>
    </div>
  );
}

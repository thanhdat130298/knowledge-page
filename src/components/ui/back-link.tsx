"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  label?: string;
  className?: string;
};

/** Prefer browser history when available; otherwise go to `href`. */
export function BackLink({ href, label = "Quay lại", className }: Props) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => {
        if (typeof window !== "undefined" && window.history.length > 1) {
          router.back();
          return;
        }
        router.push(href);
      }}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg px-1 py-1 text-sm text-muted transition hover:bg-accent-soft hover:text-foreground",
        className,
      )}
    >
      <ArrowLeft className="h-4 w-4" aria-hidden />
      {label}
    </button>
  );
}

export function BackNav({
  href,
  label = "Quay lại",
  className,
}: Props) {
  return (
    <div className={cn("mb-4", className)}>
      <BackLink href={href} label={label} />
      <noscript>
        <Link href={href} className="text-sm text-muted">
          {label}
        </Link>
      </noscript>
    </div>
  );
}

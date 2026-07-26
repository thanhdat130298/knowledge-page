"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

/** Soft-navigate with pending flag for search/sort/filter UX. */
export function usePendingNavigation() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function navigate(href: string) {
    startTransition(() => {
      router.push(href);
    });
  }

  return { isPending, navigate, startTransition };
}

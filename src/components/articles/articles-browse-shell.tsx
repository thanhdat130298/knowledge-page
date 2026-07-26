"use client";

import { ArticleFilters } from "@/components/articles/article-filters";
import { PendingResults } from "@/components/ui/pending-results";
import { NavigationPendingProvider } from "@/lib/hooks/use-pending-navigation";
import type { ReactNode } from "react";

type Props = {
  categories: { name: string; slug: string }[];
  tags: { name: string; slug: string }[];
  children: ReactNode;
};

export function ArticlesBrowseShell({ categories, tags, children }: Props) {
  return (
    <NavigationPendingProvider>
      <div className="mt-6 grid gap-6 lg:grid-cols-[240px_1fr]">
        <ArticleFilters categories={categories} tags={tags} />
        <PendingResults label="Đang áp dụng bộ lọc...">{children}</PendingResults>
      </div>
    </NavigationPendingProvider>
  );
}

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
      <div className="mt-6 grid min-w-0 gap-6 lg:grid-cols-[minmax(0,240px)_minmax(0,1fr)]">
        <div className="min-w-0">
          <ArticleFilters categories={categories} tags={tags} />
        </div>
        <PendingResults label="Đang áp dụng bộ lọc...">{children}</PendingResults>
      </div>
    </NavigationPendingProvider>
  );
}

"use client";

import { PendingResults } from "@/components/ui/pending-results";
import { SearchForm } from "@/components/search/search-form";
import { NavigationPendingProvider } from "@/lib/hooks/use-pending-navigation";
import type { ReactNode } from "react";

export function SearchBrowseShell({
  initialQuery,
  children,
}: {
  initialQuery: string;
  children: ReactNode;
}) {
  return (
    <NavigationPendingProvider>
      <div className="mt-6">
        <SearchForm initialQuery={initialQuery} />
      </div>
      <div className="mt-8">
        <PendingResults label="Đang tìm kiếm...">{children}</PendingResults>
      </div>
    </NavigationPendingProvider>
  );
}

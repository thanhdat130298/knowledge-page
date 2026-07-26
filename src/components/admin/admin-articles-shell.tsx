"use client";

import { AdminArticlesFilter } from "@/components/admin/articles-filter";
import { PendingResults } from "@/components/ui/pending-results";
import { NavigationPendingProvider } from "@/lib/hooks/use-pending-navigation";
import type { ReactNode } from "react";

export function AdminArticlesShell({
  initialQ,
  initialStatus,
  children,
}: {
  initialQ: string;
  initialStatus: string;
  children: ReactNode;
}) {
  return (
    <NavigationPendingProvider>
      <AdminArticlesFilter initialQ={initialQ} initialStatus={initialStatus} />
      <div className="mt-6">
        <PendingResults label="Đang lọc bài viết...">{children}</PendingResults>
      </div>
    </NavigationPendingProvider>
  );
}

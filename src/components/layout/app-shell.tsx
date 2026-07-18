import { SiteHeader } from "@/components/layout/site-header";
import { getCurrentProfile, getSessionUser } from "@/lib/auth/session";
import { isAdminEmail } from "@/lib/utils";
import Link from "next/link";

export async function AppShell({ children }: { children: React.ReactNode }) {
  const [user, profile] = await Promise.all([
    getSessionUser(),
    getCurrentProfile(),
  ]);
  const isAdmin = isAdminEmail(user?.email);

  return (
    <>
      <SiteHeader
        isLoggedIn={Boolean(user)}
        isAdmin={isAdmin}
        username={profile?.username}
        displayName={
          profile?.display_name || profile?.username || user?.email?.split("@")[0]
        }
      />
      <main className="flex-1">{children}</main>
      <footer className="mt-16 border-t border-card-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-muted md:flex-row md:items-center md:justify-between md:px-6">
          <div>
            <div className="font-display text-base font-semibold text-foreground">
              Knowledge FStack
            </div>
            <p>Nền tảng học kiến thức phỏng vấn Frontend.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/articles" className="hover:text-foreground">
              Bài viết
            </Link>
            <Link href="/search" className="hover:text-foreground">
              Tìm kiếm
            </Link>
            <Link href="/progress" className="hover:text-foreground">
              Tiến độ học
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}

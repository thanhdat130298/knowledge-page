"use client";

import { useTheme } from "@/components/theme/theme-provider";
import { useAuthModal } from "@/components/auth/auth-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Bookmark,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  Moon,
  Search,
  Sun,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { hasSupabasePublicConfig } from "@/lib/supabase/env";

type HeaderProps = {
  isLoggedIn?: boolean;
  isAdmin?: boolean;
  username?: string | null;
  displayName?: string | null;
};

export function SiteHeader({
  isLoggedIn = false,
  isAdmin = false,
  username,
  displayName,
}: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const { openLogin } = useAuthModal();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const [q, setQ] = useState("");

  const greetName = displayName || username || "bạn";

  useEffect(() => {
    queueMicrotask(() => {
      setMobileOpen(false);
      setUserMenu(false);
    });
  }, [pathname]);

  async function logout() {
    if (hasSupabasePublicConfig()) {
      const supabase = createClient();
      await supabase.auth.signOut();
    }
    router.refresh();
  }

  function onSearch(e: React.FormEvent) {
    e.preventDefault();
    const query = q.trim();
    router.push(query ? `/search?q=${encodeURIComponent(query)}` : "/search");
  }

  return (
    <header className="sticky top-0 z-50 border-b border-card-border/80 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4 md:h-16 md:px-6">
        <Link
          href="/"
          className="font-display shrink-0 text-lg font-semibold tracking-tight md:text-xl"
        >
          Knowledge <span className="text-accent">FStack</span>
        </Link>

        <nav
          className="ml-2 hidden items-center gap-1 lg:flex"
          aria-label="Chính"
        >
          <NavLink href="/articles">Bài viết</NavLink>
          <NavLink href="/search">Tìm kiếm</NavLink>
          {isLoggedIn ? (
            <>
              <NavLink href="/progress">Tiến độ học</NavLink>
              <NavLink href="/bookmarks">Bookmark</NavLink>
            </>
          ) : null}
          {isAdmin ? <NavLink href="/admin">Admin</NavLink> : null}
        </nav>

        <form
          onSubmit={onSearch}
          className="ml-auto hidden min-w-0 flex-1 max-w-xs items-center xl:flex"
          role="search"
        >
          <div className="relative w-full">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <Input
              aria-label="Tìm kiếm"
              placeholder="Tìm bài phỏng vấn..."
              className="pl-9"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
        </form>

        <div className="ml-auto flex items-center gap-1 lg:ml-0">
          <button
            type="button"
            className="rounded-xl p-2 hover:bg-accent-soft xl:hidden"
            aria-label="Mở tìm kiếm"
            onClick={() => router.push("/search")}
          >
            <Search className="h-5 w-5" />
          </button>

          <button
            type="button"
            className="rounded-xl p-2 hover:bg-accent-soft"
            aria-label={
              theme === "light" ? "Bật dark theme" : "Bật light theme"
            }
            onClick={toggleTheme}
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </button>

          {isLoggedIn ? (
            <div className="relative hidden sm:block">
              <button
                type="button"
                className="flex items-center gap-2 rounded-full border border-card-border bg-card py-1 pl-1 pr-3 hover:bg-accent-soft/50"
                aria-label="Menu người dùng"
                aria-expanded={userMenu}
                onClick={() => setUserMenu((v) => !v)}
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft text-sm font-semibold text-accent">
                  {greetName.slice(0, 1).toUpperCase()}
                </span>
                <span className="hidden max-w-[7rem] truncate text-sm font-medium md:inline">
                  {greetName}
                </span>
              </button>
              {userMenu ? (
                <div className="absolute right-0 mt-2 w-56 rounded-xl border border-card-border bg-card p-1 shadow-lg">
                  <div className="border-b border-card-border px-3 py-2">
                    <p className="text-sm font-medium">Xin chào, {greetName}</p>
                    {username ? (
                      <p className="text-xs text-muted">@{username}</p>
                    ) : null}
                  </div>
                  <MenuItem href="/profile" icon={<User className="h-4 w-4" />}>
                    Trang cá nhân
                  </MenuItem>
                  <MenuItem
                    href="/bookmarks"
                    icon={<Bookmark className="h-4 w-4" />}
                  >
                    Bookmark
                  </MenuItem>
                  <MenuItem
                    href="/progress"
                    icon={<GraduationCap className="h-4 w-4" />}
                  >
                    Tiến độ học
                  </MenuItem>
                  {isAdmin ? (
                    <MenuItem
                      href="/admin"
                      icon={<LayoutDashboard className="h-4 w-4" />}
                    >
                      Admin Dashboard
                    </MenuItem>
                  ) : null}
                  <button
                    type="button"
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm hover:bg-accent-soft"
                    onClick={logout}
                  >
                    <LogOut className="h-4 w-4" /> Đăng xuất
                  </button>
                </div>
              ) : null}
            </div>
          ) : (
            <Button
              size="sm"
              className="hidden sm:inline-flex"
              onClick={() => openLogin(pathname)}
            >
              Đăng nhập
            </Button>
          )}

          <button
            type="button"
            className="rounded-xl p-2 hover:bg-accent-soft lg:hidden"
            aria-label={mobileOpen ? "Đóng menu" : "Mở menu"}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="border-t border-card-border bg-background px-4 py-3 lg:hidden">
          {isLoggedIn ? (
            <p className="mb-2 px-2.5 text-sm text-muted">
              Xin chào,{" "}
              <span className="font-medium text-foreground">{greetName}</span>
            </p>
          ) : null}
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            <NavLink href="/articles">Bài viết</NavLink>
            <NavLink href="/search">Tìm kiếm</NavLink>
            {isLoggedIn ? (
              <>
                <NavLink href="/progress">Tiến độ học</NavLink>
                <NavLink href="/bookmarks">Bookmark</NavLink>
                <NavLink href="/profile">Trang cá nhân</NavLink>
                {isAdmin ? <NavLink href="/admin">Admin</NavLink> : null}
                <button
                  type="button"
                  className="mt-1 rounded-lg px-2.5 py-1.5 text-left text-sm text-muted hover:bg-accent-soft hover:text-foreground"
                  onClick={logout}
                >
                  Đăng xuất
                </button>
              </>
            ) : (
              <Button className="mt-2" onClick={() => openLogin(pathname)}>
                Đăng nhập
              </Button>
            )}
          </nav>
        </div>
      ) : null}
    </header>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(`${href}/`);
  return (
    <Link
      href={href}
      className={cn(
        "rounded-lg px-2.5 py-1.5 text-sm text-muted transition hover:bg-accent-soft hover:text-foreground",
        active && "bg-accent-soft font-medium text-foreground",
      )}
    >
      {children}
    </Link>
  );
}

function MenuItem({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-accent-soft"
    >
      {icon}
      {children}
    </Link>
  );
}

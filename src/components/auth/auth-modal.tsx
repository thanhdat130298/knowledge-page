"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";
import { hasSupabasePublicConfig } from "@/lib/supabase/env";
import { sanitizeAuthRedirect } from "@/lib/slug";
import { X } from "lucide-react";
import Link from "next/link";

type AuthModalContextValue = {
  openLogin: (redirectTo?: string) => void;
  closeLogin: () => void;
};

const AuthModalContext = createContext<AuthModalContextValue | null>(null);

export function AuthModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [redirectTo, setRedirectTo] = useState("/");
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const openLogin = useCallback((next?: string) => {
    setRedirectTo(sanitizeAuthRedirect(next, "/"));
    setOpen(true);
    setError(null);
    setSuccess(null);
  }, []);

  const closeLogin = useCallback(() => setOpen(false), []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function handleGoogle() {
    setError(null);
    if (!hasSupabasePublicConfig()) {
      setError(
        "Chưa cấu hình Supabase. Thêm NEXT_PUBLIC_SUPABASE_URL và PUBLISHABLE_KEY vào .env.local.",
      );
      return;
    }
    setLoading(true);
    try {
      const supabase = createClient();
      const origin = window.location.origin;
      const { error: err } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${origin}/auth/callback?next=${encodeURIComponent(redirectTo)}`,
        },
      });
      if (err) setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!hasSupabasePublicConfig()) {
      setError(
        "Chưa cấu hình Supabase. Auth thật cần credentials trong .env.local.",
      );
      return;
    }
    setLoading(true);
    try {
      const supabase = createClient();
      if (mode === "login") {
        const { error: err } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (err) {
          setError(err.message);
          return;
        }
        setSuccess("Đăng nhập thành công");
        setOpen(false);
        window.location.href = redirectTo;
      } else {
        if (password !== confirmPassword) {
          setError("Mật khẩu xác nhận không khớp");
          return;
        }
        const { error: err } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { username },
            emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirectTo)}`,
          },
        });
        if (err) {
          setError(err.message);
          return;
        }
        setSuccess("Đăng ký thành công. Kiểm tra email để xác nhận.");
      }
    } finally {
      setLoading(false);
    }
  }

  const value = useMemo(
    () => ({ openLogin, closeLogin }),
    [openLogin, closeLogin],
  );

  return (
    <AuthModalContext.Provider value={value}>
      {children}
      {open ? (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/45 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="auth-modal-title"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeLogin();
          }}
        >
          <div className="relative w-full max-w-md rounded-2xl border border-card-border bg-card p-6 shadow-xl">
            <button
              type="button"
              aria-label="Đóng"
              className="absolute right-3 top-3 rounded-lg p-2 hover:bg-accent-soft"
              onClick={closeLogin}
            >
              <X className="h-4 w-4" />
            </button>
            <h2 id="auth-modal-title" className="font-display text-2xl font-semibold">
              {mode === "login" ? "Đăng nhập" : "Tạo tài khoản"}
            </h2>
            <p className="mt-1 text-sm text-muted">
              Đăng nhập để bình luận, bookmark và lưu tiến độ học.
            </p>

            <div className="mt-5 space-y-3">
              <Button
                className="w-full"
                variant="secondary"
                onClick={handleGoogle}
                disabled={loading}
              >
                Tiếp tục với Google
              </Button>
              <div className="relative text-center text-xs text-muted">
                <span className="bg-card px-2">hoặc email</span>
                <div className="absolute inset-x-0 top-1/2 -z-10 h-px bg-card-border" />
              </div>
              <form className="space-y-3" onSubmit={handleSubmit}>
                {mode === "register" ? (
                  <div>
                    <label className="mb-1 block text-sm" htmlFor="auth-username">
                      Username
                    </label>
                    <Input
                      id="auth-username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      autoComplete="username"
                    />
                  </div>
                ) : null}
                <div>
                  <label className="mb-1 block text-sm" htmlFor="auth-email">
                    Email
                  </label>
                  <Input
                    id="auth-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm" htmlFor="auth-password">
                    Mật khẩu
                  </label>
                  <Input
                    id="auth-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete={
                      mode === "login" ? "current-password" : "new-password"
                    }
                  />
                </div>
                {mode === "register" ? (
                  <div>
                    <label
                      className="mb-1 block text-sm"
                      htmlFor="auth-confirm"
                    >
                      Xác nhận mật khẩu
                    </label>
                    <Input
                      id="auth-confirm"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                ) : null}
                {error ? (
                  <p className="text-sm text-danger" role="alert">
                    {error}
                  </p>
                ) : null}
                {success ? (
                  <p className="text-sm text-success" role="status">
                    {success}
                  </p>
                ) : null}
                <Button className="w-full" type="submit" disabled={loading}>
                  {loading
                    ? "Đang xử lý..."
                    : mode === "login"
                      ? "Đăng nhập"
                      : "Đăng ký"}
                </Button>
              </form>
              <div className="flex items-center justify-between text-sm">
                <button
                  type="button"
                  className="text-accent underline-offset-2 hover:underline"
                  onClick={() =>
                    setMode((m) => (m === "login" ? "register" : "login"))
                  }
                >
                  {mode === "login"
                    ? "Chưa có tài khoản? Đăng ký"
                    : "Đã có tài khoản? Đăng nhập"}
                </button>
                <Link
                  href="/auth/forgot-password"
                  className="text-muted hover:text-foreground"
                  onClick={closeLogin}
                >
                  Quên mật khẩu?
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const ctx = useContext(AuthModalContext);
  if (!ctx) throw new Error("useAuthModal must be used within AuthModalProvider");
  return ctx;
}

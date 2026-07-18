"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";
import { hasSupabasePublicConfig } from "@/lib/supabase/env";
import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    if (!hasSupabasePublicConfig()) {
      setError("Cần cấu hình Supabase để gửi email reset mật khẩu.");
      return;
    }
    setLoading(true);
    try {
      const supabase = createClient();
      const { error: err } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });
      if (err) setError(err.message);
      else setMessage("Đã gửi email hướng dẫn đặt lại mật khẩu.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="font-display text-3xl font-semibold">Quên mật khẩu</h1>
      <form className="mt-6 space-y-3" onSubmit={submit}>
        <label className="block text-sm" htmlFor="email">
          Email
        </label>
        <Input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error ? <p className="text-sm text-danger">{error}</p> : null}
        {message ? <p className="text-sm text-success">{message}</p> : null}
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Đang gửi..." : "Gửi link reset"}
        </Button>
      </form>
      <Link href="/" className="mt-4 inline-block text-sm text-accent">
        Về trang chủ
      </Link>
    </div>
  );
}

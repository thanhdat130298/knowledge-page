import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { hasSupabasePublicConfig } from "@/lib/supabase/env";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getSiteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "http://localhost:3000"
  );
}

export function getAdminEmails(): string[] {
  return (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return getAdminEmails().includes(email.toLowerCase());
}

export function isSupabaseConfigured(): boolean {
  return hasSupabasePublicConfig();
}

export function readingTimeFromText(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function formatDate(iso: string | null | undefined): string {
  if (!iso) return "";
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}

export function absoluteUrl(path: string): string {
  const base = getSiteUrl();
  if (path.startsWith("http")) return path;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

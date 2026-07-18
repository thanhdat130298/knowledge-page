import slugifyLib from "slugify";

export function generateSlug(title: string): string {
  return slugifyLib(title, {
    lower: true,
    strict: true,
    locale: "vi",
    trim: true,
  });
}

export function isValidSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

export function isSafeAuthRedirect(path: string | null | undefined): boolean {
  if (!path) return false;
  if (!path.startsWith("/")) return false;
  if (path.startsWith("//")) return false;
  if (path.includes("://")) return false;
  return true;
}

export function sanitizeAuthRedirect(
  path: string | null | undefined,
  fallback = "/",
): string {
  return isSafeAuthRedirect(path) ? (path as string) : fallback;
}

import { isAdminEmail } from "@/lib/utils";
import type { Profile } from "@/types";

export async function getSessionUser() {
  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  } catch {
    return null;
  }
}

export async function getCurrentProfile(): Promise<Profile | null> {
  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    return data as Profile | null;
  } catch {
    return null;
  }
}

export async function requireAdmin() {
  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const email = user?.email ?? null;
    const admin = isAdminEmail(email);
    if (!user || !admin) {
      return { user: null, isAdmin: false, email };
    }
    return { user, isAdmin: true, email };
  } catch {
    return { user: null, isAdmin: false, email: null };
  }
}

export function checkAdminEmail(email: string | null | undefined) {
  return isAdminEmail(email);
}

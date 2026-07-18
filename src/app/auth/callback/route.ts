import { sanitizeAuthRedirect } from "@/lib/slug";
import { hasSupabasePublicConfig } from "@/lib/supabase/env";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = sanitizeAuthRedirect(searchParams.get("next"), "/");

  if (!hasSupabasePublicConfig()) {
    return NextResponse.redirect(
      `${origin}/auth/login?error=supabase_not_configured`,
    );
  }

  if (code) {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/auth/login?error=auth`);
}

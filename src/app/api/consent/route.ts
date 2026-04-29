import { NextResponse } from "next/server";
import { createHash } from "crypto";
import { supabase } from "@/lib/supabase";

const SALT = process.env.CONSENT_HASH_SALT ?? "agentforge-consent-salt-2026";

function anonymousId(ip: string, userAgent: string): string {
  return createHash("sha256")
    .update(`${ip}:${userAgent}:${SALT}`)
    .digest("hex")
    .slice(0, 32);
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ success: false, error: "Invalid body" }, { status: 400 });
  }

  const { categories, action, userAgent = "" } = body as {
    categories?: Record<string, boolean>;
    action?: string;
    userAgent?: string;
  };

  if (!categories || !action) {
    return NextResponse.json(
      { success: false, error: "Missing required fields" },
      { status: 400 }
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  const anonId = anonymousId(ip, userAgent);

  // Supabase is optional — if not configured, silently succeed
  if (supabase) {
    const { error } = await supabase.from("consent_logs").insert([
      {
        anonymous_id: anonId,
        consent_version: "1.0",
        categories,
        action,
        user_agent: userAgent.slice(0, 512),
      },
    ]);

    if (error) {
      // Table may not exist yet — non-fatal
      console.warn("consent_logs insert failed:", error.message);
    }
  }

  return NextResponse.json({ success: true });
}

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";
import { createHubSpotContact } from "@/lib/hubspot";
import { sendLeadNotification } from "@/lib/slack";
import { sendConfirmationEmail, sendTeamNotification } from "@/lib/email";
import type { Lead } from "@/types";

// ── GET /api/leads — admin only ──────────────────────────────────────────────

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const auth = cookieStore.get("admin_auth");
  if (!auth || auth.value !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!supabase) {
    return NextResponse.json({ error: "Supabase non configurato." }, { status: 500 });
  }

  const url = new URL(request.url);
  const status = url.searchParams.get("status");

  let query = supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);

  if (status && status !== "Tutti") {
    query = query.eq("status", status);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ leads: data ?? [] });
}

const companyEmailPatterns = [/gmail\.com$/i, /yahoo\.com$/i, /hotmail\.com$/i, /outlook\.com$/i, /live\.com$/i];

function isCompanyEmail(email: string) {
  return !companyEmailPatterns.some((pattern) => pattern.test(email));
}

function calculateScore(payload: { email: string; company?: string; message?: string; interest: string }) {
  let score = 50;
  if (isCompanyEmail(payload.email)) score += 10;
  if (payload.company?.trim()) score += 10;
  if ((payload.message?.trim()?.length ?? 0) > 50) score += 10;
  if (payload.interest && !/non so ancora|not-sure/i.test(payload.interest)) score += 5;
  return score;
}

function parseUtm(referer?: string) {
  const result = {
    utm_source: undefined as string | undefined,
    utm_medium: undefined as string | undefined,
    utm_campaign: undefined as string | undefined,
    source_page: undefined as string | undefined,
  };

  if (!referer) {
    return result;
  }

  try {
    const url = new URL(referer);
    result.utm_source = url.searchParams.get("utm_source") || undefined;
    result.utm_medium = url.searchParams.get("utm_medium") || undefined;
    result.utm_campaign = url.searchParams.get("utm_campaign") || undefined;
    result.source_page = url.href;
  } catch (error) {
    console.warn("Unable to parse referer for UTM:", error);
  }

  return result;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ success: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const { name, email, company, interest, message } = body as {
    name?: string;
    email?: string;
    company?: string;
    interest?: string;
    message?: string;
  };

  if (!name?.trim() || !email?.trim()) {
    return NextResponse.json({ success: false, error: "Name and email are required." }, { status: 400 });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return NextResponse.json({ success: false, error: "Invalid email address." }, { status: 400 });
  }

  const score = calculateScore({ email, company, message, interest: interest || "" });
  const { utm_source, utm_medium, utm_campaign, source_page } = parseUtm(request.headers.get("referer") || undefined);

  const lead: Lead = {
    name: name.trim(),
    email: email.trim(),
    company: company?.trim() || "",
    interest: interest?.trim() || "",
    message: message?.trim() || "",
    score,
    utm_source,
    utm_medium,
    utm_campaign,
    source_page,
  };

  if (!supabase) {
    return NextResponse.json(
      { success: false, error: "Supabase is not configured." },
      { status: 500 }
    );
  }

  const { data, error } = await supabase.from("leads").insert([lead]).select("id").single();

  if (error || !data) {
    console.error("Supabase lead insert failed:", error);
    return NextResponse.json({ success: false, error: "Unable to save lead." }, { status: 500 });
  }

  const leadWithId = { ...lead, id: data.id } as Lead;

  createHubSpotContact(leadWithId).catch(() => null);
  sendLeadNotification(leadWithId).catch(() => null);
  sendConfirmationEmail(leadWithId).catch(() => null);
  sendTeamNotification(leadWithId).catch(() => null);

  return NextResponse.json({ success: true, id: data.id });
}
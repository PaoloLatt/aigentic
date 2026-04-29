import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";

const VALID_STATUSES = [
  "Nuovo",
  "Contattato",
  "In trattativa",
  "Chiuso vinto",
  "Chiuso perso",
] as const;

type Status = (typeof VALID_STATUSES)[number];

// ── PATCH /api/leads/[id] — update lead status ───────────────────────────────

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const cookieStore = await cookies();
  const auth = cookieStore.get("admin_auth");
  if (!auth || auth.value !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json().catch(() => null);
  const { status } = (body ?? {}) as { status?: string };

  if (!status || !VALID_STATUSES.includes(status as Status)) {
    return NextResponse.json({ error: "Status non valido." }, { status: 400 });
  }

  if (!supabase) {
    return NextResponse.json({ error: "Supabase non configurato." }, { status: 500 });
  }

  const { error } = await supabase
    .from("leads")
    .update({ status })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const cookieStore = await cookies();
  const auth = cookieStore.get("admin_auth");
  if (!auth || auth.value !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!supabase) {
    return NextResponse.json({ error: "Supabase non configurato." }, { status: 500 });
  }

  // Logs (last 100)
  const { data: logs, error: logsError } = await supabase
    .from("consent_logs")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  if (logsError) {
    return NextResponse.json({ error: logsError.message }, { status: 500 });
  }

  // Stats for current month
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const { data: monthData } = await supabase
    .from("consent_logs")
    .select("action, categories")
    .gte("created_at", startOfMonth.toISOString());

  const total = monthData?.length ?? 0;
  const stats = {
    total,
    accept_all: monthData?.filter((d) => d.action === "accept_all").length ?? 0,
    reject_all: monthData?.filter((d) => d.action === "reject_all").length ?? 0,
    custom: monthData?.filter((d) => d.action === "custom").length ?? 0,
    analytics_pct:
      total > 0
        ? Math.round(
            ((monthData?.filter((d) => d.categories?.analytics).length ?? 0) / total) * 100
          )
        : 0,
    marketing_pct:
      total > 0
        ? Math.round(
            ((monthData?.filter((d) => d.categories?.marketing).length ?? 0) / total) * 100
          )
        : 0,
    functional_pct:
      total > 0
        ? Math.round(
            ((monthData?.filter((d) => d.categories?.functional).length ?? 0) / total) * 100
          )
        : 0,
  };

  return NextResponse.json({ logs: logs ?? [], stats });
}

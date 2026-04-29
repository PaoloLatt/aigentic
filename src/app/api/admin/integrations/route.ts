import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const auth = cookieStore.get("admin_auth");
  if (!auth || auth.value !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Check which env vars are actually set (never expose values, only boolean)
  const status = {
    hubspot_crm: !!process.env.HUBSPOT_ACCESS_TOKEN,
    slack: !!process.env.SLACK_WEBHOOK_URL,
    resend: !!process.env.RESEND_API_KEY,
    gtm: !!process.env.NEXT_PUBLIC_GTM_ID,
    google_ads: !!process.env.NEXT_PUBLIC_GOOGLE_ADS_ID,
    meta_pixel: !!process.env.NEXT_PUBLIC_META_PIXEL_ID,
    hubspot_tracking: !!process.env.NEXT_PUBLIC_HUBSPOT_ID,
  };

  return NextResponse.json({ status });
}

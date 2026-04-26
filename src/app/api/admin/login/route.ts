import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const { password } = body as { password?: string };

  const adminPassword = process.env.ADMIN_PASSWORD ?? "admin2026";

  if (!password || password !== adminPassword) {
    return NextResponse.json(
      { error: "Password non corretta." },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set("admin_auth", "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 giorni
    path: "/",
  });
  return response;
}

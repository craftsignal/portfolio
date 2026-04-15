import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { createAuthToken } from "@/lib/site-auth";

const COOKIE = "site_auth";

export async function POST(request: Request) {
  const secret = process.env.SITE_AUTH_SECRET;
  const expectedPassword = process.env.SITE_PASSWORD;

  if (!secret || !expectedPassword) {
    return NextResponse.json(
      { error: "Server is not configured for site auth." },
      { status: 500 },
    );
  }

  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  if (body.password !== expectedPassword) {
    return NextResponse.json({ error: "Wrong password" }, { status: 401 });
  }

  const token = await createAuthToken(secret);
  const store = await cookies();
  store.set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 60,
  });

  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  const secret = process.env.SITE_AUTH_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Not configured" }, { status: 500 });
  }

  const store = await cookies();
  store.delete(COOKIE);

  return NextResponse.json({ ok: true });
}

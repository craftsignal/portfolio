import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { verifyAuthToken } from "@/lib/site-auth";

const COOKIE = "site_auth";

function allowPublic(pathname: string): boolean {
  if (pathname === "/login") return true;
  if (pathname.startsWith("/api/site-auth")) return true;
  if (pathname.startsWith("/_next")) return true;
  if (pathname === "/favicon.ico") return true;
  if (/\.(ico|png|jpe?g|gif|svg|webp|mp4|webm|pdf|html|txt|webmanifest)$/i.test(pathname)) {
    return true;
  }
  return false;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (allowPublic(pathname)) {
    return NextResponse.next();
  }

  const secret = process.env.SITE_AUTH_SECRET;
  const token = request.cookies.get(COOKIE)?.value;

  if (await verifyAuthToken(token, secret)) {
    return NextResponse.next();
  }

  const login = new URL("/login", request.url);
  login.searchParams.set("from", pathname + request.nextUrl.search);
  return NextResponse.redirect(login);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image).*)",
  ],
};

import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@shared/auth";

const PUBLIC_FILE = /\.(.*)$/;

export async function proxy(req: NextRequest) {
  const { nextUrl, method } = req;

  // 1️⃣ Skip static files & internals
  if (
    PUBLIC_FILE.test(nextUrl.pathname) ||
    nextUrl.pathname.startsWith("/_next") ||
    nextUrl.pathname === "/favicon.ico" ||
    nextUrl.pathname === "/robots.txt" ||
    nextUrl.pathname.startsWith("/sitemap")
  ) {
    return NextResponse.next();
  }

  // 2️⃣ Fetch session (Better Auth way)
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const role = session?.user?.role;
  const isAdmin = role === "admin" || role === "owner";

  const isApiRoute = nextUrl.pathname.startsWith("/api");
  const isPage = !isApiRoute;

  // 3️⃣ Unauthorized logic
  if (!isAdmin) {
    // API or non-GET page
    if (isApiRoute || (isPage && method !== "GET")) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Normal page → rewrite
    if (nextUrl.pathname !== "/unauthorized") {
      const unauthorizedUrl = new URL("/unauthorized", nextUrl.origin);
      unauthorizedUrl.searchParams.set(
        "next",
        nextUrl.pathname + nextUrl.search
      );

      return NextResponse.rewrite(unauthorizedUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:png|jpg|jpeg|svg|webp|ico|css|js|txt|woff2?)|api/auth).*)",
  ],
};

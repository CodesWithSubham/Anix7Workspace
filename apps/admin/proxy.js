import { NextResponse } from "next/server";
import { auth } from "@shared/lib/auth";

const PUBLIC_FILE = /\.(.*)$/;

export default auth(async (req) => {
  const { nextUrl, method } = req;

  const isAdmin =
    req.auth?.user?.role === "admin" || req.auth?.user?.role === "owner";

  // Skip static files and Next.js internals
  if (
    PUBLIC_FILE.test(nextUrl.pathname) ||
    nextUrl.pathname.startsWith("/_next") ||
    nextUrl.pathname.startsWith("/favicon.ico") ||
    nextUrl.pathname.startsWith("/robots.txt") ||
    nextUrl.pathname.startsWith("/sitemap")
  ) {
    return NextResponse.next();
  }

  const isApiRoute = nextUrl.pathname.startsWith("/api");
  const isPage = !isApiRoute;

  // If not authenticated as admin/owner
  if (!isAdmin) {
    // If it's an API route or a page request with method !== GET
    if (isApiRoute || (isPage && method !== "GET")) {
      return new NextResponse(
        JSON.stringify({ success: false, message: "Unauthorized" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // For normal page access (GET), show unauthorized page
    if (nextUrl.pathname !== "/unauthorized") {
      const unauthorizedUrl = new URL("/unauthorized", nextUrl.origin);
      unauthorizedUrl.searchParams.set("next", nextUrl.pathname + nextUrl.search);
      return NextResponse.rewrite(unauthorizedUrl); // rewrite instead of redirect
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:png|jpg|jpeg|svg|webp|ico|css|js|txt|woff2?)|api/auth).*)",
  ],
};

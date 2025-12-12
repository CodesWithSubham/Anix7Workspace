import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const origin = req.headers.get("origin");

  const isDev = process.env.NODE_ENV === "development";

  let allowOrigin = "";

  if (isDev) {
    // ✅ Allow ALL in dev
    allowOrigin = origin ?? "*";
  } else {
    // ✅ Allow all subdomains in prod
    if (origin && origin.endsWith(".anix7.com")) {
      allowOrigin = origin;
    }
  }

  const res = NextResponse.next();

  if (allowOrigin) {
    res.headers.set("Access-Control-Allow-Origin", allowOrigin);
    res.headers.set("Access-Control-Allow-Credentials", "true");
    res.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    res.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
  }

  // Handle preflight
  if (req.method === "OPTIONS") {
    return new NextResponse(null, { headers: res.headers });
  }

  return res;
}

export const config = {
  matcher: ["/api/auth/:path*"],
};

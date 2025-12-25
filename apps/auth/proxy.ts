import { NextRequest, NextResponse } from "next/server";

function getHostname(origin: string): string | null {
  try {
    return new URL(origin).hostname;
  } catch {
    return null;
  }
}

function isDomainAllowed(hostname: string, allowed: string) {
  // wildcard support (*.anix7.in)
  if (allowed.startsWith("*.")) {
    const root = allowed.slice(2);
    return hostname === root || hostname.endsWith(`.${root}`);
  }

  // exact match
  return hostname === allowed;
}

export function proxy(req: NextRequest) {
  const origin = req.headers.get("origin");

  const allowedDomains =
    process.env.ALLOW_AUTH_ORIGIN_DIVIDE_BY_COMMA?.split(",")
      .map((d) => d.trim())
      .filter(Boolean) ?? [];

  let allowOrigin = "";

  if (origin) {
    const hostname = getHostname(origin);

    if (hostname) {
      const allowed = allowedDomains.some((domain) => isDomainAllowed(hostname, domain));

      if (allowed) {
        allowOrigin = origin;
      }
    }
  }

  const res = NextResponse.next();

  if (allowOrigin) {
    res.headers.set("Access-Control-Allow-Origin", allowOrigin);
    res.headers.set("Access-Control-Allow-Credentials", "true");
    res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.headers.set("Access-Control-Allow-Methods", "GET, POST");
  }

  return res;
}

export const config = {
  matcher: ["/api/auth/:path*"],
};

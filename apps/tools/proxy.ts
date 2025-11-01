// middleware.js

import { NextResponse } from "next/server";
import { auth } from "@shared/lib/auth";

export default auth(async (req) => {
  if (!req.auth && req.nextUrl.pathname !== "/") {
    const nextPath = req.nextUrl.pathname + req.nextUrl.search; // Preserve the original path and query
    const redirectUrl = new URL("/", req.nextUrl.origin);

    // Append the original path as `next` query parameter
    redirectUrl.searchParams.set("next", nextPath);
    redirectUrl.searchParams.set("openLogin", "1");

    return NextResponse.redirect(redirectUrl);
  }
});

export const config = {
  matcher: [
    "/(billing|invite|setting|admin|profile|image-uploading/my-uploads)(.*)",
  ],
};

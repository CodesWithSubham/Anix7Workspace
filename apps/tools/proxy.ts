import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@shared/auth";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    const nextPath = request.nextUrl.pathname + request.nextUrl.search;

    const redirectUrl = new URL("/", request.nextUrl.origin);
    redirectUrl.searchParams.set("next", nextPath);
    redirectUrl.searchParams.set("openLogin", "1");

    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/(billing|invite|setting|admin|profile|image-uploading/my-uploads)(.*)"],
};

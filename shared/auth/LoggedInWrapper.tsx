// components/LoggedInWrapper.js
"use client";

import { useSession } from "@shared/auth/client";
import { useRouter } from "next/navigation";

export function IfLoggedIn({ children }: React.PropsWithChildren<{}>) {
  const { data: session, isPending } = useSession();

  if (isPending) return null; // optional: show nothing during loading
  if (!session) return null;

  return <>{children}</>;
}

export function IfLoggedOut({ children }: React.PropsWithChildren<{}>) {
  const { data: session, isPending } = useSession();

  if (isPending) return null;
  if (session) return null;

  return <>{children}</>;
}

export function RedirectIfLoggedOut({
  children,
  url = "/",
}: React.PropsWithChildren<{ url?: string }>) {
  const { data: session, isPending } = useSession();

  if (isPending) return null; // optional: show nothing during loading
  const router = useRouter();
  if (!session) {
    router.push(url);
    return null;
  }

  return <>{children}</>;
}

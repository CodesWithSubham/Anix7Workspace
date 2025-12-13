import { useSession } from "@shared/auth/client";
import { useRouter } from "next/navigation";

// /app/(pages)/layout.js
export default function PagesLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  const router = useRouter();

  if (session?.user) router.replace("/");
  return <>{children}</>;
}

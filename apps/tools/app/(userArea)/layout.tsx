// /app/(pages)/layout.js
import { IfLoggedIn } from "@shared/auth/LoggedInWrapper";
import MobileMenu from "@shared/components/navigation/MobileMenu";

export default function PagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <IfLoggedIn>
        <MobileMenu />
      </IfLoggedIn>
    </>
  );
}

import ErudaScript from "@shared/components/Eruda";
import { SessionProvider } from "next-auth/react";
import ToastProvider from "./ToastProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SessionProvider>
          {children}

          {process.env.NODE_ENV === "development" && <ErudaScript />}

          <ToastProvider />
      </SessionProvider>
    </>
  );
}

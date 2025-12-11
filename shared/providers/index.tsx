import ErudaScript from "@shared/components/Eruda";
import ToastProvider from "./ToastProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}

      {process.env.NODE_ENV === "development" && <ErudaScript />}

      <ToastProvider />
    </>
  );
}

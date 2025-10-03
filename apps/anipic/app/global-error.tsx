// app/global-error.ts

// Error boundaries must be Client Components
"use client";
import GlobalErrorLayout from "@shared/components/errors/GlobalErrorLayout";

export default function GlobalError({ error }: { error: Error }) {
  return <GlobalErrorLayout error={error} />;
}

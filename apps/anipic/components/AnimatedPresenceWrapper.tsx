// components/AnimatedPresenceWrapper.tsx
"use client";
import { AnimatePresence } from "motion/react";

export default function AnimatedPresenceWrapper({ children }: { children: React.ReactNode }) {
  return <AnimatePresence mode="wait">{children}</AnimatePresence>;
}

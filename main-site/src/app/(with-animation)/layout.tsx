"use client";
import { LazyMotion, domMax } from "framer-motion";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <LazyMotion features={domMax}>{children}</LazyMotion>;
}

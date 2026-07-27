import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "China Travel Planning Tools",
  description:
    "Use practical China travel planning tools: budget estimators, language phrasebooks, and route or timing calculators built for independent travelers.",
  alternates: { canonical: "/tools" },
};

export default function ToolsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
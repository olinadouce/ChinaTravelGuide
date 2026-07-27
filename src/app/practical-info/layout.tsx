import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "China Travel Practical Information",
  description:
    "Essential China travel practical information covering accommodation, medical care, food culture, transportation, payment, and language basics for international visitors.",
  alternates: { canonical: "/practical-info" },
};

export default function PracticalInfoLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
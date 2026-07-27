import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "China Travel Stories and Traveler Experiences",
  description:
    "Read and share China travel experiences, destination ideas, food discoveries, route feedback, and practical tips from travelers.",
  alternates: { canonical: "/forum" },
};

export default function ForumLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}

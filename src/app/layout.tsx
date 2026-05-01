import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/hooks/useTheme";
import { MockAuthProvider } from "@/components/auth/MockAuthProvider";

export const metadata: Metadata = {
  title: "China Travel Guide | Travel China with Confidence",
  description:
    "A modern China inbound-travel website for overseas visitors, with destinations, routes, practical guidance, and planning tools.",
  keywords:
    "China travel, China itinerary, China tourism website, overseas visitors to China, Beijing, Shanghai, Xi'an, Chengdu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <MockAuthProvider>
            <Navigation />
            <main>{children}</main>
            <Footer />
          </MockAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

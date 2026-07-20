import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/hooks/useTheme";
import { FirebaseAuthProvider } from "@/components/auth/FirebaseAuthProvider";

export const metadata: Metadata = {
  title: "China Travel Guide | Travel China with Confidence",
  description:
    "A modern China inbound-travel website for overseas visitors, with destinations, routes, practical guidance, and planning tools.",
  keywords:
    "China travel, China itinerary, China tourism website, overseas visitors to China, Beijing, Shanghai, Xi'an, Chengdu",
};

const themeBootstrapScript = `
  (() => {
    try {
      const stored = localStorage.getItem('theme');
      const theme = stored === 'light' || stored === 'dark' || stored === 'system' ? stored : 'system';
      const resolved = theme === 'system'
        ? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
        : theme;
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(resolved);
      document.documentElement.style.colorScheme = resolved;
    } catch {}
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrapScript }} />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <FirebaseAuthProvider>
            <Navigation />
            <main>{children}</main>
            <Footer />
          </FirebaseAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

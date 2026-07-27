import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/hooks/useTheme";
import { FirebaseAuthProvider } from "@/components/auth/FirebaseAuthProvider";
import { AITravelAssistant } from "@/components/ai/AITravelAssistant";
import { FirebaseAnalytics } from "@/components/analytics/FirebaseAnalytics";

export const metadata: Metadata = {
  metadataBase: new URL("https://cchinaroute.com"),
  title: {
    default: "See China Route | Practical China Travel Guides",
    template: "%s | See China Route",
  },
  description:
    "Plan an independent trip to China with curated routes, practical travel guidance, community stories, and trusted third-party booking links.",
  applicationName: "See China Route",
  keywords:
    "China travel, China itinerary, China travel guide, international travelers, China booking links, China practical information",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://cchinaroute.com",
    siteName: "See China Route",
    title: "See China Route | Practical China Travel Guides",
    description:
      "Curated China routes, practical guidance, community stories, and trusted booking links for international travelers.",
  },
  twitter: {
    card: "summary_large_image",
    title: "See China Route | Practical China Travel Guides",
    description:
      "Curated China routes, practical guidance, community stories, and trusted booking links for international travelers.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  // After obtaining the Search Console HTML-tag token, uncomment and replace:
  // verification: {
  //   google: "REPLACE_WITH_GOOGLE_SEARCH_CONSOLE_TOKEN",
  // },
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
            <FirebaseAnalytics />
            <Navigation />
            <main>{children}</main>
            <Footer />
            {/* Floating AI widget; hidden where auth/admin or the full-page AI tool is shown. */}
            <AITravelAssistant />
          </FirebaseAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

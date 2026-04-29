import type { Metadata, Viewport } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import { CookieConsentProvider } from "@/lib/cookie-consent";
import Analytics from "@/components/shared/analytics";
import CookieBanner from "@/components/shared/cookie-banner";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "AgentForge — Agenti AI per PMI",
    template: "%s | AgentForge",
  },
  description:
    "Progettiamo agenti AI che automatizzano marketing, vendite e customer service per PMI italiane. ROI misurabile, deploy in meno di 4 settimane.",
  authors: [{ name: "AgentForge" }],
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName: "AgentForge",
    title: "AgentForge — Agenti AI per PMI",
    description:
      "Agenti AI su misura per Marketing, Sales e Customer Service. Automatizza i processi, libera il team.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AgentForge — Agenti AI per PMI",
    description:
      "Progettiamo agenti AI per PMI italiane. ROI misurabile in meno di 4 settimane.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050507",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="it"
      className={`${dmSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CookieConsentProvider>
          {/* Consent Mode defaults (beforeInteractive) + conditional script loading */}
          <Analytics />
          {/* GDPR banner + floating preferences button */}
          <CookieBanner />
          {children}
        </CookieConsentProvider>
      </body>
    </html>
  );
}

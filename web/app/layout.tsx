import { ThemeProvider } from "@/contexts/theme-context";
import { Geist } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { defaultUrl } from "@/constants/url";
import { headers } from "next/headers";
import Script from "next/script";
import { NextStepProvider } from "nextstepjs";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Logal",
  description: "Build better habits through mindful journaling, reflection, and self-tracking.",
  keywords: [
    "journaling",
    "self-improvement",
    "habit tracker",
    "mental clarity",
    "daily log",
    "personal growth"
  ],
  openGraph: {
    title: "Logal - Journal Your Way to a Better You",
    description: "Track habits, reflect on your day, and grow intentionally with Logal.",
    url: defaultUrl,
    siteName: "Logal",
    images: [
      {
        url: `${defaultUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Logal Banner"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Logal - Journal Your Way to a Better You",
    description: "Track habits, reflect on your day, and grow intentionally with Logal.",
    images: [`${defaultUrl}/og-image.png`]
  }
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"]
});

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nonce = (await headers()).get("x-nonce") || undefined;

  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <Script
          src="https://accounts.google.com/gsi/client"
          strategy="afterInteractive"
          nonce={nonce}
        />
        <a
          href="#main-content"
          className="bg-primary z-999 text-md text-primary-foreground sr-only rounded-br-md focus:not-sr-only focus:absolute focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <ThemeProvider disableTransitionOnChange nonce={nonce}>
          <NextStepProvider>{children}</NextStepProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

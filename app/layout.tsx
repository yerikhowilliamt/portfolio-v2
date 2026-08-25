import type { Metadata } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";

import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Technical Portfolio",
    template: "%s | Technical Portfolio",
  },
  description:
    "An evidence-led full-stack TypeScript portfolio focused on system correctness and explicit engineering trade-offs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${plusJakartaSans.variable} ${jetBrainsMono.variable}`}>
        <Button asChild className="fixed top-4 left-4 z-50 -translate-y-24 focus:translate-y-0">
          <a href="#main-content">Skip to main content</a>
        </Button>
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}

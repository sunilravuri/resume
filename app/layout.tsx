import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { profile } from "@/data/profile";
import { DEFAULT_PALETTE, PALETTES, paletteCss, paletteInitScript } from "@/lib/palettes";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  title: `${profile.name} | GenAI & Agentic AI Engineer · Cloud/DB Infrastructure`,
  description: profile.summary,
  openGraph: {
    title: `${profile.name} | AI-Native Portfolio`,
    description: profile.valueProposition,
    type: "profile",
  },
};

export const viewport: Viewport = {
  themeColor: PALETTES.find((p) => p.id === DEFAULT_PALETTE)!.themeColor,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning: the init script sets data-theme before React hydrates.
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <head>
        <style id="palettes" dangerouslySetInnerHTML={{ __html: paletteCss() }} />
        <script dangerouslySetInnerHTML={{ __html: paletteInitScript() }} />
      </head>
      <body className="min-h-screen bg-ink-950 font-sans text-ink-300 antialiased selection:bg-primary-500/30 selection:text-primary-100">
        {children}
      </body>
    </html>
  );
}

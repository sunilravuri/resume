import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { profile } from "@/data/profile";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  title: `${profile.name} | Gen-AI Product Engineer & Cloud/DB Architect`,
  description: profile.summary,
  openGraph: {
    title: `${profile.name} | AI-Native Portfolio`,
    description: profile.valueProposition,
    type: "profile",
  },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="min-h-screen bg-zinc-950 font-sans text-zinc-300 antialiased selection:bg-emerald-500/30 selection:text-emerald-100">
        {children}
      </body>
    </html>
  );
}

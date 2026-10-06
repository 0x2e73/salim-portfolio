import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Instrument_Serif } from "next/font/google";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Cursor } from "@/components/cursor";
import "./globals.css";

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Salim Mouttaki · Développeur full-stack",
  description:
    "Développeur full-stack à Genève. Je livre des produits qui tournent en production, et je construis les workflows IA qui les rendent fiables.",
  metadataBase: new URL("https://salim-mouttaki.vercel.app"),
  openGraph: {
    title: "Salim Mouttaki · Développeur full-stack",
    description: "Produits en production. Workflows IA fiables.",
    locale: "fr_CH",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#070708",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${GeistSans.variable} ${GeistMono.variable} ${serif.variable}`}>
      <body className="font-sans">
        <SmoothScroll />
        <Cursor />
        <div className="grain" aria-hidden />
        {children}
      </body>
    </html>
  );
}

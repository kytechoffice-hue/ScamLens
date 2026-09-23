import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/AppShell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ScamLens India | Cyber Threat Intelligence Dashboard",
  description: "Monitor online scams, phishing, UPI fraud, cyber threats and reported scam activity across India with ScamLens.",
  keywords: [
    "ScamLens India", 
    "India Cyber Threat Intelligence", 
    "UPI fraud detection", 
    "Digital arrest scam", 
    "phishing check India", 
    "cyber crime monitoring dashboard", 
    "website safety audit", 
    "SOC dashboard India"
  ],
  openGraph: {
    title: "ScamLens India | Cyber Threat Intelligence Dashboard",
    description: "Monitor online scams, phishing, UPI fraud, cyber threats and reported scam activity across India with ScamLens.",
    url: "https://scamlens.kytechserv.com/",
    siteName: "ScamLens India",
    type: "website",
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 selection:bg-amber-500 selection:text-white">
        <AppShell>
          {children}
        </AppShell>
      </body>
    </html>
  );
}

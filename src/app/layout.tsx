import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import DashboardShell from "@/components/DashboardShell";
import Footer from "@/components/Footer";

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
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}>
      <body className="min-h-full flex flex-col bg-[#070a0f] text-slate-100 selection:bg-cyan-500 selection:text-black">
        {/* Background Cyber Grid & Radar Glow */}
        <div className="fixed inset-0 cyber-grid pointer-events-none opacity-40 z-0" />
        <div className="fixed inset-0 radial-glow pointer-events-none z-0" />
        <div className="fixed inset-0 radar-glow-rose pointer-events-none z-0" />

        {/* Global Dashboard Shell (Header + Collapsible Sidebar + Main Content) */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <DashboardShell>
            <div className="flex-1 flex flex-col">
              {children}
            </div>
            <Footer />
          </DashboardShell>
        </div>
      </body>
    </html>
  );
}

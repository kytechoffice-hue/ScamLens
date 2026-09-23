"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { 
  Search, 
  Bell, 
  User, 
  Settings, 
  Menu, 
  X, 
  Radio, 
  ShieldAlert, 
  ExternalLink,
  Clock,
  CheckCircle,
  AlertTriangle
} from "lucide-react";
import { LIVE_INDIA_THREAT_FEED } from "@/data/dashboardDemoData";

interface DashboardHeaderProps {
  onToggleSidebar?: () => void;
  sidebarCollapsed?: boolean;
}

export default function DashboardHeader({ onToggleSidebar, sidebarCollapsed }: DashboardHeaderProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);

  // Live IST/UTC Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const istString = now.toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      const utcString = now.toISOString().substring(11, 19);
      setCurrentTime(`${istString} IST`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(`/check?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#080d16]/95 backdrop-blur-md border-b border-slate-800/80 shadow-lg">
      <div className="px-3 sm:px-6 py-2.5 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Mobile Toggle + ScamLens Brand */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={onToggleSidebar}
            type="button"
            className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-800/80 transition-colors focus:outline-none"
            aria-label="Toggle navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-900 p-0.5 border border-cyan-500/40 shadow-xs flex items-center justify-center overflow-hidden group-hover:border-cyan-400 transition-all">
              <Image 
                src="/logo.png" 
                alt="ScamLens Emblem" 
                width={36} 
                height={36} 
                className="w-full h-full object-contain rounded-full"
                priority
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base sm:text-lg font-black tracking-tight text-white flex items-center">
                  SCAM<span className="text-cyan-400">LENS</span>
                </span>
                <span className="hidden lg:inline-flex text-[9px] uppercase font-mono px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 font-semibold tracking-wider">
                  SOC v1.0
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono tracking-wider -mt-0.5 hidden sm:block">
                India Cyber Threat Intelligence
              </p>
            </div>
          </Link>
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-2xl mx-1 sm:mx-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="w-4 h-4 text-cyan-400/70 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search domain, URL, phone number, UPI ID, email or crypto address..."
              className="w-full pl-9 pr-14 sm:pr-20 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-200 placeholder:text-slate-500 text-xs font-mono focus:border-cyan-500 focus:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-cyan-500/40 transition-all"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-[10px] font-mono border border-cyan-500/30 transition-colors hidden sm:block"
            >
              SCAN ↵
            </button>
          </form>
        </div>

        {/* Right: Operational Indicators & Quick Actions */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Live Clock */}
          <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 text-xs font-mono">
            <Clock className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>{currentTime || "LIVE IST"}</span>
          </div>

          {/* India Regional Indicator */}
          <div className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-200 text-xs font-mono font-semibold">
            <span className="text-sm">🇮🇳</span>
            <span className="hidden sm:inline text-slate-300 text-[11px] tracking-wide">INDIA</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping hidden md:inline-block" />
          </div>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setNotificationsOpen(!notificationsOpen);
                if (!notificationsOpen) setUnreadCount(0);
              }}
              className="relative p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
              title="Threat Alerts"
              aria-label="Threat Alerts"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-[#080d16] animate-pulse" />
              )}
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-4 z-50 animate-in fade-in-50 duration-150">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Radio className="w-4 h-4 text-rose-400 animate-pulse" />
                    <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                      Live Threat Broadcast
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                    Active Feed
                  </span>
                </div>

                <div className="mt-3 space-y-2 max-h-72 overflow-y-auto pr-1">
                  {LIVE_INDIA_THREAT_FEED.slice(0, 4).map((feed) => (
                    <div
                      key={feed.id}
                      className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                        <span className="text-slate-400 font-semibold">{feed.time} IST</span>
                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                          feed.severity === "CRITICAL"
                            ? "bg-rose-950 text-rose-400 border border-rose-800/60"
                            : "bg-amber-950 text-amber-400 border border-amber-800/60"
                        }`}>
                          {feed.severity}
                        </span>
                      </div>
                      <p className="text-xs text-slate-200 font-medium line-clamp-1">{feed.threatType}</p>
                      <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5">{feed.description}</p>
                      <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                        <span>📍 {feed.location}</span>
                        <Link 
                          href={`/check?q=${encodeURIComponent(feed.target)}`} 
                          onClick={() => setNotificationsOpen(false)}
                          className="text-cyan-400 hover:underline flex items-center gap-1"
                        >
                          Audit <ExternalLink className="w-2.5 h-2.5" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                  <Link
                    href="/scams"
                    onClick={() => setNotificationsOpen(false)}
                    className="text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    View All Flagged Incidents →
                  </Link>
                  <button 
                    onClick={() => setNotificationsOpen(false)}
                    className="text-slate-400 hover:text-white"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Settings Icon */}
          <Link
            href="/account?tab=settings"
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
            title="System Operations & Settings"
            aria-label="Settings"
          >
            <Settings className="w-4 h-4" />
          </Link>

          {/* User/Profile Icon */}
          <Link
            href="/account"
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-mono flex items-center gap-1.5 transition-colors"
            title="Analyst Account"
          >
            <User className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden md:inline font-semibold">Account</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

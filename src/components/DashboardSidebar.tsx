"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  ShieldAlert, 
  Search, 
  PlusCircle, 
  BarChart3, 
  Globe2, 
  Database, 
  TrendingUp, 
  BookOpen, 
  Users, 
  Settings, 
  User, 
  ChevronLeft, 
  ChevronRight,
  X,
  Radio,
  Flame,
  FileWarning
} from "lucide-react";

interface DashboardSidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
  badgeColor?: "rose" | "cyan" | "amber";
  exactMatch?: boolean;
}

export default function DashboardSidebar({
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onCloseMobile,
}: DashboardSidebarProps) {
  const pathname = usePathname();

  const mainNavItems: NavItem[] = [
    { title: "Dashboard", href: "/", icon: Home, exactMatch: true },
    { title: "Threat Intelligence", href: "/threat-intelligence", icon: ShieldAlert, badge: "PRO", badgeColor: "cyan" },
    { title: "Check Website", href: "/check", icon: Search },
    { title: "Report Scam", href: "/report", icon: PlusCircle, badge: "ALERT", badgeColor: "rose" },
    { title: "Threat Analytics", href: "/analytics", icon: BarChart3 },
    { title: "Live Threat Map", href: "/threat-map", icon: Globe2, badge: "LIVE", badgeColor: "cyan" },
    { title: "Scam Directory", href: "/scams", icon: Database },
    { title: "Indian Scam Trends", href: "/india-trends", icon: TrendingUp },
    { title: "Safety Guides", href: "/learn", icon: BookOpen },
    { title: "Community Reports", href: "/reports", icon: Users },
  ];

  const bottomNavItems: NavItem[] = [
    { title: "Settings", href: "/account?tab=settings", icon: Settings },
    { title: "Account", href: "/account", icon: User },
  ];

  const isItemActive = (item: NavItem) => {
    if (item.exactMatch) {
      return pathname === "/" || pathname === "/dashboard";
    }
    return pathname.startsWith(item.href) && item.href !== "/";
  };

  const navContent = (
    <div className="flex flex-col h-full bg-[#080d16] border-r border-slate-800/80 text-slate-300">
      {/* Sidebar Header / Brand / Collapse Toggle */}
      <div className="p-3.5 flex items-center justify-between border-b border-slate-800/80">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-xs font-mono font-bold tracking-wider text-slate-200 uppercase">
              Operations Center
            </span>
          </div>
        )}
        <button
          onClick={onToggleCollapse}
          className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors ml-auto"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
        <button
          onClick={onCloseMobile}
          className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors ml-auto"
          title="Close menu"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Primary Navigation List */}
      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-1">
        {mainNavItems.map((item) => {
          const Icon = item.icon;
          const active = isItemActive(item);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onCloseMobile}
              title={collapsed ? item.title : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all group relative ${
                active
                  ? "bg-cyan-950/70 text-cyan-300 border border-cyan-500/40 font-semibold shadow-xs"
                  : "text-slate-400 hover:text-slate-100 hover:bg-slate-850/60 hover:bg-slate-900 border border-transparent"
              }`}
            >
              {/* Active neon strip */}
              {active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r bg-cyan-400 shadow-sm" />
              )}
              <Icon
                className={`w-4 h-4 shrink-0 transition-colors ${
                  active ? "text-cyan-400" : "text-slate-400 group-hover:text-cyan-300"
                }`}
              />

              {!collapsed && (
                <div className="flex items-center justify-between flex-1 truncate">
                  <span className="truncate">{item.title}</span>
                  {item.badge && (
                    <span
                      className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${
                        item.badgeColor === "rose"
                          ? "bg-rose-950 text-rose-400 border border-rose-800/60"
                          : "bg-cyan-950 text-cyan-400 border border-cyan-800/60"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </Link>
          );
        })}

        <div className="pt-3 my-2 border-t border-slate-800/80" />

        {/* Bottom Utility Items */}
        {bottomNavItems.map((item) => {
          const Icon = item.icon;
          const active = isItemActive(item);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onCloseMobile}
              title={collapsed ? item.title : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all group relative ${
                active
                  ? "bg-cyan-950/70 text-cyan-300 border border-cyan-500/40 font-semibold"
                  : "text-slate-400 hover:text-slate-100 hover:bg-slate-900 border border-transparent"
              }`}
            >
              <Icon
                className={`w-4 h-4 shrink-0 ${
                  active ? "text-cyan-400" : "text-slate-400 group-hover:text-cyan-300"
                }`}
              />
              {!collapsed && <span className="truncate">{item.title}</span>}
            </Link>
          );
        })}
      </div>

      {/* Bottom Status / Version Footer */}
      {!collapsed && (
        <div className="p-3 border-t border-slate-800/80 bg-slate-950/40">
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
            <span>SOC STATUS</span>
            <span className="text-emerald-400 flex items-center gap-1 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              ONLINE
            </span>
          </div>
          <div className="mt-1 text-[9px] text-slate-600 font-mono truncate">
            ScamLens India Threat Radar
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside
        className={`hidden lg:block shrink-0 sticky top-[57px] h-[calc(100vh-57px)] transition-all duration-300 z-30 ${
          collapsed ? "w-16" : "w-64"
        }`}
      >
        {navContent}
      </aside>

      {/* Mobile Drawer Backdrop & Slide-over */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-[#080d16] shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            {navContent}
          </div>
        </div>
      )}
    </>
  );
}

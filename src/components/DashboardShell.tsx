"use client";

import React, { useState } from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";

interface DashboardShellProps {
  children: React.ReactNode;
}

export default function DashboardShell({ children }: DashboardShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#070a0f] text-slate-100 selection:bg-cyan-500 selection:text-black">
      {/* Top Header */}
      <DashboardHeader 
        onToggleSidebar={() => {
          if (typeof window !== "undefined" && window.innerWidth < 1024) {
            setMobileSidebarOpen(!mobileSidebarOpen);
          } else {
            setSidebarCollapsed(!sidebarCollapsed);
          }
        }}
        sidebarCollapsed={sidebarCollapsed}
      />

      {/* Main Body with Sidebar + Content */}
      <div className="flex-1 flex w-full relative">
        <DashboardSidebar
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          mobileOpen={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />

        <main className="flex-1 min-w-0 flex flex-col">
          {children}
        </main>
      </div>
    </div>
  );
}

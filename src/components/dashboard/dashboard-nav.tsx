"use client";

import Link from "next/link";
import { useState } from "react";
import {
  BarChart3,
  Briefcase,
  LineChart,
  Settings,
  Search,
  Bell,
  Wallet,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { label: "Markets", icon: BarChart3, href: "/dashboard" },
  { label: "Portfolio", icon: Briefcase, href: "/dashboard/portfolio" },
  { label: "Analytics", icon: LineChart, href: "/dashboard/analytics" },
  { label: "Settings", icon: Settings, href: "/dashboard/settings" },
];

export function DashboardNav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-strong border-b border-border">
      <div className="mx-auto max-w-[1920px] px-4 md:px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative w-8 h-8 overflow-hidden rounded-md group-hover:glow-primary transition-all duration-300">
            <img
              src="/logo.png"
              alt="DeFi Exchange Pro"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="hidden md:inline font-semibold text-base tracking-tight text-white">
            DeFi Exchange <span className="text-primary">Pro</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-muted hover:text-white hover:bg-white/5 transition-all duration-200"
            >
              <item.icon size={16} />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-3">
          <button className="hidden md:flex w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 items-center justify-center text-muted hover:text-white transition-colors">
            <Search size={16} />
          </button>
          <button className="hidden md:flex w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 items-center justify-center text-muted hover:text-white transition-colors relative">
            <Bell size={16} />
            <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors glow-primary">
            <Wallet size={16} />
            <span className="hidden sm:inline">Connect Wallet</span>
          </button>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-muted hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden glass-strong border-t border-border px-4 py-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted hover:text-white hover:bg-white/5 transition-all"
              onClick={() => setMobileOpen(false)}
            >
              <item.icon size={16} />
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

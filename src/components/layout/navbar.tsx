"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Preview", href: "#preview" },
  { label: "Metrics", href: "#metrics" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 overflow-hidden rounded-lg group-hover:glow-primary transition-all duration-300">
            <img
              src="/logo.png"
              alt="DeFi Exchange Pro"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-semibold text-lg tracking-tight text-white">
            DeFi Exchange <span className="text-primary">Pro</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-muted hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/dashboard"
            className="px-5 py-2.5 text-sm font-medium rounded-lg bg-primary text-[#0B0F19] hover:bg-primary/90 transition-all duration-200 glow-primary hover:glow-primary-intense"
          >
            Launch App
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-muted hover:text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden glass-strong border-t border-border px-6 py-4 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block text-sm text-muted hover:text-white transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/dashboard"
            className="block text-center px-5 py-2.5 text-sm font-medium rounded-lg bg-primary text-[#0B0F19]"
            onClick={() => setMobileOpen(false)}
          >
            Launch App
          </Link>
        </div>
      )}
    </header>
  );
}

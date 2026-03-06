"use client";

import { useState } from "react";
import { DashboardNav } from "@/components/dashboard/dashboard-nav";
import {
  User,
  Shield,
  Bell,
  HelpCircle,
  Laptop,
  LogOut,
  Key,
  Settings,
} from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "api", label: "API Keys", icon: Key },
    { id: "appearance", label: "Appearance", icon: Laptop },
  ];

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />

      <main className="pt-[88px] pb-10">
        <div className="max-w-[1200px] mx-auto p-4 md:p-6 space-y-8">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Settings</h1>
            <p className="text-muted text-sm">
              Manage your account preferences and security configuration
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            {/* Sidebar */}
            <div className="w-full md:w-64 shrink-0 flex md:flex-col gap-1 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all whitespace-nowrap shrink-0 md:w-full ${
                    activeTab === tab.id
                      ? "bg-primary/10 text-primary glow-primary border border-primary/20"
                      : "text-muted hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <tab.icon size={18} />
                  {tab.label}
                </button>
              ))}

              <div className="hidden md:block pt-6 mt-6 border-t border-border/50 space-y-1">
                <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-muted hover:text-white hover:bg-white/5 rounded-xl transition-all">
                  <HelpCircle size={18} />
                  Support
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-danger hover:bg-danger/10 rounded-xl transition-all">
                  <LogOut size={18} />
                  Sign Out
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 glass rounded-2xl p-6 md:p-8 border border-border/50">
              {activeTab === "profile" && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div>
                    <h2 className="text-lg font-semibold text-white mb-1">
                      Personal Information
                    </h2>
                    <p className="text-sm text-muted">
                      Update your profile details and contact information.
                    </p>
                  </div>

                  <div className="flex items-center gap-6 py-4">
                    <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-primary text-2xl font-bold border-2 border-primary/50 relative overflow-hidden group">
                      DX
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                        <span className="text-xs text-white">Edit</span>
                      </div>
                    </div>
                    <div>
                      <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-lg transition-colors border border-border">
                        Change Avatar
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-muted">
                        Full Name
                      </label>
                      <input
                        type="text"
                        defaultValue="Alex Carter"
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-medium"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-muted">
                        Email Address
                      </label>
                      <input
                        type="email"
                        defaultValue="alex@example.com"
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-medium"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-muted">
                        Username
                      </label>
                      <input
                        type="text"
                        defaultValue="alexcarter_fx"
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-medium"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-muted">
                        Timezone
                      </label>
                      <select className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-medium appearance-none">
                        <option>UTC-08:00 (Pacific Time)</option>
                        <option>UTC+00:00 (London)</option>
                        <option>UTC+08:00 (Singapore)</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-border/50 flex justify-end gap-3">
                    <button className="px-6 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-colors">
                      Cancel
                    </button>
                    <button className="px-6 py-2.5 rounded-xl bg-primary text-background text-sm font-semibold hover:bg-primary/90 transition-colors glow-primary">
                      Save Changes
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "security" && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div>
                    <h2 className="text-lg font-semibold text-white mb-1">
                      Security Configuration
                    </h2>
                    <p className="text-sm text-muted">
                      Manage your password and secure your account with 2FA.
                    </p>
                  </div>

                  {/* 2FA */}
                  <div className="p-4 sm:p-5 rounded-xl bg-white/5 border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-base font-medium text-white mb-1">
                        Two-Factor Authentication (2FA)
                      </h3>
                      <p className="text-sm text-muted">
                        Add an extra layer of security to your account.
                      </p>
                    </div>
                    <button className="px-5 py-2.5 rounded-lg bg-primary text-background text-sm font-semibold hover:bg-primary/90 transition-colors glow-primary">
                      Enable 2FA
                    </button>
                  </div>

                  {/* Password */}
                  <div className="space-y-4">
                    <h3 className="text-base font-medium text-white">
                      Change Password
                    </h3>
                    <div className="grid grid-cols-1 gap-4 max-w-md">
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-muted">
                          Current Password
                        </label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-white focus:outline-none focus:border-primary/50 transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-muted">
                          New Password
                        </label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-white focus:outline-none focus:border-primary/50 transition-all"
                        />
                      </div>
                      <button className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-sm font-medium transition-colors border border-border mt-2">
                        Update Password
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Fallback for other tabs */}
              {["notifications", "api", "appearance"].includes(activeTab) && (
                <div className="h-[400px] flex flex-col items-center justify-center text-center animate-in fade-in duration-500">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-muted mb-4">
                    <Settings size={32} />
                  </div>
                  <h2 className="text-lg font-semibold text-white mb-2 capitalize">
                    {activeTab} Settings
                  </h2>
                  <p className="text-sm text-muted max-w-xs">
                    This section is part of the institutional UI mock.
                    Configuration options would appear here in a production
                    environment.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

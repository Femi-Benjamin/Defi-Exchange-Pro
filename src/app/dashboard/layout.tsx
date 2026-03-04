import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard — DeFi Exchange Pro",
  description:
    "Trade, swap, and manage your portfolio with institutional-grade tools.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

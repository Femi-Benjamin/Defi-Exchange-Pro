"use client";

import { transactions } from "@/lib/mock-data";
import { CheckCircle2, Clock, XCircle, ArrowUpRight } from "lucide-react";

const statusConfig = {
  success: {
    icon: CheckCircle2,
    color: "text-success",
    bg: "bg-success/10",
    label: "Success",
  },
  pending: {
    icon: Clock,
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
    label: "Pending",
  },
  failed: {
    icon: XCircle,
    color: "text-danger",
    bg: "bg-danger/10",
    label: "Failed",
  },
};

export function TransactionHistory() {
  return (
    <div className="flex flex-col h-full glass rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">
          Recent Transactions
        </h3>
        <button className="text-xs text-primary hover:text-primary/80 transition-colors">
          View All
        </button>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {transactions.map((tx) => {
          const config = statusConfig[tx.status];
          const StatusIcon = config.icon;

          return (
            <div
              key={tx.id}
              className="px-4 py-3 border-b border-border/50 hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex items-start gap-3">
                {/* Status Icon */}
                <div
                  className={`w-8 h-8 rounded-lg ${config.bg} flex items-center justify-center shrink-0 mt-0.5`}
                >
                  <StatusIcon size={14} className={config.color} />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white font-medium">
                      {tx.fromToken} → {tx.toToken}
                    </span>
                    <ArrowUpRight
                      size={12}
                      className="text-muted/40 shrink-0"
                    />
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-muted">{tx.amount}</span>
                    <span className="text-xs text-muted">{tx.value}</span>
                  </div>
                  <div className="flex items-center justify-between mt-1.5">
                    <span className={`text-xs ${config.color}`}>
                      {config.label}
                    </span>
                    <span className="text-xs text-muted/60">
                      {tx.timestamp}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

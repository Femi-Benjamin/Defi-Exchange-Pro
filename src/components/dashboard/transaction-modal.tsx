"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  CheckCircle2,
  Clock,
  XCircle,
  ArrowRight,
  ExternalLink,
  Copy,
} from "lucide-react";
import type { Transaction } from "@/types";

interface TransactionModalProps {
  transaction: Transaction | null;
  isOpen: boolean;
  onClose: () => void;
}

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
    label: "Processing",
  },
  failed: {
    icon: XCircle,
    color: "text-danger",
    bg: "bg-danger/10",
    label: "Failed",
  },
};

export function TransactionModal({
  transaction,
  isOpen,
  onClose,
}: TransactionModalProps) {
  if (!transaction) return null;

  const config = statusConfig[transaction.status];
  const StatusIcon = config.icon;

  // Mock data for the expanded details view
  const mockNetworkFee = "$4.20 (0.0011 ETH)";
  const mockHash = `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`;
  const mockRoute = "Uniswap V3 + Curve";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-50 flex items-center justify-center p-4 sm:p-0"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="w-full max-w-md rounded-2xl glass-strong overflow-hidden flex flex-col relative">
              {/* Glowing Orb Background */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-[60px] pointer-events-none" />

              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                <span className="text-sm font-semibold text-white">
                  Transaction Details
                </span>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-muted hover:text-white transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-6">
                {/* Status Hero */}
                <div className="flex flex-col items-center justify-center text-center space-y-3">
                  <div
                    className={`w-16 h-16 rounded-full ${config.bg} flex items-center justify-center`}
                  >
                    <StatusIcon size={32} className={config.color} />
                  </div>
                  <div>
                    <h3 className={`text-lg font-bold ${config.color}`}>
                      {config.label}
                    </h3>
                    <p className="text-muted text-sm">
                      {transaction.timestamp}
                    </p>
                  </div>
                </div>

                {/* Swap Summary Box */}
                <div className="p-4 rounded-xl bg-white/5 border border-border">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-muted uppercase tracking-wider">
                      Asset Swap
                    </span>
                    <span className="text-xs font-medium text-white">
                      {transaction.value}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white text-xs font-bold">
                        {transaction.fromToken.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">
                          {transaction.amount}
                        </div>
                        <div className="text-xs text-muted">
                          {transaction.fromToken}
                        </div>
                      </div>
                    </div>

                    <ArrowRight
                      size={16}
                      className="text-primary mx-2 opacity-50"
                    />

                    <div className="flex items-center gap-3 text-right">
                      <div>
                        <div className="text-sm font-bold text-success">
                          {transaction.toToken === "USDC" ||
                          transaction.toToken === "USDT"
                            ? transaction.value
                            : `~ ${(parseFloat(transaction.value.replace(/[^0-9.-]+/g, "")) / 3000).toFixed(4)} ${transaction.toToken}`}
                        </div>
                        <div className="text-xs text-muted">
                          {transaction.toToken}
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white text-xs font-bold">
                        {transaction.toToken.charAt(0)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Technical Details */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted">Network Fee</span>
                    <span className="text-white font-medium">
                      {mockNetworkFee}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted">Routing</span>
                    <span className="text-primary font-medium">
                      {mockRoute}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted">Transaction ID</span>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-mono text-xs">
                        {mockHash}
                      </span>
                      <button className="text-muted hover:text-white transition-colors">
                        <Copy size={12} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Explorer Button */}
                <button className="w-full mt-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium text-sm flex items-center justify-center gap-2 hover:bg-white/10 transition-colors">
                  View on Explorer <ExternalLink size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

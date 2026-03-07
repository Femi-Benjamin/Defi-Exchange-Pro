"use client";

import { motion } from "framer-motion";
import { useAnimatedCounter } from "@/hooks/use-animated-counter";

interface MetricCardProps {
  icon: React.ReactNode;
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  description: string;
  delay?: number;
}

export function MetricCard({
  icon,
  value,
  prefix,
  suffix,
  label,
  description,
  delay = 0,
}: MetricCardProps) {
  const { count, ref } = useAnimatedCounter(value, 2000);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay }}
      className="group relative p-6 sm:p-8 rounded-2xl glass hover:bg-white/[0.04] transition-all duration-300 hover:-translate-y-1 hover:glow-primary"
    >
      {/* Icon */}
      <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors duration-300">
        {icon}
      </div>

      {/* Stat */}
      <div className="text-3xl sm:text-4xl font-bold text-white mb-1">
        {prefix}
        {count}
        {suffix && <span className="text-primary">{suffix}</span>}
      </div>

      {/* Label */}
      <div className="text-sm font-medium text-white mb-1">{label}</div>

      {/* Description */}
      <p className="text-xs text-muted leading-relaxed">{description}</p>

      {/* Hover glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}

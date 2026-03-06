"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";
import { features } from "@/lib/mock-data";
import { Route, Activity, BarChart3, Wallet, Zap, Cpu } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  route: <Route size={22} />,
  activity: <Activity size={22} />,
  chart: <BarChart3 size={22} />,
  wallet: <Wallet size={22} />,
  zap: <Zap size={22} />,
  cpu: <Cpu size={22} />,
};

export function FeaturesSection() {
  const [ref, inView] = useInView();

  return (
    <section id="features" className="relative py-32" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-medium text-primary mb-4">
            Platform Capabilities
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
            Built for Professional Traders
          </h2>
          <p className="text-muted max-w-xl mx-auto leading-relaxed">
            Every feature designed for institutional-grade performance and
            reliability.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative p-6 rounded-2xl glass hover:bg-white/[0.04] transition-all duration-300 hover:-translate-y-1 hover:glow-primary cursor-default"
            >
              {/* Icon */}
              <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                {iconMap[feature.icon]}
              </div>

              {/* Content */}
              <h3 className="text-base font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                {feature.description}
              </p>

              {/* Hover glow accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

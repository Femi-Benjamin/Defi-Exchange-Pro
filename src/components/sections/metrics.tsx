"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";
import { useAnimatedCounter } from "@/hooks/use-animated-counter";
import { metrics } from "@/lib/mock-data";

function MetricCard({
  label,
  value,
  suffix,
  delay,
}: {
  label: string;
  value: string;
  suffix?: string;
  delay: number;
}) {
  const numericValue = parseInt(value.replace(/[^0-9]/g, "")) || 0;
  const hasLessThan = value.startsWith("<");
  const { count, ref } = useAnimatedCounter(numericValue, 2000);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay }}
      className="text-center p-8"
    >
      <div className="text-4xl md:text-5xl font-bold text-white mb-2">
        {hasLessThan && "<"}
        {count}
        {suffix && <span className="text-primary">{suffix}</span>}
      </div>
      <div className="text-sm text-muted">{label}</div>
    </motion.div>
  );
}

export function MetricsSection() {
  const [ref, inView] = useInView();

  return (
    <section id="metrics" className="relative py-32" ref={ref}>
      {/* Background accents */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-medium text-primary mb-4">
            By the Numbers
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
            Built for Scale
          </h2>
          <p className="text-muted max-w-xl mx-auto leading-relaxed">
            Performance metrics that matter for institutional trading.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl glass overflow-hidden">
          {metrics.map((metric, i) => (
            <MetricCard
              key={metric.label}
              label={metric.label}
              value={metric.value}
              suffix={metric.suffix}
              delay={i * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

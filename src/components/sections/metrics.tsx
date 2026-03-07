"use client";

import { useInView } from "@/hooks/use-in-view";
import { metrics } from "@/lib/mock-data";
import { SectionHeader } from "@/components/ui/section-header";
import { MetricCard } from "@/components/ui/metric-card";
import { Zap, Cpu, Activity, Wallet, Route } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  zap: <Zap size={24} />,
  cpu: <Cpu size={24} />,
  activity: <Activity size={24} />,
  wallet: <Wallet size={24} />,
  route: <Route size={24} />,
};

export function MetricsSection() {
  const [ref, inView] = useInView();

  return (
    <section
      id="metrics"
      className="relative py-24 sm:py-32 overflow-hidden"
      ref={ref}
    >
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 z-10">
        <SectionHeader
          badge="Platform Metrics"
          title="Built for Scale"
          description="Performance metrics that matter for institutional-grade reliability."
          inView={inView}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {metrics.map((metric, i) => {
            const numericValue =
              parseInt(metric.value.replace(/[^0-9]/g, "")) || 0;
            const hasLessThan = metric.value.startsWith("<");

            return (
              <div
                key={metric.label}
                className={i === 4 ? "md:col-span-2 lg:col-span-1" : ""}
              >
                <MetricCard
                  label={metric.label}
                  description={metric.description}
                  value={numericValue}
                  prefix={hasLessThan ? "<" : undefined}
                  suffix={metric.suffix}
                  icon={iconMap[metric.icon]}
                  delay={i * 0.1}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

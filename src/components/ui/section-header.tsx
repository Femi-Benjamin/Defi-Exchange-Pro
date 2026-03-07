"use client";

import { motion } from "framer-motion";
import { Badge } from "./badge";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  description?: string;
  inView?: boolean;
}

export function SectionHeader({
  badge,
  title,
  description,
  inView = true,
}: SectionHeaderProps) {
  return (
    <motion.div
      className="text-center mb-16"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
    >
      {badge && (
        <Badge size="md" className="mb-4">
          {badge}
        </Badge>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-muted max-w-xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}

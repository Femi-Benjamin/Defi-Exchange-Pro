"use client";

import { motion } from "framer-motion";
import { Maximize2 } from "lucide-react";

interface GalleryItemProps {
  title: string;
  description: string;
  children: React.ReactNode;
  delay?: number;
}

export function GalleryItem({
  title,
  description,
  children,
  delay = 0,
}: GalleryItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay }}
      className="group relative rounded-2xl glass overflow-hidden cursor-pointer"
    >
      {/* Content / Mock Screen */}
      <div className="aspect-[16/10] relative overflow-hidden bg-surface">
        {children}

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-end p-6">
          <span className="text-white text-sm font-medium mb-1">{title}</span>
          <span className="text-muted text-xs">{description}</span>
          <div className="mt-3 flex items-center gap-1.5 text-primary text-xs font-medium">
            <Maximize2 size={12} />
            View Fullscreen
          </div>
        </div>
      </div>

      {/* Hover zoom on inner content */}
      <style jsx>{`
        .group:hover > div:first-child > :first-child {
          transform: scale(1.05);
          transition: transform 0.7s ease;
        }
      `}</style>
    </motion.div>
  );
}

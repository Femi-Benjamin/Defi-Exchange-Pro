"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, ChevronRight, CheckCircle2 } from "lucide-react";
import { caseStudy } from "@/lib/mock-data";

interface CaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CaseStudyModal({ isOpen, onClose }: CaseStudyModalProps) {
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
            className="fixed inset-2 sm:inset-4 md:inset-8 lg:inset-12 z-50 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="w-full max-w-5xl h-[95vh] sm:h-auto sm:max-h-[95vh] rounded-2xl glass-strong overflow-hidden flex flex-col md:flex-row shadow-2xl">
              {/* Left: Animated Showcase */}
              <div className="md:w-2/5 p-6 sm:p-8 md:p-12 flex flex-col justify-center bg-linear-to-br from-primary/10 via-background to-secondary/10 relative overflow-hidden shrink-0">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px]" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/10 rounded-full blur-[60px]" />

                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/20 md:hidden flex items-center justify-center text-white z-20"
                >
                  <X size={16} />
                </button>

                <div className="relative z-10">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl glass p-2 flex items-center justify-center mb-4 sm:mb-8 glow-primary shrink-0 relative overflow-hidden">
                      <img
                        src="/logo.png"
                        alt="Logo"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4 tracking-tight">
                      {caseStudy.title}
                    </h2>
                    <p className="text-sm sm:text-base text-muted leading-relaxed mb-6 sm:mb-8 line-clamp-3 sm:line-clamp-none">
                      {caseStudy.subtitle}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {caseStudy.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full text-xs font-medium glass text-primary"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Right: Scrollable Content */}
              <div className="md:w-3/5 flex flex-col min-h-0 flex-1">
                {/* Header */}
                <div className="hidden md:flex items-center justify-between px-8 py-5 border-b border-border bg-background/50 backdrop-blur-md sticky top-0 z-20">
                  <span className="text-sm font-medium text-muted">
                    Case Study
                  </span>
                  <button
                    onClick={onClose}
                    className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-muted hover:text-white transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Scrollable Body */}
                <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-8">
                  {/* Role */}
                  <div className="pt-2 sm:pt-0">
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                      Role
                    </div>
                    <p className="text-sm text-white">{caseStudy.role}</p>
                  </div>

                  {/* Key Highlights */}
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
                      Key Highlights
                    </div>
                    <div className="space-y-2.5">
                      {caseStudy.highlights.map((highlight) => (
                        <div
                          key={highlight}
                          className="flex items-start gap-3 text-sm text-muted"
                        >
                          <CheckCircle2
                            size={15}
                            className="text-success mt-0.5 shrink-0"
                          />
                          {highlight}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sections */}
                  {caseStudy.sections.map((section) => (
                    <div key={section.title}>
                      <div className="flex items-center gap-2 mb-3">
                        <ChevronRight size={14} className="text-primary" />
                        <h3 className="text-sm font-semibold text-white">
                          {section.title}
                        </h3>
                      </div>
                      <p className="text-sm text-muted leading-relaxed pl-6">
                        {section.content}
                      </p>
                    </div>
                  ))}

                  {/* Gallery */}
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
                      Gallery
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {caseStudy.gallery.map((img, i) => (
                        <div
                          key={i}
                          className="group relative aspect-video rounded-xl bg-white/3 border border-border overflow-hidden hover:glow-primary transition-all duration-500"
                        >
                          <img
                            src={img}
                            alt={`Gallery Image ${i + 1}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                            <span className="text-xs text-white font-medium">
                              Screenshot {i + 1}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-8 py-5 border-t border-border flex items-center justify-between">
                  <span className="text-xs text-muted">
                    DeFi Exchange Pro — 2026
                  </span>
                  <a
                    href="#"
                    className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors"
                  >
                    View Live <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

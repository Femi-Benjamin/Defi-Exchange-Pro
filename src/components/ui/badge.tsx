"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "glass text-primary",
        success: "bg-success/10 text-success",
        danger: "bg-danger/10 text-danger",
        secondary: "bg-secondary/10 text-secondary",
      },
      size: {
        sm: "px-2.5 py-0.5 text-[10px] rounded-md",
        md: "px-3 py-1 text-xs rounded-full",
        lg: "px-4 py-1.5 text-xs rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant, size, className }))}
      {...props}
    />
  );
}

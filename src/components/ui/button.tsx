"use client";

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-[#0B0F19] hover:bg-primary/90 glow-primary hover:glow-primary-intense hover:-translate-y-0.5",
        secondary: "glass text-white hover:bg-white/10 hover:-translate-y-0.5",
        ghost: "text-muted hover:text-white hover:bg-white/5",
        outline:
          "border border-border text-white hover:bg-white/5 hover:border-primary/30",
      },
      size: {
        sm: "px-4 py-2 text-xs rounded-lg",
        md: "px-6 py-2.5 text-sm rounded-xl",
        lg: "px-8 py-3.5 text-sm rounded-xl",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };

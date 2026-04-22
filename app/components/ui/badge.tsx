import type { HTMLAttributes } from "react";
import { cn } from "~/lib/utils";

type Variant = "default" | "brand" | "success" | "warning" | "danger" | "outline";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: Variant;
}

const VARIANTS: Record<Variant, string> = {
  default:
    "bg-[var(--color-surface)] text-[var(--color-fg)] border border-[var(--color-border)]",
  brand: "bg-[var(--color-brand-soft)] text-[var(--color-brand)]",
  success: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  warning: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  danger: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
  outline: "border border-[var(--color-border)] text-[var(--color-fg)]",
};

export function Badge({ variant = "default", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium",
        VARIANTS[variant],
        className,
      )}
      {...props}
    />
  );
}

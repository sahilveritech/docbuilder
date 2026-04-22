import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "~/lib/utils";

export interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center gap-2 py-12 px-6",
        className,
      )}
    >
      {Icon ? (
        <div className="h-12 w-12 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center mb-1">
          <Icon className="h-5 w-5 text-[var(--color-muted)]" aria-hidden />
        </div>
      ) : null}
      <h3 className="text-base font-semibold text-[var(--color-fg)]">{title}</h3>
      {description ? (
        <p className="text-sm text-[var(--color-muted)] max-w-md">
          {description}
        </p>
      ) : null}
      {action ? <div className="mt-3">{action}</div> : null}
    </div>
  );
}

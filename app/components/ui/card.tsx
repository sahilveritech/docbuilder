import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "~/lib/utils";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
}

export function Card({ className, interactive, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "bg-[var(--color-bg)] border border-[var(--color-border)] rounded-[var(--radius-card)]",
        "shadow-[var(--shadow-soft)]",
        interactive &&
          "transition-all hover:border-[var(--color-brand)] hover:shadow-md hover:-translate-y-0.5",
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "px-5 py-4 border-b border-[var(--color-border)] flex items-start justify-between gap-3",
        className,
      )}
      {...props}
    />
  );
}

export function CardTitle({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <h3
      className={cn("text-base font-semibold text-[var(--color-fg)]", className)}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <p className={cn("text-sm text-[var(--color-muted)]", className)}>
      {children}
    </p>
  );
}

export function CardBody({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-5", className)} {...props} />;
}

export function CardFooter({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "px-5 py-3 border-t border-[var(--color-border)] bg-[var(--color-surface)]",
        "flex items-center justify-end gap-2 rounded-b-[var(--radius-card)]",
        className,
      )}
      {...props}
    />
  );
}

import { Loader2 } from "lucide-react";
import { cn } from "~/lib/utils";

export interface LoaderProps {
  label?: string;
  className?: string;
  fullscreen?: boolean;
}

export function Loader({ label = "Loading…", className, fullscreen }: LoaderProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex flex-col items-center justify-center gap-3 text-[var(--color-muted)]",
        fullscreen ? "min-h-[60vh]" : "py-10",
        className,
      )}
    >
      <Loader2 className="h-6 w-6 animate-spin text-[var(--color-brand)]" aria-hidden />
      <span className="text-sm">{label}</span>
    </div>
  );
}

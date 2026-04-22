import { useId } from "react";
import { cn } from "~/lib/utils";

export interface ColorPickerProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  className?: string;
}

export function ColorPicker({
  label,
  value,
  onChange,
  hint,
  className,
}: ColorPickerProps) {
  const id = useId();
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label ? (
        <label htmlFor={id} className="text-sm font-medium text-[var(--color-fg)]">
          {label}
        </label>
      ) : null}
      <div
        className={cn(
          "flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] p-1.5",
          "focus-within:border-[var(--color-brand)]",
        )}
      >
        <label
          htmlFor={id}
          className="h-8 w-8 rounded-md border border-[var(--color-border)] cursor-pointer shrink-0"
          style={{ backgroundColor: value }}
          aria-label={label ?? "Choose color"}
        />
        <input
          id={id}
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="sr-only"
        />
        <input
          type="text"
          value={value.toUpperCase()}
          onChange={(e) => {
            const v = e.target.value.trim();
            if (/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(v)) onChange(v);
            else onChange(v);
          }}
          className="flex-1 bg-transparent text-sm outline-none font-mono uppercase"
          maxLength={7}
        />
      </div>
      {hint ? (
        <p className="text-xs text-[var(--color-muted)]">{hint}</p>
      ) : null}
    </div>
  );
}

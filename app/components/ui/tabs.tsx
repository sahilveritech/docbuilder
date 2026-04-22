import {
  useCallback,
  useRef,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { cn } from "~/lib/utils";

export interface TabItem {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  listClassName?: string;
  variant?: "pill" | "underline";
  ariaLabel?: string;
}

export function Tabs({
  items,
  value,
  onChange,
  className,
  listClassName,
  variant = "pill",
  ariaLabel = "Tabs",
}: TabsProps) {
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
      const enabled = items
        .map((item, i) => ({ item, i }))
        .filter(({ item }) => !item.disabled);
      const currentPosition = enabled.findIndex(({ i }) => i === index);
      if (currentPosition < 0) return;

      let nextPosition = currentPosition;
      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        nextPosition = (currentPosition + 1) % enabled.length;
      } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        nextPosition =
          (currentPosition - 1 + enabled.length) % enabled.length;
      } else if (event.key === "Home") {
        event.preventDefault();
        nextPosition = 0;
      } else if (event.key === "End") {
        event.preventDefault();
        nextPosition = enabled.length - 1;
      } else {
        return;
      }
      const target = enabled[nextPosition];
      if (!target) return;
      onChange(items[target.i].value);
      refs.current[target.i]?.focus();
    },
    [items, onChange],
  );

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn(
        variant === "pill"
          ? "inline-flex items-center gap-1 p-1 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)]"
          : "flex items-center gap-6 border-b border-[var(--color-border)]",
        listClassName,
        className,
      )}
    >
      {items.map((item, index) => {
        const selected = item.value === value;
        return (
          <button
            key={item.value}
            ref={(el) => {
              refs.current[index] = el;
            }}
            role="tab"
            type="button"
            aria-selected={selected}
            aria-disabled={item.disabled}
            tabIndex={selected ? 0 : -1}
            disabled={item.disabled}
            onClick={() => !item.disabled && onChange(item.value)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={cn(
              "text-sm font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed",
              variant === "pill"
                ? cn(
                    "px-3 py-1.5 rounded-md",
                    selected
                      ? "bg-[var(--color-bg)] text-[var(--color-fg)] shadow-sm"
                      : "text-[var(--color-muted)] hover:text-[var(--color-fg)]",
                  )
                : cn(
                    "px-1 py-3 -mb-px border-b-2",
                    selected
                      ? "border-[var(--color-brand)] text-[var(--color-fg)]"
                      : "border-transparent text-[var(--color-muted)] hover:text-[var(--color-fg)]",
                  ),
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

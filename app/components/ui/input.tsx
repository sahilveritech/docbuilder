import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "~/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  leftAddon?: ReactNode;
  rightAddon?: ReactNode;
  wrapperClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      wrapperClassName,
      label,
      hint,
      error,
      leftAddon,
      rightAddon,
      id,
      required,
      ...props
    },
    ref,
  ) => {
    const autoId = useId();
    const inputId = id ?? autoId;
    const describedBy = error
      ? `${inputId}-error`
      : hint
        ? `${inputId}-hint`
        : undefined;

    return (
      <div className={cn("flex flex-col gap-1.5", wrapperClassName)}>
        {label ? (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-[var(--color-fg)]"
          >
            {label}
            {required ? <span className="text-[var(--color-danger)] ml-0.5">*</span> : null}
          </label>
        ) : null}
        <div
          className={cn(
            "flex items-center rounded-lg border bg-[var(--color-bg)] transition-colors",
            "focus-within:border-[var(--color-brand)]",
            error ? "border-[var(--color-danger)]" : "border-[var(--color-border)]",
          )}
        >
          {leftAddon ? (
            <span className="pl-3 text-[var(--color-muted)] flex items-center">
              {leftAddon}
            </span>
          ) : null}
          <input
            ref={ref}
            id={inputId}
            required={required}
            aria-invalid={!!error}
            aria-describedby={describedBy}
            className={cn(
              "flex-1 min-w-0 bg-transparent px-3 py-2 text-sm outline-none",
              "placeholder:text-[var(--color-muted)]",
              "disabled:opacity-60 disabled:cursor-not-allowed",
              className,
            )}
            {...props}
          />
          {rightAddon ? (
            <span className="pr-3 text-[var(--color-muted)] flex items-center">
              {rightAddon}
            </span>
          ) : null}
        </div>
        {error ? (
          <p
            id={`${inputId}-error`}
            className="text-xs text-[var(--color-danger)]"
          >
            {error}
          </p>
        ) : hint ? (
          <p
            id={`${inputId}-hint`}
            className="text-xs text-[var(--color-muted)]"
          >
            {hint}
          </p>
        ) : null}
      </div>
    );
  },
);

Input.displayName = "Input";

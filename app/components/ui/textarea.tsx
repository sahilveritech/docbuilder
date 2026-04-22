import { forwardRef, useId, type TextareaHTMLAttributes } from "react";
import { cn } from "~/lib/utils";

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
  wrapperClassName?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { className, wrapperClassName, label, hint, error, id, required, ...props },
    ref,
  ) => {
    const autoId = useId();
    const fieldId = id ?? autoId;
    const describedBy = error
      ? `${fieldId}-error`
      : hint
        ? `${fieldId}-hint`
        : undefined;

    return (
      <div className={cn("flex flex-col gap-1.5", wrapperClassName)}>
        {label ? (
          <label
            htmlFor={fieldId}
            className="text-sm font-medium text-[var(--color-fg)]"
          >
            {label}
            {required ? <span className="text-[var(--color-danger)] ml-0.5">*</span> : null}
          </label>
        ) : null}
        <textarea
          ref={ref}
          id={fieldId}
          required={required}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          className={cn(
            "w-full rounded-lg border bg-[var(--color-bg)] px-3 py-2 text-sm outline-none transition-colors resize-y min-h-[96px]",
            "placeholder:text-[var(--color-muted)]",
            "focus:border-[var(--color-brand)]",
            "disabled:opacity-60 disabled:cursor-not-allowed",
            error
              ? "border-[var(--color-danger)]"
              : "border-[var(--color-border)]",
            className,
          )}
          {...props}
        />
        {error ? (
          <p
            id={`${fieldId}-error`}
            className="text-xs text-[var(--color-danger)]"
          >
            {error}
          </p>
        ) : hint ? (
          <p
            id={`${fieldId}-hint`}
            className="text-xs text-[var(--color-muted)]"
          >
            {hint}
          </p>
        ) : null}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";

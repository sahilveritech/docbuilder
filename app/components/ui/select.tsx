import { forwardRef, useId, type SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "~/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  hint?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
  wrapperClassName?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      wrapperClassName,
      label,
      hint,
      error,
      options,
      placeholder,
      id,
      required,
      ...props
    },
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
        <div
          className={cn(
            "relative flex items-center rounded-lg border bg-[var(--color-bg)] transition-colors",
            "focus-within:border-[var(--color-brand)]",
            error
              ? "border-[var(--color-danger)]"
              : "border-[var(--color-border)]",
          )}
        >
          <select
            ref={ref}
            id={fieldId}
            required={required}
            aria-invalid={!!error}
            aria-describedby={describedBy}
            className={cn(
              "appearance-none w-full bg-transparent px-3 py-2 pr-9 text-sm outline-none cursor-pointer",
              "disabled:opacity-60 disabled:cursor-not-allowed",
              className,
            )}
            {...props}
          >
            {placeholder ? (
              <option value="" disabled>
                {placeholder}
              </option>
            ) : null}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown
            className="absolute right-3 h-4 w-4 text-[var(--color-muted)] pointer-events-none"
            aria-hidden
          />
        </div>
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

Select.displayName = "Select";

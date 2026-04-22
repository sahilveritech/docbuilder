import {
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "~/lib/utils";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  closeOnBackdrop?: boolean;
}

const SIZE: Record<NonNullable<ModalProps["size"]>, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

const FOCUSABLE =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
  closeOnBackdrop = true,
}: ModalProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  const trap = useCallback((event: KeyboardEvent) => {
    if (event.key !== "Tab") return;
    const el = contentRef.current;
    if (!el) return;
    const focusables = Array.from(
      el.querySelectorAll<HTMLElement>(FOCUSABLE),
    ).filter((n) => !n.hasAttribute("data-focus-ignore"));
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement as HTMLElement | null;

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  }, []);

  useEffect(() => {
    if (!open) return;

    previousFocus.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "Tab") {
        trap(e);
      }
    };
    document.addEventListener("keydown", onKey);

    const raf = requestAnimationFrame(() => {
      const el = contentRef.current;
      if (!el) return;
      const firstFocusable = el.querySelector<HTMLElement>(FOCUSABLE);
      (firstFocusable ?? el).focus();
    });

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      cancelAnimationFrame(raf);
      previousFocus.current?.focus?.();
    };
  }, [open, onClose, trap]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
    >
      <button
        type="button"
        aria-label="Close modal"
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => closeOnBackdrop && onClose()}
      />
      <div
        ref={contentRef}
        tabIndex={-1}
        className={cn(
          "relative w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl shadow-2xl",
          "max-h-[90vh] overflow-hidden flex flex-col",
          SIZE[size],
        )}
      >
        {(title || description) && (
          <div className="px-5 pt-5 pb-3 border-b border-[var(--color-border)] flex items-start justify-between gap-4">
            <div className="space-y-1">
              {title ? (
                <h2
                  id="modal-title"
                  className="text-lg font-semibold text-[var(--color-fg)]"
                >
                  {title}
                </h2>
              ) : null}
              {description ? (
                <p className="text-sm text-[var(--color-muted)]">
                  {description}
                </p>
              ) : null}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="rounded-md p-1 text-[var(--color-muted)] hover:bg-[var(--color-surface)] hover:text-[var(--color-fg)] transition"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
        <div className="flex-1 overflow-auto p-5">{children}</div>
        {footer ? (
          <div className="px-5 py-3 border-t border-[var(--color-border)] bg-[var(--color-surface)] flex items-center justify-end gap-2">
            {footer}
          </div>
        ) : null}
      </div>
    </div>,
    document.body,
  );
}

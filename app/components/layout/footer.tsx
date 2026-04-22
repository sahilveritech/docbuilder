import { Lock } from "lucide-react";
import { SITE } from "~/config/site";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] mt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-[var(--color-muted)]">
        <p>
          &copy; {SITE.year} {SITE.name}. {SITE.tagline}.
        </p>
        <p className="inline-flex items-center gap-1.5">
          <Lock className="h-3.5 w-3.5" aria-hidden />
          All data stays on your device.
        </p>
      </div>
    </footer>
  );
}

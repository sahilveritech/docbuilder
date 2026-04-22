import { useState } from "react";
import { Link, NavLink } from "react-router";
import { Menu, Sparkles, X } from "lucide-react";
import { NAV_ITEMS, SITE } from "~/config/site";
import { ROUTES } from "~/config/paths";
import { cn } from "~/lib/utils";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[var(--color-bg)]/80 backdrop-blur-md border-b border-[var(--color-border)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="h-14 flex items-center justify-between gap-4">
          <Link
            to={ROUTES.home}
            className="flex items-center gap-2 font-bold tracking-tight text-[var(--color-fg)]"
          >
            <span className="h-7 w-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 text-white flex items-center justify-center">
              <Sparkles className="h-4 w-4" aria-hidden />
            </span>
            <span className="text-base">{SITE.name}</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end
                className={({ isActive }) =>
                  cn(
                    "px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "text-[var(--color-fg)] bg-[var(--color-surface)]"
                      : "text-[var(--color-muted)] hover:text-[var(--color-fg)] hover:bg-[var(--color-surface)]",
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={open}
              className="md:hidden h-9 w-9 inline-flex items-center justify-center rounded-lg border border-[var(--color-border)] text-[var(--color-fg)]"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
        {open ? (
          <nav className="md:hidden pb-3 flex flex-col gap-1" aria-label="Mobile">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "px-3 py-2 rounded-md text-sm font-medium",
                    isActive
                      ? "text-[var(--color-fg)] bg-[var(--color-surface)]"
                      : "text-[var(--color-muted)] hover:bg-[var(--color-surface)]",
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        ) : null}
      </div>
    </header>
  );
}

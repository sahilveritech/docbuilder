import { Link } from "react-router";
import { Home } from "lucide-react";
import type { Route } from "./+types/not-found";
import { Button } from "~/components/ui/button";
import { ROUTES } from "~/config/paths";

export function meta(_: Route.MetaArgs) {
  return [{ title: "Page not found — Toolkit Lite" }];
}

export function loader() {
  throw new Response("Not Found", { status: 404 });
}

export default function NotFound() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center px-4">
      <div className="text-center space-y-4">
        <p className="text-sm font-semibold uppercase tracking-wider text-[var(--color-brand)]">
          404
        </p>
        <h1 className="text-3xl font-bold">We can't find that page</h1>
        <p className="text-[var(--color-muted)]">
          The page you're looking for doesn't exist or has moved.
        </p>
        <Link to={ROUTES.home}>
          <Button leftIcon={<Home className="h-4 w-4" />}>
            Back to home
          </Button>
        </Link>
      </div>
    </div>
  );
}

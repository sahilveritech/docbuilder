import { lazy, Suspense } from "react";
import type { Route } from "./+types/business-card";
import { Loader } from "~/components/common/loader";

const BusinessCard = lazy(() => import("~/features/business-card"));

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Business Card Maker — Toolkit Lite" },
    {
      name: "description",
      content:
        "Design a double-sided business card. Export as PDF or PNG — everything stays in your browser.",
    },
  ];
}

export default function BusinessCardRoute() {
  return (
    <Suspense fallback={<Loader label="Loading business card maker…" fullscreen />}>
      <BusinessCard />
    </Suspense>
  );
}

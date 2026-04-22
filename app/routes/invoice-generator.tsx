import { lazy, Suspense } from "react";
import type { Route } from "./+types/invoice-generator";
import { Loader } from "~/components/common/loader";

const InvoiceGenerator = lazy(() => import("~/features/invoice-generator"));

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Invoice Generator — Toolkit Lite" },
    {
      name: "description",
      content:
        "Create polished invoices with live PDF preview. All data stays in your browser.",
    },
  ];
}

export default function InvoiceGeneratorRoute() {
  return (
    <Suspense fallback={<Loader label="Loading invoice generator…" fullscreen />}>
      <InvoiceGenerator />
    </Suspense>
  );
}

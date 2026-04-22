import { lazy, Suspense } from "react";
import type { Route } from "./+types/cover-letter";
import { Loader } from "~/components/common/loader";

const CoverLetter = lazy(() => import("~/features/cover-letter"));

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Cover Letter Builder — Toolkit Lite" },
    {
      name: "description",
      content:
        "Write a polished cover letter with clean templates and instant PDF download.",
    },
  ];
}

export default function CoverLetterRoute() {
  return (
    <Suspense fallback={<Loader label="Loading cover letter builder…" fullscreen />}>
      <CoverLetter />
    </Suspense>
  );
}

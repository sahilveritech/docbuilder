import { lazy, Suspense } from "react";
import type { Route } from "./+types/resume-builder";
import { Loader } from "~/components/common/loader";

const ResumeBuilder = lazy(() => import("~/features/resume-builder"));

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Resume Builder — Toolkit Lite" },
    {
      name: "description",
      content:
        "Create a polished, ATS-friendly resume with live PDF preview. Everything stays in your browser.",
    },
  ];
}

export default function ResumeBuilderRoute() {
  return (
    <Suspense fallback={<Loader label="Loading resume builder…" fullscreen />}>
      <ResumeBuilder />
    </Suspense>
  );
}

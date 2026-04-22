import { lazy, type ComponentType, type LazyExoticComponent } from "react";
import type { ResumeTemplateProps } from "../types";

type ResumeTemplateComponent = ComponentType<ResumeTemplateProps>;
type ResumeTemplateLoader = () => Promise<ResumeTemplateComponent>;

const loadClassicResumeTemplate: ResumeTemplateLoader = () =>
  import("./classic").then((m) => m.ClassicResumeTemplate);
const loadModernResumeTemplate: ResumeTemplateLoader = () =>
  import("./modern").then((m) => m.ModernResumeTemplate);
const loadSplitReferenceResumeTemplate: ResumeTemplateLoader = () =>
  import("./split-reference").then((m) => m.SplitReferenceResumeTemplate);

function lazyTemplate(
  loader: ResumeTemplateLoader,
): LazyExoticComponent<ResumeTemplateComponent> {
  return lazy(() => loader().then((component) => ({ default: component })));
}

export interface ResumeTemplateEntry {
  key: "classic" | "modern" | "split-reference";
  title: string;
  component: LazyExoticComponent<ResumeTemplateComponent>;
  load: ResumeTemplateLoader;
}

export const RESUME_TEMPLATES = [
  {
    key: "modern",
    title: "Modern",
    component: lazyTemplate(loadModernResumeTemplate),
    load: loadModernResumeTemplate,
  },
  {
    key: "split-reference",
    title: "Split (HTML Ref)",
    component: lazyTemplate(loadSplitReferenceResumeTemplate),
    load: loadSplitReferenceResumeTemplate,
  },
  {
    key: "classic",
    title: "Classic",
    component: lazyTemplate(loadClassicResumeTemplate),
    load: loadClassicResumeTemplate,
  },
] as const satisfies readonly ResumeTemplateEntry[];

export type ResumeTemplateKey = (typeof RESUME_TEMPLATES)[number]["key"];

export function getResumeTemplate(key: ResumeTemplateKey) {
  return RESUME_TEMPLATES.find((t) => t.key === key) ?? RESUME_TEMPLATES[0];
}

export function preloadResumeTemplate(key: ResumeTemplateKey) {
  return getResumeTemplate(key).load();
}

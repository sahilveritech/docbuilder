import type { ComponentType } from "react";
import { ClassicResumeTemplate } from "./classic";
import { ModernResumeTemplate } from "./modern";
import { SplitReferenceResumeTemplate } from "./split-reference";
import type { ResumeTemplateProps } from "../types";

export interface ResumeTemplateEntry {
  key: "classic" | "modern" | "split-reference";
  title: string;
  component: ComponentType<ResumeTemplateProps>;
}

export const RESUME_TEMPLATES = [
  { key: "modern", title: "Modern", component: ModernResumeTemplate },
  {
    key: "split-reference",
    title: "Split (HTML Ref)",
    component: SplitReferenceResumeTemplate,
  },
  { key: "classic", title: "Classic", component: ClassicResumeTemplate },
] as const satisfies readonly ResumeTemplateEntry[];

export type ResumeTemplateKey = (typeof RESUME_TEMPLATES)[number]["key"];

export function getResumeTemplate(key: ResumeTemplateKey) {
  return RESUME_TEMPLATES.find((t) => t.key === key) ?? RESUME_TEMPLATES[0];
}

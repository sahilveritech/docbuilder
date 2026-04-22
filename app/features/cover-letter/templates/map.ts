import type { ComponentType } from "react";
import { ClassicLetterTemplate } from "./classic";
import { ModernLetterTemplate } from "./modern";
import { ProfessionalLetterTemplate } from "./professional";
import type { CoverLetterTemplateProps } from "../types";

export interface LetterTemplateEntry {
  key: "classic" | "modern" | "professional";
  title: string;
  description: string;
  component: ComponentType<CoverLetterTemplateProps>;
}

export const LETTER_TEMPLATES = [
  {
    key: "classic",
    title: "Classic",
    description: "Serif typeface, centered header, formal feel.",
    component: ClassicLetterTemplate,
  },
  {
    key: "modern",
    title: "Modern",
    description: "Bold accent header with clean sans-serif body.",
    component: ModernLetterTemplate,
  },
  {
    key: "professional",
    title: "Professional",
    description: "Side panel with contact details and accent border.",
    component: ProfessionalLetterTemplate,
  },
] as const satisfies readonly LetterTemplateEntry[];

export type LetterTemplateKey = (typeof LETTER_TEMPLATES)[number]["key"];

export function getLetterTemplate(key: LetterTemplateKey) {
  return LETTER_TEMPLATES.find((t) => t.key === key) ?? LETTER_TEMPLATES[0];
}

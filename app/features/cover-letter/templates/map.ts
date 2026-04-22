import { lazy, type ComponentType, type LazyExoticComponent } from "react";
import type { CoverLetterTemplateProps } from "../types";

type LetterTemplateComponent = ComponentType<CoverLetterTemplateProps>;

type LetterTemplateLoader = () => Promise<LetterTemplateComponent>;

const loadClassicLetterTemplate: LetterTemplateLoader = () =>
  import("./classic").then((m) => m.ClassicLetterTemplate);
const loadModernLetterTemplate: LetterTemplateLoader = () =>
  import("./modern").then((m) => m.ModernLetterTemplate);
const loadProfessionalLetterTemplate: LetterTemplateLoader = () =>
  import("./professional").then((m) => m.ProfessionalLetterTemplate);

function lazyTemplate(loader: LetterTemplateLoader): LazyExoticComponent<LetterTemplateComponent> {
  return lazy(() => loader().then((component) => ({ default: component })));
}

export interface LetterTemplateEntry {
  key: "classic" | "modern" | "professional";
  title: string;
  description: string;
  component: LazyExoticComponent<LetterTemplateComponent>;
  load: LetterTemplateLoader;
}

export const LETTER_TEMPLATES = [
  {
    key: "classic",
    title: "Classic",
    description: "Serif typeface, centered header, formal feel.",
    component: lazyTemplate(loadClassicLetterTemplate),
    load: loadClassicLetterTemplate,
  },
  {
    key: "modern",
    title: "Modern",
    description: "Bold accent header with clean sans-serif body.",
    component: lazyTemplate(loadModernLetterTemplate),
    load: loadModernLetterTemplate,
  },
  {
    key: "professional",
    title: "Professional",
    description: "Side panel with contact details and accent border.",
    component: lazyTemplate(loadProfessionalLetterTemplate),
    load: loadProfessionalLetterTemplate,
  },
] as const satisfies readonly LetterTemplateEntry[];

export type LetterTemplateKey = (typeof LETTER_TEMPLATES)[number]["key"];

export function getLetterTemplate(key: LetterTemplateKey) {
  return LETTER_TEMPLATES.find((t) => t.key === key) ?? LETTER_TEMPLATES[0];
}

export function preloadLetterTemplate(key: LetterTemplateKey) {
  return getLetterTemplate(key).load();
}

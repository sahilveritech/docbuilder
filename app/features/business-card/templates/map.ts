import { lazy, type ComponentType, type LazyExoticComponent } from "react";
import type { BusinessCardTemplateProps } from "../types";

type CardTemplateComponent = ComponentType<BusinessCardTemplateProps>;
type CardTemplateLoader = () => Promise<CardTemplateComponent>;

const loadClassicCardTemplate: CardTemplateLoader = () =>
  import("./classic").then((m) => m.ClassicCardTemplate);
const loadModernCardTemplate: CardTemplateLoader = () =>
  import("./modern").then((m) => m.ModernCardTemplate);
const loadBoldCardTemplate: CardTemplateLoader = () =>
  import("./bold").then((m) => m.BoldCardTemplate);
const loadMinimalCardTemplate: CardTemplateLoader = () =>
  import("./minimal").then((m) => m.MinimalCardTemplate);

function lazyTemplate(loader: CardTemplateLoader): LazyExoticComponent<CardTemplateComponent> {
  return lazy(() => loader().then((component) => ({ default: component })));
}

export interface CardTemplateEntry {
  key: "classic" | "modern" | "bold" | "minimal";
  title: string;
  description: string;
  component: LazyExoticComponent<CardTemplateComponent>;
  load: CardTemplateLoader;
}

export const CARD_TEMPLATES = [
  {
    key: "classic",
    title: "Classic",
    description: "Clean two-panel layout.",
    component: lazyTemplate(loadClassicCardTemplate),
    load: loadClassicCardTemplate,
  },
  {
    key: "modern",
    title: "Modern",
    description: "Colored sidebar with contact block.",
    component: lazyTemplate(loadModernCardTemplate),
    load: loadModernCardTemplate,
  },
  {
    key: "bold",
    title: "Bold",
    description: "Full-bleed accent color.",
    component: lazyTemplate(loadBoldCardTemplate),
    load: loadBoldCardTemplate,
  },
  {
    key: "minimal",
    title: "Minimal",
    description: "Ultra-clean and understated.",
    component: lazyTemplate(loadMinimalCardTemplate),
    load: loadMinimalCardTemplate,
  },
] as const satisfies readonly CardTemplateEntry[];

export type CardTemplateKey = (typeof CARD_TEMPLATES)[number]["key"];

export function getCardTemplate(key: CardTemplateKey) {
  return CARD_TEMPLATES.find((t) => t.key === key) ?? CARD_TEMPLATES[0];
}

export function preloadCardTemplate(key: CardTemplateKey) {
  return getCardTemplate(key).load();
}

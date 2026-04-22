import type { ComponentType } from "react";
import { ClassicCardTemplate } from "./classic";
import { ModernCardTemplate } from "./modern";
import { BoldCardTemplate } from "./bold";
import { MinimalCardTemplate } from "./minimal";
import type { BusinessCardTemplateProps } from "../types";

export interface CardTemplateEntry {
  key: "classic" | "modern" | "bold" | "minimal";
  title: string;
  description: string;
  component: ComponentType<BusinessCardTemplateProps>;
}

export const CARD_TEMPLATES = [
  {
    key: "classic",
    title: "Classic",
    description: "Clean two-panel layout.",
    component: ClassicCardTemplate,
  },
  {
    key: "modern",
    title: "Modern",
    description: "Colored sidebar with contact block.",
    component: ModernCardTemplate,
  },
  {
    key: "bold",
    title: "Bold",
    description: "Full-bleed accent color.",
    component: BoldCardTemplate,
  },
  {
    key: "minimal",
    title: "Minimal",
    description: "Ultra-clean and understated.",
    component: MinimalCardTemplate,
  },
] as const satisfies readonly CardTemplateEntry[];

export type CardTemplateKey = (typeof CARD_TEMPLATES)[number]["key"];

export function getCardTemplate(key: CardTemplateKey) {
  return CARD_TEMPLATES.find((t) => t.key === key) ?? CARD_TEMPLATES[0];
}

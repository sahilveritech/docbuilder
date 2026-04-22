import type { ComponentType } from "react";
import { ClassicInvoiceTemplate } from "./classic";
import { ModernInvoiceTemplate } from "./modern";
import { MinimalInvoiceTemplate } from "./minimal";
import type { InvoiceTemplateProps } from "../types";

export interface InvoiceTemplateEntry {
  key: "classic" | "modern" | "minimal";
  title: string;
  description: string;
  component: ComponentType<InvoiceTemplateProps>;
}

export const INVOICE_TEMPLATES = [
  {
    key: "classic",
    title: "Classic",
    description: "Clean, timeless layout with clear totals.",
    component: ClassicInvoiceTemplate,
  },
  {
    key: "modern",
    title: "Modern",
    description: "Colored banner with accent-driven highlights.",
    component: ModernInvoiceTemplate,
  },
  {
    key: "minimal",
    title: "Minimal",
    description: "Lots of whitespace and understated typography.",
    component: MinimalInvoiceTemplate,
  },
] as const satisfies readonly InvoiceTemplateEntry[];

export type InvoiceTemplateKey = (typeof INVOICE_TEMPLATES)[number]["key"];

export function getInvoiceTemplate(key: InvoiceTemplateKey) {
  return INVOICE_TEMPLATES.find((t) => t.key === key) ?? INVOICE_TEMPLATES[0];
}

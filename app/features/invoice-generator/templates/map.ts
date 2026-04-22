import { lazy, type ComponentType, type LazyExoticComponent } from "react";
import type { InvoiceTemplateProps } from "../types";

type InvoiceTemplateComponent = ComponentType<InvoiceTemplateProps>;
type InvoiceTemplateLoader = () => Promise<InvoiceTemplateComponent>;

const loadClassicInvoiceTemplate: InvoiceTemplateLoader = () =>
  import("./classic").then((m) => m.ClassicInvoiceTemplate);
const loadModernInvoiceTemplate: InvoiceTemplateLoader = () =>
  import("./modern").then((m) => m.ModernInvoiceTemplate);
const loadMinimalInvoiceTemplate: InvoiceTemplateLoader = () =>
  import("./minimal").then((m) => m.MinimalInvoiceTemplate);

function lazyTemplate(
  loader: InvoiceTemplateLoader,
): LazyExoticComponent<InvoiceTemplateComponent> {
  return lazy(() => loader().then((component) => ({ default: component })));
}

export interface InvoiceTemplateEntry {
  key: "classic" | "modern" | "minimal";
  title: string;
  description: string;
  component: LazyExoticComponent<InvoiceTemplateComponent>;
  load: InvoiceTemplateLoader;
}

export const INVOICE_TEMPLATES = [
  {
    key: "classic",
    title: "Classic",
    description: "Clean, timeless layout with clear totals.",
    component: lazyTemplate(loadClassicInvoiceTemplate),
    load: loadClassicInvoiceTemplate,
  },
  {
    key: "modern",
    title: "Modern",
    description: "Colored banner with accent-driven highlights.",
    component: lazyTemplate(loadModernInvoiceTemplate),
    load: loadModernInvoiceTemplate,
  },
  {
    key: "minimal",
    title: "Minimal",
    description: "Lots of whitespace and understated typography.",
    component: lazyTemplate(loadMinimalInvoiceTemplate),
    load: loadMinimalInvoiceTemplate,
  },
] as const satisfies readonly InvoiceTemplateEntry[];

export type InvoiceTemplateKey = (typeof INVOICE_TEMPLATES)[number]["key"];

export function getInvoiceTemplate(key: InvoiceTemplateKey) {
  return INVOICE_TEMPLATES.find((t) => t.key === key) ?? INVOICE_TEMPLATES[0];
}

export function preloadInvoiceTemplate(key: InvoiceTemplateKey) {
  return getInvoiceTemplate(key).load();
}

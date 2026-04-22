import type { Invoice } from "~/services/invoice.service";
import type { InvoiceTotals } from "../types";

export function computeTotals(invoice: Invoice): InvoiceTotals {
  const subtotal = invoice.items.reduce(
    (sum, item) =>
      sum +
      (Number.isFinite(item.quantity) ? item.quantity : 0) *
        (Number.isFinite(item.unitPrice) ? item.unitPrice : 0),
    0,
  );
  const discountAmount = Math.max(0, Math.min(invoice.discount ?? 0, subtotal));
  const taxableBase = Math.max(0, subtotal - discountAmount);
  const taxRate = Math.max(0, invoice.taxRate ?? 0);
  const taxAmount = taxableBase * (taxRate / 100);
  const total = taxableBase + taxAmount;
  return {
    subtotal: round2(subtotal),
    discountAmount: round2(discountAmount),
    taxableBase: round2(taxableBase),
    taxAmount: round2(taxAmount),
    total: round2(total),
  };
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

export function formatDate(iso: string, locale = "en-US"): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatCurrency(amount: number, currency: string): string {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${currency} ${amount.toFixed(2)}`;
  }
}

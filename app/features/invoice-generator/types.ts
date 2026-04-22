export type { Invoice, InvoiceItem, InvoiceParty } from "~/services/invoice.service";
export { InvoiceSchema, createEmptyInvoice } from "~/services/invoice.service";

export interface InvoiceTotals {
  subtotal: number;
  discountAmount: number;
  taxableBase: number;
  taxAmount: number;
  total: number;
}

export interface InvoiceTemplateProps {
  data: import("~/services/invoice.service").Invoice;
  totals: InvoiceTotals;
}

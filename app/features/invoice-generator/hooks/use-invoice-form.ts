import { useCallback } from "react";
import {
  invoiceService,
  type Invoice,
  type InvoiceItem,
  type InvoiceParty,
} from "~/services/invoice.service";
import { uid } from "~/lib/utils";
import { useInvoice } from "./use-invoice";

type PartyKey = "sender" | "client";

export interface InvoiceFormApi {
  state: Invoice;
  updateField<K extends keyof Invoice>(key: K, value: Invoice[K]): void;
  updateParty(which: PartyKey, patch: Partial<InvoiceParty>): void;
  addItem(): void;
  updateItem(id: string, patch: Partial<InvoiceItem>): void;
  removeItem(id: string): void;
  reset(): void;
}

export function useInvoiceForm(): InvoiceFormApi {
  const state = useInvoice();

  const updateField = useCallback<InvoiceFormApi["updateField"]>((key, value) => {
    invoiceService.setState((prev) => ({ ...prev, [key]: value }));
  }, []);

  const updateParty = useCallback<InvoiceFormApi["updateParty"]>((which, patch) => {
    invoiceService.setState((prev) => ({
      ...prev,
      [which]: { ...prev[which], ...patch },
    }));
  }, []);

  const addItem = useCallback(() => {
    invoiceService.setState((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        { id: uid("item"), description: "", quantity: 1, unitPrice: 0 },
      ],
    }));
  }, []);

  const updateItem = useCallback<InvoiceFormApi["updateItem"]>((id, patch) => {
    invoiceService.setState((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === id ? { ...item, ...patch } : item,
      ),
    }));
  }, []);

  const removeItem = useCallback((id: string) => {
    invoiceService.setState((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
    }));
  }, []);

  const reset = useCallback(() => invoiceService.reset(), []);

  return { state, updateField, updateParty, addItem, updateItem, removeItem, reset };
}

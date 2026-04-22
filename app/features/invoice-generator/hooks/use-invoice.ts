import { useSyncExternalStore } from "react";
import { invoiceService } from "~/services/invoice.service";

export function useInvoice() {
  const state = useSyncExternalStore(
    invoiceService.subscribe,
    invoiceService.getState,
    invoiceService.getServerSnapshot,
  );
  return state;
}

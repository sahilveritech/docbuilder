import { useSyncExternalStore } from "react";
import { businessCardService } from "~/services/business-card.service";

export function useBusinessCard() {
  return useSyncExternalStore(
    businessCardService.subscribe,
    businessCardService.getState,
    businessCardService.getServerSnapshot,
  );
}

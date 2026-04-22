import { useSyncExternalStore } from "react";
import { coverLetterService } from "~/services/cover-letter.service";

export function useCoverLetter() {
  return useSyncExternalStore(
    coverLetterService.subscribe,
    coverLetterService.getState,
    coverLetterService.getServerSnapshot,
  );
}

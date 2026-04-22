import { useCallback } from "react";
import {
  coverLetterService,
  type CoverLetter,
  type CoverLetterParty,
} from "~/services/cover-letter.service";
import { useCoverLetter } from "./use-cover-letter";

type PartyKey = "sender" | "recipient";

export interface CoverLetterFormApi {
  state: CoverLetter;
  updateField<K extends keyof CoverLetter>(
    key: K,
    value: CoverLetter[K],
  ): void;
  updateParty(which: PartyKey, patch: Partial<CoverLetterParty>): void;
  reset(): void;
}

export function useCoverLetterForm(): CoverLetterFormApi {
  const state = useCoverLetter();

  const updateField = useCallback<CoverLetterFormApi["updateField"]>(
    (key, value) => {
      coverLetterService.setState((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const updateParty = useCallback<CoverLetterFormApi["updateParty"]>(
    (which, patch) => {
      coverLetterService.setState((prev) => ({
        ...prev,
        [which]: { ...prev[which], ...patch },
      }));
    },
    [],
  );

  const reset = useCallback(() => coverLetterService.reset(), []);

  return { state, updateField, updateParty, reset };
}

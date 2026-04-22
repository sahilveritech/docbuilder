import { useCallback } from "react";
import {
  businessCardService,
  type BusinessCard,
} from "~/services/business-card.service";
import { useBusinessCard } from "./use-card";

export interface CardFormApi {
  state: BusinessCard;
  updateField<K extends keyof BusinessCard>(
    key: K,
    value: BusinessCard[K],
  ): void;
  updateSocial(
    patch: Partial<BusinessCard["social"]>,
  ): void;
  reset(): void;
}

export function useCardForm(): CardFormApi {
  const state = useBusinessCard();

  const updateField = useCallback<CardFormApi["updateField"]>((key, value) => {
    businessCardService.setState((prev) => ({ ...prev, [key]: value }));
  }, []);

  const updateSocial = useCallback<CardFormApi["updateSocial"]>((patch) => {
    businessCardService.setState((prev) => ({
      ...prev,
      social: { ...prev.social, ...patch },
    }));
  }, []);

  const reset = useCallback(() => businessCardService.reset(), []);

  return { state, updateField, updateSocial, reset };
}

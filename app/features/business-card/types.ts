export type { BusinessCard } from "~/services/business-card.service";
export {
  BusinessCardSchema,
  createEmptyCard,
} from "~/services/business-card.service";

export interface BusinessCardTemplateProps {
  data: import("~/services/business-card.service").BusinessCard;
  side: "front" | "back";
}

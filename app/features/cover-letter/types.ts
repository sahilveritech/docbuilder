export type { CoverLetter, CoverLetterParty } from "~/services/cover-letter.service";
export {
  CoverLetterSchema,
  createEmptyCoverLetter,
} from "~/services/cover-letter.service";

export interface CoverLetterTemplateProps {
  data: import("~/services/cover-letter.service").CoverLetter;
}

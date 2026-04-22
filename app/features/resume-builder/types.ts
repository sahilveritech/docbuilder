export type {
  ResumeData,
  ResumeEducation,
  ResumeExperience,
} from "~/services/resume.service";
export { createEmptyResume, ResumeSchema } from "~/services/resume.service";

export interface ResumeTemplateProps {
  data: import("~/services/resume.service").ResumeData;
}

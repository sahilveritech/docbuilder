import { useCallback } from "react";
import {
  resumeService,
  type ResumeData,
  type ResumeEducation,
  type ResumeExperience,
} from "~/services/resume.service";
import { useResume } from "./use-resume";

const makeId = () => Math.random().toString(36).slice(2, 10);

export interface ResumeFormApi {
  state: ResumeData;
  updateField<K extends keyof ResumeData>(key: K, value: ResumeData[K]): void;
  addExperience(): void;
  updateExperience(id: string, patch: Partial<ResumeExperience>): void;
  removeExperience(id: string): void;
  addEducation(): void;
  updateEducation(index: number, patch: Partial<ResumeEducation>): void;
  removeEducation(index: number): void;
  reset(): void;
}

export function useResumeForm(): ResumeFormApi {
  const state = useResume();

  const updateField = useCallback<ResumeFormApi["updateField"]>((key, value) => {
    resumeService.setState((prev) => ({ ...prev, [key]: value }));
  }, []);

  const addExperience = useCallback(() => {
    resumeService.setState((prev) => ({
      ...prev,
      experiences: [
        ...prev.experiences,
        {
          id: makeId(),
          role: "",
          company: "",
          location: "",
          startDate: "",
          endDate: "",
          bullets: "",
        },
      ],
    }));
  }, []);

  const updateExperience = useCallback<ResumeFormApi["updateExperience"]>(
    (id, patch) => {
      resumeService.setState((prev) => ({
        ...prev,
        experiences: prev.experiences.map((exp) =>
          exp.id === id ? { ...exp, ...patch } : exp,
        ),
      }));
    },
    [],
  );

  const removeExperience = useCallback((id: string) => {
    resumeService.setState((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((exp) => exp.id !== id),
    }));
  }, []);

  const addEducation = useCallback(() => {
    resumeService.setState((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        { degree: "", institution: "", startYear: "", endYear: "" },
      ],
    }));
  }, []);

  const updateEducation = useCallback<ResumeFormApi["updateEducation"]>(
    (index, patch) => {
      resumeService.setState((prev) => ({
        ...prev,
        education: prev.education.map((ed, i) =>
          i === index ? { ...ed, ...patch } : ed,
        ),
      }));
    },
    [],
  );

  const removeEducation = useCallback((index: number) => {
    resumeService.setState((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  }, []);

  const reset = useCallback(() => resumeService.reset(), []);

  return {
    state,
    updateField,
    addExperience,
    updateExperience,
    removeExperience,
    addEducation,
    updateEducation,
    removeEducation,
    reset,
  };
}

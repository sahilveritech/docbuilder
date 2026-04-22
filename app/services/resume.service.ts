import { z } from "zod";

const ExperienceSchema = z.object({
  id: z.string(),
  role: z.string().default(""),
  company: z.string().default(""),
  location: z.string().default(""),
  startDate: z.string().default(""),
  endDate: z.string().default(""),
  bullets: z.string().default(""),
});

const EducationSchema = z.object({
  degree: z.string().default(""),
  institution: z.string().default(""),
  startYear: z.string().default(""),
  endYear: z.string().default(""),
});

const ProjectSchema = z.object({
  id: z.string(),
  name: z.string().default(""),
  role: z.string().default(""),
  skillsUsed: z.string().default(""),
  description: z.string().default(""),
});

export const ResumeSchema = z.object({
  name: z.string().default(""),
  title: z.string().default(""),
  email: z.string().default(""),
  phone: z.string().default(""),
  location: z.string().default(""),
  website: z.string().default(""),
  linkedin: z.string().default(""),
  summary: z.string().default(""),
  skills: z.string().default(""),
  languages: z.string().default(""),
  experiences: z.array(ExperienceSchema).default([]),
  projects: z.array(ProjectSchema).default([]),
  education: z.array(EducationSchema).default([]),
  template: z
    .enum(["classic", "modern", "split-reference"])
    .default("split-reference"),
  accent: z.string().default("#1D4ED8"),
});

export type ResumeData = z.infer<typeof ResumeSchema>;
export type ResumeExperience = z.infer<typeof ExperienceSchema>;
export type ResumeEducation = z.infer<typeof EducationSchema>;
export type ResumeProject = z.infer<typeof ProjectSchema>;

const STORAGE_KEY = "toolkit-lite:resume:v1";
type Listener = () => void;

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

export function createEmptyResume(): ResumeData {
  return {
    name: "Sahil katna",
    title: "Full Stack Developer",
    email: "sahilkatna6@gmail.com",
    phone: "+91 99999 99999",
    location: "Gurugram, India",
    website: "",
    linkedin: "linkedin.com/in/kushal",
    summary:
      "Experienced software engineer with 6+ years delivering products using React, TypeScript, Node.js, and cloud tooling. Strong collaborator focused on performance, quality, and product outcomes.",
    skills:
      "React, TypeScript, JavaScript, Node.js, Express, REST APIs, Git, SQL, AWS",
    languages: "English, Hindi",
    experiences: [
      {
        id: uid(),
        role: "Senior Software Engineer",
        company: "Example Company",
        location: "Gurugram",
        startDate: "2022",
        endDate: "Present",
        bullets:
          "Led migration to modern React architecture, improving performance and maintainability.\nBuilt reusable UI components and internal tooling used across teams.",
      },
      {
        id: uid(),
        role: "Software Engineer",
        company: "Previous Company",
        location: "Remote",
        startDate: "2019",
        endDate: "2022",
        bullets:
          "Developed end-to-end features and optimized API integrations.\nCollaborated with product/design to ship customer-facing workflows.",
      },
    ],
    projects: [
      {
        id: uid(),
        name: "TaskFlow Dashboard",
        role: "Frontend Developer (React)",
        skillsUsed: "React, TypeScript, Tailwind CSS, React Router, Chart.js",
        description:
          "Built a responsive project-management dashboard with filters, charts, and reusable UI components to improve team productivity tracking.",
      },
      {
        id: uid(),
        name: "University CMS Revamp",
        role: "Drupal Developer",
        skillsUsed: "Drupal 10, PHP, Twig, Views, Paragraphs, MySQL",
        description:
          "Delivered a Drupal migration with custom content models and optimized page performance for an editorial-heavy university website.",
      },
    ],
    education: [
      {
        degree: "B.Tech in Computer Science",
        institution: "XYZ University",
        startYear: "2014",
        endYear: "2018",
      },
    ],
    template: "split-reference",
    accent: "#1D4ED8",
  };
}

class ResumeService {
  private state: ResumeData = createEmptyResume();
  private listeners = new Set<Listener>();
  private hydrated = false;

  private hydrate() {
    if (this.hydrated || typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = ResumeSchema.safeParse(JSON.parse(raw));
        if (parsed.success) this.state = parsed.data;
      }
    } catch {
      /* ignore */
    }
    this.hydrated = true;
  }

  private persist() {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch {
      /* ignore */
    }
  }

  getState = () => {
    this.hydrate();
    return this.state;
  };

  getServerSnapshot = () => createEmptyResume();

  subscribe = (listener: Listener) => {
    this.hydrate();
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  setState(updater: ResumeData | ((prev: ResumeData) => ResumeData)) {
    this.hydrate();
    this.state =
      typeof updater === "function"
        ? (updater as (prev: ResumeData) => ResumeData)(this.state)
        : updater;
    this.persist();
    this.listeners.forEach((l) => l());
  }

  reset() {
    this.state = createEmptyResume();
    this.persist();
    this.listeners.forEach((l) => l());
  }
}

export const resumeService = new ResumeService();

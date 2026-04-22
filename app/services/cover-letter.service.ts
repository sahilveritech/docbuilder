import { z } from "zod";
import { todayISO } from "~/lib/utils";

const PartySchema = z.object({
  name: z.string().default(""),
  title: z.string().default(""),
  company: z.string().default(""),
  email: z.string().default(""),
  phone: z.string().default(""),
  address: z.string().default(""),
});

export const CoverLetterSchema = z.object({
  sender: PartySchema,
  recipient: PartySchema,
  date: z.string().default(""),
  subject: z.string().default(""),
  salutation: z.string().default("Dear Hiring Manager,"),
  body: z.string().default(""),
  closing: z.string().default("Sincerely,"),
  signature: z.string().default(""),
  template: z.enum(["classic", "modern", "professional"]).default("modern"),
  accent: z.string().default("#4F46E5"),
});

export type CoverLetter = z.infer<typeof CoverLetterSchema>;
export type CoverLetterParty = z.infer<typeof PartySchema>;

const STORAGE_KEY = "toolkit-lite:cover-letter:v1";

type Listener = () => void;

export function createEmptyCoverLetter(): CoverLetter {
  return {
    sender: {
      name: "Jordan Lee",
      title: "Senior Frontend Engineer",
      company: "",
      email: "jordan.lee@example.com",
      phone: "+1 (555) 987-6543",
      address: "Brooklyn, NY",
    },
    recipient: {
      name: "Taylor Smith",
      title: "Engineering Manager",
      company: "Northwind Labs",
      email: "",
      phone: "",
      address: "100 Innovation Way, Austin, TX",
    },
    date: todayISO(),
    subject: "Application for Senior Frontend Engineer",
    salutation: "Dear Taylor,",
    body: `I'm writing to express my interest in the Senior Frontend Engineer role at Northwind Labs. With seven years of experience building performant, accessible web applications, I'm excited by your team's focus on shipping thoughtful user experiences.

In my current role, I led the migration of a legacy SPA to a modern React and TypeScript stack, reducing bundle size by 42% and cutting page-load time in half. I collaborated closely with designers to establish a component library that now powers five products across the company.

I'd love the opportunity to bring that experience to Northwind. Thank you for considering my application — I look forward to hearing from you.`,
    closing: "Sincerely,",
    signature: "Jordan Lee",
    template: "modern",
    accent: "#4F46E5",
  };
}

class CoverLetterService {
  private state: CoverLetter = createEmptyCoverLetter();
  private listeners = new Set<Listener>();
  private hydrated = false;

  private hydrate(): void {
    if (this.hydrated || typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = CoverLetterSchema.safeParse(JSON.parse(raw));
        if (parsed.success) this.state = parsed.data;
      }
    } catch {
      /* ignore */
    }
    this.hydrated = true;
  }

  private persist(): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch {
      /* ignore */
    }
  }

  getState = (): CoverLetter => {
    this.hydrate();
    return this.state;
  };

  getServerSnapshot = (): CoverLetter => createEmptyCoverLetter();

  subscribe = (listener: Listener): (() => void) => {
    this.hydrate();
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  private emit() {
    this.listeners.forEach((l) => l());
  }

  setState(updater: CoverLetter | ((prev: CoverLetter) => CoverLetter)): void {
    this.hydrate();
    const next =
      typeof updater === "function"
        ? (updater as (p: CoverLetter) => CoverLetter)(this.state)
        : updater;
    this.state = next;
    this.persist();
    this.emit();
  }

  reset(): void {
    this.state = createEmptyCoverLetter();
    this.persist();
    this.emit();
  }
}

export const coverLetterService = new CoverLetterService();

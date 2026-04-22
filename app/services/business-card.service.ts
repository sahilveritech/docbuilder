import { z } from "zod";

export const BusinessCardSchema = z.object({
  name: z.string().default(""),
  title: z.string().default(""),
  company: z.string().default(""),
  tagline: z.string().default(""),
  email: z.string().default(""),
  phone: z.string().default(""),
  website: z.string().default(""),
  address: z.string().default(""),
  social: z
    .object({
      twitter: z.string().default(""),
      linkedin: z.string().default(""),
      github: z.string().default(""),
    })
    .default({ twitter: "", linkedin: "", github: "" }),
  logo: z.string().nullable().default(null),
  primaryColor: z.string().default("#4F46E5"),
  secondaryColor: z.string().default("#111827"),
  textColor: z.string().default("#FFFFFF"),
  template: z.enum(["classic", "modern", "bold", "minimal"]).default("modern"),
});

export type BusinessCard = z.infer<typeof BusinessCardSchema>;

const STORAGE_KEY = "toolkit-lite:business-card:v1";

type Listener = () => void;

export function createEmptyCard(): BusinessCard {
  return {
    name: "Alex Morgan",
    title: "Product Designer",
    company: "Acme Studio",
    tagline: "Crafting useful digital products",
    email: "alex@acme.co",
    phone: "+1 (555) 123-4567",
    website: "acme.co",
    address: "San Francisco, CA",
    social: {
      twitter: "@alexmorgan",
      linkedin: "in/alexmorgan",
      github: "alexmorgan",
    },
    logo: null,
    primaryColor: "#4F46E5",
    secondaryColor: "#0F172A",
    textColor: "#FFFFFF",
    template: "modern",
  };
}

class BusinessCardService {
  private state: BusinessCard = createEmptyCard();
  private listeners = new Set<Listener>();
  private hydrated = false;

  private hydrate(): void {
    if (this.hydrated || typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = BusinessCardSchema.safeParse(JSON.parse(raw));
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

  getState = (): BusinessCard => {
    this.hydrate();
    return this.state;
  };

  getServerSnapshot = (): BusinessCard => createEmptyCard();

  subscribe = (listener: Listener): (() => void) => {
    this.hydrate();
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  private emit() {
    this.listeners.forEach((l) => l());
  }

  setState(updater: BusinessCard | ((prev: BusinessCard) => BusinessCard)): void {
    this.hydrate();
    const next =
      typeof updater === "function"
        ? (updater as (p: BusinessCard) => BusinessCard)(this.state)
        : updater;
    this.state = next;
    this.persist();
    this.emit();
  }

  reset(): void {
    this.state = createEmptyCard();
    this.persist();
    this.emit();
  }
}

export const businessCardService = new BusinessCardService();

import { z } from "zod";
import { addDaysISO, todayISO, uid } from "~/lib/utils";

const PartySchema = z.object({
  name: z.string().default(""),
  email: z.string().default(""),
  phone: z.string().default(""),
  address: z.string().default(""),
  website: z.string().default(""),
  taxId: z.string().default(""),
});

const LineItemSchema = z.object({
  id: z.string(),
  description: z.string().default(""),
  quantity: z.number().default(1),
  unitPrice: z.number().default(0),
});

export const InvoiceSchema = z.object({
  number: z.string().default(""),
  issueDate: z.string().default(""),
  dueDate: z.string().default(""),
  currency: z.string().default("USD"),
  taxRate: z.number().default(0),
  discount: z.number().default(0),
  notes: z.string().default(""),
  sender: PartySchema,
  client: PartySchema,
  items: z.array(LineItemSchema).default([]),
  logo: z.string().nullable().default(null),
  template: z.enum(["classic", "modern", "minimal"]).default("classic"),
  accent: z.string().default("#4F46E5"),
});

export type Invoice = z.infer<typeof InvoiceSchema>;
export type InvoiceParty = z.infer<typeof PartySchema>;
export type InvoiceItem = z.infer<typeof LineItemSchema>;

const STORAGE_KEY = "toolkit-lite:invoice:v1";

type Listener = () => void;

export function createEmptyInvoice(): Invoice {
  return {
    number: `INV-${new Date().getFullYear()}-0001`,
    issueDate: todayISO(),
    dueDate: addDaysISO(14),
    currency: "USD",
    taxRate: 0,
    discount: 0,
    notes: "Thank you for your business!",
    sender: {
      name: "Acme Studio",
      email: "hello@acme.co",
      phone: "+1 (555) 123-4567",
      address: "123 Market St, San Francisco, CA",
      website: "acme.co",
      taxId: "",
    },
    client: {
      name: "Client Co.",
      email: "billing@client.co",
      phone: "",
      address: "",
      website: "",
      taxId: "",
    },
    items: [
      {
        id: uid("item"),
        description: "Design services",
        quantity: 10,
        unitPrice: 75,
      },
    ],
    logo: null,
    template: "classic",
    accent: "#4F46E5",
  };
}

class InvoiceService {
  private state: Invoice = createEmptyInvoice();
  private listeners = new Set<Listener>();
  private hydrated = false;

  private hydrate(): void {
    if (this.hydrated || typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = InvoiceSchema.safeParse(JSON.parse(raw));
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

  getState = (): Invoice => {
    this.hydrate();
    return this.state;
  };

  getServerSnapshot = (): Invoice => createEmptyInvoice();

  subscribe = (listener: Listener): (() => void) => {
    this.hydrate();
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  private emit() {
    this.listeners.forEach((l) => l());
  }

  setState(updater: Invoice | ((prev: Invoice) => Invoice)): void {
    this.hydrate();
    const next =
      typeof updater === "function"
        ? (updater as (p: Invoice) => Invoice)(this.state)
        : updater;
    this.state = next;
    this.persist();
    this.emit();
  }

  reset(): void {
    this.state = createEmptyInvoice();
    this.persist();
    this.emit();
  }
}

export const invoiceService = new InvoiceService();

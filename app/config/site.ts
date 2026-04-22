import {
  FileText,
  IdCard,
  Mail,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { ROUTES } from "./paths";

export const SITE = {
  name: "Toolkit Lite",
  tagline: "Privacy-first browser toolkit",
  description:
    "Build invoices, business cards, and cover letters — entirely in your browser. Your data never leaves your device.",
  author: "Toolkit Lite",
  year: new Date().getFullYear(),
} as const;

export interface NavItem {
  label: string;
  to: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Invoice", to: ROUTES.invoiceGenerator },
  { label: "Business Card", to: ROUTES.businessCard },
  { label: "Cover Letter", to: ROUTES.coverLetter },
  { label: "Resume", to: ROUTES.resumeBuilder },
];

export interface FeatureCard {
  key: "invoice" | "business-card" | "cover-letter" | "resume-builder";
  title: string;
  description: string;
  to: string;
  icon: LucideIcon;
  accent: string;
}

export const FEATURE_CARDS: FeatureCard[] = [
  {
    key: "invoice",
    title: "Invoice Generator",
    description:
      "Create professional invoices with line items, taxes, discounts, and live PDF preview.",
    to: ROUTES.invoiceGenerator,
    icon: FileText,
    accent: "from-indigo-500 to-violet-500",
  },
  {
    key: "business-card",
    title: "Business Card Maker",
    description:
      "Design a double-sided card with your branding — export as PDF or PNG.",
    to: ROUTES.businessCard,
    icon: IdCard,
    accent: "from-emerald-500 to-teal-500",
  },
  {
    key: "cover-letter",
    title: "Cover Letter Builder",
    description:
      "Write a polished cover letter with clean templates and instant PDF download.",
    to: ROUTES.coverLetter,
    icon: Mail,
    accent: "from-amber-500 to-orange-500",
  },
  {
    key: "resume-builder",
    title: "Resume Builder",
    description:
      "Create a modern one-page resume with a profile summary, experience timeline, and technical skills.",
    to: ROUTES.resumeBuilder,
    icon: UserRound,
    accent: "from-sky-500 to-cyan-500",
  },
];

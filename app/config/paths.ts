export const ROUTES = {
  home: "/",
  invoiceGenerator: "/invoice-generator",
  businessCard: "/business-card",
  coverLetter: "/cover-letter",
  resumeBuilder: "/resume-builder",
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];

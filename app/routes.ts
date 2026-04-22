import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("invoice-generator", "routes/invoice-generator.tsx"),
  route("business-card", "routes/business-card.tsx"),
  route("cover-letter", "routes/cover-letter.tsx"),
  route("resume-builder", "routes/resume-builder.tsx"),
  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;

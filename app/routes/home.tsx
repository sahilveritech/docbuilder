import { Link } from "react-router";
import { ArrowRight, Lock, Sparkles, Zap } from "lucide-react";
import type { Route } from "./+types/home";
import { FEATURE_CARDS, SITE } from "~/config/site";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardBody } from "~/components/ui/card";

export function meta(_: Route.MetaArgs) {
  return [
    { title: `${SITE.name} — ${SITE.tagline}` },
    { name: "description", content: SITE.description },
  ];
}

export default function Home() {
  return (
    <div className="space-y-16 animate-fade-in">
      <section className="text-center space-y-5 pt-6 sm:pt-12">
        <Badge variant="brand" className="inline-flex">
          <Lock className="h-3 w-3" aria-hidden /> 100% local — nothing leaves your browser
        </Badge>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-balance">
          A tiny toolkit for{" "}
          <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
            professional documents
          </span>
        </h1>
        <p className="text-lg text-[var(--color-muted)] max-w-2xl mx-auto">
          {SITE.description}
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <Link to={FEATURE_CARDS[0].to}>
            <Button size="lg" rightIcon={<ArrowRight className="h-4 w-4" />}>
              Start with an invoice
            </Button>
          </Link>
          <a
            href="#tools"
            className="text-sm font-medium text-[var(--color-muted)] hover:text-[var(--color-fg)] px-3 py-2"
          >
            Browse all tools
          </a>
        </div>
      </section>

      <section
        id="tools"
        className="grid gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-4 scroll-mt-20"
      >
        {FEATURE_CARDS.map((feature) => {
          const Icon = feature.icon;
          return (
            <Link key={feature.key} to={feature.to} className="group block">
              <Card interactive className="h-full">
                <CardBody className="flex flex-col gap-4">
                  <div
                    className={`h-11 w-11 rounded-xl bg-gradient-to-br ${feature.accent} text-white flex items-center justify-center`}
                  >
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <div className="space-y-1.5">
                    <h2 className="text-lg font-semibold text-[var(--color-fg)]">
                      {feature.title}
                    </h2>
                    <p className="text-sm text-[var(--color-muted)]">
                      {feature.description}
                    </p>
                  </div>
                  <div className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-brand)] group-hover:gap-2 transition-all">
                    Open tool <ArrowRight className="h-4 w-4" aria-hidden />
                  </div>
                </CardBody>
              </Card>
            </Link>
          );
        })}
      </section>

      <section className="grid gap-5 grid-cols-1 sm:grid-cols-3">
        <FeatureStat
          icon={<Lock className="h-4 w-4" />}
          title="Privacy by design"
          description="Your data lives in localStorage. No servers, no accounts, no analytics."
        />
        <FeatureStat
          icon={<Zap className="h-4 w-4" />}
          title="Instant previews"
          description="Every change renders live. PDFs are generated client-side with @react-pdf/renderer."
        />
        <FeatureStat
          icon={<Sparkles className="h-4 w-4" />}
          title="Template-ready"
          description="Multiple polished templates for each tool. Tweak colors and swap layouts on the fly."
        />
      </section>
    </div>
  );
}

function FeatureStat({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="p-5 rounded-[var(--radius-card)] bg-[var(--color-surface)] border border-[var(--color-border)]">
      <div className="h-8 w-8 rounded-lg bg-[var(--color-brand-soft)] text-[var(--color-brand)] flex items-center justify-center mb-3">
        {icon}
      </div>
      <h3 className="font-semibold text-[var(--color-fg)]">{title}</h3>
      <p className="text-sm text-[var(--color-muted)] mt-1">{description}</p>
    </div>
  );
}

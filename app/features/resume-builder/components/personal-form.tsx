import type { ResumeFormApi } from "../hooks/use-resume-form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { ColorPicker } from "~/components/ui/color-picker";

export function PersonalForm({ api }: { api: ResumeFormApi }) {
  const { state, updateField } = api;
  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-3">
        <p className="text-xs uppercase tracking-wider text-[var(--color-muted)]">
          Section
        </p>
        <p className="text-sm font-medium">Personal & headline</p>
        <p className="text-xs text-[var(--color-muted)] mt-1">
          Write a headline that clearly states your role and seniority.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Input
          label="Full name"
          value={state.name}
          onChange={(e) => updateField("name", e.target.value)}
        />
        <Input
          label="Headline"
          value={state.title}
          onChange={(e) => updateField("title", e.target.value)}
        />
        <Input
          label="Email"
          value={state.email}
          onChange={(e) => updateField("email", e.target.value)}
        />
        <Input
          label="Phone"
          value={state.phone}
          onChange={(e) => updateField("phone", e.target.value)}
        />
        <Input
          label="Location"
          value={state.location}
          onChange={(e) => updateField("location", e.target.value)}
        />
        <Input
          label="LinkedIn"
          value={state.linkedin}
          onChange={(e) => updateField("linkedin", e.target.value)}
        />
      </div>
      <Input
        label="Website"
        value={state.website}
        onChange={(e) => updateField("website", e.target.value)}
      />
      <Textarea
        label="Profile summary"
        hint="Write 3-5 lines focusing on impact and strengths."
        value={state.summary}
        onChange={(e) => updateField("summary", e.target.value)}
        rows={5}
      />
      <ColorPicker
        label="Accent color"
        value={state.accent}
        onChange={(v) => updateField("accent", v)}
      />
    </div>
  );
}

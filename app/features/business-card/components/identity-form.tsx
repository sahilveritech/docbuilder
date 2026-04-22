import type { CardFormApi } from "../hooks/use-card-form";
import { Input } from "~/components/ui/input";
import { FileUpload } from "~/components/ui/file-upload";

export function IdentityForm({ api }: { api: CardFormApi }) {
  const { state, updateField } = api;
  return (
    <div className="space-y-4">
      <FileUpload
        label="Logo (optional)"
        value={state.logo}
        onChange={(v) => updateField("logo", v)}
      />
      <div className="grid gap-3 sm:grid-cols-2">
        <Input
          label="Full name"
          value={state.name}
          onChange={(e) => updateField("name", e.target.value)}
          required
        />
        <Input
          label="Title / Role"
          value={state.title}
          onChange={(e) => updateField("title", e.target.value)}
        />
        <Input
          label="Company"
          value={state.company}
          onChange={(e) => updateField("company", e.target.value)}
        />
        <Input
          label="Tagline"
          value={state.tagline}
          onChange={(e) => updateField("tagline", e.target.value)}
          hint="Shown on the back of the card."
        />
      </div>
    </div>
  );
}

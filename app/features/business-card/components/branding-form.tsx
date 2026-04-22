import type { CardFormApi } from "../hooks/use-card-form";
import { ColorPicker } from "~/components/ui/color-picker";
import { Select } from "~/components/ui/select";
import { CARD_TEMPLATES } from "../templates/map";

export function BrandingForm({ api }: { api: CardFormApi }) {
  const { state, updateField } = api;
  return (
    <div className="space-y-4">
      <Select
        label="Template"
        value={state.template}
        onChange={(e) => updateField("template", e.target.value as typeof state.template)}
        options={CARD_TEMPLATES.map((t) => ({
          value: t.key,
          label: `${t.title} — ${t.description}`,
        }))}
      />
      <div className="grid gap-3 sm:grid-cols-3">
        <ColorPicker
          label="Primary"
          value={state.primaryColor}
          onChange={(v) => updateField("primaryColor", v)}
          hint="Accent & sidebar color"
        />
        <ColorPicker
          label="Secondary"
          value={state.secondaryColor}
          onChange={(v) => updateField("secondaryColor", v)}
          hint="Back/dark panel"
        />
        <ColorPicker
          label="Text on color"
          value={state.textColor}
          onChange={(v) => updateField("textColor", v)}
          hint="For filled panels"
        />
      </div>
    </div>
  );
}

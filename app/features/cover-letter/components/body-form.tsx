import type { CoverLetterFormApi } from "../hooks/use-cover-letter-form";
import { Textarea } from "~/components/ui/textarea";
import { Input } from "~/components/ui/input";
import { ColorPicker } from "~/components/ui/color-picker";

export function BodyForm({ api }: { api: CoverLetterFormApi }) {
  const { state, updateField } = api;
  return (
    <div className="space-y-4">
      <Textarea
        label="Letter body"
        value={state.body}
        onChange={(e) => updateField("body", e.target.value)}
        rows={12}
        hint="Separate paragraphs with a blank line."
      />
      <div className="grid gap-3 sm:grid-cols-2">
        <Input
          label="Closing"
          value={state.closing}
          onChange={(e) => updateField("closing", e.target.value)}
          hint="e.g. Sincerely,"
        />
        <ColorPicker
          label="Accent color"
          value={state.accent}
          onChange={(v) => updateField("accent", v)}
          hint="Used by Modern & Professional templates."
        />
      </div>
    </div>
  );
}

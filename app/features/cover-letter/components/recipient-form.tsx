import type { CoverLetterFormApi } from "../hooks/use-cover-letter-form";
import { Input } from "~/components/ui/input";

export function RecipientForm({ api }: { api: CoverLetterFormApi }) {
  const { state, updateParty, updateField } = api;
  const r = state.recipient;
  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <Input
          label="Recipient name"
          value={r.name}
          onChange={(e) => updateParty("recipient", { name: e.target.value })}
        />
        <Input
          label="Recipient title"
          value={r.title}
          onChange={(e) => updateParty("recipient", { title: e.target.value })}
        />
        <Input
          label="Company"
          value={r.company}
          onChange={(e) => updateParty("recipient", { company: e.target.value })}
        />
        <Input
          label="Salutation"
          value={state.salutation}
          onChange={(e) => updateField("salutation", e.target.value)}
          hint="e.g. Dear Taylor,"
        />
      </div>
      <Input
        label="Company address"
        value={r.address}
        onChange={(e) => updateParty("recipient", { address: e.target.value })}
      />
      <Input
        label="Subject / Role"
        value={state.subject}
        onChange={(e) => updateField("subject", e.target.value)}
        hint="Shown above the letter body."
      />
    </div>
  );
}

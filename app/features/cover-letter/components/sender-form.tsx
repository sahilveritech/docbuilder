import type { CoverLetterFormApi } from "../hooks/use-cover-letter-form";
import { Input } from "~/components/ui/input";

export function SenderForm({ api }: { api: CoverLetterFormApi }) {
  const { state, updateParty, updateField } = api;
  const s = state.sender;
  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <Input
          label="Your name"
          value={s.name}
          onChange={(e) => updateParty("sender", { name: e.target.value })}
          required
        />
        <Input
          label="Your title"
          value={s.title}
          onChange={(e) => updateParty("sender", { title: e.target.value })}
        />
        <Input
          label="Email"
          type="email"
          value={s.email}
          onChange={(e) => updateParty("sender", { email: e.target.value })}
        />
        <Input
          label="Phone"
          value={s.phone}
          onChange={(e) => updateParty("sender", { phone: e.target.value })}
        />
      </div>
      <Input
        label="Address / Location"
        value={s.address}
        onChange={(e) => updateParty("sender", { address: e.target.value })}
      />
      <div className="grid gap-3 sm:grid-cols-2">
        <Input
          label="Date"
          type="date"
          value={state.date}
          onChange={(e) => updateField("date", e.target.value)}
        />
        <Input
          label="Signature name"
          value={state.signature}
          onChange={(e) => updateField("signature", e.target.value)}
          hint="Leave blank to use your name."
        />
      </div>
    </div>
  );
}

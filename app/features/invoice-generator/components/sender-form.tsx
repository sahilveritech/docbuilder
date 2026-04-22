import type { InvoiceFormApi } from "../hooks/use-invoice-form";
import { Input } from "~/components/ui/input";
import { FileUpload } from "~/components/ui/file-upload";

export function SenderForm({ api }: { api: InvoiceFormApi }) {
  const { state, updateParty, updateField } = api;
  const s = state.sender;

  return (
    <div className="space-y-4">
      <FileUpload
        label="Business logo (optional)"
        value={state.logo}
        onChange={(v) => updateField("logo", v)}
        hint="Appears in the top-left of the invoice."
      />
      <div className="grid gap-3 sm:grid-cols-2">
        <Input
          label="Business name"
          value={s.name}
          onChange={(e) => updateParty("sender", { name: e.target.value })}
          required
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
        <Input
          label="Website"
          value={s.website}
          onChange={(e) => updateParty("sender", { website: e.target.value })}
        />
      </div>
      <Input
        label="Address"
        value={s.address}
        onChange={(e) => updateParty("sender", { address: e.target.value })}
      />
      <Input
        label="Tax ID (optional)"
        value={s.taxId}
        onChange={(e) => updateParty("sender", { taxId: e.target.value })}
      />
    </div>
  );
}

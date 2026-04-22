import type { InvoiceFormApi } from "../hooks/use-invoice-form";
import { Input } from "~/components/ui/input";

export function ClientForm({ api }: { api: InvoiceFormApi }) {
  const { state, updateParty } = api;
  const c = state.client;

  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <Input
          label="Client name"
          value={c.name}
          onChange={(e) => updateParty("client", { name: e.target.value })}
          required
        />
        <Input
          label="Email"
          type="email"
          value={c.email}
          onChange={(e) => updateParty("client", { email: e.target.value })}
        />
        <Input
          label="Phone"
          value={c.phone}
          onChange={(e) => updateParty("client", { phone: e.target.value })}
        />
        <Input
          label="Website (optional)"
          value={c.website}
          onChange={(e) => updateParty("client", { website: e.target.value })}
        />
      </div>
      <Input
        label="Address"
        value={c.address}
        onChange={(e) => updateParty("client", { address: e.target.value })}
      />
    </div>
  );
}

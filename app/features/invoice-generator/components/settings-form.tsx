import type { InvoiceFormApi } from "../hooks/use-invoice-form";
import { Input } from "~/components/ui/input";
import { Select } from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import { ColorPicker } from "~/components/ui/color-picker";
import { safeParseNumber } from "~/lib/utils";

const CURRENCIES = [
  { value: "USD", label: "USD — US Dollar" },
  { value: "EUR", label: "EUR — Euro" },
  { value: "GBP", label: "GBP — British Pound" },
  { value: "CAD", label: "CAD — Canadian Dollar" },
  { value: "AUD", label: "AUD — Australian Dollar" },
  { value: "INR", label: "INR — Indian Rupee" },
  { value: "JPY", label: "JPY — Japanese Yen" },
];

export function SettingsForm({ api }: { api: InvoiceFormApi }) {
  const { state, updateField } = api;

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <Input
          label="Invoice number"
          value={state.number}
          onChange={(e) => updateField("number", e.target.value)}
        />
        <Select
          label="Currency"
          value={state.currency}
          onChange={(e) => updateField("currency", e.target.value)}
          options={CURRENCIES}
        />
        <Input
          label="Issue date"
          type="date"
          value={state.issueDate}
          onChange={(e) => updateField("issueDate", e.target.value)}
        />
        <Input
          label="Due date"
          type="date"
          value={state.dueDate}
          onChange={(e) => updateField("dueDate", e.target.value)}
        />
        <Input
          label="Tax rate (%)"
          type="number"
          min={0}
          step="0.01"
          value={state.taxRate}
          onChange={(e) =>
            updateField("taxRate", safeParseNumber(e.target.value, 0))
          }
        />
        <Input
          label="Discount amount"
          type="number"
          min={0}
          step="0.01"
          value={state.discount}
          onChange={(e) =>
            updateField("discount", safeParseNumber(e.target.value, 0))
          }
          hint={`In ${state.currency}`}
        />
      </div>
      <ColorPicker
        label="Accent color"
        value={state.accent}
        onChange={(v) => updateField("accent", v)}
        hint="Used in the Modern template header."
      />
      <Textarea
        label="Notes / Payment terms"
        value={state.notes}
        onChange={(e) => updateField("notes", e.target.value)}
        rows={4}
        placeholder="Payment due within 14 days via bank transfer…"
      />
    </div>
  );
}

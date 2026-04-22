import { Plus, Trash2 } from "lucide-react";
import type { InvoiceFormApi } from "../hooks/use-invoice-form";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { formatCurrency } from "../templates/prepare-data";
import { computeTotals } from "../templates/prepare-data";
import { safeParseNumber } from "~/lib/utils";

export function ItemsForm({ api }: { api: InvoiceFormApi }) {
  const { state, updateItem, addItem, removeItem } = api;
  const totals = computeTotals(state);

  return (
    <div className="space-y-3">
      <div className="overflow-x-auto -mx-1 px-1">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs uppercase tracking-wider text-[var(--color-muted)]">
              <th className="text-left font-medium pb-2">Description</th>
              <th className="text-right font-medium pb-2 w-20">Qty</th>
              <th className="text-right font-medium pb-2 w-28">Price</th>
              <th className="text-right font-medium pb-2 w-28">Total</th>
              <th className="w-10" />
            </tr>
          </thead>
          <tbody>
            {state.items.map((item) => (
              <tr key={item.id} className="align-top">
                <td className="py-1 pr-2">
                  <Input
                    aria-label="Description"
                    value={item.description}
                    onChange={(e) =>
                      updateItem(item.id, { description: e.target.value })
                    }
                    placeholder="Line item"
                  />
                </td>
                <td className="py-1 pr-2">
                  <Input
                    aria-label="Quantity"
                    type="number"
                    min={0}
                    step="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateItem(item.id, {
                        quantity: safeParseNumber(e.target.value, 0),
                      })
                    }
                    className="text-right"
                  />
                </td>
                <td className="py-1 pr-2">
                  <Input
                    aria-label="Unit price"
                    type="number"
                    min={0}
                    step="0.01"
                    value={item.unitPrice}
                    onChange={(e) =>
                      updateItem(item.id, {
                        unitPrice: safeParseNumber(e.target.value, 0),
                      })
                    }
                    className="text-right"
                  />
                </td>
                <td className="py-3 pr-2 text-right font-medium">
                  {formatCurrency(
                    item.quantity * item.unitPrice,
                    state.currency,
                  )}
                </td>
                <td className="py-2 text-right">
                  <Button
                    size="icon"
                    variant="ghost"
                    aria-label="Remove item"
                    disabled={state.items.length <= 1}
                    onClick={() => removeItem(item.id)}
                    className="h-8 w-8 text-[var(--color-muted)] hover:text-[var(--color-danger)]"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Button
        size="sm"
        variant="secondary"
        onClick={addItem}
        leftIcon={<Plus className="h-4 w-4" />}
      >
        Add line item
      </Button>

      <dl className="mt-4 ml-auto w-full max-w-xs space-y-1 text-sm">
        <div className="flex justify-between">
          <dt className="text-[var(--color-muted)]">Subtotal</dt>
          <dd>{formatCurrency(totals.subtotal, state.currency)}</dd>
        </div>
        {totals.discountAmount > 0 ? (
          <div className="flex justify-between">
            <dt className="text-[var(--color-muted)]">Discount</dt>
            <dd>- {formatCurrency(totals.discountAmount, state.currency)}</dd>
          </div>
        ) : null}
        {totals.taxAmount > 0 ? (
          <div className="flex justify-between">
            <dt className="text-[var(--color-muted)]">
              Tax ({state.taxRate}%)
            </dt>
            <dd>{formatCurrency(totals.taxAmount, state.currency)}</dd>
          </div>
        ) : null}
        <div className="flex justify-between pt-2 border-t border-[var(--color-border)] font-semibold">
          <dt>Total</dt>
          <dd>{formatCurrency(totals.total, state.currency)}</dd>
        </div>
      </dl>
    </div>
  );
}

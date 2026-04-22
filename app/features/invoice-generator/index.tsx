import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { PageHeader } from "~/components/common/page-header";
import { Button } from "~/components/ui/button";
import { Modal } from "~/components/ui/modal";
import { Tabs } from "~/components/ui/tabs";
import { useToast } from "~/components/ui/toast";
import { useInvoiceForm } from "./hooks/use-invoice-form";
import { SenderForm } from "./components/sender-form";
import { ClientForm } from "./components/client-form";
import { ItemsForm } from "./components/items-form";
import { SettingsForm } from "./components/settings-form";
import { PreviewPanel } from "./components/preview-panel";

type FormTab = "sender" | "client" | "items" | "settings";

const FORM_TABS: { value: FormTab; label: string }[] = [
  { value: "sender", label: "From" },
  { value: "client", label: "Bill To" },
  { value: "items", label: "Items" },
  { value: "settings", label: "Settings" },
];

export default function InvoiceGenerator() {
  const api = useInvoiceForm();
  const [formTab, setFormTab] = useState<FormTab>("sender");
  const [confirmReset, setConfirmReset] = useState(false);
  const { toast } = useToast();

  const handleReset = () => {
    api.reset();
    setConfirmReset(false);
    toast({ title: "Invoice reset to defaults", variant: "success" });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        eyebrow="Invoice Generator"
        title="Create a polished invoice"
        description="Fill in your details on the left and the PDF preview updates live on the right."
        actions={
          <Button
            variant="secondary"
            size="sm"
            leftIcon={<RotateCcw className="h-4 w-4" />}
            onClick={() => setConfirmReset(true)}
          >
            Reset
          </Button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div className="space-y-4">
          <Tabs
            ariaLabel="Invoice form sections"
            variant="underline"
            value={formTab}
            onChange={(v) => setFormTab(v as FormTab)}
            items={FORM_TABS}
          />
          <div className="p-5 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-bg)]">
            {formTab === "sender" ? <SenderForm api={api} /> : null}
            {formTab === "client" ? <ClientForm api={api} /> : null}
            {formTab === "items" ? <ItemsForm api={api} /> : null}
            {formTab === "settings" ? <SettingsForm api={api} /> : null}
          </div>
        </div>

        <div className="lg:sticky lg:top-20 lg:self-start">
          <PreviewPanel api={api} />
        </div>
      </div>

      <Modal
        open={confirmReset}
        onClose={() => setConfirmReset(false)}
        title="Reset invoice?"
        description="Your current invoice data will be replaced with defaults. This cannot be undone."
        footer={
          <>
            <Button variant="ghost" onClick={() => setConfirmReset(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleReset}>
              Reset
            </Button>
          </>
        }
      >
        <p className="text-sm text-[var(--color-muted)]">
          Your data is only stored in your browser — clearing it here won't affect
          anything else.
        </p>
      </Modal>
    </div>
  );
}

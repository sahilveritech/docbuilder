import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { PageHeader } from "~/components/common/page-header";
import { Button } from "~/components/ui/button";
import { Modal } from "~/components/ui/modal";
import { Tabs } from "~/components/ui/tabs";
import { useToast } from "~/components/ui/toast";
import { useCardForm } from "./hooks/use-card-form";
import { IdentityForm } from "./components/identity-form";
import { ContactForm } from "./components/contact-form";
import { BrandingForm } from "./components/branding-form";
import { PreviewPanel } from "./components/preview-panel";

type FormTab = "identity" | "contact" | "branding";

const TABS: { value: FormTab; label: string }[] = [
  { value: "identity", label: "Identity" },
  { value: "contact", label: "Contact" },
  { value: "branding", label: "Branding" },
];

export default function BusinessCardMaker() {
  const api = useCardForm();
  const [tab, setTab] = useState<FormTab>("identity");
  const [confirmReset, setConfirmReset] = useState(false);
  const { toast } = useToast();

  const handleReset = () => {
    api.reset();
    setConfirmReset(false);
    toast({ title: "Card reset to defaults", variant: "success" });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        eyebrow="Business Card Maker"
        title="Design a professional business card"
        description="Export as a print-ready PDF (front + back) or as a PNG for sharing."
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
            variant="underline"
            ariaLabel="Card form sections"
            value={tab}
            onChange={(v) => setTab(v as FormTab)}
            items={TABS}
          />
          <div className="p-5 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-bg)]">
            {tab === "identity" ? <IdentityForm api={api} /> : null}
            {tab === "contact" ? <ContactForm api={api} /> : null}
            {tab === "branding" ? <BrandingForm api={api} /> : null}
          </div>
        </div>

        <div className="lg:sticky lg:top-20 lg:self-start">
          <PreviewPanel api={api} />
        </div>
      </div>

      <Modal
        open={confirmReset}
        onClose={() => setConfirmReset(false)}
        title="Reset business card?"
        description="Your current card will be replaced with defaults."
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
          This only affects data stored in your browser.
        </p>
      </Modal>
    </div>
  );
}

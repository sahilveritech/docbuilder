import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { PageHeader } from "~/components/common/page-header";
import { Button } from "~/components/ui/button";
import { Modal } from "~/components/ui/modal";
import { Tabs } from "~/components/ui/tabs";
import { useToast } from "~/components/ui/toast";
import { useCoverLetterForm } from "./hooks/use-cover-letter-form";
import { SenderForm } from "./components/sender-form";
import { RecipientForm } from "./components/recipient-form";
import { BodyForm } from "./components/body-form";
import { PreviewPanel } from "./components/preview-panel";

type FormTab = "sender" | "recipient" | "body";

const TABS: { value: FormTab; label: string }[] = [
  { value: "sender", label: "You" },
  { value: "recipient", label: "Recipient" },
  { value: "body", label: "Letter" },
];

export default function CoverLetterBuilder() {
  const api = useCoverLetterForm();
  const [tab, setTab] = useState<FormTab>("sender");
  const [confirmReset, setConfirmReset] = useState(false);
  const { toast } = useToast();

  const handleReset = () => {
    api.reset();
    setConfirmReset(false);
    toast({ title: "Cover letter reset", variant: "success" });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        eyebrow="Cover Letter Builder"
        title="Write a polished cover letter"
        description="Edit your content on the left and download a PDF when ready. Everything stays in your browser."
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
            ariaLabel="Cover letter sections"
            value={tab}
            onChange={(v) => setTab(v as FormTab)}
            items={TABS}
          />
          <div className="p-5 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-bg)]">
            {tab === "sender" ? <SenderForm api={api} /> : null}
            {tab === "recipient" ? <RecipientForm api={api} /> : null}
            {tab === "body" ? <BodyForm api={api} /> : null}
          </div>
        </div>

        <div className="lg:sticky lg:top-20 lg:self-start">
          <PreviewPanel api={api} />
        </div>
      </div>

      <Modal
        open={confirmReset}
        onClose={() => setConfirmReset(false)}
        title="Reset cover letter?"
        description="Your current letter will be replaced with defaults."
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

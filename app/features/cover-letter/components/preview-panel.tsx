import { lazy, Suspense, useMemo } from "react";
import { Download } from "lucide-react";
import type { CoverLetterFormApi } from "../hooks/use-cover-letter-form";
import {
  LETTER_TEMPLATES,
  getLetterTemplate,
  type LetterTemplateKey,
} from "../templates/map";
import { Button } from "~/components/ui/button";
import { Tabs } from "~/components/ui/tabs";
import { Loader } from "~/components/common/loader";
import { useIsClient } from "~/hooks/use-is-client";
import { useToast } from "~/components/ui/toast";
import { downloadBlob } from "~/lib/utils";

const PDFViewer = lazy(() =>
  import("@react-pdf/renderer").then((m) => ({ default: m.PDFViewer })),
);

export function PreviewPanel({ api }: { api: CoverLetterFormApi }) {
  const { state, updateField } = api;
  const isClient = useIsClient();
  const { toast } = useToast();

  const entry = getLetterTemplate(state.template);
  const Template = entry.component;
  const doc = useMemo(() => <Template data={state} />, [Template, state]);

  const handleDownload = async () => {
    try {
      const { pdf } = await import("@react-pdf/renderer");
      const blob = await pdf(doc).toBlob();
      const safe = (state.sender.name || "cover-letter")
        .toLowerCase()
        .replace(/\s+/g, "-");
      downloadBlob(blob, `${safe}-cover-letter.pdf`);
      toast({ title: "Cover letter downloaded", variant: "success" });
    } catch (err) {
      toast({
        title: "Download failed",
        description: err instanceof Error ? err.message : "Unknown error",
        variant: "error",
      });
    }
  };

  return (
    <div className="flex flex-col h-full min-h-[520px]">
      <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
        <Tabs
          ariaLabel="Cover letter template"
          value={state.template}
          onChange={(v) => updateField("template", v as LetterTemplateKey)}
          items={LETTER_TEMPLATES.map((t) => ({
            value: t.key,
            label: t.title,
          }))}
        />
        <Button
          size="sm"
          leftIcon={<Download className="h-4 w-4" />}
          onClick={handleDownload}
        >
          Download PDF
        </Button>
      </div>
      <div className="flex-1 min-h-[560px] rounded-lg border border-[var(--color-border)] overflow-hidden bg-[var(--color-surface)]">
        {isClient ? (
          <Suspense fallback={<Loader label="Preparing preview…" />}>
            <PDFViewer
              key={state.template}
              width="100%"
              height="100%"
              showToolbar={false}
              style={{ border: "none", backgroundColor: "transparent" }}
            >
              {doc}
            </PDFViewer>
          </Suspense>
        ) : (
          <Loader label="Preparing preview…" />
        )}
      </div>
    </div>
  );
}

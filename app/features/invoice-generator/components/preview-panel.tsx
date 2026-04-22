import { lazy, Suspense, useMemo } from "react";
import { Download } from "lucide-react";
import type { InvoiceFormApi } from "../hooks/use-invoice-form";
import { useTabNavigation } from "../hooks/use-tab-navigation";
import {
  INVOICE_TEMPLATES,
  getInvoiceTemplate,
  type InvoiceTemplateKey,
} from "../templates/map";
import { computeTotals } from "../templates/prepare-data";
import { Tabs } from "~/components/ui/tabs";
import { Button } from "~/components/ui/button";
import { Loader } from "~/components/common/loader";
import { useIsClient } from "~/hooks/use-is-client";
import { downloadBlob } from "~/lib/utils";
import { useToast } from "~/components/ui/toast";

const PDFViewer = lazy(() =>
  import("@react-pdf/renderer").then((m) => ({ default: m.PDFViewer })),
);

export function PreviewPanel({ api }: { api: InvoiceFormApi }) {
  const { state, updateField } = api;
  const isClient = useIsClient();
  const { toast } = useToast();
  const [templateKey, setTemplateKey] = useTabNavigation(
    "tab",
    state.template,
  );

  const active = (templateKey as InvoiceTemplateKey) || state.template;
  const entry = getInvoiceTemplate(active);
  const Template = entry.component;

  const totals = useMemo(() => computeTotals(state), [state]);
  const doc = <Template data={state} totals={totals} />;

  const handleDownload = async () => {
    try {
      const { pdf } = await import("@react-pdf/renderer");
      const blob = await pdf(doc).toBlob();
      const filename = `invoice-${state.number || "draft"}.pdf`;
      downloadBlob(blob, filename);
      toast({
        title: "Invoice downloaded",
        description: filename,
        variant: "success",
      });
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
          ariaLabel="Invoice template"
          value={active}
          onChange={(v) => {
            setTemplateKey(v);
            updateField("template", v as InvoiceTemplateKey);
          }}
          items={INVOICE_TEMPLATES.map((t) => ({
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
              key={active}
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

import { lazy, Suspense, useRef, useState } from "react";
import { Download, FileImage, FileText } from "lucide-react";
import type { CardFormApi } from "../hooks/use-card-form";
import { getCardTemplate } from "../templates/map";
import { HtmlCard } from "./html-card";
import { Button } from "~/components/ui/button";
import { Tabs } from "~/components/ui/tabs";
import { Loader } from "~/components/common/loader";
import { useToast } from "~/components/ui/toast";
import { useIsClient } from "~/hooks/use-is-client";
import { downloadBlob, downloadDataUrl } from "~/lib/utils";
import {
  Document as PdfDocument,
  Page as PdfPage,
} from "@react-pdf/renderer";

const PDFViewer = lazy(() =>
  import("@react-pdf/renderer").then((m) => ({ default: m.PDFViewer })),
);

type Side = "front" | "back";

export function PreviewPanel({ api }: { api: CardFormApi }) {
  const { state } = api;
  const isClient = useIsClient();
  const { toast } = useToast();
  const [side, setSide] = useState<Side>("front");
  const [downloading, setDownloading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const entry = getCardTemplate(state.template);
  const Template = entry.component;

  const pdfDoc = (
    <PdfDocument title={`${state.name || "business-card"} card`}>
      <PdfPage size={[252, 144]} style={{ padding: 0 }}>
        <Template data={state} side="front" />
      </PdfPage>
      <PdfPage size={[252, 144]} style={{ padding: 0 }}>
        <Template data={state} side="back" />
      </PdfPage>
    </PdfDocument>
  );

  const handlePdf = async () => {
    setDownloading(true);
    try {
      const { pdf } = await import("@react-pdf/renderer");
      const blob = await pdf(pdfDoc).toBlob();
      const safeName = (state.name || "business-card")
        .toLowerCase()
        .replace(/\s+/g, "-");
      downloadBlob(blob, `${safeName}-card.pdf`);
      toast({ title: "Card PDF downloaded", variant: "success" });
    } catch (err) {
      toast({
        title: "PDF download failed",
        description: err instanceof Error ? err.message : "Unknown error",
        variant: "error",
      });
    } finally {
      setDownloading(false);
    }
  };

  const handlePng = async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const { toPng } = await import("html-to-image");
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 3,
        cacheBust: true,
        backgroundColor: "#ffffff",
      });
      const safeName = (state.name || "business-card")
        .toLowerCase()
        .replace(/\s+/g, "-");
      downloadDataUrl(dataUrl, `${safeName}-${side}.png`);
      toast({ title: `${side === "front" ? "Front" : "Back"} PNG downloaded`, variant: "success" });
    } catch (err) {
      toast({
        title: "PNG export failed",
        description: err instanceof Error ? err.message : "Unknown error",
        variant: "error",
      });
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <Tabs
          ariaLabel="Card side"
          value={side}
          onChange={(v) => setSide(v as Side)}
          items={[
            { value: "front", label: "Front" },
            { value: "back", label: "Back" },
          ]}
        />
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="secondary"
            leftIcon={<FileImage className="h-4 w-4" />}
            loading={downloading}
            onClick={handlePng}
          >
            PNG
          </Button>
          <Button
            size="sm"
            leftIcon={<FileText className="h-4 w-4" />}
            loading={downloading}
            onClick={handlePdf}
          >
            PDF (front + back)
          </Button>
        </div>
      </div>

      <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[repeating-linear-gradient(45deg,var(--color-surface),var(--color-surface)_6px,transparent_6px,transparent_12px)] p-6 flex items-center justify-center overflow-auto">
        <HtmlCard
          ref={cardRef}
          data={state}
          side={side}
          template={state.template}
          scale={1.6}
        />
      </div>

      <div className="rounded-lg border border-[var(--color-border)] overflow-hidden bg-[var(--color-surface)] h-72">
        {isClient ? (
          <Suspense fallback={<Loader label="Preparing PDF preview…" />}>
            <PDFViewer
              key={state.template}
              width="100%"
              height="100%"
              showToolbar={false}
              style={{ border: "none", backgroundColor: "transparent" }}
            >
              {pdfDoc}
            </PDFViewer>
          </Suspense>
        ) : (
          <Loader label="Preparing PDF preview…" />
        )}
      </div>

      <p className="text-xs text-[var(--color-muted)] inline-flex items-center gap-1.5">
        <Download className="h-3.5 w-3.5" />
        Cards are sized at 3.5 × 2 in (US standard). PNG uses the live HTML card;
        PDF renders both sides.
      </p>
    </div>
  );
}

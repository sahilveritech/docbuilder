import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { Download, Eye, FileText } from "lucide-react";
import type { ResumeFormApi } from "../hooks/use-resume-form";
import {
  RESUME_TEMPLATES,
  getResumeTemplate,
  preloadResumeTemplate,
  type ResumeTemplateKey,
} from "../templates/map";
import { Button } from "~/components/ui/button";
import { Tabs } from "~/components/ui/tabs";
import { Loader } from "~/components/common/loader";
import { useIsClient } from "~/hooks/use-is-client";
import { useToast } from "~/components/ui/toast";
import { downloadBlob } from "~/lib/utils";
import { useDebounce } from "~/hooks/use-debounce";

const PDFViewer = lazy(() =>
  import("@react-pdf/renderer").then((m) => ({ default: m.PDFViewer })),
);

export function PreviewPanel({ api }: { api: ResumeFormApi }) {
  const { state, updateField } = api;
  const isClient = useIsClient();
  const { toast } = useToast();
  const [isTemplateLoading, setIsTemplateLoading] = useState(false);
  const previewState = useDebounce(state, 180);
  const entry = getResumeTemplate(state.template);
  const Template = entry.component;
  const doc = useMemo(() => <Template data={previewState} />, [Template, previewState]);

  useEffect(() => {
    let active = true;
    setIsTemplateLoading(true);
    preloadResumeTemplate(state.template).finally(() => {
      if (active) setIsTemplateLoading(false);
    });
    return () => {
      active = false;
    };
  }, [state.template]);

  const onDownload = async () => {
    try {
      const { pdf } = await import("@react-pdf/renderer");
      const ResolvedTemplate = await preloadResumeTemplate(state.template);
      const blob = await pdf(<ResolvedTemplate data={state} />).toBlob();
      const file = `${(state.name || "resume").toLowerCase().replace(/\s+/g, "-")}.pdf`;
      downloadBlob(blob, file);
      toast({ title: "Resume downloaded", description: file, variant: "success" });
    } catch (error) {
      toast({
        title: "Export failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "error",
      });
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="mb-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] p-3 shadow-[var(--shadow-soft)]">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <p className="text-xs uppercase tracking-wider text-[var(--color-muted)]">
              Preview
            </p>
            <p className="text-sm font-medium inline-flex items-center gap-1.5">
              <Eye className="h-4 w-4 text-[var(--color-brand)]" />
              Live resume render
            </p>
            <p className="text-xs text-[var(--color-muted)] mt-1">
              Template: <span className="font-medium text-[var(--color-fg)]">{entry.title}</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="secondary"
              leftIcon={<FileText className="h-4 w-4" />}
              onClick={onDownload}
            >
              Export
            </Button>
            <Button
              size="sm"
              leftIcon={<Download className="h-4 w-4" />}
              onClick={onDownload}
            >
              Download PDF
            </Button>
          </div>
        </div>
        <div className="mt-3">
          <Tabs
            ariaLabel="Resume template"
            value={state.template}
            onChange={(value) =>
              updateField("template", value as ResumeTemplateKey)
            }
            items={RESUME_TEMPLATES.map((item) => ({
              value: item.key,
              label: item.title,
            }))}
          />
        </div>
      </div>
      <div className="h-[500px] rounded-lg border border-[var(--color-border)] overflow-hidden bg-[#f3f4f6]">
        {isClient ? (
          <Suspense fallback={<Loader label="Preparing preview…" />}>
            {isTemplateLoading ? (
              <Loader label="Switching template…" />
            ) : (
              <PDFViewer
                key={state.template}
                width="100%"
                height="100%"
                showToolbar={false}
                style={{ border: "none", backgroundColor: "#f3f4f6", height: "680px" }}
              >
                {doc}
              </PDFViewer>
            )}
          </Suspense>
        ) : (
          <Loader label="Preparing preview…" />
        )}
      </div>
    </div>
  );
}

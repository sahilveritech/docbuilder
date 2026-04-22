import { useState } from "react";
import {
  BriefcaseBusiness,
  CircleUserRound,
  GraduationCap,
  Layers3,
  RotateCcw,
} from "lucide-react";
import { PageHeader } from "~/components/common/page-header";
import { Button } from "~/components/ui/button";
import { Modal } from "~/components/ui/modal";
import { Tabs } from "~/components/ui/tabs";
import { useToast } from "~/components/ui/toast";
import { Badge } from "~/components/ui/badge";
import { useResumeForm } from "./hooks/use-resume-form";
import { PersonalForm } from "./components/personal-form";
import { ExperienceForm } from "./components/experience-form";
import { ProjectsForm } from "./components/projects-form";
import { SkillsForm } from "./components/skills-form";
import { PreviewPanel } from "./components/preview-panel";

type FormTab = "personal" | "experience" | "projects" | "skills";

export default function ResumeBuilder() {
  const api = useResumeForm();
  const { toast } = useToast();
  const [tab, setTab] = useState<FormTab>("personal");
  const [confirmReset, setConfirmReset] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        eyebrow="Resume Builder"
        title="Create a polished one-page resume"
        description="Use guided sections to build a clean, ATS-friendly resume with instant PDF preview."
        actions={
          <div className="flex items-center gap-2">
            <Badge variant="brand">Local-only data</Badge>
            <Button
              variant="secondary"
              size="sm"
              leftIcon={<RotateCcw className="h-4 w-4" />}
              onClick={() => setConfirmReset(true)}
            >
              Reset
            </Button>
          </div>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div className="space-y-4">
          <Tabs
            variant="underline"
            ariaLabel="Resume sections"
            value={tab}
            onChange={(v) => setTab(v as FormTab)}
            items={[
              {
                value: "personal",
                label: (
                  <span className="inline-flex items-center gap-1.5">
                    <CircleUserRound className="h-3.5 w-3.5" />
                    Personal
                  </span>
                ),
              },
              {
                value: "experience",
                label: (
                  <span className="inline-flex items-center gap-1.5">
                    <BriefcaseBusiness className="h-3.5 w-3.5" />
                    Experience
                  </span>
                ),
              },
              {
                value: "projects",
                label: (
                  <span className="inline-flex items-center gap-1.5">
                    <Layers3 className="h-3.5 w-3.5" />
                    Projects
                  </span>
                ),
              },
              {
                value: "skills",
                label: (
                  <span className="inline-flex items-center gap-1.5">
                    <GraduationCap className="h-3.5 w-3.5" />
                    Skills
                  </span>
                ),
              },
            ]}
          />
          <div className="p-5 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-bg)] shadow-[var(--shadow-soft)]">
            {tab === "personal" && <PersonalForm api={api} />}
            {tab === "experience" && <ExperienceForm api={api} />}
            {tab === "projects" && <ProjectsForm api={api} />}
            {tab === "skills" && <SkillsForm api={api} />}
          </div>
        </div>
        <div className="lg:sticky lg:top-20 lg:self-start">
          <PreviewPanel api={api} />
        </div>
      </div>

      <Modal
        open={confirmReset}
        onClose={() => setConfirmReset(false)}
        title="Reset resume?"
        description="Your current resume data will be replaced with defaults."
        footer={
          <>
            <Button variant="ghost" onClick={() => setConfirmReset(false)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                api.reset();
                setConfirmReset(false);
                toast({ title: "Resume reset", variant: "success" });
              }}
            >
              Reset
            </Button>
          </>
        }
      >
        <p className="text-sm text-[var(--color-muted)]">
          This only clears the resume data saved in your browser.
        </p>
      </Modal>
    </div>
  );
}

import { Plus, Trash2 } from "lucide-react";
import type { ResumeFormApi } from "../hooks/use-resume-form";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";

export function SkillsForm({ api }: { api: ResumeFormApi }) {
  const {
    state,
    updateField,
    addEducation,
    updateEducation,
    removeEducation,
  } = api;

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-3">
        <p className="text-xs uppercase tracking-wider text-[var(--color-muted)]">
          Section
        </p>
        <p className="text-sm font-medium">Skills, languages, and education</p>
      </div>
      <Textarea
        label="Technical skills"
        hint="Comma separated, e.g. React, TypeScript, Node.js"
        value={state.skills}
        onChange={(e) => updateField("skills", e.target.value)}
      />
      <Input
        label="Languages"
        value={state.languages}
        onChange={(e) => updateField("languages", e.target.value)}
      />

      <div className="pt-3 border-t border-[var(--color-border)] space-y-3">
        <h4 className="text-sm font-semibold">Education</h4>
        {state.education.map((ed, idx) => (
          <div
            key={idx}
            className="border border-[var(--color-border)] rounded-lg p-3 space-y-2 bg-[var(--color-bg)] shadow-[var(--shadow-soft)]"
          >
            <Input
              label="Degree"
              value={ed.degree}
              onChange={(e) =>
                updateEducation(idx, { degree: e.target.value })
              }
            />
            <Input
              label="Institution"
              value={ed.institution}
              onChange={(e) =>
                updateEducation(idx, { institution: e.target.value })
              }
            />
            <div className="grid grid-cols-2 gap-2">
              <Input
                label="Start year"
                value={ed.startYear}
                onChange={(e) =>
                  updateEducation(idx, { startYear: e.target.value })
                }
              />
              <Input
                label="End year"
                value={ed.endYear}
                onChange={(e) => updateEducation(idx, { endYear: e.target.value })}
              />
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-[var(--color-danger)]"
              leftIcon={<Trash2 className="h-4 w-4" />}
              onClick={() => removeEducation(idx)}
            >
              Remove education
            </Button>
          </div>
        ))}
        <Button
          variant="secondary"
          size="sm"
          leftIcon={<Plus className="h-4 w-4" />}
          onClick={addEducation}
        >
          Add education
        </Button>
      </div>
    </div>
  );
}

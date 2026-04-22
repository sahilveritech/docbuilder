import { Plus, Trash2 } from "lucide-react";
import type { ResumeFormApi } from "../hooks/use-resume-form";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";

export function ExperienceForm({ api }: { api: ResumeFormApi }) {
  const { state, addExperience, updateExperience, removeExperience } = api;
  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-3">
        <p className="text-xs uppercase tracking-wider text-[var(--color-muted)]">
          Section
        </p>
        <p className="text-sm font-medium">
          Work experience ({state.experiences.length})
        </p>
        <p className="text-xs text-[var(--color-muted)] mt-1">
          Keep 2-4 concise bullet points focused on impact.
        </p>
      </div>
      {state.experiences.map((exp) => (
        <div
          key={exp.id}
          className="border border-[var(--color-border)] rounded-lg p-4 space-y-3 bg-[var(--color-bg)] shadow-[var(--shadow-soft)]"
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <Input
              label="Role"
              value={exp.role}
              onChange={(e) => updateExperience(exp.id, { role: e.target.value })}
            />
            <Input
              label="Company"
              value={exp.company}
              onChange={(e) =>
                updateExperience(exp.id, { company: e.target.value })
              }
            />
            <Input
              label="Location"
              value={exp.location}
              onChange={(e) =>
                updateExperience(exp.id, { location: e.target.value })
              }
            />
            <div className="grid grid-cols-2 gap-2">
              <Input
                label="Start"
                value={exp.startDate}
                onChange={(e) =>
                  updateExperience(exp.id, { startDate: e.target.value })
                }
              />
              <Input
                label="End"
                value={exp.endDate}
                onChange={(e) =>
                  updateExperience(exp.id, { endDate: e.target.value })
                }
              />
            </div>
          </div>
          <Textarea
            label="Achievements (one per line)"
            rows={4}
            value={exp.bullets}
            onChange={(e) => updateExperience(exp.id, { bullets: e.target.value })}
          />
          <Button
            variant="ghost"
            size="sm"
            leftIcon={<Trash2 className="h-4 w-4" />}
            onClick={() => removeExperience(exp.id)}
            className="text-[var(--color-danger)]"
          >
            Remove experience
          </Button>
        </div>
      ))}
      <Button
        variant="secondary"
        size="sm"
        leftIcon={<Plus className="h-4 w-4" />}
        onClick={addExperience}
      >
        Add experience
      </Button>
    </div>
  );
}

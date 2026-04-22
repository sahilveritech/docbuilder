import { Plus, Trash2 } from "lucide-react";
import type { ResumeFormApi } from "../hooks/use-resume-form";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";

export function ProjectsForm({ api }: { api: ResumeFormApi }) {
  const { state, addProject, updateProject, removeProject } = api;

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-3">
        <p className="text-xs uppercase tracking-wider text-[var(--color-muted)]">
          Section
        </p>
        <p className="text-sm font-medium">Projects ({state.projects.length})</p>
      </div>

      {state.projects.map((project) => (
        <div
          key={project.id}
          className="border border-[var(--color-border)] rounded-lg p-4 space-y-3 bg-[var(--color-bg)] shadow-[var(--shadow-soft)]"
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <Input
              label="Project name"
              value={project.name}
              onChange={(e) => updateProject(project.id, { name: e.target.value })}
            />
            <Input
              label="Role"
              value={project.role}
              onChange={(e) => updateProject(project.id, { role: e.target.value })}
            />
          </div>
          <Input
            label="Skills used in this project"
            hint="Comma separated, e.g. React, Node.js, PostgreSQL"
            value={project.skillsUsed}
            onChange={(e) =>
              updateProject(project.id, { skillsUsed: e.target.value })
            }
          />
          <Textarea
            label="Short project description"
            rows={3}
            value={project.description}
            onChange={(e) =>
              updateProject(project.id, { description: e.target.value })
            }
          />
          <Button
            variant="ghost"
            size="sm"
            leftIcon={<Trash2 className="h-4 w-4" />}
            onClick={() => removeProject(project.id)}
            className="text-[var(--color-danger)]"
          >
            Remove project
          </Button>
        </div>
      ))}

      <Button
        variant="secondary"
        size="sm"
        leftIcon={<Plus className="h-4 w-4" />}
        onClick={addProject}
      >
        Add project
      </Button>
    </div>
  );
}

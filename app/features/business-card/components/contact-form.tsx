import type { CardFormApi } from "../hooks/use-card-form";
import { Input } from "~/components/ui/input";

export function ContactForm({ api }: { api: CardFormApi }) {
  const { state, updateField, updateSocial } = api;
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <Input
          label="Email"
          type="email"
          value={state.email}
          onChange={(e) => updateField("email", e.target.value)}
        />
        <Input
          label="Phone"
          value={state.phone}
          onChange={(e) => updateField("phone", e.target.value)}
        />
        <Input
          label="Website"
          value={state.website}
          onChange={(e) => updateField("website", e.target.value)}
        />
        <Input
          label="City / Address"
          value={state.address}
          onChange={(e) => updateField("address", e.target.value)}
        />
      </div>
      <div className="pt-3 border-t border-[var(--color-border)]">
        <h4 className="text-sm font-semibold mb-2">Social (optional)</h4>
        <div className="grid gap-3 sm:grid-cols-3">
          <Input
            label="Twitter"
            value={state.social.twitter}
            onChange={(e) => updateSocial({ twitter: e.target.value })}
          />
          <Input
            label="LinkedIn"
            value={state.social.linkedin}
            onChange={(e) => updateSocial({ linkedin: e.target.value })}
          />
          <Input
            label="GitHub"
            value={state.social.github}
            onChange={(e) => updateSocial({ github: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}

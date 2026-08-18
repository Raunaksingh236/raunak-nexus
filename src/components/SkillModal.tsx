import { useEffect } from "react";
import { X } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type SkillDetail = {
  name: string;
  level: number;
  icon: LucideIcon;
  featured?: boolean;
  intro: string;
  what: string;
  usedFor: string;
  whyUseful: string;
  status: string;
};

/** Accessible, animated detail panel for a single skill. */
export function SkillModal({ skill, onClose }: { skill: SkillDetail; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const rows = [
    { label: "What it is", value: skill.what },
    { label: "Commonly used for", value: skill.usedFor },
    { label: "Why it matters", value: skill.whyUseful },
  ];

  return (
    <div
      className="fixed inset-0 z-[60] grid place-items-center overflow-y-auto p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`${skill.name} details`}
    >
      <button
        type="button"
        aria-label="Close details"
        onClick={onClose}
        className="animate-fade-in absolute inset-0 cursor-default bg-background/80 backdrop-blur-sm"
      />
      <div className="animate-pop-in neon-frame relative my-auto w-full max-w-lg">
        <div className="glass-panel circuit-bg relative p-6 sm:p-8">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 grid h-9 w-9 place-items-center rounded-xl border border-border bg-glass text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <X size={16} />
          </button>

          <div className="flex items-center gap-4 pr-10">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-secondary text-primary">
              <skill.icon size={22} />
            </span>
            <div className="min-w-0">
              <h3 className="truncate text-xl font-semibold">{skill.name}</h3>
              <p className="text-[11px] tracking-widest text-primary uppercase">
                Skill in progress
              </p>
            </div>
          </div>

          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{skill.intro}</p>

          <dl className="mt-5 space-y-3">
            {rows.map((r) => (
              <div key={r.label} className="rounded-2xl border border-border bg-glass p-4">
                <dt className="text-[11px] tracking-widest text-primary uppercase">{r.label}</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{r.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-5">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>My current learning status</span>
              <span className="text-primary">{skill.level}%</span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${skill.level}%`, boxShadow: "var(--glow-primary)" }}
              />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{skill.status}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

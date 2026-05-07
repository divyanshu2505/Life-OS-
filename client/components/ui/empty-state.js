import { SectionCard } from "./section-card";

export function EmptyState({ title, description, action }) {
  return (
    <SectionCard className="text-center">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-black/65">{description}</p>
      {action ? <div className="mt-4">{action}</div> : null}
    </SectionCard>
  );
}

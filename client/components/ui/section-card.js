import { cn } from "../../lib/utils";

export function SectionCard({ children, className }) {
  return (
    <div
      className={cn(
        "glass-panel rounded-[28px] border border-white/60 p-5 shadow-soft sm:p-6",
        className
      )}
    >
      {children}
    </div>
  );
}

import { cn } from "../../lib/utils";

export function Badge({ children, className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-rosewood",
        className
      )}
    >
      {children}
    </span>
  );
}

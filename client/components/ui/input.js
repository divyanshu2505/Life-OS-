import { cn } from "../../lib/utils";

export function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        "w-full rounded-2xl border border-black/10 bg-white/80 px-4 py-3 text-sm outline-none transition focus:border-coral focus:ring-2 focus:ring-coral/20",
        className
      )}
      {...props}
    />
  );
}

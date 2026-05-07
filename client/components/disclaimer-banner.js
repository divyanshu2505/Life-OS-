import { ShieldCheck } from "lucide-react";
import { DISCLAIMER } from "../lib/constants";

export function DisclaimerBanner() {
  return (
    <div className="glass-panel flex flex-col gap-3 rounded-[28px] border border-white/60 p-5 shadow-soft md:flex-row md:items-center md:justify-between">
      <div className="flex items-start gap-3">
        <div className="rounded-full bg-coral/12 p-3 text-coral">
          <ShieldCheck className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-rosewood">
            Safety & Legal
          </p>
          <p className="mt-1 text-sm text-black/70">{DISCLAIMER}</p>
        </div>
      </div>
      <div className="rounded-full bg-white/80 px-4 py-2 text-xs font-semibold text-ink">
        18+ verification required
      </div>
    </div>
  );
}

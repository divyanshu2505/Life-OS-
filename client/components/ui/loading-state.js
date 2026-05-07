export function LoadingState({ label = "Loading..." }) {
  return (
    <div className="flex min-h-[240px] items-center justify-center">
      <div className="rounded-full border border-black/10 bg-white/70 px-5 py-3 text-sm font-medium shadow-soft">
        {label}
      </div>
    </div>
  );
}

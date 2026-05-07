"use client";

import { cn } from "../../lib/utils";

export function Button({
  children,
  className,
  variant = "primary",
  type = "button",
  ...props
}) {
  const styles = {
    primary: "bg-ink text-white hover:bg-rosewood",
    secondary: "bg-white/80 text-ink hover:bg-white",
    outline: "border border-ink/15 bg-transparent text-ink hover:bg-white/60",
    danger: "bg-rosewood text-white hover:bg-[#431d20]"
  };

  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition duration-200 disabled:cursor-not-allowed disabled:opacity-60",
        styles[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

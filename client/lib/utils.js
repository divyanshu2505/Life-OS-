import { clsx } from "clsx";

export function cn(...inputs) {
  return clsx(inputs);
}

export function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(value || 0);
}

export function formatDateTime(date) {
  if (!date) {
    return "TBD";
  }

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(date));
}

export function getDashboardPath(role) {
  if (role === "provider") {
    return "/dashboard/provider";
  }

  if (role === "admin") {
    return "/dashboard/admin";
  }

  return "/dashboard/client";
}

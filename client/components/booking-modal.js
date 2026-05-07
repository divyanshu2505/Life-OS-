"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { request } from "../lib/api";
import { formatCurrency } from "../lib/utils";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { SectionCard } from "./ui/section-card";

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export function BookingModal({ profile, onClose }) {
  const router = useRouter();
  const [form, setForm] = useState({
    startTime: "",
    durationHours: 1,
    notes: ""
  });
  const [status, setStatus] = useState({ loading: false, error: "" });
  const totalPrice = useMemo(
    () => (Number(form.durationHours) || 1) * (profile?.pricePerHour || 0),
    [form.durationHours, profile?.pricePerHour]
  );

  const handleBooking = async () => {
    setStatus({ loading: true, error: "" });

    try {
      const response = await request("post", "/bookings/create-order", {
        providerProfileId: profile._id,
        startTime: form.startTime,
        durationHours: Number(form.durationHours),
        notes: form.notes
      });

      if (!response.razorpayEnabled) {
        router.push("/bookings");
        router.refresh();
        onClose();
        return;
      }

      const loaded = await loadRazorpayScript();

      if (!loaded) {
        throw new Error("Unable to load Razorpay checkout.");
      }

      // The backend already created the order, so checkout only needs payment authorization.
      const razorpay = new window.Razorpay({
        key: response.keyId,
        amount: response.order.amount,
        currency: response.order.currency,
        name: "Companion Circle",
        description: `${profile.displayName} companionship booking`,
        order_id: response.order.id,
        handler: async (paymentResult) => {
          await request("post", "/bookings/verify-payment", {
            bookingId: response.booking._id,
            ...paymentResult
          });
          router.push("/bookings");
          router.refresh();
          onClose();
        },
        theme: {
          color: "#5c2b2e"
        }
      });

      razorpay.open();
    } catch (error) {
      setStatus({
        loading: false,
        error: error.response?.data?.message || error.message || "Booking could not be created."
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/35 p-4">
      <SectionCard className="w-full max-w-xl space-y-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-rosewood">
              Book a session
            </p>
            <h3 className="mt-2 text-2xl font-semibold">{profile.displayName}</h3>
          </div>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>

        <div className="grid gap-4">
          <label className="space-y-2">
            <span className="text-sm font-medium">Date and time</span>
            <Input
              type="datetime-local"
              value={form.startTime}
              onChange={(event) => setForm((current) => ({ ...current, startTime: event.target.value }))}
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium">Duration (hours)</span>
            <Input
              type="number"
              min="1"
              max="8"
              value={form.durationHours}
              onChange={(event) =>
                setForm((current) => ({ ...current, durationHours: event.target.value }))
              }
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium">Notes</span>
            <textarea
              className="min-h-28 w-full rounded-2xl border border-black/10 bg-white/80 px-4 py-3 text-sm outline-none transition focus:border-coral focus:ring-2 focus:ring-coral/20"
              value={form.notes}
              onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))}
              placeholder="Keep it friendly: coffee chat, gaming session, movie discussion, etc."
            />
          </label>
        </div>

        <div className="rounded-3xl bg-sand p-4">
          <p className="text-sm text-black/60">Total</p>
          <p className="mt-1 text-3xl font-semibold">{formatCurrency(totalPrice)}</p>
        </div>

        {status.error ? <p className="text-sm text-rosewood">{status.error}</p> : null}

        <Button className="w-full" onClick={handleBooking} disabled={status.loading}>
          {status.loading ? "Creating booking..." : "Confirm and pay"}
        </Button>
      </SectionCard>
    </div>
  );
}

"use client";

import { useState } from "react";
import { request } from "../lib/api";
import { Button } from "./ui/button";
import { SectionCard } from "./ui/section-card";

export function ReviewForm({ bookingId, onSubmitted }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState({ loading: false, error: "" });

  const submitReview = async (event) => {
    event.preventDefault();
    setStatus({ loading: true, error: "" });

    try {
      await request("post", "/reviews", {
        bookingId,
        rating,
        comment
      });
      setComment("");
      setStatus({ loading: false, error: "" });
      onSubmitted?.();
    } catch (error) {
      setStatus({
        loading: false,
        error: error.response?.data?.message || "Unable to submit your review."
      });
    }
  };

  return (
    <SectionCard>
      <form className="space-y-4" onSubmit={submitReview}>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-rosewood">Review</p>
          <h3 className="mt-2 text-xl font-semibold">How was the session?</h3>
        </div>
        <select
          className="w-full rounded-2xl border border-black/10 bg-white/80 px-4 py-3 text-sm"
          value={rating}
          onChange={(event) => setRating(Number(event.target.value))}
        >
          {[5, 4, 3, 2, 1].map((score) => (
            <option key={score} value={score}>
              {score} stars
            </option>
          ))}
        </select>
        <textarea
          className="min-h-28 w-full rounded-2xl border border-black/10 bg-white/80 px-4 py-3 text-sm outline-none transition focus:border-coral focus:ring-2 focus:ring-coral/20"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          placeholder="Share what felt supportive, respectful, and enjoyable."
        />
        {status.error ? <p className="text-sm text-rosewood">{status.error}</p> : null}
        <Button type="submit" disabled={status.loading}>
          {status.loading ? "Submitting..." : "Submit review"}
        </Button>
      </form>
    </SectionCard>
  );
}

"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { DEFAULT_AVAILABILITY, INTEREST_OPTIONS } from "../lib/constants";
import { request } from "../lib/api";
import { getDashboardPath } from "../lib/utils";
import { useAuth } from "../context/auth-context";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { SectionCard } from "./ui/section-card";

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export function ProfileForm({ role, initialProfile }) {
  const router = useRouter();
  const { user, updateUser } = useAuth();
  const [status, setStatus] = useState({ saving: false, error: "", success: "" });
  const [form, setForm] = useState(() => ({
    displayName: initialProfile?.displayName || "",
    age: initialProfile?.age || "",
    location: initialProfile?.location || "",
    headline: initialProfile?.headline || "",
    bio: initialProfile?.bio || "",
    languages: initialProfile?.languages?.join(", ") || "",
    interests: initialProfile?.interests?.join(", ") || "",
    pricePerHour: initialProfile?.pricePerHour || "",
    photo: null
  }));
  const [availability, setAvailability] = useState(
    initialProfile?.availability?.length ? initialProfile.availability : DEFAULT_AVAILABILITY
  );

  const interestHint = useMemo(() => INTEREST_OPTIONS.join(", "), []);

  const handleAvailabilityChange = (index, key, value) => {
    setAvailability((current) =>
      current.map((slot, slotIndex) => (slotIndex === index ? { ...slot, [key]: value } : slot))
    );
  };

  const addAvailability = () => {
    setAvailability((current) => [...current, { day: "Sunday", startTime: "18:00", endTime: "20:00" }]);
  };

  const removeAvailability = (index) => {
    setAvailability((current) => current.filter((_, slotIndex) => slotIndex !== index));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ saving: true, error: "", success: "" });

    try {
      const payload = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== "") {
          payload.append(key, value);
        }
      });

      payload.set("availability", JSON.stringify(availability));

      const response = await request("post", "/profiles/me", payload, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      updateUser({
        ...user,
        profileCompleted: true,
        profileStatus: response.profile.status,
        profile: response.profile
      });

      setStatus({ saving: false, error: "", success: response.message });
      router.push(getDashboardPath(role));
      router.refresh();
    } catch (error) {
      setStatus({
        saving: false,
        error: error.response?.data?.message || "Unable to save profile right now.",
        success: ""
      });
    }
  };

  return (
    <SectionCard>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-medium">Display name</span>
            <Input
              value={form.displayName}
              onChange={(event) => setForm((current) => ({ ...current, displayName: event.target.value }))}
              required
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium">Age</span>
            <Input
              type="number"
              min="18"
              value={form.age}
              onChange={(event) => setForm((current) => ({ ...current, age: event.target.value }))}
              required
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium">Location</span>
            <Input
              value={form.location}
              onChange={(event) => setForm((current) => ({ ...current, location: event.target.value }))}
              required
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium">Profile photo</span>
            <Input
              type="file"
              accept="image/*"
              onChange={(event) =>
                setForm((current) => ({ ...current, photo: event.target.files?.[0] || null }))
              }
            />
          </label>
        </div>

        <label className="space-y-2 block">
          <span className="text-sm font-medium">Headline</span>
          <Input
            value={form.headline}
            onChange={(event) => setForm((current) => ({ ...current, headline: event.target.value }))}
            placeholder="Warm listener, movie date planner, gym accountability buddy..."
          />
        </label>

        <label className="space-y-2 block">
          <span className="text-sm font-medium">Bio</span>
          <textarea
            className="min-h-32 w-full rounded-2xl border border-black/10 bg-white/80 px-4 py-3 text-sm outline-none transition focus:border-coral focus:ring-2 focus:ring-coral/20"
            value={form.bio}
            onChange={(event) => setForm((current) => ({ ...current, bio: event.target.value }))}
            placeholder="Describe your personality, boundaries, and what kind of conversations you enjoy."
          />
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-medium">Languages</span>
            <Input
              value={form.languages}
              onChange={(event) => setForm((current) => ({ ...current, languages: event.target.value }))}
              placeholder="English, Hindi"
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium">Interests</span>
            <Input
              value={form.interests}
              onChange={(event) => setForm((current) => ({ ...current, interests: event.target.value }))}
              placeholder={interestHint}
            />
          </label>
        </div>

        {role === "provider" ? (
          <>
            <label className="space-y-2 block">
              <span className="text-sm font-medium">Price per hour (INR)</span>
              <Input
                type="number"
                min="100"
                value={form.pricePerHour}
                onChange={(event) =>
                  setForm((current) => ({ ...current, pricePerHour: event.target.value }))
                }
                required
              />
            </label>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Availability</h3>
                  <p className="text-sm text-black/60">Add the time windows clients can request.</p>
                </div>
                <Button variant="outline" onClick={addAvailability}>
                  Add slot
                </Button>
              </div>

              {availability.map((slot, index) => (
                <div key={`${slot.day}-${index}`} className="grid gap-3 rounded-3xl bg-white/70 p-4 md:grid-cols-4">
                  <select
                    className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm"
                    value={slot.day}
                    onChange={(event) => handleAvailabilityChange(index, "day", event.target.value)}
                  >
                    {weekDays.map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                  <Input
                    type="time"
                    value={slot.startTime}
                    onChange={(event) => handleAvailabilityChange(index, "startTime", event.target.value)}
                  />
                  <Input
                    type="time"
                    value={slot.endTime}
                    onChange={(event) => handleAvailabilityChange(index, "endTime", event.target.value)}
                  />
                  <Button variant="secondary" onClick={() => removeAvailability(index)}>
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </>
        ) : null}

        {status.error ? <p className="text-sm text-rosewood">{status.error}</p> : null}
        {status.success ? <p className="text-sm text-green-700">{status.success}</p> : null}

        <Button type="submit" disabled={status.saving}>
          {status.saving ? "Saving..." : "Save profile"}
        </Button>
      </form>
    </SectionCard>
  );
}

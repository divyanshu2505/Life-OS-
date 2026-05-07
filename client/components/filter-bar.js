"use client";

import { INTEREST_OPTIONS } from "../lib/constants";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { SectionCard } from "./ui/section-card";

export function FilterBar({ filters, onChange, onReset }) {
  return (
    <SectionCard className="space-y-4">
      <div className="grid gap-4 md:grid-cols-5">
        <Input
          placeholder="Search by name or city"
          value={filters.search}
          onChange={(event) => onChange("search", event.target.value)}
        />
        <Input
          placeholder="Min price"
          type="number"
          value={filters.minPrice}
          onChange={(event) => onChange("minPrice", event.target.value)}
        />
        <Input
          placeholder="Max price"
          type="number"
          value={filters.maxPrice}
          onChange={(event) => onChange("maxPrice", event.target.value)}
        />
        <Input
          placeholder="Minimum rating"
          type="number"
          min="0"
          max="5"
          step="0.1"
          value={filters.rating}
          onChange={(event) => onChange("rating", event.target.value)}
        />
        <select
          className="w-full rounded-2xl border border-black/10 bg-white/80 px-4 py-3 text-sm outline-none transition focus:border-coral focus:ring-2 focus:ring-coral/20"
          value={filters.interest}
          onChange={(event) => onChange("interest", event.target.value)}
        >
          <option value="">All interests</option>
          {INTEREST_OPTIONS.map((interest) => (
            <option key={interest} value={interest}>
              {interest}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-end">
        <Button variant="outline" onClick={onReset}>
          Reset filters
        </Button>
      </div>
    </SectionCard>
  );
}

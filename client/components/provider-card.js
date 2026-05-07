"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Star } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { SectionCard } from "./ui/section-card";
import { formatCurrency } from "../lib/utils";

export function ProviderCard({ profile }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <SectionCard className="overflow-hidden p-0">
        <div className="relative h-64 bg-gradient-to-br from-blush via-white to-mist">
          {profile.photoUrl ? (
            <img
              src={profile.photoUrl}
              alt={profile.displayName}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-7xl font-semibold text-rosewood/30">
              {profile.displayName?.[0]}
            </div>
          )}
          <div className="absolute left-5 top-5">
            <Badge>{formatCurrency(profile.pricePerHour)}/hr</Badge>
          </div>
        </div>

        <div className="space-y-4 p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-2xl font-semibold">{profile.displayName}</h3>
              <p className="mt-1 text-sm text-black/55">{profile.headline}</p>
            </div>
            <div className="rounded-full bg-sand px-3 py-2 text-sm font-semibold">
              {profile.age} yrs
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-black/60">
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-coral" />
              {profile.location}
            </span>
            <span className="inline-flex items-center gap-2">
              <Star className="h-4 w-4 fill-coral text-coral" />
              {profile.ratingAverage?.toFixed?.(1) || profile.ratingAverage || "New"} (
              {profile.reviewCount || 0})
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {profile.interests?.slice(0, 4).map((interest) => (
              <Badge key={interest} className="bg-blush/70 text-ink">
                {interest}
              </Badge>
            ))}
          </div>

          <p className="text-sm leading-6 text-black/70">{profile.bio}</p>

          <Link href={`/profiles/${profile._id}`}>
            <Button className="w-full">View profile</Button>
          </Link>
        </div>
      </SectionCard>
    </motion.div>
  );
}

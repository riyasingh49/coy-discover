"use client";

import { motion, useMotionValue, useTransform } from "motion/react";
import { Heart, X } from "lucide-react";
import type { Profile } from "@/types";

interface ProfileCardProps {
  profile: Profile;
  onSwipe?: (action: "LIKE" | "PASS") => void;
  disabled?: boolean;
}

export default function ProfileCard({
  profile,
  onSwipe,
  disabled = false,
}: ProfileCardProps) {
  const x = useMotionValue(0);

  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const likeOpacity = useTransform(x, [30, 120], [0, 1]);
  const passOpacity = useTransform(x, [-120, -30], [1, 0]);

  function handleDragEnd() {
    if (disabled) return;

    if (x.get() > 120) {
      onSwipe?.("LIKE");
    } else if (x.get() < -120) {
      onSwipe?.("PASS");
    }
  }

  return (
    <motion.div
      drag={!disabled ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.8}
      onDragEnd={handleDragEnd}
      style={{ x, rotate, touchAction: "pan-y" }}
      className="relative w-full max-w-sm cursor-grab active:cursor-grabbing"
      whileTap={{ scale: 1.02 }}
    >
      <motion.div
        style={{ opacity: likeOpacity }}
        className="absolute left-5 top-6 z-20 rotate-[-15deg] rounded-lg border-4 border-green-500 px-4 py-2 text-2xl font-bold text-green-500"
      >
        LIKE
        <Heart className="ml-2 inline h-6 w-6" />
      </motion.div>

      <motion.div
        style={{ opacity: passOpacity }}
        className="absolute right-5 top-6 z-20 rotate-[15deg] rounded-lg border-4 border-red-500 px-4 py-2 text-2xl font-bold text-red-500"
      >
        PASS
        <X className="ml-2 inline h-6 w-6" />
      </motion.div>

      <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl">
        <div className="relative h-[420px] w-full">
          <img
            src={profile.photo}
            alt={profile.name}
            draggable={false}
            className="h-full w-full select-none object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

          <div className="absolute bottom-0 left-0 w-full p-6 text-white">
            <h2 className="text-3xl font-bold">
              {profile.name}, {profile.age}
            </h2>

            <p className="mt-1 text-sm text-white/90">
              {profile.city}
            </p>
          </div>
        </div>

        <div className="p-5">
          <p className="mb-4 text-sm leading-relaxed text-gray-600">
            {profile.bio}
          </p>

          <h3 className="mb-3 text-sm font-semibold text-gray-900">
            Interests
          </h3>

          <div className="flex flex-wrap gap-2">
            {profile.interests.map((interest) => (
              <span
                key={interest}
                className="rounded-full bg-pink-50 px-3 py-1.5 text-xs font-medium text-pink-700"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

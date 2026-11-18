"use client";

import { Heart, X } from "lucide-react";
import type { Profile } from "@/types";

interface MatchModalProps {
  profile: Profile;
  onClose: () => void;
}

export default function MatchModal({
  profile,
  onClose,
}: MatchModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-white p-7 text-center shadow-2xl">
        <button
          onClick={onClose}
          aria-label="Close match popup"
          className="absolute right-4 top-4 rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-4 flex justify-center">
          <div className="rounded-full bg-pink-100 p-4">
            <Heart className="h-10 w-10 fill-pink-500 text-pink-500" />
          </div>
        </div>

        <h2 className="mb-2 text-3xl font-bold text-gray-900">
          It&apos;s a Match!
        </h2>

        <p className="mb-6 text-gray-500">
          You and {profile.name} liked each other.
        </p>

        <div className="mx-auto mb-6 h-40 w-40 overflow-hidden rounded-full border-4 border-pink-200">
          <img
            src={profile.photo}
            alt={profile.name}
            className="h-full w-full object-cover"
          />
        </div>

        <h3 className="mb-1 text-xl font-semibold text-gray-900">
          {profile.name}, {profile.age}
        </h3>

        <p className="mb-6 text-sm text-gray-500">
          {profile.city}
        </p>

        <button
          onClick={onClose}
          className="w-full rounded-xl bg-pink-600 px-6 py-3 font-semibold text-white transition hover:bg-pink-700"
        >
          Continue Discovering
        </button>
      </div>
    </div>
  );
}

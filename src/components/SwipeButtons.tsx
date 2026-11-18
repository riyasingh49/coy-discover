"use client";

import { Heart, X } from "lucide-react";

interface SwipeButtonsProps {
  onLike: () => void;
  onPass: () => void;
  disabled?: boolean;
}

export default function SwipeButtons({
  onLike,
  onPass,
  disabled = false,
}: SwipeButtonsProps) {
  return (
    <div className="flex items-center justify-center gap-8 py-6">
      {/* Pass button */}
      <button
        onClick={onPass}
        disabled={disabled}
        aria-label="Pass profile"
        className="flex h-16 w-16 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-lg transition hover:scale-110 hover:bg-gray-100 disabled:opacity-50"
      >
        <X size={30} strokeWidth={2.5} />
      </button>

      {/* Like button */}
      <button
        onClick={onLike}
        disabled={disabled}
        aria-label="Like profile"
        className="flex h-16 w-16 items-center justify-center rounded-full bg-pink-500 text-white shadow-lg shadow-pink-200 transition hover:scale-110 hover:bg-pink-600 disabled:opacity-50"
      >
        <Heart size={30} strokeWidth={2.5} />
      </button>
    </div>
  );
}

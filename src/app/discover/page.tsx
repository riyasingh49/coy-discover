"use client";

import { useEffect, useState } from "react";
import { Heart, RefreshCw, Sparkles } from "lucide-react";

import type { Profile } from "@/types";
import ProfileCard from "@/components/ProfileCard";
import SwipeButtons from "@/components/SwipeButtons";

export default function DiscoverPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [swiping, setSwiping] = useState(false);
  const [error, setError] = useState("");
  const [showMatch, setShowMatch] = useState(false);

  // Fetch profiles when the page loads
  useEffect(() => {
    let cancelled = false;

    async function fetchProfiles() {
      try {
        const response = await fetch("/api/feed");

        if (!response.ok) {
          throw new Error("Could not load profiles.");
        }

        const data = await response.json();

        if (!cancelled) {
          setProfiles(data.profiles);
        }
      } catch {
        if (!cancelled) {
          setError("Something went wrong while loading profiles.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void fetchProfiles();

    return () => {
      cancelled = true;
    };
  }, []);

  // Refresh profiles manually
  async function loadProfiles() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/feed");

      if (!response.ok) {
        throw new Error("Could not load profiles.");
      }

      const data = await response.json();
      setProfiles(data.profiles);
    } catch {
      setError("Something went wrong while loading profiles.");
    } finally {
      setLoading(false);
    }
  }

  // Handle Like and Pass
  async function handleSwipe(action: "LIKE" | "PASS") {
    const currentProfile = profiles[0];

    if (!currentProfile || swiping) return;

    try {
      setSwiping(true);
      setError("");

      const response = await fetch("/api/swipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          profileId: currentProfile.id,
          action,
        }),
      });

      if (!response.ok) {
        throw new Error("Could not save your swipe.");
      }

      const result = await response.json();

      setProfiles((current) =>
        current.filter((profile) => profile.id !== currentProfile.id)
      );

      if (action === "LIKE" && result.matched) {
        setShowMatch(true);
      }
    } catch {
      setError("Your swipe could not be saved. Please try again.");
    } finally {
      setSwiping(false);
    }
  }

  // Loading screen
  if (loading) {
    return (
      <main className="flex min-h-[80vh] items-center justify-center">
        <div className="text-center">
          <Sparkles
            className="mx-auto mb-3 animate-pulse text-pink-500"
            size={36}
          />
          <p className="text-gray-500">Finding people for you...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-pink-50/50 px-4 py-8">
      <div className="mx-auto max-w-xl">
        <div className="mb-7 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Discover <span className="text-pink-500">people</span>
          </h1>
          <p className="mt-2 text-gray-500">
            Find someone who shares your vibe.
          </p>
        </div>

        {error && (
          <div className="mb-5 rounded-xl bg-red-50 p-3 text-center text-sm text-red-600">
            {error}
          </div>
        )}

        {profiles.length > 0 ? (
          <>
            <div className="flex justify-center">
              <ProfileCard profile={profiles[0]} />
            </div>

            <SwipeButtons
              onLike={() => handleSwipe("LIKE")}
              onPass={() => handleSwipe("PASS")}
              disabled={swiping}
            />

            <p className="text-center text-xs text-gray-400">
              {profiles.length}{" "}
              {profiles.length === 1 ? "profile" : "profiles"} remaining
            </p>
          </>
        ) : (
          <div className="rounded-3xl bg-white px-6 py-16 text-center shadow-sm">
            <Heart className="mx-auto mb-4 text-pink-400" size={48} />

            <h2 className="text-2xl font-bold text-gray-800">
              {"You're all caught up!"}
            </h2>

            <p className="mt-2 text-gray-500">
              You&#39;ve discovered everyone for now. Come back later for more!
            </p>

            <button
              onClick={loadProfiles}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-pink-500 px-6 py-3 font-semibold text-white hover:bg-pink-600"
            >
              <RefreshCw size={18} />
              Refresh
            </button>
          </div>
        )}
      </div>

      {showMatch && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-5">
          <div className="w-full max-w-sm rounded-3xl bg-white p-8 text-center shadow-2xl">
            <Sparkles
              className="mx-auto mb-4 text-pink-500"
              size={48}
            />

            <h2 className="text-3xl font-bold text-pink-500">
              It&#39;s a Match!
            </h2>

            <p className="mt-3 text-gray-600">
              You both liked each other. Let the connection begin!
            </p>

            <button
              onClick={() => setShowMatch(false)}
              className="mt-7 w-full rounded-full bg-pink-500 px-6 py-3 font-semibold text-white hover:bg-pink-600"
            >
              Keep Discovering
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

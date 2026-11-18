"use client";

import { useEffect, useState } from "react";
import { Heart, Sparkles } from "lucide-react";
import type { Profile } from "@/types";
import ProfileCard from "@/components/ProfileCard";
import SwipeButtons from "@/components/SwipeButtons";
import MatchModal from "@/components/MatchModal";
import EmptyState from "@/components/EmptyState";

export default function DiscoverPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [swiping, setSwiping] = useState(false);
  const [error, setError] = useState("");
  const [matchedProfile, setMatchedProfile] = useState<Profile | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchProfiles() {
      try {
        const response = await fetch("/api/feed");

        if (!response.ok) {
          throw new Error("Failed to load profiles.");
        }

        const data = await response.json();

        if (!cancelled) {
          setProfiles(data.profiles);
        }
      } catch {
        if (!cancelled) {
          setError("Unable to load profiles. Please try again.");
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

  async function handleSwipe(action: "LIKE" | "PASS") {
    const currentProfile = profiles[0];

    if (!currentProfile || swiping) return;

    setSwiping(true);
    setError("");

    try {
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

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Swipe failed.");
      }

      setProfiles((current) =>
        current.filter((profile) => profile.id !== currentProfile.id)
      );

      if (action === "LIKE" && result.isMatch) {
        setMatchedProfile(currentProfile);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setSwiping(false);
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <Heart className="mx-auto mb-3 h-10 w-10 animate-pulse text-pink-500" />
          <p className="text-gray-500">Finding people for you...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-[80vh] max-w-5xl px-4 py-10">
      <div className="mb-8 text-center">
        <div className="mb-2 flex items-center justify-center gap-2">
          <Sparkles className="h-6 w-6 text-pink-500" />
          <h1 className="text-3xl font-bold text-gray-900">
            Discover
          </h1>
        </div>

        <p className="text-gray-500">
          Find interesting people and make meaningful connections.
        </p>
      </div>

      {error && (
        <div className="mx-auto mb-5 max-w-md rounded-xl bg-red-50 p-3 text-center text-sm text-red-600">
          {error}
        </div>
      )}

      {profiles.length === 0 ? (
        <div className="mx-auto max-w-md">
          <EmptyState
            title="You've seen everyone!"
            description="You've explored all available profiles. Come back later to discover more people."
          />
        </div>
      ) : (
        <div className="mx-auto flex max-w-md flex-col items-center">
          <ProfileCard
            key={profiles[0].id}
            profile={profiles[0]}
            onSwipe={handleSwipe}
            disabled={swiping}
          />

          <div className="mt-6 w-full">
            <SwipeButtons
              onLike={() => handleSwipe("LIKE")}
              onPass={() => handleSwipe("PASS")}
              disabled={swiping}
            />
          </div>

          <p className="mt-5 text-center text-xs text-gray-400">
            Swipe left to pass or right to like
          </p>

          <p className="mt-1 text-center text-xs text-gray-400">
            {profiles.length} profiles remaining
          </p>
        </div>
      )}

      {matchedProfile && (
        <MatchModal
          profile={matchedProfile}
          onClose={() => setMatchedProfile(null)}
        />
      )}
    </main>
  );
}

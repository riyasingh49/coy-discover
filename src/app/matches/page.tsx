"use client";

import { useEffect, useState } from "react";
import { Heart, Users } from "lucide-react";
import type { Profile } from "@/types";
import EmptyState from "@/components/EmptyState";

export default function MatchesPage() {
  const [matches, setMatches] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function fetchMatches() {
      try {
        const response = await fetch("/api/matches");

        if (!response.ok) {
          throw new Error("Could not load matches.");
        }

        const data = await response.json();

        if (!cancelled) {
          setMatches(data.matches);
        }
      } catch {
        if (!cancelled) {
          setError("Something went wrong while loading your matches.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void fetchMatches();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-12 text-center">
        <p className="text-gray-500">Loading your matches...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-12 text-center">
        <p className="text-red-500">{error}</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-8">
        <div className="mb-2 flex items-center gap-2">
          <Heart className="h-7 w-7 fill-pink-500 text-pink-500" />
          <h1 className="text-3xl font-bold text-gray-900">
            Your Matches
          </h1>
        </div>

        <p className="text-gray-500">
          People who liked you back. Start making connections!
        </p>
      </div>

      {matches.length === 0 ? (
        <EmptyState
          title="No matches yet"
          description="Keep discovering profiles. When you and someone else like each other, you'll find them here."
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {matches.map((profile) => (
            <article
              key={profile.id}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <img
                src={profile.photo}
                alt={profile.name}
                className="h-64 w-full object-cover"
              />

              <div className="p-5">
                <div className="mb-2 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">
                    {profile.name}, {profile.age}
                  </h2>
                  <Heart className="h-5 w-5 fill-pink-500 text-pink-500" />
                </div>

                <p className="mb-3 text-sm text-gray-500">
                  {profile.city}
                </p>

                <p className="mb-4 text-sm text-gray-700">
                  {profile.bio}
                </p>

                <div className="flex flex-wrap gap-2">
                  {profile.interests.map((interest) => (
                    <span
                      key={interest}
                      className="rounded-full bg-pink-50 px-3 py-1 text-xs font-medium text-pink-700"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-400">
        <Users className="h-4 w-4" />
        {matches.length} mutual {matches.length === 1 ? "match" : "matches"}
      </div>
    </main>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Heart, Sparkles, Users } from "lucide-react";

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
          setError("Something went wrong while loading matches.");
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
      <main className="flex min-h-[80vh] items-center justify-center">
        <div className="text-center">
          <Heart className="mx-auto mb-3 animate-pulse text-pink-500" size={36} />
          <p className="text-gray-500">Finding your matches...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-pink-50/50 px-4 py-10">
      <div className="mx-auto max-w-5xl">

        {/* Heading */}
        <div className="mb-10 text-center">
          <div className="mb-3 flex justify-center">
            <div className="rounded-2xl bg-pink-100 p-3 text-pink-500">
              <Sparkles size={28} />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900">
            Your <span className="text-pink-500">Matches</span>
          </h1>

          <p className="mt-2 text-gray-500">
            People who liked you back. Let the connection begin!
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-xl bg-red-50 p-4 text-center text-red-600">
            {error}
          </div>
        )}

        {/* Match count */}
        <div className="mb-6 flex items-center gap-2 text-gray-600">
          <Users size={20} className="text-pink-500" />
          <span>
            {matches.length} {matches.length === 1 ? "match" : "matches"}
          </span>
        </div>

        {/* Matches grid */}
        {matches.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {matches.map((profile) => (
              <div
                key={profile.id}
                className="overflow-hidden rounded-3xl bg-white shadow-lg shadow-pink-100 transition hover:-translate-y-1"
              >
                <div className="relative h-64">
                  <img
                    src={profile.photo}
                    alt={profile.name}
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  <div className="absolute bottom-4 left-4 text-white">
                    <h2 className="text-2xl font-bold">
                      {profile.name}, {profile.age}
                    </h2>
                    <p className="mt-1 text-sm">
                      📍 {profile.city}
                    </p>
                  </div>

                  <div className="absolute right-4 top-4 rounded-full bg-white p-2 text-pink-500">
                    <Heart size={20} fill="currentColor" />
                  </div>
                </div>

                <div className="p-5">
                  <p className="mb-4 text-sm leading-relaxed text-gray-600">
                    {profile.bio}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {profile.interests.map((interest) => (
                      <span
                        key={interest}
                        className="rounded-full bg-pink-50 px-3 py-1 text-xs font-medium text-pink-600"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No matches yet"
            description="Keep discovering people. When someone you like likes you back, you'll find them here!"
          />
        )}
      </div>
    </main>
  );
}

import profiles from "@/data/profiles.json";
import type { Profile } from "@/types";
import { CURRENT_USER_ID } from "./constants";
import { readStore } from "./storage";

export async function getFeed(): Promise<Profile[]> {
  const store = await readStore();

  const swipedIds = new Set(
    store.swipes
      .filter(
        (swipe) => swipe.swiperId === CURRENT_USER_ID
      )
      .map((swipe) => swipe.swipedUserId)
  );

  return (profiles as Profile[]).filter(
    (profile) => !swipedIds.has(profile.id)
  );
}

export async function getMatches(): Promise<Profile[]> {
  const store = await readStore();

  const matchedIds = store.matches
    .filter(
      (match) =>
        match.userOneId === CURRENT_USER_ID ||
        match.userTwoId === CURRENT_USER_ID
    )
    .map((match) =>
      match.userOneId === CURRENT_USER_ID
        ? match.userTwoId
        : match.userOneId
    );

  return (profiles as Profile[]).filter(
    (profile) => matchedIds.includes(profile.id)
  );
}

import profiles from "@/data/profiles.json";
import type { Profile } from "@/types";

import { CURRENT_USER_ID } from "./constants";
import { readStore } from "./storage";

export async function getFeed(): Promise<Profile[]> {
  const store = await readStore();

  const swipedProfileIds = store.swipes
    .filter((swipe) => swipe.swiperId === CURRENT_USER_ID)
    .map((swipe) => swipe.swipedUserId);

  return (profiles as Profile[]).filter(
    (profile) => !swipedProfileIds.includes(profile.id)
  );
}

export async function getMatches(): Promise<Profile[]> {
  const store = await readStore();

  const matchedProfileIds = store.matches.map((match) =>
    match.userOneId === CURRENT_USER_ID
      ? match.userTwoId
      : match.userTwoId === CURRENT_USER_ID
        ? match.userOneId
        : null
  );

  return (profiles as Profile[]).filter(
    (profile) =>
      matchedProfileIds.includes(profile.id)
  );
}

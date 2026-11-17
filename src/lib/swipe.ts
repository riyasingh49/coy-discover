import profiles from "@/data/profiles.json";
import type {
  Profile,
  Swipe,
  SwipeAction,
  Match,
} from "@/types";

import { CURRENT_USER_ID } from "./constants";
import { readStore, writeStore } from "./storage";

export async function recordSwipe(
  profileId: string,
  action: SwipeAction
): Promise<{ success: boolean; isMatch: boolean }> {
  const store = await readStore();

  const profileExists = (profiles as Profile[]).some(
    (profile) => profile.id === profileId
  );

  if (!profileExists) {
    throw new Error("Profile not found");
  }

  if (!["LIKE", "PASS"].includes(action)) {
    throw new Error("Invalid swipe action");
  }

  const alreadySwiped = store.swipes.some(
    (swipe) =>
      swipe.swiperId === CURRENT_USER_ID &&
      swipe.swipedUserId === profileId
  );

  if (alreadySwiped) {
    return {
      success: false,
      isMatch: false,
    };
  }

  const newSwipe: Swipe = {
    swiperId: CURRENT_USER_ID,
    swipedUserId: profileId,
    action,
    createdAt: new Date().toISOString(),
  };

  store.swipes.push(newSwipe);

  let isMatch = false;

  if (action === "LIKE") {
    const mutualLike = store.swipes.some(
      (swipe) =>
        swipe.swiperId === profileId &&
        swipe.swipedUserId === CURRENT_USER_ID &&
        swipe.action === "LIKE"
    );

    if (mutualLike) {
      const existingMatch = store.matches.some(
        (match) =>
          (match.userOneId === CURRENT_USER_ID &&
            match.userTwoId === profileId) ||
          (match.userOneId === profileId &&
            match.userTwoId === CURRENT_USER_ID)
      );

      if (!existingMatch) {
        const newMatch: Match = {
          id: `match-${profileId}-${CURRENT_USER_ID}`,
          userOneId: CURRENT_USER_ID,
          userTwoId: profileId,
          createdAt: new Date().toISOString(),
        };

        store.matches.push(newMatch);
      }

      isMatch = true;
    }
  }

  await writeStore(store);

  return {
    success: true,
    isMatch,
  };
}

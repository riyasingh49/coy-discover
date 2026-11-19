import { createClient } from "@supabase/supabase-js";

import type { Swipe, Match } from "@/types";
import { CURRENT_USER_ID, DEMO_LIKES } from "./constants";

export interface StoreData {
  swipes: Swipe[];
  matches: Match[];
}

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;

  if (!url || !secretKey) {
    throw new Error("Supabase environment variables are missing.");
  }

  return createClient(url, secretKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export async function readStore(): Promise<StoreData> {
  const supabase = getSupabase();

  const [swipesResult, matchesResult] = await Promise.all([
    supabase
      .from("swipes")
      .select("swiper_id, swiped_user_id, action, created_at"),

    supabase
      .from("matches")
      .select("id, user_one_id, user_two_id, created_at"),
  ]);

  if (swipesResult.error) {
    throw swipesResult.error;
  }

  if (matchesResult.error) {
    throw matchesResult.error;
  }

  const swipes: Swipe[] = (swipesResult.data ?? []).map((row) => ({
    swiperId: row.swiper_id,
    swipedUserId: row.swiped_user_id,
    action: row.action as Swipe["action"],
    createdAt: row.created_at,
  }));

  const matches: Match[] = (matchesResult.data ?? []).map((row) => ({
    id: row.id,
    userOneId: row.user_one_id,
    userTwoId: row.user_two_id,
    createdAt: row.created_at,
  }));

  return { swipes, matches };
}

export async function writeStore(data: StoreData): Promise<void> {
  const supabase = getSupabase();

  if (data.swipes.length > 0) {
    const { error } = await supabase
      .from("swipes")
      .upsert(
        data.swipes.map((swipe) => ({
          swiper_id: swipe.swiperId,
          swiped_user_id: swipe.swipedUserId,
          action: swipe.action,
          created_at: swipe.createdAt,
        })),
        { onConflict: "swiper_id,swiped_user_id" }
      );

    if (error) {
      throw error;
    }
  }

  if (data.matches.length > 0) {
    const { error } = await supabase
      .from("matches")
      .upsert(
        data.matches.map((match) => ({
          id: match.id,
          user_one_id: match.userOneId,
          user_two_id: match.userTwoId,
          created_at: match.createdAt,
        })),
        { onConflict: "id" }
      );

    if (error) {
      throw error;
    }
  }
}

export async function seedDemoLikes(): Promise<void> {
  const store = await readStore();

  for (const profileId of DEMO_LIKES) {
    const alreadyExists = store.swipes.some(
      (swipe) =>
        swipe.swiperId === profileId &&
        swipe.swipedUserId === CURRENT_USER_ID
    );

    if (!alreadyExists) {
      store.swipes.push({
        swiperId: profileId,
        swipedUserId: CURRENT_USER_ID,
        action: "LIKE",
        createdAt: new Date().toISOString(),
      });
    }
  }

  await writeStore(store);
}

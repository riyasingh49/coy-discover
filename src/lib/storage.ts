import { readFile, writeFile } from "fs/promises";
import path from "path";

import type { Swipe, Match } from "@/types";
import { CURRENT_USER_ID, DEMO_LIKES } from "./constants";

export interface StoreData {
  swipes: Swipe[];
  matches: Match[];
}

const STORE_PATH = path.join(
  process.cwd(),
  "src/data/store.json"
);

export async function readStore(): Promise<StoreData> {
  try {
    const data = await readFile(STORE_PATH, "utf-8");
    return JSON.parse(data) as StoreData;
  } catch {
    const initialData: StoreData = {
      swipes: [],
      matches: [],
    };

    await writeStore(initialData);
    return initialData;
  }
}

export async function writeStore(
  data: StoreData
): Promise<void> {
  await writeFile(
    STORE_PATH,
    JSON.stringify(data, null, 2),
    "utf-8"
  );
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

import { NextResponse } from "next/server";
import { getFeed } from "@/lib/profile";
import { seedDemoLikes } from "@/lib/storage";

export const runtime = "nodejs";

export async function GET() {
  try {
    // Add demo incoming likes (only once per profile)
    await seedDemoLikes();

    const profiles = await getFeed();

    return NextResponse.json({ profiles });
  } catch (error) {
    console.error("Feed API error:", error);

    return NextResponse.json(
      { error: "Failed to load profiles" },
      { status: 500 }
    );
  }
}

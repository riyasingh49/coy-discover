import { NextResponse } from "next/server";
import { recordSwipe } from "@/lib/swipe";
import type { SwipeAction } from "@/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { profileId, action } = body;

    if (
      typeof profileId !== "string" ||
      !["LIKE", "PASS"].includes(action)
    ) {
      return NextResponse.json(
        { error: "Invalid profileId or action" },
        { status: 400 }
      );
    }

    const result = await recordSwipe(
      profileId,
      action as SwipeAction
    );

    if (!result.success) {
      return NextResponse.json(
        { error: "Profile already swiped" },
        { status: 409 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Swipe API error:", error);

    const message =
      error instanceof Error ? error.message : "";

    if (message === "Profile not found") {
      return NextResponse.json(
        { error: message },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Failed to save swipe" },
      { status: 500 }
    );
  }
}

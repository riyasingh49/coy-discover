import { NextResponse } from "next/server";
import { getMatches } from "@/lib/profile";

export const runtime = "nodejs";

export async function GET() {
  try {
    const matches = await getMatches();

    return NextResponse.json({ matches });
  } catch (error) {
    console.error("Matches API error:", error);

    return NextResponse.json(
      { error: "Failed to load matches" },
      { status: 500 }
    );
  }
}

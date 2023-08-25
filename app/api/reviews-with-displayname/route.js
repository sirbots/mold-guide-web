import { prisma } from "../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
  const reviewsWithDisplayName = await prisma.enrichedReviews.findMany();
  return NextResponse.json(reviewsWithDisplayName);
}

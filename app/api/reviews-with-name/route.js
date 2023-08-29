import { prisma } from "../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
  const reviewsWithName = await prisma.enrichedReviews.findMany();
  return NextResponse.json(reviewsWithName);
}

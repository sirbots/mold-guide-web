import { prisma } from "../../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const remediatorId = params.id;
  const reviewsOfThisRemediator = await prisma.remediatorReview.findMany({
    where: {
      remediatorId: {
        equals: remediatorId,
      },
      published: {
        equals: true,
      },
    },
  });

  if (!reviewsOfThisRemediator) {
    return new NextResponse("No review with ID found", { status: 404 });
  }

  return NextResponse.json(reviewsOfThisRemediator);
}

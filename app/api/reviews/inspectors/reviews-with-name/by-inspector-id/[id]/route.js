import { prisma } from "../../../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const inspectorId = params.id;
  const reviewsOfThisInspector = await prisma.EnrichedInspectorReviews.findMany(
    {
      where: {
        inspectorId: {
          equals: inspectorId,
        },
      },
    }
  );

  if (!reviewsOfThisInspector) {
    return new NextResponse("No review with ID found", { status: 404 });
  }

  return NextResponse.json(reviewsOfThisInspector);
}

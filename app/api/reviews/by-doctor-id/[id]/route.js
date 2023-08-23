import { prisma } from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const doctorId = params.id;
  const reviewsOfThisDoctor = await prisma.review.findMany({
    where: {
      doctorId: {
        equals: doctorId,
      },
    },
  });

  if (!reviewsOfThisDoctor) {
    return new NextResponse("No review with ID found", { status: 404 });
  }

  return NextResponse.json(reviewsOfThisDoctor);
}

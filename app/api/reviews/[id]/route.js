import { prisma } from "../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const id = params.id;
  const review = await prisma.review.findUnique({
    where: {
      id,
    },
  });

  if (!review) {
    return new NextResponse("No review with ID found", { status: 404 });
  }

  return NextResponse.json(review);
}

export async function PATCH(request, { params }) {
  const id = params.id;
  let json = await request.json();

  const updated_review = await prisma.review.update({
    where: { id },
    data: json,
  });

  if (!updated_review) {
    return new NextResponse("No review with ID found", { status: 404 });
  }

  return NextResponse.json(updated_review);
}

export async function DELETE(request, { params }) {
  try {
    const id = params.id;
    await prisma.review.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    if (error.code === "P2025") {
      return new NextResponse("No review with ID found", { status: 404 });
    }

    return new NextResponse(error.message, { status: 500 });
  }
}

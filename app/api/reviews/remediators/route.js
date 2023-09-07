import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
  const remediatorReviews = await prisma.remediatorReview.findMany();
  return NextResponse.json(remediatorReviews);
}

export async function POST(request) {
  try {
    const json = await request.json();

    const review = await prisma.remediatorReview.create({
      data: json,
    });

    return new NextResponse(JSON.stringify(review), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    if (error.code === "P2002") {
      return new NextResponse("review already exists", {
        status: 409,
      });
    }
    return new NextResponse(error.message, { status: 500 });
  }
}

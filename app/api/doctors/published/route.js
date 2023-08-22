import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
  const publishedDoctors = await prisma.doctor.findMany({
    where: {
      published: true,
    },
  });

  if (!publishedDoctors) {
    return new NextResponse("No doctor with ID found", { status: 404 });
  }

  return NextResponse.json(publishedDoctors);
}

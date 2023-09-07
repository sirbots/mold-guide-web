import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
  const publishedRemediators = await prisma.remediator.findMany({
    where: {
      published: true,
    },
  });

  if (!publishedRemediators) {
    return new NextResponse("No remediator with ID found", { status: 404 });
  }

  return NextResponse.json(publishedRemediators);
}

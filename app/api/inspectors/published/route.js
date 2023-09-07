import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
  const publishedInspectors = await prisma.inspector.findMany({
    where: {
      published: true,
    },
  });

  if (!publishedInspectors) {
    return new NextResponse("No inspector with ID found", { status: 404 });
  }

  return NextResponse.json(publishedInspectors);
}

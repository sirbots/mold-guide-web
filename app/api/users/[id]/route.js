import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const id = params.id;
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    return new NextResponse("No user with ID found", { status: 404 });
  }

  return NextResponse.json(user);
}

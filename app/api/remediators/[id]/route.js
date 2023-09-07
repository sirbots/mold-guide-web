import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const id = params.id;
  const remediator = await prisma.remediator.findUnique({
    where: {
      id,
    },
  });

  if (!remediator) {
    return new NextResponse("No remediator with ID found", { status: 404 });
  }

  return NextResponse.json(remediator);
}

export async function PATCH(request, { params }) {
  const id = params.id;
  let json = await request.json();

  const updated_remediator = await prisma.remediator.update({
    where: { id },
    data: json,
  });

  if (!updated_remediator) {
    return new NextResponse("No remediator with ID found", { status: 404 });
  }

  return NextResponse.json(updated_remediator);
}

export async function DELETE(request, { params }) {
  try {
    const id = params.id;
    await prisma.remediator.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    if (error.code === "P2025") {
      return new NextResponse("No remediator with ID found", { status: 404 });
    }

    return new NextResponse(error.message, { status: 500 });
  }
}

import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const id = params.id;
  const inspector = await prisma.inspector.findUnique({
    where: {
      id,
    },
  });

  if (!inspector) {
    return new NextResponse("No inspector with ID found", { status: 404 });
  }

  return NextResponse.json(inspector);
}

export async function PATCH(request, { params }) {
  const id = params.id;
  let json = await request.json();

  const updated_inspector = await prisma.inspector.update({
    where: { id },
    data: json,
  });

  if (!updated_inspector) {
    return new NextResponse("No inspector with ID found", { status: 404 });
  }

  return NextResponse.json(updated_inspector);
}

export async function DELETE(request, { params }) {
  try {
    const id = params.id;
    await prisma.inspector.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    if (error.code === "P2025") {
      return new NextResponse("No inspector with ID found", { status: 404 });
    }

    return new NextResponse(error.message, { status: 500 });
  }
}

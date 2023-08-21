import { prisma } from "../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const id = params.id;
  const doctor = await prisma.doctor.findUnique({
    where: {
      id,
    },
  });

  if (!doctor) {
    return new NextResponse("No doctor with ID found", { status: 404 });
  }

  return NextResponse.json(doctor);
}

export async function PATCH(request, { params }) {
  const id = params.id;
  let json = await request.json();

  const updated_doctor = await prisma.doctor.update({
    where: { id },
    data: json,
  });

  if (!updated_doctor) {
    return new NextResponse("No doctor with ID found", { status: 404 });
  }

  return NextResponse.json(updated_doctor);
}

export async function DELETE(request, { params }) {
  try {
    const id = params.id;
    await prisma.doctor.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    if (error.code === "P2025") {
      return new NextResponse("No doctor with ID found", { status: 404 });
    }

    return new NextResponse(error.message, { status: 500 });
  }
}

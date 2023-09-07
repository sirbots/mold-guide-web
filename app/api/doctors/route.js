import { prisma } from "../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
  const doctors = await prisma.doctor.findMany();
  return NextResponse.json(doctors);
}

export async function POST(request) {
  try {
    console.log("request received by API");
    const json = await request.json();

    const doctor = await prisma.doctor.create({
      data: json,
    });

    return new NextResponse(JSON.stringify(doctor), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
    if (error.code === "P2002") {
      return new NextResponse("Doctor already exists", {
        status: 409,
      });
    }
    return new NextResponse(error.message, { status: 500 });
  }
}

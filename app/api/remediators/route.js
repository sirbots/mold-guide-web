import { prisma } from "../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
  const remediators = await prisma.remediator.findMany();
  return NextResponse.json(remediators);
}

export async function POST(request) {
  try {
    console.log("request received by API");
    const json = await request.json();

    const remediator = await prisma.remediator.create({
      data: json,
    });

    return new NextResponse(JSON.stringify(remediator), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    if (error.code === "P2002") {
      return new NextResponse("remediator already exists", {
        status: 409,
      });
    }
    return new NextResponse(error.message, { status: 500 });
  }
}

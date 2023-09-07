import { prisma } from "../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
  const inspectors = await prisma.inspector.findMany();
  return NextResponse.json(inspectors);
}

export async function POST(request) {
  try {
    console.log("request received by API");
    const json = await request.json();

    const inspector = await prisma.inspector.create({
      data: json,
    });

    return new NextResponse(JSON.stringify(inspector), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
    if (error.code === "P2002") {
      return new NextResponse("inspector already exists", {
        status: 409,
      });
    }
    return new NextResponse(error.message, { status: 500 });
  }
}

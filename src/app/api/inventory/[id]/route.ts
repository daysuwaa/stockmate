/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;
    const body = await req.json();

    const item = await prisma.inventory.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(item, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || "Error updating inventory" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;

    await prisma.inventory.delete({ where: { id } });

    return NextResponse.json({ id }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || "Error deleting inventory" },
      { status: 500 }
    );
  }
}
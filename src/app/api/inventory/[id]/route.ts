import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

// UPDATE item
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
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

// DELETE item
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    await prisma.inventory.delete({ where: { id } });

    return NextResponse.json({ id }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || "Error deleting inventory" },
      { status: 500 }
    );
  }
}

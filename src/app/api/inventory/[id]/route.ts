import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

// Define context shape manually
interface Context {
  params: {
    id: string;
  };
}

// UPDATE item
export async function PUT(req: NextRequest, { params }: Context) {
  try {
    const body = await req.json();

    const item = await prisma.inventory.update({
      where: { id: params.id },
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
export async function DELETE(req: NextRequest, { params }: Context) {
  try {
    await prisma.inventory.delete({ where: { id: params.id } });

    return NextResponse.json({ id: params.id }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || "Error deleting inventory" },
      { status: 500 }
    );
  }
}
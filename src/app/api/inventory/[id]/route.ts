/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();

    console.log("PUT request to update item:", { id, body });

    const item = await prisma.inventory.update({
      where: { id },
      data: body,
    });

    console.log(" Updated item:", item);

    return NextResponse.json(item, { status: 200 });
  } catch (err: any) {
    console.error("Error in PUT /inventory/:id:", err);

    return NextResponse.json(
      { message: err.message || "Error updating inventory" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const deletedItem = await prisma.inventory.delete({
      where: { id },
    });

    return NextResponse.json(deletedItem, { status: 200 });
  } catch (err: any) {
    if (err.code === "P2025") {
      return NextResponse.json({ message: "Item not found" }, { status: 404 });
    }

    console.error("DELETE Error:", err);
    return NextResponse.json(
      { message: err.message || "Error deleting inventory" },
      { status: 500 }
    );
  }
}
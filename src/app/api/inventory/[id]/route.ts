import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

// UPDATE user
export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;
    const body = await req.json();

    const user = await prisma.user.update({
      where: { id }, // id is a string in schema
      data: body,
    });

    return NextResponse.json(user, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || "Error updating user" },
      { status: 500 }
    );
  }
}

// DELETE user
export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;

    await prisma.user.delete({
      where: { id }, // id is a string in schema
    });

    return NextResponse.json({ id }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || "Error deleting user" },
      { status: 500 }
    );
  }
}
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

// UPDATE user
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params; // ✅ no await needed
    const body = await req.json();

    const user = await prisma.user.update({
      where: { id },
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
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params; // ✅ no await needed

    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json({ id }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || "Error deleting user" },
      { status: 500 }
    );
  }
}
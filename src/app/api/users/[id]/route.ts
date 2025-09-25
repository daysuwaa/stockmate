/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
export const prisma = new PrismaClient();
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();

    const updated = await prisma.user.update({
      where: { id: params.id },
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone ?? undefined,
        website: body.website ?? undefined,
        avatar: body.avatar ?? undefined,     
        address: body.address ?? undefined,
      },
    });

    // return a safe user object
    return NextResponse.json({
      user: {
        id: updated.id,
        name: updated.name,
        email: updated.email,
        phone: updated.phone ?? "",
        website: updated.website ?? "",
        avatar: updated.avatar ?? "",
        address: updated.address ?? "",
      },
    });
  } catch (e: any) {
    console.error("PROFILE UPDATE ERROR:", e);
    return NextResponse.json(
      { message: e?.message || "Failed to update" },
      { status: 500 }
    );
  }
}
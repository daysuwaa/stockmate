/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { verifyToken } from "../_utils";

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const payload = verifyToken(token);
    if (!payload?.sub) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // ✅ fetch user safely
    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        website: true,
        avatar: true,
        address: true,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (e: any) {
    console.error("❌ /auth/me error:", e);
    return NextResponse.json(
      { message: e?.message || "Unauthorized" },
      { status: 401 }
    );
  }
}
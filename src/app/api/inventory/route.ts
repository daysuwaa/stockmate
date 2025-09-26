import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { verifyToken } from "@/app/api/auth/_utils";


export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // extract & verify token
    const token = authHeader.split(" ")[1];
    const payload = verifyToken(token); // { sub: "userId" }
    if (!payload?.sub) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    // ✅ filter strictly by userId
    const items = await prisma.inventory.findMany({
      where: { userId: payload.sub },
      orderBy: { updated: "desc" },
    });

    return NextResponse.json(items, { status: 200 });
  } catch (err: any) {
    console.error("❌ GET /inventory error:", err);
    return NextResponse.json({ message: err.message || "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const payload = verifyToken(token);
    console.log("token payload", payload)
    if (!payload?.sub) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    const userId = payload.sub;

    const body = await req.json();
    const { name, category, quantity, status, price } = body;

    const newItem = await prisma.inventory.create({
      data: {
        name,
        category,
        quantity: Number(quantity) || 0,
        status: status ?? "In Stock",
        price: Number(price) || 0,
        userId,
      },
    });

    return NextResponse.json(newItem, { status: 201 });
  } catch (err: any) {
    console.error("❌ POST /inventory error:", err); 
    return NextResponse.json(
      { message: "Failed to add item", error: err.message ?? String(err) },
      { status: 500 }
    );
  }
}
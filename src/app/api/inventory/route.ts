import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

// GET all items
export async function GET() {
  try {
    const items = await prisma.inventory.findMany();
    return NextResponse.json(items, { status: 200 });
  } catch (err) {
    console.error("GET /inventory error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// POST add new item
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, category, quantity, status, price } = body;

    if (!name || !category) {
      return NextResponse.json({ message: "Name and category are required" }, { status: 400 });
    }

    const newItem = await prisma.inventory.create({
      data: {
        name,
        category,
        quantity: Number(quantity) || 0,
        status,
        price: Number(price) || 0,
      },
    });

    return NextResponse.json(newItem, { status: 201 });
  } catch (err) {
    console.error("❌ Error adding inventory item:", err); // log the real error
    const errorMessage = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { message: "Failed to add item", error: errorMessage },
      { status: 500 }
    );
  }
}
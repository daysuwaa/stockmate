/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET() {
  try {
    console.log("📊 Fetching inventory stats...");

    const items = await prisma.inventory.findMany();
    console.log("✅ Items fetched:", items);

    const totalItems = items.length;
    const lowStock = items.filter((i: { status: string; }) => i.status === "Low Stock").length;
    const outOfStock = items.filter((i: { status: string; }) => i.status === "Out of Stock" || i.status=== "out of stock").length;
    const totalRevenue = items.reduce((acc: number, i: { price: number; quantity: number; }) => acc + i.price * i.quantity, 0);
      const totalInventoryValue = items.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);

    return NextResponse.json({
      totalItems,
      lowStock,
      outOfStock,
      totalRevenue,
      totalInventoryValue,
    });
  } catch (err: any) {
    console.error("❌ Error in /api/inventory/stats:", err);
    return NextResponse.json(
      { message: "Failed to load stats", error: err.message },
      { status: 500 }
    );
  }
}
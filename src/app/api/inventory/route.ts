/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";
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

// export async function POST(req: Request) {
//   try {
//     const authHeader = req.headers.get("authorization");
//     if (!authHeader) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     const token = authHeader.split(" ")[1];
//     const payload = verifyToken(token);
//     console.log("token payload", payload)
//     if (!payload?.sub) {
//       return NextResponse.json({ message: "Invalid token" }, { status: 401 });
//     }

//     const userId = payload.sub;

//     const body = await req.json();
//     const { name, category, quantity, status, price } = body;

//     const newItem = await prisma.inventory.create({
//       data: {
//         name,
//         category,
//         quantity: Number(quantity) || 0,
//         status: status ?? "In Stock",
//         price: Number(price) || 0,
//         userId,
//       },
//     });

//     return NextResponse.json(newItem, { status: 201 });
//   } catch (err: any) {
//     console.error("❌ POST /inventory error:", err); 
//     return NextResponse.json(
//       { message: "Failed to add item", error: err.message ?? String(err) },
//       { status: 500 }
//     );
//   }
// }

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const payload = verifyToken(token);
    if (!payload?.sub) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    const body = await req.json();
    const { name, category, quantity, status, price } = body;

    if (!name || !category) {
      return NextResponse.json({ message: "Name and category are required" }, { status: 400 });
    }

    // ✅ Enforce status rules
    if (quantity === 0 && status !== "Out of Stock") {
      return NextResponse.json(
        { message: "Quantity is 0. Status must be 'Out of Stock'" },
        { status: 400 }
      );
    }
    if (quantity > 0 && quantity < 10 && status !== "Low Stock") {
      return NextResponse.json(
        { message: "Quantity is below 10. Status must be 'Low Stock'" },
        { status: 400 }
      );
    }
    if (quantity >= 10 && status !== "In Stock") {
      return NextResponse.json(
        { message: "Quantity is 10 or more. Status must be 'In Stock'" },
        { status: 400 }
      );
    }

    const newItem = await prisma.inventory.create({
      data: {
        name,
        category,
        quantity,
        status,
        price,
        userId: payload.sub, // ✅ attach logged-in user
      },
    });

    return NextResponse.json(newItem, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ message: err.message || "Server error" }, { status: 500 });
  }
}
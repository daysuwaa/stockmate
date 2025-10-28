/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

// UPDATE user
// export async function PUT(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const { id } = params; 
//     const body = await req.json();

//     const user = await prisma.user.update({
//       where: { id },
//       data: body,
//     });

//     return NextResponse.json(user, { status: 200 });
//   } catch (err: any) {
//     console.error("Error updating user:", err); 
//     return NextResponse.json(
//       { message: err.message || "Error updating user" },
//       { status: 500 }
//     );
//   }
// }
export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  try {
    const { id } = context.params;
    const body = await req.json();

    console.log("🟢 PUT request to update item:", { id, body }); // log

    const item = await prisma.inventory.update({
      where: { id },
      data: body,
    });

    console.log("✅ Updated item:", item);

    return NextResponse.json(item, { status: 200 });
  } catch (err: any) {
    console.error("❌ Error in PUT /inventory/:id:", err);

    return NextResponse.json(
      { message: err.message || "Error updating inventory" },
      { status: 500 }
    );
  }
}
// DELETE user
// export async function DELETE(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const { id } = params; // ✅ No 'await' needed

//     await prisma.user.delete({
//       where: { id },
//     });

//     return NextResponse.json({ id }, { status: 200 });
//   } catch (err: any) {
//     console.error("Error deleting user:", err); // ✅ Helps you debug in console
//     return NextResponse.json(
//       { message: err.message || "Error deleting user" },
//       { status: 500 }
//     );
//   }
// }

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    const deletedItem = await prisma.inventory.delete({
      where: { id },
    });

    return NextResponse.json(deletedItem, { status: 200 });
  } catch (err: any) {
    if (err.code === "P2025") {
      // record not found
      return NextResponse.json({ message: "Item not found" }, { status: 404 });
    }

    console.error("DELETE Error:", err);
    return NextResponse.json(
      { message: err.message || "Error deleting inventory" },
      { status: 500 }
    );
  }
}
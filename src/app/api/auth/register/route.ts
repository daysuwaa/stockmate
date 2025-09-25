/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
// import { prisma } from "../../../lib/prisma";
import { PrismaClient } from "@/generated/prisma"; 
export const prisma = new PrismaClient();
import { RegisterSchema, hashPassword, signToken } from "../_utils";

export async function POST(req: Request) {
  try {
    // 1. Parse request body
    const body = await req.json();
    const parsed = RegisterSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ message: "Invalid input" }, { status: 400 });
    }

    const { name, email, phone, website, password } = parsed.data;

    // 2. Check if email already exists
    const existingEmail = await prisma.user.findUnique({ where: { email } });
    if (existingEmail) {
      return NextResponse.json({ message: "Email already registered" }, { status: 400 });
    }

   // 3. Check if phone already exists
const existingPhone = await prisma.user.findUnique({ where: { phone } });
if (existingPhone) {
  return NextResponse.json(
    { message: "Phone already registered" },
    { status: 400 }
  );
}
    // 4. Hash password
    const passwordHash = await hashPassword(password);

    // 5. Create new user
    const newUser = await prisma.user.create({
      data: { name, email, phone, website, passwordHash },
    });
    console.log("USER CREATED:", newUser);

    // 6. Issue JWT token
    const token = signToken(newUser.id);

    // 7. Return safe user object
    const user = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      website: newUser.website,
    };

    return NextResponse.json({ user, token }, { status: 201 });
  } catch (e: any) {
    console.error("REGISTER ERROR:", e);
    return NextResponse.json(
      { message: e?.message || "Registration failed" },
      { status: 500 }
    );
  }
}
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { RegisterSchema, hashPassword, signToken } from '../_utils';


export async function POST(req: Request) {
  try {
    // read request body
    const body = await req.json();
    // validate with zod (Shape+rules)
    const parsed = RegisterSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ message: "Invalid input" }, { status: 400 });
    }

    const { name, email, password } = parsed.data;

    // checks if user exist, if it does return email exist
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
      return NextResponse.json({ message: "Email already registered" }, { status: 400 });
    }

    //Hash the password (never store raw)
    const passwordHash = await hashPassword(password);

    // create a user in the database

    const u = await prisma.user.create({ 
        data: { name, email, passwordHash }
     });
    console.log("USER CREATED:", u); 

    // issue a tokem so the user is logged in
    const token = signToken(u.id);
    const user = { id: u.id, name: u.name, email: u.email };
    return NextResponse.json({ user, token }, { status: 201 });
  } catch (e: any) {
    console.error("REGISTER ERROR:", e); // 👈 log full error
    return NextResponse.json({ message: e?.message || "Registration failed" }, { status: 500 });
  }
}
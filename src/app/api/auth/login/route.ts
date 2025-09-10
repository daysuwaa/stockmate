/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { LoginSchema, comparePassword, signToken } from '../_utils';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 1) Validate shape
    const parsed = LoginSchema.safeParse(body);
    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message || 'Invalid input';
      return NextResponse.json({ message }, { status: 400 });
    }
    const { email, password } = parsed.data;

    // 2) Find user by email
    const u = await prisma.user.findUnique({ where: { email } });
    if (!u) {
      // never reveal which part is wrong — just "Invalid credentials"
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // 3) Compare raw password to stored hash
    const ok = await comparePassword(password, u.passwordHash);
    if (!ok) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // 4) Success: issue token, send safe user
    const token = signToken(u.id);
    const user = { id: u.id, name: u.name, email: u.email };

    return NextResponse.json({ user, token }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ message: e?.message || 'Login failed' }, { status: 500 });
  }
}
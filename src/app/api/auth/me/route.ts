import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { verifyToken } from '../_utils';

export async function GET(req: Request) {
  // 1) Read the Authorization header
  const auth = req.headers.get('authorization'); // "Bearer <token>"

  // 2) Verify the token → gives us userId or null
  const userId = verifyToken(auth);
  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  // 3) Look up user in DB
  const u = await prisma.user.findUnique({ where: { id: userId } });
  if (!u) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  // 4) Return safe user object
  const user = { id: u.id, name: u.name, email: u.email };
  return NextResponse.json({ user }, { status: 200 });
}
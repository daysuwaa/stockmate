import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

// 1) SCHEMAS: declare what a valid body looks like.

export const RegisterSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().regex(
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  "Invalid email"
), 
 phone: z
  .string()
  .regex(/^\d{11}$/, "Phone must be exactly 11 digits"),
  website: z.string().trim().optional(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const LoginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(1, 'Password required'),
});

// 2) BCRYPT: hash & compare passwords.
//    genSalt(10): "10" is cost factor (work factor). Bigger = slower = more secure.
//    bcrypt stores the salt INSIDE the hash string, so you don't store it separately.
export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}
export async function comparePassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

// 3) JWT: sign + verify tokens.
//    SECRET comes from .env; restart dev server if you change it.
const SECRET = process.env.JWT_SECRET || 'dev-secret';

export function signToken(userId: string) {
  // "sub" (subject) = who this token belongs to.
  return jwt.sign({ sub: userId }, SECRET, { expiresIn: '7d' });
}

export function verifyToken(authorization?: string | null): string | null {
  if (!authorization) return null;
  // Expect header like "Bearer <token>"
  const token = authorization.startsWith('Bearer ') ? authorization.slice(7) : authorization;
  try {
    const payload = jwt.verify(token, SECRET) as { sub: string };
    return payload.sub; // return userId if valid
  } catch {
    return null; // invalid/expired token
  }
}
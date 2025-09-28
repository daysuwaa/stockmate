/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
const JWT_SECRET = process.env.JWT_SECRET!;
// 1) SCHEMAS: declare what a valid body looks like.

export const RegisterSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().regex(
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  "Invalid email"
), 
 phone: z.union([z.string(), z.number()]).transform(val => String(val)),
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

export function signToken(userId: string) {
  return jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: "7d" });
}

// ✅ verify and return decoded payload
export function verifyToken(token: string): { sub: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { sub: string };
  } catch {
    return null;
  }
}
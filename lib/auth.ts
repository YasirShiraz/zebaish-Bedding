import { hash, compare } from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key-change-this-in-prod';
const key = new TextEncoder().encode(SECRET_KEY);

export async function hashPassword(password: string) {
    return await hash(password, 12);
}

export async function verifyPassword(password: string, hash: string) {
    return await compare(password, hash);
}

export async function signJWT(payload: any, expiresIn: string = '1d') {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(expiresIn)
        .sign(key);
}

export async function verifyJWT(token: string) {
    try {
        const { payload } = await jwtVerify(token, key);
        return payload;
    } catch (error) {
        return null;
    }
}

export async function getSession() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) return null;
    return await verifyJWT(token);
}

export async function login(token: string) {
    const cookieStore = await cookies();
    cookieStore.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 86400, // 1 day
        path: '/',
    });
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete('token');
}

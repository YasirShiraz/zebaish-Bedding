import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyJWT } from './lib/auth';

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // Paths that require authentication
    const protectedPaths = ['/admin', '/profile', '/orders'];
    const isProtected = protectedPaths.some((p) => path.startsWith(p));

    // Paths that are for guests only (login/signup) - optional: redirect if already logged in
    // const guestPaths = ['/login', '/signup'];

    if (isProtected) {
        const token = request.cookies.get('token')?.value;

        if (!token) {
            return NextResponse.redirect(new URL('/login', request.url));
        }

        const payload = await verifyJWT(token);

        if (!payload) {
            // Invalid token
            return NextResponse.redirect(new URL('/login', request.url));
        }

        // Admin Route Protection
        if (path.startsWith('/admin') && payload.role !== 'ADMIN') {
            return NextResponse.redirect(new URL('/', request.url)); // Or a 403 page
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/profile/:path*', '/orders/:path*'],
};

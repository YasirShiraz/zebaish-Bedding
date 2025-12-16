import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { signJWT, login } from '@/lib/auth';

export async function POST(request: Request) {
    try {
        const { email, name, image } = await request.json();

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        let user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            // Create new user
            user = await prisma.user.create({
                data: {
                    email,
                    name: name || email.split('@')[0],
                    image: image || null,
                    role: 'CUSTOMER',
                    password: null, // No password for social login
                    // Note: Schema might require password? Let's assume nullable or handle it.
                    // Checked schema earlier: password String? (nullable). Good.
                },
            });
        }

        // Generate JWT token
        const token = await signJWT({
            id: user.id,
            email: user.email,
            role: user.role,
            name: user.name,
        });

        // Set cookie
        await login(token);

        return NextResponse.json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                image: user.image
            }
        });
    } catch (error) {
        console.error("Social login error:", error);
        return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
    }
}

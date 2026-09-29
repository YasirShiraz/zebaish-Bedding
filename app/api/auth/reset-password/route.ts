import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/auth';

export async function POST(request: Request) {
    try {
        const { token, password } = await request.json();

        if (!token || !password) {
            return NextResponse.json({ error: 'Token and password are required' }, { status: 400 });
        }

        // Find user with matching token and unexpired token
        const user = await prisma.user.findFirst({
            where: {
                resetToken: token,
                resetTokenExpiry: {
                    gt: new Date(),
                },
            },
        });

        if (!user) {
            return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
        }

        // Hash new password
        const hashedPassword = await hashPassword(password);

        // Update user
        await prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                resetToken: null,
                resetTokenExpiry: null,
            },
        });

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("Reset password error:", error);
        return NextResponse.json({ error: 'Failed to reset password' }, { status: 500 });
    }
}

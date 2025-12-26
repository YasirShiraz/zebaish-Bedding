
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession, verifyPassword, hashPassword } from '@/lib/auth';

export async function POST(request: Request) {
    try {
        const session = await getSession();
        if (!session || !session.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { currentPassword, newPassword } = body;

        if (!currentPassword || !newPassword) {
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
        }

        if (newPassword.length < 6) {
            return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { id: session.id as string },
        });

        if (!user || !user.password) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Verify current password
        const isValid = await verifyPassword(currentPassword, user.password);
        if (!isValid) {
            return NextResponse.json({ error: 'Incorrect current password' }, { status: 400 });
        }

        // Hash new password
        const hashedPassword = await hashPassword(newPassword);

        // Update user
        await prisma.user.update({
            where: { id: user.id },
            data: { password: hashedPassword },
        });

        return NextResponse.json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Change password error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

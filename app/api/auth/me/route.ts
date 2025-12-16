import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
    const session = await getSession();

    if (!session) {
        return NextResponse.json({ user: null });
    }

    return NextResponse.json({ user: session });
}

export async function PUT(request: Request) {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { name, phone } = body;

        // Basic validation
        if (!name) {
            return NextResponse.json({ error: 'Name is required' }, { status: 400 });
        }

        // Update user in database
        const updatedUser = await prisma.user.update({
            where: { id: session.id },
            data: {
                name,
                phone
            },
        });

        return NextResponse.json({
            success: true,
            user: {
                name: updatedUser.name,
                email: updatedUser.email,
                phone: updatedUser.phone
            }
        });
    } catch (error) {
        console.error("Profile update error:", error);
        return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
    }
}


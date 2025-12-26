import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        // In a real app, verify admin session here
        // const session = await getSession();
        // if (session?.role !== 'ADMIN') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { id } = params;

        await prisma.review.delete({
            where: { id }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Delete review error:', error);
        return NextResponse.json({ error: 'Failed to delete review' }, { status: 500 });
    }
}

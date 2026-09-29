import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET(request: Request) {
    try {
        const session = await getSession();
        if (!session || session.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const orders = await prisma.order.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                user: { select: { name: true, email: true } },
                items: {
                    include: {
                        product: { select: { name: true, images: true } }
                    }
                }
            },
        });

        return NextResponse.json(orders);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
    }
}

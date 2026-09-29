import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET(request: Request) {
    try {
        const session = await getSession();
        if (!session || (!session.id && !session.userId)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const userId = session.id || session.userId;

        const orders = await prisma.order.findMany({
            where: {
                userId: userId as string
            },
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                items: {
                    include: {
                        product: {
                            select: {
                                name: true,
                                images: true,
                                slug: true
                            }
                        }
                    }
                }
            }
        });

        return NextResponse.json(orders);
    } catch (error) {
        console.error('Failed to fetch user orders:', error);
        return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
    }
}

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const session = await getSession();
        if (!session || session.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { code, discountType, discountValue, minOrderValue, expiryDate, usageLimit, isActive } = body;

        const coupon = await prisma.coupon.update({
            where: { id },
            data: {
                code: code?.toUpperCase(),
                discountType,
                discountValue: discountValue ? parseFloat(discountValue) : undefined,
                minOrderValue: minOrderValue ? parseFloat(minOrderValue) : null,
                expiryDate: expiryDate ? new Date(expiryDate) : null,
                usageLimit: usageLimit ? parseInt(usageLimit) : null,
                isActive
            }
        });

        return NextResponse.json(coupon);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update coupon' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const session = await getSession();
        if (!session || session.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await prisma.coupon.delete({
            where: { id }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete coupon' }, { status: 500 });
    }
}

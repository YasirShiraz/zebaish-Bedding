import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET() {
    try {
        const coupons = await prisma.coupon.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(coupons);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch coupons' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await getSession();
        if (!session || session.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { code, discountType, discountValue, minOrderValue, expiryDate, usageLimit } = body;

        if (!code || !discountType || !discountValue) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const coupon = await prisma.coupon.create({
            data: {
                code: code.toUpperCase(),
                discountType,
                discountValue: parseFloat(discountValue),
                minOrderValue: minOrderValue ? parseFloat(minOrderValue) : null,
                expiryDate: expiryDate ? new Date(expiryDate) : null,
                usageLimit: usageLimit ? parseInt(usageLimit) : null,
            }
        });

        return NextResponse.json(coupon);
    } catch (error) {
        console.error('Failed to create coupon:', error);
        return NextResponse.json({ error: 'Failed to create coupon' }, { status: 500 });
    }
}

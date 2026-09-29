import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const product = await prisma.product.findUnique({
            where: { id },
            include: { category: true, variants: true },
        });

        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json(product);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getSession();
        if (!session || session.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        const body = await request.json();
        const { name, slug, description, price, stock, categoryId, images, shippingCost, taxRate, variants } = body;

        // Transaction to update product and replace variants
        const product = await prisma.$transaction(async (tx) => {
            // 1. Update Product Basic Info
            const updatedProduct = await tx.product.update({
                where: { id },
                data: {
                    name,
                    slug,
                    description,
                    price: parseFloat(price),
                    stock: parseInt(stock),
                    categoryId,
                    images: JSON.stringify(images),
                    shippingCost: shippingCost ? parseFloat(shippingCost) : 0,
                    taxRate: taxRate ? parseFloat(taxRate) : 0,
                },
            });

            // 2. Delete existing variants
            await tx.productVariant.deleteMany({
                where: { productId: id }
            });

            // 3. Create new variants if any
            if (Array.isArray(variants) && variants.length > 0) {
                await tx.productVariant.createMany({
                    data: variants.map((v: any) => ({
                        productId: id,
                        name: v.name,
                        price: v.price ? parseFloat(v.price) : null,
                        stock: v.stock ? parseInt(v.stock) : 0
                    }))
                });
            }

            return updatedProduct;
        });

        return NextResponse.json(product);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getSession();
        if (!session || session.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;

        // Use transaction to ensure all related records are deleted
        await prisma.$transaction([
            // Delete related OrderItems first
            prisma.orderItem.deleteMany({
                where: { productId: id }
            }),
            // Delete related Reviews
            prisma.review.deleteMany({
                where: { productId: id }
            }),
            // Finally delete the product
            prisma.product.delete({
                where: { id },
            })
        ]);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Delete error:", error);
        return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
    }
}

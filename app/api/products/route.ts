import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    try {
        const products = await prisma.product.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                category: true,
                variants: true,
                reviews: {
                    select: {
                        rating: true
                    }
                }
            },
        });
        return NextResponse.json(products);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await getSession();
        if (!session || session.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        console.log("Creating product with body:", body);
        const { name, slug, description, price, salePrice, stock, categoryId, images, shippingCost, taxRate, variants } = body;

        // --- VALIDATION ---

        if (!name || !slug || !price || !categoryId) {
            return NextResponse.json({ error: 'Missing required fields (name, slug, price, categoryId)' }, { status: 400 });
        }

        // Validate Price
        const priceFloat = parseFloat(String(price));
        if (isNaN(priceFloat)) {
            return NextResponse.json({ error: 'Invalid Price' }, { status: 400 });
        }

        // Validate Sale Price
        let salePriceFloat: number | null = null;
        if (salePrice && String(salePrice).trim() !== '') {
            salePriceFloat = parseFloat(String(salePrice));
            if (isNaN(salePriceFloat)) {
                return NextResponse.json({ error: 'Invalid Sale Price' }, { status: 400 });
            }
        }

        // Validate Stock
        const stockInt = stock ? parseInt(String(stock)) : 0;
        if (isNaN(stockInt)) {
            return NextResponse.json({ error: 'Invalid Stock' }, { status: 400 });
        }

        // Validate Shipping & Tax
        const shippingCostFloat = shippingCost ? parseFloat(String(shippingCost)) : 0;
        const taxRateFloat = taxRate ? parseFloat(String(taxRate)) : 0;

        // Check if Category exists
        const categoryExists = await prisma.category.findUnique({ where: { id: categoryId } });
        if (!categoryExists) {
            return NextResponse.json({ error: 'Invalid Category ID' }, { status: 400 });
        }

        // Check if Slug exists
        const slugExists = await prisma.product.findUnique({ where: { slug } });
        if (slugExists) {
            return NextResponse.json({ error: 'Product with this slug already exists' }, { status: 400 });
        }

        const product = await prisma.product.create({
            data: {
                name,
                slug,
                description: description || '',
                price: priceFloat,
                salePrice: salePriceFloat,
                stock: stockInt,
                categoryId,
                images: typeof images === 'string' ? images : JSON.stringify(images || []),
                shippingCost: shippingCostFloat,
                taxRate: taxRateFloat,
                variants: {
                    create: Array.isArray(variants) ? variants.map((v: any) => ({
                        name: v.name,
                        price: v.price ? parseFloat(v.price) : null,
                        stock: v.stock ? parseInt(v.stock) : 0
                    })) : []
                }
            }
        });

        return NextResponse.json(product);
    } catch (error) {
        console.error("Product creation error:", error);
        if (error instanceof Error) {
            return NextResponse.json({ error: `Failed to create product: ${error.message}` }, { status: 500 });
        }
        return NextResponse.json({ error: 'Failed to create product: Unknown error' }, { status: 500 });
    }
}

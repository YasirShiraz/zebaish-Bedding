import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

// GET all reviews (Admin only)
export async function GET(request: Request) {
    try {
        // In a real app, verify admin session here
        // const session = await getSession();
        // if (session?.role !== 'ADMIN') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const reviews = await prisma.review.findMany({
            include: {
                user: {
                    select: { name: true, email: true, image: true }
                },
                product: {
                    select: { name: true, slug: true, images: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(reviews);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
    }
}

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    try {
        const session = await getSession() as any;
        console.log("POST Review - Session:", JSON.stringify(session, null, 2));

        // JWT payload structure from login/route.ts is { userId, email, role }
        // or potentially { user: { ... } } if signed differently elsewhere.
        // We check for both for robustness.

        // JWT payload structure has 'id', 'email', 'role'
        const userId = session?.id || session?.userId || session?.user?.id;

        if (!session || !userId) {
            console.log("POST Review - Unauthorized: Missing session or user ID");
            return NextResponse.json({
                error: 'Unauthorized',
                debug: {
                    sessionFound: !!session,
                    hasUserId: !!userId,
                    sessionKeys: session ? Object.keys(session) : []
                }
            }, { status: 401 });
        }

        const body = await request.json();
        const { productId, rating, comment } = body;

        if (!productId || !rating) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const review = await prisma.review.create({
            data: {
                rating: parseInt(rating),
                comment,
                productId,
                userId: userId,
            },
            include: {
                user: {
                    select: {
                        name: true,
                        image: true
                    }
                }
            }
        });

        // Update product average rating?
        // Ideally we can compute this on read-time or update a cached field. 
        // For now, read-time calculation in product fetch is fine as implemented.

        return NextResponse.json(review);
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error stack:", error.stack);
            return NextResponse.json({ error: `Failed to create review: ${error.message}` }, { status: 500 });
        }
        return NextResponse.json({ error: 'Failed to create review: Unknown error' }, { status: 500 });
    }
}

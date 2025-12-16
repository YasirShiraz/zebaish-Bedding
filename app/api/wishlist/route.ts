import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyJWT } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET(req: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token");

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const payload = await verifyJWT(token.value);
        if (!payload || !payload.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const wishlist = await prisma.wishlist.findMany({
            where: { userId: payload.id as string },
            include: { product: true },
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json(wishlist);
    } catch (error) {
        console.error("Wishlist fetch error:", error);
        return NextResponse.json({ error: "Failed to fetch wishlist" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token");

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const payload = await verifyJWT(token.value);
        if (!payload || !payload.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { productId } = await req.json();

        if (!productId) {
            return NextResponse.json({ error: "ProductId required" }, { status: 400 });
        }

        const item = await prisma.wishlist.create({
            data: {
                userId: payload.id as string,
                productId,
            },
            include: { product: true } // Return product data for UI if needed
        });

        return NextResponse.json(item);
    } catch (error: any) {
        if (error.code === 'P2002') { // Unique constraint
            return NextResponse.json({ message: "Already in wishlist" }, { status: 200 });
        }
        console.error("Wishlist add error:", error);
        return NextResponse.json({ error: "Failed to add to wishlist" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token");

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const payload = await verifyJWT(token.value);
        if (!payload || !payload.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const productId = searchParams.get('productId');

        if (!productId) {
            return NextResponse.json({ error: "ProductId required" }, { status: 400 });
        }

        await prisma.wishlist.delete({
            where: {
                userId_productId: {
                    userId: payload.id as string,
                    productId
                }
            }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Wishlist delete error:", error);
        return NextResponse.json({ error: "Failed to remove from wishlist" }, { status: 500 });
    }
}

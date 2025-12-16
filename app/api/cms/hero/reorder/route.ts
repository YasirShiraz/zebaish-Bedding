import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getSession } from "@/lib/auth";

const prisma = new PrismaClient();

export async function PUT(req: NextRequest) {
    try {
        const session = await getSession();
        if (!session || (session as any).role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { slides } = body; // Expecting array of { id: string, order: number }

        if (!Array.isArray(slides)) {
            return NextResponse.json({ error: "Invalid data format" }, { status: 400 });
        }

        // Transaction to ensure all updates happen or none
        await prisma.$transaction(
            slides.map((slide) =>
                prisma.heroSlide.update({
                    where: { id: slide.id },
                    data: { order: slide.order },
                })
            )
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Reorder error:", error);
        return NextResponse.json({ error: "Failed to reorder slides" }, { status: 500 });
    }
}

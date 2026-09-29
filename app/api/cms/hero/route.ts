import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getSession } from "@/lib/auth";

const prisma = new PrismaClient();

// GET: Fetch all active slides
export async function GET() {
    try {
        const slides = await prisma.heroSlide.findMany({
            where: { isActive: true },
            orderBy: { order: "asc" },
        });
        return NextResponse.json(slides);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch slides" }, { status: 500 });
    }
}

// POST: Create a new slide (Admin only)
export async function POST(req: NextRequest) {
    try {
        const session = await getSession();
        if (!session || (session as any).role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { title, description, image, link, cta } = body;

        const count = await prisma.heroSlide.count();

        const newSlide = await prisma.heroSlide.create({
            data: {
                title,
                description,
                image,
                link,
                cta,
                order: count,
            },
        });

        return NextResponse.json(newSlide);
    } catch (error) {
        return NextResponse.json({ error: "Failed to create slide" }, { status: 500 });
    }
}

// PUT: Update slide details
export async function PUT(req: NextRequest) {
    try {
        const session = await getSession();
        if (!session || (session as any).role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { id, ...data } = body;

        const updatedSlide = await prisma.heroSlide.update({
            where: { id },
            data,
        });

        return NextResponse.json(updatedSlide);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update slide" }, { status: 500 });
    }
}

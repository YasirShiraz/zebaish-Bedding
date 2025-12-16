import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getSession } from "@/lib/auth";

const prisma = new PrismaClient();

// Use context.params and await it as required in Next.js 15
export async function GET(
    request: NextRequest,
    context: { params: Promise<{ section: string }> } // Type params as a Promise
) {
    const { section } = await context.params; // Await params

    try {
        const content = await prisma.homePageContent.findUnique({
            where: { sectionId: section },
        });

        if (!content) {
            return NextResponse.json({ error: "Section not found" }, { status: 404 });
        }

        return NextResponse.json(JSON.parse(content.content));
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 });
    }
}

export async function PUT(
    request: NextRequest,
    context: { params: Promise<{ section: string }> } // Type params as a Promise
) {
    const session = await getSession();
    if (!session || (session as any).role !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { section } = await context.params; // Await params

    try {
        const body = await request.json();

        const updatedContent = await prisma.homePageContent.upsert({
            where: { sectionId: section },
            update: {
                content: JSON.stringify(body),
            },
            create: {
                sectionId: section,
                content: JSON.stringify(body),
            },
        });

        return NextResponse.json(JSON.parse(updatedContent.content));
    } catch (error) {
        return NextResponse.json({ error: "Failed to update content" }, { status: 500 });
    }
}

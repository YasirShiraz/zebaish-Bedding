import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getSession } from "@/lib/auth";

const prisma = new PrismaClient();

// GET: Fetch all settings
export async function GET() {
    try {
        const settings = await prisma.siteSetting.findMany();
        // Reduce array to object { key: value } for easier frontend consumption
        const settingsMap = settings.reduce((acc: Record<string, string>, curr) => {
            acc[curr.key] = curr.value;
            return acc;
        }, {} as Record<string, string>);

        return NextResponse.json(settingsMap);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
    }
}

// POST: Update settings (Bulk update)
export async function POST(req: NextRequest) {
    try {
        const session = await getSession();
        if (!session || (session as any).role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const updates = Object.entries(body);

        // Using transaction to ensure all updates succeed or fail together
        await prisma.$transaction(
            updates.map(([key, value]) =>
                prisma.siteSetting.upsert({
                    where: { key },
                    update: { value: String(value) },
                    create: { key, value: String(value) },
                })
            )
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
    }
}

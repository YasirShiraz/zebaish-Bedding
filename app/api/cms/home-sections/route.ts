import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const DEFAULT_SECTIONS = [
  {
    id: "bridal",
    title: "Bridal Bedding",
    category: "bridal-bedding",
    limit: 8,
    enabled: true,
  },
  {
    id: "kitchen",
    title: "Home & Kitchen",
    category: "mats",
    limit: 8,
    enabled: true,
  },
  {
    id: "beauty",
    title: "Towels & Bath Shawls",
    category: "towels",
    limit: 8,
    enabled: true,
  },
];

export async function GET() {
  try {
    const keys = ["home_section_1", "home_section_2", "home_section_3"];
    const settings = await prisma.siteSetting.findMany({
      where: { key: { in: keys } },
    });

    const sections = DEFAULT_SECTIONS.map((def, index) => {
      const setting = settings.find((s) => s.key === `home_section_${index + 1}`);
      if (!setting) return def;
      try {
        const parsed = JSON.parse(setting.value || "{}");
        return {
          ...def,
          ...parsed,
          id: def.id, // id stable rakhein
        };
      } catch {
        return def;
      }
    });

    return NextResponse.json(sections);
  } catch (error) {
    console.error("GET /api/cms/home-sections error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch home sections",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || (session as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const incoming = Array.isArray(body) ? body : [];

    // Normalize to exactly 3 sections by merging with defaults
    const sections = DEFAULT_SECTIONS.map((def, index) => ({
      ...def,
      ...(incoming[index] || {}),
    }));

    await prisma.$transaction(
      sections.map((section, index) =>
        prisma.siteSetting.upsert({
          where: { key: `home_section_${index + 1}` },
          update: { value: JSON.stringify(section) },
          create: {
            key: `home_section_${index + 1}`,
            value: JSON.stringify(section),
          },
        })
      )
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("POST /api/cms/home-sections error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to update home sections",
      },
      { status: 500 }
    );
  }
}



import { auth } from "@/utils/auth";
import db from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const result = await auth(request);

    if (!result || !result.decodedToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await db.employees.findMany({
      where: { inTrash: true },
      include: {
        position: { select: { name: true } },
        department: { select: { name: true } },
      },
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("GET /api/trash error:", error);

    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
};

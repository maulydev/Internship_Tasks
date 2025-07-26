import { auth } from "@/utils/auth";
import db from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (request: NextRequest) => {
  try {
    const result = await auth(request);

    if (!result || !result.decodedToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const restored = await db.employees.updateMany({
      where: { inTrash: true },
      data: { inTrash: false },
    });

    return NextResponse.json(
      { message: "All trashed employees restored", count: restored.count },
      { status: 200 }
    );
  } catch (error) {
    console.error("PATCH /api/trash/restore-all error:", error);

    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
};

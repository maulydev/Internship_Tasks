import { auth } from "@/utils/auth";
import db from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (request: NextRequest) => {
  try {
    const result = await auth(request);

    if (!result || !result.decodedToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const deleted = await db.employees.deleteMany({
      where: { inTrash: true },
    });

    return NextResponse.json(
      { message: "All trashed employees permanently deleted", count: deleted.count },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE /api/trash/delete-all error:", error);

    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
};

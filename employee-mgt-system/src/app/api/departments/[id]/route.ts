import { auth } from "@/utils/auth";
import db from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const result = await auth(request);

    if (!result || !result.decodedToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { name } = body;

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const updated = await db.department.update({
      where: { id: Number(id) },
      data: { name },
    });

    if (!updated) {
      return NextResponse.json(
        { error: "Department not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Department updated successfully", data: updated },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("PATCH error:", error);
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
};
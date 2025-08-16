import { auth } from "@/utils/auth";
import db from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const result = await auth(request);

    if (!result || !result.decodedToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;


    const associatedEmployees = await db.employees.findFirst({
      where: { departmentId: Number(id) },
    });

    if (associatedEmployees) {
      return NextResponse.json(
        {
          error:
            "Cannot delete department. It is associated with existing employee records.",
        },
        { status: 400 }
      );
    }

    const deleted = await db.department.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(
      { message: "Department deleted successfully", data: deleted },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("DELETE error:", error);

    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Department not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
};

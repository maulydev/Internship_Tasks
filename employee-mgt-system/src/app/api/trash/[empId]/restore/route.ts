import { auth } from "@/utils/auth";
import db from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (
  request: NextRequest,
  { params }: { params: Promise<{ empId: string }> }
) => {
  try {
    const result = await auth(request);

    if (!result || !result.decodedToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const empId = (await params).empId;

    const employee = await db.employees.findUnique({
      where: { empId },
    });

    if (!employee) {
      return NextResponse.json({ error: "Employee not found" }, { status: 404 });
    }

    if (!employee.inTrash) {
      return NextResponse.json({ error: "Employee is not in trash" }, { status: 400 });
    }

    const updatedEmployee = await db.employees.update({
      where: { empId },
      data: {
        inTrash: false,
      },
    });

    return NextResponse.json(updatedEmployee, { status: 200 });
  } catch (error) {
    console.error("PATCH /api/trash/restore/[empId] error:", error);

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
};

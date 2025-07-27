import { auth } from "@/utils/auth";
import db from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ empId: string }> }
) => {
  try {
    const result = await auth(request);

    if (!result || !result.decodedToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const empId = (await params).empId;

    
    const meta = { name: true, id: true }
    const employee = await db.employees.findUnique({
      where: { empId },
      include: {
        position: { select: meta },
        department: { select: meta },
      },
    });

    if (!employee) {
      return NextResponse.json(
        { error: "Employee not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(employee, { status: 200 });
  } catch (error) {
    console.error("GET /api/employees/[empId] error:", error);

    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
};

export const PUT = async (
  request: NextRequest,
  { params }: { params: { empId: string } }
) => {
  try {
    const result = await auth(request);

    if (!result || !result.decodedToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const empId = params.empId;
    const body = await request.json();

    const dateTime = new Date(body.joinedDate);

    const updatedEmployee = await db.employees.update({
      where: { empId },
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        phone: body.phone,
        email: body.email,
        salary: body.salary,
        status: body.status,
        joinedDate: dateTime,
        positionId: body.positionId,
        departmentId: body.departmentId,
      },
    });

    return NextResponse.json(updatedEmployee, { status: 200 });
  } catch (error) {
    console.error("PUT /api/employees/[empId] error:", error);

    return NextResponse.json({ error: error }, { status: 500 });
  }
};

const moveToTrashSchema = z.object({
  inTrash: z.boolean(),
});

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
    const body = await request.json();

    const parsedData = moveToTrashSchema.safeParse(body);

    if (!parsedData.success) {
      return NextResponse.json(
        { error: parsedData.error.flatten() },
        { status: 400 }
      );
    }

    const updatedEmployee = await db.employees.update({
      where: { empId },
      data: {
        inTrash: body.inTrash,
      },
    });

    return NextResponse.json(updatedEmployee, { status: 200 });
  } catch (error) {
    console.error("PUT /api/employees/[empId] error:", error);

    return NextResponse.json({ error: error }, { status: 500 });
  }
};

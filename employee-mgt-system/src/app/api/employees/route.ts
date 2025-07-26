import { auth } from "@/utils/auth";
import { generateEmployeeId } from "@/utils/empId";
import db from "@/utils/prisma";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const result = await auth(request);

    if (!result || !result.decodedToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await db.employees.findMany({
      where: { inTrash: false },
      include: {
        position: { select: { name: true } },
        department: { select: { name: true } },
      },
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("GET /api/employees error:", error);

    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const result = await auth(request);

    if (!result || !result.decodedToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const requiredFields = [
      "firstName",
      "lastName",
      "phone",
      "email",
      "salary",
      "joinedDate",
      "position",
    ];
    const missingFields = requiredFields.filter((field) => !body[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required field(s): ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    const empId = await generateEmployeeId();
    const dateTime = new Date(body.joinedDate);

    const data: any = {
      empId,
      firstName: body.firstName,
      lastName: body.lastName,
      phone: body.phone,
      email: body.email,
      salary: body.salary,
      joinedDate: dateTime,
      positionId: Number(body.position),
    };

    if (body.department) {
      const departmentId = Number(body.department);
      if (!isNaN(departmentId)) data.departmentId = departmentId;
    }

    const newEmployee = await db.employees.create({ data });

    return NextResponse.json(
      { message: "Employee has been successfully added!", newEmployee },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Employee creation error:", error);

    if (error instanceof Prisma.PrismaClientValidationError) {
      return NextResponse.json(
        {
          error: "Validation error: Please check your input fields.",
          details: error.message,
        },
        { status: 400 }
      );
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        const target = error.meta?.target as string[] | undefined;
        const fields = target?.join(", ") || "unknown field";

        return NextResponse.json(
          { error: `Duplicate value for unique field: ${fields}` },
          { status: 409 }
        );
      }
    }

    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
};

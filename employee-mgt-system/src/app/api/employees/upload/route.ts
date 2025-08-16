import { NextRequest, NextResponse } from "next/server";
import { parse } from "csv-parse/sync";
import db from "@/utils/prisma";
import { generateEmployeeIdsBulk } from "@/utils/empId";
import { auth } from "@/utils/auth";

type RawEmployee = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  salary: string;
  joinedDate: string;
  position: string;
  department?: string;
};

export async function POST(request: NextRequest) {
  const result = await auth(request);

  if (!result || !result.decodedToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "File not provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const records = parse(buffer, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    }) as RawEmployee[];

    if (records.length === 0) {
      return NextResponse.json(
        { message: "CSV file is empty" },
        { status: 400 }
      );
    }

    const [positions, departments] = await Promise.all([
      db.position.findMany(),
      db.department.findMany(),
    ]);

    const positionMap = new Map(positions.map((p) => [p.name, p.id]));
    const departmentMap = new Map(departments.map((d) => [d.name, d.id]));

    const requiredFields: (keyof RawEmployee)[] = [
      "firstName",
      "lastName",
      "phone",
      "email",
      "salary",
      "joinedDate",
      "position",
    ];

    const validRecords: RawEmployee[] = [];
    const skippedRecords: { record: RawEmployee; reason: string }[] = [];

    for (const record of records) {
      const missing = requiredFields.filter((field) => !record[field]);
      if (missing.length > 0) {
        skippedRecords.push({ record, reason: `Missing fields: ${missing.join(", ")}` });
        continue;
      }

      if (!positionMap.has(record.position)) {
        skippedRecords.push({ record, reason: `Invalid position: ${record.position}` });
        continue;
      }

      if (record.department && !departmentMap.has(record.department)) {
        skippedRecords.push({ record, reason: `Invalid department: ${record.department}` });
        continue;
      }

      const existing = await db.employees.findFirst({
        where: {
          OR: [{ email: record.email }, { phone: record.phone }],
        },
      });

      if (existing) {
        skippedRecords.push({ record, reason: "Duplicate email or phone" });
        continue;
      }

      validRecords.push(record);
    }

    if (validRecords.length === 0) {
      return NextResponse.json({
        message: "No valid records to insert",
        skipped: skippedRecords,
      }, { status: 422 });
    }

    const empIds = await generateEmployeeIdsBulk(validRecords.length);

    const employeesToInsert = validRecords.map((record, index) => ({
      empId: empIds[index],
      firstName: record.firstName,
      lastName: record.lastName,
      phone: record.phone,
      email: record.email,
      salary: record.salary,
      joinedDate: new Date(record.joinedDate),
      positionId: positionMap.get(record.position)!,
      departmentId: record.department
        ? departmentMap.get(record.department)
        : undefined,
    }));

    await db.employees.createMany({
      data: employeesToInsert,
      skipDuplicates: true,
    });

    return NextResponse.json({
      message: `Upload successful. ${employeesToInsert.length} records inserted, ${skippedRecords.length} records skipped.`,
      inserted: employeesToInsert.length,
      skipped: skippedRecords.length,
      skippedRecords,
    });
  } catch (error: any) {
    console.error("CSV Upload Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


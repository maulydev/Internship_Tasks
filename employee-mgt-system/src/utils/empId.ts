import db from "@/utils/prisma";

export const generateEmployeeId = async (): Promise<string> => {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = String(now.getMonth() + 1).padStart(2, "0");

  const count = await db.employees.count();

  const serial = count + 1;
  const serialStr = String(serial).padStart(3, "0");

  return `${year}${month}${serialStr}`;
};

export const generateEmployeeIdsBulk = async (
  countToGenerate: number
): Promise<string[]> => {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = String(now.getMonth() + 1).padStart(2, "0");

  const currentCount = await db.employees.count();
  const ids: string[] = [];

  for (let i = 1; i <= countToGenerate; i++) {
    const serial = currentCount + i;
    const serialStr = String(serial).padStart(3, "0");
    ids.push(`${year}${month}${serialStr}`);
  }

  return ids;
};

export async function getLastEmpId() {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = String(now.getMonth() + 1).padStart(2, "0");

  const lastEmp = await db.employees.findFirst({
    orderBy: { empId: "desc" },
  });

  return lastEmp ? parseInt(lastEmp.empId) : `${year}${month}000`;
}

import db from "@/utils/prisma";

export const generateEmployeeId = async (): Promise<string> => {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = String(now.getMonth() + 1).padStart(2, "0");

  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  // Count how many employees joined this month
  const count = await db.employees.count({
    where: {
      joinedDate: {
        gte: startOfMonth,
        lte: endOfMonth,
      },
    },
  });

  const serial = count + 1;
  const serialStr = String(serial).padStart(3, "0");

  return `${year}${month}${serialStr}`;
};

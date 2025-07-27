import { PrismaClient } from "@prisma/client";
import { generateEmployeeId } from "@/utils/empId"; // Make sure this is path-resolvable

const db = new PrismaClient();

const departments = [
  "Finance",
  "Human Resources",
  "Engineering",
  "Sales and Marketing",
  "Public Relations",
  "Legal Affairs",
  "Operations",
  "IT Services",
  "Transport & Logistics",
  "Education and Training",
];

const positions = [
  "Accountant",
  "HR Officer",
  "Software Engineer",
  "Sales Executive",
  "Communications Officer",
  "Legal Advisor",
  "Operations Manager",
  "IT Support",
  "Logistics Coordinator",
  "Training Facilitator",
];

const ghanaianFirstNames = [
  "Kwame", "Ama", "Yaw", "Akosua", "Kojo", "Afia", "Kwaku", "Abena", "Esi",
  "Nana", "Adwoa", "Kwabena", "Kofi", "Ebo", "Araba", "Fiifi", "Yawson",
];

const ghanaianLastNames = [
  "Mensah", "Owusu", "Appiah", "Boateng", "Asante", "Osei", "Amponsah",
  "Sarpong", "Acheampong", "Annan", "Agyeman", "Addo", "Baidoo", "Darko",
];

const generateRandomPhone = (): string => {
  const prefix = ["024", "054", "020", "026", "027", "050"][
    Math.floor(Math.random() * 6)
  ];
  const suffix = Math.floor(1000000 + Math.random() * 8999999).toString();
  return `${prefix}${suffix}`;
};

const randomItem = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

async function main() {
  console.log("🌱 Seeding database...");

  // Clear tables in correct order due to FK constraints
  await db.employees.deleteMany();
  await db.department.deleteMany();
  await db.position.deleteMany();

  console.log("🧹 Cleared existing records.");

  const createdDepartments = await Promise.all(
    departments.map((name) => db.department.create({ data: { name } }))
  );

  const createdPositions = await Promise.all(
    positions.map((name) => db.position.create({ data: { name } }))
  );

  const totalEmployees = 30;

  for (let i = 0; i < totalEmployees; i++) {
    const firstName = randomItem(ghanaianFirstNames);
    const lastName = randomItem(ghanaianLastNames);
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@example.com`;
    const phone = generateRandomPhone();
    const empId = await generateEmployeeId();
    const department = randomItem(createdDepartments);
    const position = randomItem(createdPositions);
    const salary = (1000 + Math.floor(Math.random() * 4000)).toString();

    await db.employees.create({
      data: {
        empId,
        email,
        firstName,
        lastName,
        phone,
        salary,
        departmentId: department.id,
        positionId: position.id,
        status: "ACTIVE",
        inTrash: false,
      },
    });
  }

  console.log(`✅ Seeded ${totalEmployees} employees.`);
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
    console.log("🔌 Database connection closed.");
  });

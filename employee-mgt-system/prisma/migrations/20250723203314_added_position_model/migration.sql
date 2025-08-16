-- DropForeignKey
ALTER TABLE "Employees" DROP CONSTRAINT "Employees_positionId_fkey";

-- AlterTable
ALTER TABLE "Employees" ALTER COLUMN "positionId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Employees" ADD CONSTRAINT "Employees_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "Position"("id") ON DELETE SET NULL ON UPDATE CASCADE;

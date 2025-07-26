/*
  Warnings:

  - Made the column `positionId` on table `Employees` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Employees" DROP CONSTRAINT "Employees_positionId_fkey";

-- AlterTable
ALTER TABLE "Employees" ALTER COLUMN "positionId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Employees" ADD CONSTRAINT "Employees_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "Position"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

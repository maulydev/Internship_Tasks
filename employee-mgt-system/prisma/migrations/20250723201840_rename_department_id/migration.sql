/*
  Warnings:

  - The values [Active,Inactive] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `deprtmentId` on the `Employees` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('ACTIVE', 'INACTIVE');
ALTER TABLE "Employees" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Employees" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
ALTER TABLE "Employees" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';
COMMIT;

-- DropForeignKey
ALTER TABLE "Employees" DROP CONSTRAINT "Employees_deprtmentId_fkey";

-- AlterTable
ALTER TABLE "Employees" DROP COLUMN "deprtmentId",
ADD COLUMN     "departmentId" INTEGER,
ALTER COLUMN "status" SET DEFAULT 'ACTIVE';

-- AddForeignKey
ALTER TABLE "Employees" ADD CONSTRAINT "Employees_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `position` on the `Employees` table. All the data in the column will be lost.
  - Added the required column `positionId` to the `Employees` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Employees" DROP COLUMN "position",
ADD COLUMN     "positionId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Position" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Position_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Employees" ADD CONSTRAINT "Employees_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "Position"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

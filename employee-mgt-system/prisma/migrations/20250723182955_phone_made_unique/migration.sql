/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `Employees` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Employees_phone_key" ON "Employees"("phone");

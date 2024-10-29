/*
  Warnings:

  - A unique constraint covering the columns `[taskName]` on the table `Task` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Task_taskName_key" ON "Task"("taskName");

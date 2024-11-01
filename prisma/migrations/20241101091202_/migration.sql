/*
  Warnings:

  - A unique constraint covering the columns `[userId,taskName]` on the table `task` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "task_userId_taskName_key" ON "task"("userId", "taskName");

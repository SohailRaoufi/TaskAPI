-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "due_date" DROP NOT NULL,
ALTER COLUMN "due_date" SET DATA TYPE TIMESTAMP(3);

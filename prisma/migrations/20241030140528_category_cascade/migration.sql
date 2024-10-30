-- DropForeignKey
ALTER TABLE "task" DROP CONSTRAINT "task_category_id_fkey";

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

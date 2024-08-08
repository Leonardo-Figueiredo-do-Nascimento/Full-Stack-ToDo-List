/*
  Warnings:

  - You are about to drop the column `limit_date` on the `tasks_tb` table. All the data in the column will be lost.
  - Added the required column `deadline` to the `tasks_tb` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tasks_tb" DROP COLUMN "limit_date",
ADD COLUMN     "deadline" TIMESTAMP(3) NOT NULL;

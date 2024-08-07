-- CreateTable
CREATE TABLE "tasks_tb" (
    "task_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "limit_date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tasks_tb_pkey" PRIMARY KEY ("task_id")
);

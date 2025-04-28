/*
  Warnings:

  - You are about to drop the `PurrmptCounter` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "PurrmptCounter";

-- CreateTable
CREATE TABLE "GlobalCounter" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "GlobalCounter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyCounter" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "DailyCounter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DailyCounter_date_key" ON "DailyCounter"("date");

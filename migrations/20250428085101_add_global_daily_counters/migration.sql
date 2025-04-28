/*
  Warnings:

  - You are about to drop the `DailyCounter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GlobalCounter` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "DailyCounter";

-- DropTable
DROP TABLE "GlobalCounter";

-- CreateTable
CREATE TABLE "globalCounter" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "globalCounter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dailyCounter" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "dailyCounter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "dailyCounter_date_key" ON "dailyCounter"("date");

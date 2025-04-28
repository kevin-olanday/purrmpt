-- CreateTable
CREATE TABLE "PurrmptCounter" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "PurrmptCounter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PurrmptCounter_date_key" ON "PurrmptCounter"("date");

-- CreateTable
CREATE TABLE "PurrmptCounter" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0
);

-- CreateIndex
CREATE UNIQUE INDEX "PurrmptCounter_date_key" ON "PurrmptCounter"("date");

/*
  Warnings:

  - A unique constraint covering the columns `[userId,title]` on the table `Shelf` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Shelf_userId_title_key" ON "Shelf"("userId", "title");

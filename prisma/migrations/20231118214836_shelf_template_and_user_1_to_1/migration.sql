/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `shelf_template` will be added. If there are existing duplicate values, this will fail.
  - Made the column `userId` on table `shelf` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "shelf" ALTER COLUMN "userId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "shelf_template_userId_key" ON "shelf_template"("userId");

/*
  Warnings:

  - Made the column `userId` on table `Box` required. This step will fail if there are existing NULL values in that column.
  - Made the column `shelfId` on table `Box` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Box" ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "shelfId" SET NOT NULL;

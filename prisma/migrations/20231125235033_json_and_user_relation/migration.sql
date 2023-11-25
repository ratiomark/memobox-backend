/*
  Warnings:

  - Made the column `userId` on table `json_data_and_settings` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "json_data_and_settings" ALTER COLUMN "userId" SET NOT NULL;

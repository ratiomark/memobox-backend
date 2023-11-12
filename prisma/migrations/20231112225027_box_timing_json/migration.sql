/*
  Warnings:

  - The `timing` column on the `Box` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Box" DROP COLUMN "timing",
ADD COLUMN     "timing" JSONB NOT NULL DEFAULT '{"minutes": 0, "hours": 0,"days": 0,"weeks": 0,"months": 0}';

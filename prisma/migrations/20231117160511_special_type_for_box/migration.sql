-- CreateEnum
CREATE TYPE "BoxSpecialType" AS ENUM ('new', 'none', 'learnt');

-- AlterTable
ALTER TABLE "Box" ADD COLUMN     "specialType" "BoxSpecialType" NOT NULL DEFAULT 'none';

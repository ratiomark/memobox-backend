-- AlterTable
ALTER TABLE "Box" ADD COLUMN     "isDeleted" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "isDeleted" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "shelf" ADD COLUMN     "isDeleted" BOOLEAN DEFAULT false;

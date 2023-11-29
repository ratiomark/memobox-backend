-- AlterTable
ALTER TABLE "Box" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "shelf" ADD COLUMN     "deletedAt" TIMESTAMP(3);

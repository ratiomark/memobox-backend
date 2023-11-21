-- AlterTable
ALTER TABLE "Box" ALTER COLUMN "timing" DROP NOT NULL;

-- AlterTable
ALTER TABLE "shelf" ALTER COLUMN "isCollapsed" SET DEFAULT true;

-- DropIndex
DROP INDEX "push_subscription_userId_key";

-- AlterTable
ALTER TABLE "push_subscription" ADD COLUMN     "browser" TEXT NOT NULL DEFAULT 'unknown',
ADD COLUMN     "osName" TEXT NOT NULL DEFAULT 'unknown';

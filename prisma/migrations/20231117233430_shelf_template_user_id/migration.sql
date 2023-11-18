-- AlterTable
ALTER TABLE "shelf_template" ADD COLUMN     "userId" UUID;

-- AddForeignKey
ALTER TABLE "shelf_template" ADD CONSTRAINT "shelf_template_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

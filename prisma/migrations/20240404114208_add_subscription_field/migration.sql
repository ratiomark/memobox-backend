/*
  Warnings:

  - A unique constraint covering the columns `[endpoint]` on the table `push_subscription` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `endpoint` to the `push_subscription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "push_subscription" ADD COLUMN     "endpoint" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "push_subscription_endpoint_key" ON "push_subscription"("endpoint");

/*
  Warnings:

  - Made the column `settings` on table `time_sleep` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "time_sleep" ALTER COLUMN "settings" SET NOT NULL;

-- CreateTable
CREATE TABLE "notification" (
    "id" SERIAL NOT NULL,
    "settings" JSONB NOT NULL DEFAULT '{"mobilePushEnabled":false,"emailNotificationsEnabled":false,"minimumCardsForPush":15,"minimumCardsForEmailNotification":10,"notificationEmails":[]}',
    "userId" UUID,

    CONSTRAINT "notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "missed_training" (
    "id" SERIAL NOT NULL,
    "settings" "MissedTrainingValue" NOT NULL DEFAULT 'none',
    "userId" UUID,

    CONSTRAINT "missed_training_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "notification_userId_key" ON "notification"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "missed_training_userId_key" ON "missed_training"("userId");

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "missed_training" ADD CONSTRAINT "missed_training_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

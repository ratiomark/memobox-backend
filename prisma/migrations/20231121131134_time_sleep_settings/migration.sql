/*
  Warnings:

  - The primary key for the `shelf_template` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `shelf_template` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "shelf_template" DROP CONSTRAINT "shelf_template_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "shelf_template_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "time_sleep" (
    "id" SERIAL NOT NULL,
    "settings" JSONB DEFAULT '{"isTimeSleepEnabled":true,"isDayByDayOptionEnabled":false,"generalTimeSleepData":{"up":{"hours":7,"minutes":0},"down":{"hours":23,"minutes":0}}}',
    "userId" UUID,

    CONSTRAINT "time_sleep_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "time_sleep_userId_key" ON "time_sleep"("userId");

-- AddForeignKey
ALTER TABLE "time_sleep" ADD CONSTRAINT "time_sleep_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

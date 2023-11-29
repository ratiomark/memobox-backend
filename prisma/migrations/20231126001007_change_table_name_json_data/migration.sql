/*
  Warnings:

  - You are about to drop the `json_data_and_settings` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "json_data_and_settings" DROP CONSTRAINT "json_data_and_settings_userId_fkey";

-- DropTable
DROP TABLE "json_data_and_settings";

-- CreateTable
CREATE TABLE "data_and_settings_json" (
    "id" SERIAL NOT NULL,
    "json_saved_data" JSONB,
    "json_settings" JSONB,
    "userId" UUID NOT NULL,

    CONSTRAINT "data_and_settings_json_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "data_and_settings_json_userId_key" ON "data_and_settings_json"("userId");

-- CreateIndex
CREATE INDEX "data_and_settings_json_userId_idx" ON "data_and_settings_json"("userId");

-- AddForeignKey
ALTER TABLE "data_and_settings_json" ADD CONSTRAINT "data_and_settings_json_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

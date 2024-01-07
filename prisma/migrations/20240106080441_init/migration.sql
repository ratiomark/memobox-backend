-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- CreateEnum
CREATE TYPE "AuthProviders" AS ENUM ('EMAIL', 'FACEBOOK', 'GOOGLE', 'TWITTER', 'APPLE');

-- CreateEnum
CREATE TYPE "MissedTrainingValue" AS ENUM ('none', 'backwards', 'additional');

-- CreateEnum
CREATE TYPE "BoxSpecialType" AS ENUM ('none', 'new', 'learnt');

-- CreateTable
CREATE TABLE "file" (
    "id" TEXT NOT NULL,
    "path" TEXT NOT NULL,

    CONSTRAINT "file_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "forgot" (
    "id" SERIAL NOT NULL,
    "hash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "userId" UUID,

    CONSTRAINT "forgot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Migrations" (
    "id" SERIAL NOT NULL,
    "timestamp" BIGINT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Migrations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "userId" UUID,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "status" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" TEXT,
    "password" TEXT NOT NULL,
    "provider" "AuthProviders" NOT NULL DEFAULT 'EMAIL',
    "socialId" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "hash" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "photoId" TEXT,
    "roleId" INTEGER,
    "statusId" INTEGER,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shelf" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "index" INTEGER NOT NULL,
    "isCollapsed" BOOLEAN NOT NULL DEFAULT true,
    "missedTrainingValue" "MissedTrainingValue" DEFAULT 'none',
    "isDeleted" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "userId" UUID NOT NULL,

    CONSTRAINT "shelf_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "box" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "index" INTEGER NOT NULL,
    "timing" JSONB DEFAULT '{"minutes": 5, "hours": 0,"days": 0,"weeks": 0,"months": 0}',
    "specialType" "BoxSpecialType" NOT NULL DEFAULT 'none',
    "missedTrainingValue" "MissedTrainingValue" DEFAULT 'none',
    "isDeleted" BOOLEAN DEFAULT false,
    "deletedAt" TIMESTAMP(3),
    "userId" UUID NOT NULL,
    "shelfId" UUID NOT NULL,

    CONSTRAINT "box_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "card" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "question" TEXT,
    "answer" TEXT,
    "lastTraining" TIMESTAMP(3),
    "nextTraining" TIMESTAMP(3),
    "isDeleted" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "userId" UUID NOT NULL,
    "shelfId" UUID NOT NULL,
    "boxId" UUID NOT NULL,

    CONSTRAINT "card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shelf_template" (
    "id" SERIAL NOT NULL,
    "template" JSONB NOT NULL DEFAULT '[{"minutes":5,"hours":0,"days":0,"weeks":0,"months":0},{"minutes":0,"hours":8,"days":0,"weeks":0,"months":0},{"minutes":0,"hours":0,"days":1,"weeks":0,"months":0},{"minutes":0,"hours":0,"days":3,"weeks":0,"months":0},{"minutes":0,"hours":0,"days":14,"weeks":0,"months":0},{"minutes":0,"hours":0,"days":28,"weeks":0,"months":0},{"minutes":0,"hours":0,"days":0,"weeks":3,"months":0},{"minutes":0,"hours":0,"days":2,"weeks":3,"months":1},{"minutes":0,"hours":0,"days":0,"weeks":0,"months":2},{"minutes":0,"hours":0,"days":0,"weeks":4,"months":2}]',
    "userId" UUID,

    CONSTRAINT "shelf_template_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "time_sleep" (
    "id" SERIAL NOT NULL,
    "settings" JSONB NOT NULL DEFAULT '{"isTimeSleepEnabled":true,"isDayByDayOptionEnabled":false,"generalTimeSleepData":{"up":{"hours":7,"minutes":0},"down":{"hours":23,"minutes":0}}}',
    "userId" UUID,

    CONSTRAINT "time_sleep_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "data_and_settings_json" (
    "id" SERIAL NOT NULL,
    "json_saved_data" JSONB,
    "json_settings" JSONB,
    "userId" UUID NOT NULL,

    CONSTRAINT "data_and_settings_json_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "forgot_hash_idx" ON "forgot"("hash");

-- CreateIndex
CREATE INDEX "session_userId_idx" ON "session"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_hash_key" ON "user"("hash");

-- CreateIndex
CREATE INDEX "user_id_idx" ON "user"("id");

-- CreateIndex
CREATE INDEX "user_email_idx" ON "user"("email");

-- CreateIndex
CREATE INDEX "card_userId_idx" ON "card"("userId");

-- CreateIndex
CREATE INDEX "card_shelfId_idx" ON "card"("shelfId");

-- CreateIndex
CREATE INDEX "card_boxId_idx" ON "card"("boxId");

-- CreateIndex
CREATE INDEX "card_nextTraining_idx" ON "card"("nextTraining");

-- CreateIndex
CREATE UNIQUE INDEX "shelf_template_userId_key" ON "shelf_template"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "time_sleep_userId_key" ON "time_sleep"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "notification_userId_key" ON "notification"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "missed_training_userId_key" ON "missed_training"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "data_and_settings_json_userId_key" ON "data_and_settings_json"("userId");

-- CreateIndex
CREATE INDEX "data_and_settings_json_userId_idx" ON "data_and_settings_json"("userId");

-- AddForeignKey
ALTER TABLE "forgot" ADD CONSTRAINT "forgot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES "file"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shelf" ADD CONSTRAINT "shelf_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "box" ADD CONSTRAINT "box_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "box" ADD CONSTRAINT "box_shelfId_fkey" FOREIGN KEY ("shelfId") REFERENCES "shelf"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "card" ADD CONSTRAINT "card_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "card" ADD CONSTRAINT "card_shelfId_fkey" FOREIGN KEY ("shelfId") REFERENCES "shelf"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "card" ADD CONSTRAINT "card_boxId_fkey" FOREIGN KEY ("boxId") REFERENCES "box"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shelf_template" ADD CONSTRAINT "shelf_template_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "time_sleep" ADD CONSTRAINT "time_sleep_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "missed_training" ADD CONSTRAINT "missed_training_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "data_and_settings_json" ADD CONSTRAINT "data_and_settings_json_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

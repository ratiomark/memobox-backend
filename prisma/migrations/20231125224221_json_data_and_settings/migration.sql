-- CreateTable
CREATE TABLE "json_data_and_settings" (
    "id" SERIAL NOT NULL,
    "json_saved_data" JSONB,
    "json_settings" JSONB,
    "userId" UUID,

    CONSTRAINT "json_data_and_settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "json_data_and_settings_userId_key" ON "json_data_and_settings"("userId");

-- CreateIndex
CREATE INDEX "json_data_and_settings_userId_idx" ON "json_data_and_settings"("userId");

-- AddForeignKey
ALTER TABLE "json_data_and_settings" ADD CONSTRAINT "json_data_and_settings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

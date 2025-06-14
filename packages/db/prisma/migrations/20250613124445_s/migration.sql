/*
  Warnings:

  - You are about to drop the `OtpStore` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "OtpStore";

-- CreateTable
CREATE TABLE "otpStore" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "otp" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "otpStore_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "otpStore_email_key" ON "otpStore"("email");

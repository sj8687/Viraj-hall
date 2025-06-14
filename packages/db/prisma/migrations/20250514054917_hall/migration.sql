-- CreateTable
CREATE TABLE "OtpStore" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "otp" TEXT NOT NULL,

    CONSTRAINT "OtpStore_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OtpStore_email_key" ON "OtpStore"("email");

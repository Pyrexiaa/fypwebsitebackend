/*
  Warnings:

  - You are about to drop the column `date` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "date",
DROP COLUMN "name",
ADD COLUMN     "password" TEXT NOT NULL;

-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "Mother" (
    "id" SERIAL NOT NULL,
    "age" DOUBLE PRECISION NOT NULL,
    "height" DOUBLE PRECISION,
    "weight" DOUBLE PRECISION,
    "PreviouslyFailedPregnancy" BOOLEAN,
    "HighRiskPreeclampsia" BOOLEAN,
    "PregnancyInducedHypertension" BOOLEAN,
    "PregestationalLDM" BOOLEAN,
    "GestationalLDM" BOOLEAN,
    "Smoking" BOOLEAN,

    CONSTRAINT "Mother_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Scans" (
    "id" SERIAL NOT NULL,
    "motherId" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,
    "ga" INTEGER NOT NULL,
    "bpd" DOUBLE PRECISION,
    "hc" DOUBLE PRECISION NOT NULL,
    "ac" DOUBLE PRECISION NOT NULL,
    "fl" DOUBLE PRECISION NOT NULL,
    "afi" DOUBLE PRECISION,
    "cpr" DOUBLE PRECISION,
    "psv" DOUBLE PRECISION,
    "efw" DOUBLE PRECISION NOT NULL,
    "ute_ari" DOUBLE PRECISION,
    "ute_api" DOUBLE PRECISION,
    "umb_api" DOUBLE PRECISION,
    "placenta_site" TEXT,
    "af" TEXT,

    CONSTRAINT "Scans_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Scans" ADD CONSTRAINT "Scans_motherId_fkey" FOREIGN KEY ("motherId") REFERENCES "Mother"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

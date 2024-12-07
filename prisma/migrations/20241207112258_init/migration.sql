/*
  Warnings:

  - The `placenta_site` column on the `Scans` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `af` column on the `Scans` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `gender` on the `Scans` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Scans" DROP COLUMN "gender",
ADD COLUMN     "gender" INTEGER NOT NULL,
DROP COLUMN "placenta_site",
ADD COLUMN     "placenta_site" INTEGER,
DROP COLUMN "af",
ADD COLUMN     "af" INTEGER;

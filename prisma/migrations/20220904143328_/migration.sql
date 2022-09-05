/*
  Warnings:

  - Changed the type of `startsAt` on the `Activity` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "startsAt",
ADD COLUMN     "startsAt" INTEGER NOT NULL;

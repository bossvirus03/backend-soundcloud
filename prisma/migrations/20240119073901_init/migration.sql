/*
  Warnings:

  - Changed the type of `trackid` on the `likes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "likes" DROP COLUMN "trackid",
ADD COLUMN     "trackid" INTEGER NOT NULL;

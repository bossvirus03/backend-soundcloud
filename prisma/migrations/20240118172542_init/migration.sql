/*
  Warnings:

  - You are about to drop the column `trackId` on the `likes` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `likes` table. All the data in the column will be lost.
  - Added the required column `trackid` to the `likes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userid` to the `likes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "likes" DROP COLUMN "trackId",
DROP COLUMN "userId",
ADD COLUMN     "trackid" TEXT NOT NULL,
ADD COLUMN     "userid" TEXT NOT NULL;

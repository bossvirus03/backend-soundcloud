/*
  Warnings:

  - You are about to drop the column `track` on the `likes` table. All the data in the column will be lost.
  - You are about to drop the column `user` on the `likes` table. All the data in the column will be lost.
  - Added the required column `trackId` to the `likes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `likes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "likes" DROP COLUMN "track",
DROP COLUMN "user",
ADD COLUMN     "trackId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

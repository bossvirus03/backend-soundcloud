/*
  Warnings:

  - You are about to drop the column `countLike` on the `tracks` table. All the data in the column will be lost.
  - You are about to drop the column `countPlay` on the `tracks` table. All the data in the column will be lost.
  - You are about to drop the column `imgUrl` on the `tracks` table. All the data in the column will be lost.
  - You are about to drop the column `trackUrl` on the `tracks` table. All the data in the column will be lost.
  - Added the required column `imgurl` to the `tracks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trackurl` to the `tracks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tracks" DROP COLUMN "countLike",
DROP COLUMN "countPlay",
DROP COLUMN "imgUrl",
DROP COLUMN "trackUrl",
ADD COLUMN     "countlike" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "countplay" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "imgurl" TEXT NOT NULL,
ADD COLUMN     "trackurl" TEXT NOT NULL;

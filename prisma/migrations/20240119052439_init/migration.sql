/*
  Warnings:

  - You are about to drop the `likes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "likes";

-- CreateTable
CREATE TABLE "tracks" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "imgUrl" TEXT NOT NULL,
    "trackUrl" TEXT NOT NULL,
    "countLike" INTEGER NOT NULL DEFAULT 0,
    "countPlay" INTEGER NOT NULL DEFAULT 0,
    "uploader" TEXT NOT NULL,

    CONSTRAINT "tracks_pkey" PRIMARY KEY ("id")
);

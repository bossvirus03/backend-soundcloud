/*
  Warnings:

  - You are about to drop the `Like` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Like";

-- CreateTable
CREATE TABLE "Likes" (
    "id" SERIAL NOT NULL,
    "user" TEXT NOT NULL,
    "track" TEXT NOT NULL,

    CONSTRAINT "Likes_pkey" PRIMARY KEY ("id")
);

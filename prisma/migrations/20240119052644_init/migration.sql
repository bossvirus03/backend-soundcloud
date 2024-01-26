-- CreateTable
CREATE TABLE "likes" (
    "id" SERIAL NOT NULL,
    "userid" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "trackid" TEXT NOT NULL,

    CONSTRAINT "likes_pkey" PRIMARY KEY ("id")
);

/*
  Warnings:

  - Added the required column `description` to the `tracks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tracks" ADD COLUMN     "description" TEXT NOT NULL;

/*
  Warnings:

  - A unique constraint covering the columns `[circleId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('normal', 'premium');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "circleId" INTEGER,
ADD COLUMN     "type" "UserType" NOT NULL DEFAULT 'normal',
ALTER COLUMN "name" SET NOT NULL;

-- CreateTable
CREATE TABLE "Circle" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "ownerId" INTEGER NOT NULL,

    CONSTRAINT "Circle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Circle_ownerId_key" ON "Circle"("ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "User_circleId_key" ON "User"("circleId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_circleId_fkey" FOREIGN KEY ("circleId") REFERENCES "Circle"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Circle" ADD CONSTRAINT "Circle_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

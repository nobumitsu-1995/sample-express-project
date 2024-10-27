-- AlterTable
ALTER TABLE "Circle" ADD CONSTRAINT "Circle_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "BlackList" (
    "id" TEXT NOT NULL,
    "circleId" TEXT NOT NULL,

    CONSTRAINT "BlackList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserBlackList" (
    "userId" TEXT NOT NULL,
    "blackListId" TEXT NOT NULL,

    CONSTRAINT "UserBlackList_pkey" PRIMARY KEY ("userId","blackListId")
);

-- CreateTable
CREATE TABLE "_UserBlackLists" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "BlackList_id_key" ON "BlackList"("id");

-- CreateIndex
CREATE UNIQUE INDEX "BlackList_circleId_key" ON "BlackList"("circleId");

-- CreateIndex
CREATE UNIQUE INDEX "_UserBlackLists_AB_unique" ON "_UserBlackLists"("A", "B");

-- CreateIndex
CREATE INDEX "_UserBlackLists_B_index" ON "_UserBlackLists"("B");

-- AddForeignKey
ALTER TABLE "BlackList" ADD CONSTRAINT "BlackList_circleId_fkey" FOREIGN KEY ("circleId") REFERENCES "Circle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBlackList" ADD CONSTRAINT "UserBlackList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBlackList" ADD CONSTRAINT "UserBlackList_blackListId_fkey" FOREIGN KEY ("blackListId") REFERENCES "BlackList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserBlackLists" ADD CONSTRAINT "_UserBlackLists_A_fkey" FOREIGN KEY ("A") REFERENCES "BlackList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserBlackLists" ADD CONSTRAINT "_UserBlackLists_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - A unique constraint covering the columns `[userHandle]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userHandle` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "authorId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "userHandle" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userHandle_key" ON "Profile"("userHandle");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

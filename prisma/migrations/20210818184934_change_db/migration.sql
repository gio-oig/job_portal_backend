/*
  Warnings:

  - You are about to drop the `CompanyImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `companies` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `seeker_profiles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_accounts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "companies" DROP CONSTRAINT "companies_user_account_id_fkey";

-- DropForeignKey
ALTER TABLE "seeker_profiles" DROP CONSTRAINT "seeker_profiles_user_account_id_fkey";

-- DropTable
DROP TABLE "CompanyImage";

-- DropTable
DROP TABLE "companies";

-- DropTable
DROP TABLE "seeker_profiles";

-- DropTable
DROP TABLE "user_accounts";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "authorId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Post" ADD FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

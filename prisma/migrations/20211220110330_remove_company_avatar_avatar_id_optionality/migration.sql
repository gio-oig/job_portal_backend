/*
  Warnings:

  - Made the column `avatar` on table `companies` required. This step will fail if there are existing NULL values in that column.
  - Made the column `avatar_id` on table `companies` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "companies" ALTER COLUMN "avatar" SET NOT NULL,
ALTER COLUMN "avatar_id" SET NOT NULL;

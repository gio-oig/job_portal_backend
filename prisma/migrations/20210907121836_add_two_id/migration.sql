/*
  Warnings:

  - The primary key for the `company_followers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `company_followers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "company_followers" DROP CONSTRAINT "company_followers_pkey",
DROP COLUMN "id",
ADD PRIMARY KEY ("company_id", "seeker_id");

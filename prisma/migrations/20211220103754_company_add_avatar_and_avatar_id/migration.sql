/*
  Warnings:

  - Added the required column `avatar` to the `companies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `avatar_id` to the `companies` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "companies" DROP CONSTRAINT "companies_user_account_id_fkey";

-- DropForeignKey
ALTER TABLE "company_followers" DROP CONSTRAINT "company_followers_company_id_fkey";

-- DropForeignKey
ALTER TABLE "company_followers" DROP CONSTRAINT "company_followers_seeker_id_fkey";

-- DropForeignKey
ALTER TABLE "company_images" DROP CONSTRAINT "company_images_company_id_fkey";

-- DropForeignKey
ALTER TABLE "jobs" DROP CONSTRAINT "jobs_category_id_fkey";

-- DropForeignKey
ALTER TABLE "jobs" DROP CONSTRAINT "jobs_creator_id_fkey";

-- DropForeignKey
ALTER TABLE "jobs" DROP CONSTRAINT "jobs_location_id_fkey";

-- DropForeignKey
ALTER TABLE "jobs" DROP CONSTRAINT "jobs_schedule_id_fkey";

-- DropForeignKey
ALTER TABLE "seeker_profiles" DROP CONSTRAINT "seeker_profiles_user_account_id_fkey";

-- AlterTable
ALTER TABLE "companies" ADD COLUMN     "avatar" VARCHAR(255) NOT NULL,
ADD COLUMN     "avatar_id" VARCHAR(100) NOT NULL;

-- AddForeignKey
ALTER TABLE "seeker_profiles" ADD CONSTRAINT "seeker_profiles_user_account_id_fkey" FOREIGN KEY ("user_account_id") REFERENCES "user_accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_user_account_id_fkey" FOREIGN KEY ("user_account_id") REFERENCES "user_accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_followers" ADD CONSTRAINT "company_followers_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_followers" ADD CONSTRAINT "company_followers_seeker_id_fkey" FOREIGN KEY ("seeker_id") REFERENCES "seeker_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_images" ADD CONSTRAINT "company_images_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "job_locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_schedule_id_fkey" FOREIGN KEY ("schedule_id") REFERENCES "job_scedules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "jobs.schedule_id_unique" RENAME TO "jobs_schedule_id_key";

-- RenameIndex
ALTER INDEX "seeker_profiles.user_account_id_unique" RENAME TO "seeker_profiles_user_account_id_key";

-- RenameIndex
ALTER INDEX "user_accounts.email_unique" RENAME TO "user_accounts_email_key";

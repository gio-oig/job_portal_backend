/*
  Warnings:

  - A unique constraint covering the columns `[schedule_id]` on the table `jobs` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `schedule_id` to the `jobs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "jobs" ADD COLUMN     "schedule_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "job_scedules" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_JobTotag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_JobTotag_AB_unique" ON "_JobTotag"("A", "B");

-- CreateIndex
CREATE INDEX "_JobTotag_B_index" ON "_JobTotag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "jobs.schedule_id_unique" ON "jobs"("schedule_id");

-- AddForeignKey
ALTER TABLE "jobs" ADD FOREIGN KEY ("schedule_id") REFERENCES "job_scedules"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JobTotag" ADD FOREIGN KEY ("A") REFERENCES "jobs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JobTotag" ADD FOREIGN KEY ("B") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "seeker_profiles_user_account_id_unique" RENAME TO "seeker_profiles.user_account_id_unique";

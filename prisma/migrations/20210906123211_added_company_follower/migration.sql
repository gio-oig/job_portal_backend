-- CreateTable
CREATE TABLE "company_followers" (
    "id" SERIAL NOT NULL,
    "company_id" INTEGER NOT NULL,
    "seeker_id" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "company_followers" ADD FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_followers" ADD FOREIGN KEY ("seeker_id") REFERENCES "seeker_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `type` on the `JobHistory` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_JobHistory" (
    "jobTitle" TEXT NOT NULL,
    "employer" TEXT NOT NULL,
    "activeJob" BOOLEAN NOT NULL DEFAULT true,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME,
    "salary" REAL NOT NULL,

    PRIMARY KEY ("jobTitle", "employer")
);
INSERT INTO "new_JobHistory" ("activeJob", "employer", "endDate", "jobTitle", "salary", "startDate") SELECT "activeJob", "employer", "endDate", "jobTitle", "salary", "startDate" FROM "JobHistory";
DROP TABLE "JobHistory";
ALTER TABLE "new_JobHistory" RENAME TO "JobHistory";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

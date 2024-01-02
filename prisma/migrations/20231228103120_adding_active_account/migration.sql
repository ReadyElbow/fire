-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Accounts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "provider" TEXT NOT NULL,
    "bankAccountNumber" INTEGER NOT NULL,
    "bankAccountSortCode" TEXT NOT NULL,
    "bankAccountType" TEXT NOT NULL,
    "interestRate" REAL NOT NULL,
    "balance" REAL NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_Accounts" ("balance", "bankAccountNumber", "bankAccountSortCode", "bankAccountType", "id", "interestRate", "provider", "updatedAt") SELECT "balance", "bankAccountNumber", "bankAccountSortCode", "bankAccountType", "id", "interestRate", "provider", "updatedAt" FROM "Accounts";
DROP TABLE "Accounts";
ALTER TABLE "new_Accounts" RENAME TO "Accounts";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

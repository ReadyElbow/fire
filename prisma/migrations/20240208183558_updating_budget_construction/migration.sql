/*
  Warnings:

  - You are about to drop the `ExpenseBudget` table. If the table is not empty, all the data it contains will be lost.
  - The primary key for the `DebtBudget` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `budgetCategory` on the `DebtBudget` table. All the data in the column will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ExpenseBudget";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "BudgetedAmount" (
    "date" DATETIME NOT NULL PRIMARY KEY,
    "monthlyBudget" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "BudgetCategories" (
    "date" DATETIME NOT NULL,
    "budgetCategory" TEXT NOT NULL,
    "monthlyAmount" REAL NOT NULL,
    "notes" TEXT NOT NULL,

    PRIMARY KEY ("date", "budgetCategory")
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DebtBudget" (
    "date" DATETIME NOT NULL,
    "debtName" TEXT NOT NULL,

    PRIMARY KEY ("date", "debtName"),
    CONSTRAINT "DebtBudget_debtName_fkey" FOREIGN KEY ("debtName") REFERENCES "Debts" ("name") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DebtBudget_date_debtName_fkey" FOREIGN KEY ("date", "debtName") REFERENCES "BudgetCategories" ("date", "budgetCategory") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_DebtBudget" ("date", "debtName") SELECT "date", "debtName" FROM "DebtBudget";
DROP TABLE "DebtBudget";
ALTER TABLE "new_DebtBudget" RENAME TO "DebtBudget";
CREATE TABLE "new_SavingsBudget" (
    "date" DATETIME NOT NULL,
    "budgetCategory" TEXT NOT NULL,
    "accountID" INTEGER NOT NULL,

    PRIMARY KEY ("date", "budgetCategory"),
    CONSTRAINT "SavingsBudget_accountID_fkey" FOREIGN KEY ("accountID") REFERENCES "Accounts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SavingsBudget_date_budgetCategory_fkey" FOREIGN KEY ("date", "budgetCategory") REFERENCES "BudgetCategories" ("date", "budgetCategory") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_SavingsBudget" ("accountID", "budgetCategory", "date") SELECT "accountID", "budgetCategory", "date" FROM "SavingsBudget";
DROP TABLE "SavingsBudget";
ALTER TABLE "new_SavingsBudget" RENAME TO "SavingsBudget";
CREATE TABLE "new_TransactionCategories" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "budgetCategory" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    CONSTRAINT "TransactionCategories_budgetCategory_date_fkey" FOREIGN KEY ("budgetCategory", "date") REFERENCES "BudgetCategories" ("budgetCategory", "date") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TransactionCategories_id_fkey" FOREIGN KEY ("id") REFERENCES "BankTransactions" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TransactionCategories" ("budgetCategory", "date", "id") SELECT "budgetCategory", "date", "id" FROM "TransactionCategories";
DROP TABLE "TransactionCategories";
ALTER TABLE "new_TransactionCategories" RENAME TO "TransactionCategories";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

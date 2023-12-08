-- CreateTable
CREATE TABLE "Accounts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "provider" TEXT NOT NULL,
    "bankAccountNumber" INTEGER NOT NULL,
    "bankAccountSortCode" TEXT NOT NULL,
    "bankAccountType" TEXT NOT NULL,
    "interestRate" REAL NOT NULL,
    "balance" REAL NOT NULL,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "BankTransactions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "transactionDate" DATETIME NOT NULL,
    "description" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "balanceAfterTransaction" REAL NOT NULL,
    "accountID" INTEGER NOT NULL,
    CONSTRAINT "BankTransactions_accountID_fkey" FOREIGN KEY ("accountID") REFERENCES "Accounts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TransactionCategories" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "budgetCategory" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    CONSTRAINT "TransactionCategories_id_fkey" FOREIGN KEY ("id") REFERENCES "BankTransactions" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TransactionCategories_budgetCategory_date_fkey" FOREIGN KEY ("budgetCategory", "date") REFERENCES "ExpenseBudget" ("budgetCategory", "date") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "JobHistory" (
    "jobTitle" TEXT NOT NULL,
    "employer" TEXT NOT NULL,
    "activeJob" BOOLEAN NOT NULL DEFAULT true,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME,
    "type" TEXT NOT NULL,
    "salary" REAL NOT NULL,

    PRIMARY KEY ("jobTitle", "employer")
);

-- CreateTable
CREATE TABLE "Debts" (
    "name" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "description" DATETIME NOT NULL,
    "interestRate" REAL NOT NULL,
    "amountOwed" REAL NOT NULL,
    "dueDate" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ExpenseBudget" (
    "date" DATETIME NOT NULL,
    "budgetCategory" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "percentage" REAL NOT NULL,
    "notes" TEXT NOT NULL,

    PRIMARY KEY ("date", "budgetCategory")
);

-- CreateTable
CREATE TABLE "DebtBudget" (
    "date" DATETIME NOT NULL,
    "budgetCategory" TEXT NOT NULL,
    "debtName" TEXT NOT NULL,

    PRIMARY KEY ("date", "budgetCategory"),
    CONSTRAINT "DebtBudget_date_budgetCategory_fkey" FOREIGN KEY ("date", "budgetCategory") REFERENCES "ExpenseBudget" ("date", "budgetCategory") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DebtBudget_debtName_fkey" FOREIGN KEY ("debtName") REFERENCES "Debts" ("name") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SavingsBudget" (
    "date" DATETIME NOT NULL,
    "budgetCategory" TEXT NOT NULL,
    "accountID" INTEGER NOT NULL,

    PRIMARY KEY ("date", "budgetCategory"),
    CONSTRAINT "SavingsBudget_date_budgetCategory_fkey" FOREIGN KEY ("date", "budgetCategory") REFERENCES "ExpenseBudget" ("date", "budgetCategory") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SavingsBudget_accountID_fkey" FOREIGN KEY ("accountID") REFERENCES "Accounts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

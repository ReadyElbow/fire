export const JOB_HISTORY = `
    CREATE TABLE IF NOT EXISTS jobHistory (
        jobTitle TEXT NOT NULL,
        employer TEXT NOT NULL,
        activeJob BOOLEAN NOT NULL DEFAULT true,
        startDate TEXT NOT NULL,
        endDate TEXT,
        type TEXT NOT NULL,
        salary REAL NOT NULL,
        PRIMARY KEY (jobTitle, employer)
    );
`;

export const DEBT_BUDGET = `
    CREATE TABLE IF NOT EXISTS debtBudget (
        date TEXT NOT NULL,
        budgetCategory TEXT NOT NULL,
        debtName TEXT NOT NULL,
        PRIMARY KEY (date, budgetCategory),
        FOREIGN KEY (debtName) REFERENCES debtSummary (debtName),
        FOREIGN KEY (date, budgetCategory) REFERENCES budget (date, budgetCategory)
    );
`;

export const BUDGET = `
    CREATE TABLE IF NOT EXISTS budget (
        date TEXT NOT NULL,
        budgetCategory TEXT NOT NULL,
        amount REAL NOT NULL,
        percentage REAL NOT NULL,
        notes TEXT NOT NULL,
        PRIMARY KEY (date, budgetCategory)
    );
`;

export const SAVINGS_BUDGET = `
    CREATE TABLE IF NOT EXISTS savingsBudget (
        date TEXT NOT NULL,
        budgetCategory TEXT NOT NULL,
        accountID INTEGER NOT NULL,
        PRIMARY KEY (date, budgetCategory),
        FOREIGN KEY (accountID) REFERENCES accounts (accountID),
        FOREIGN KEY (date, budgetCategory) REFERENCES budget (date, budgetCategory)
    );
`;

export const ACCOUNTS = `
    CREATE TABLE IF NOT EXISTS accounts (
        accountID INTEGER PRIMARY KEY AUTOINCREMENT,
        provider TEXT NOT NULL,
        bankAccountNumber TEXT NOT NULL,
        bankAccountSortCode TEXT NOT NULL,
        bankAccountType TEXT NOT NULL,
        interestRate REAL NOT NULL,
        balance REAL NOT NULL
    );
`;

export const DEBT_SUMMARY = `
    CREATE TABLE IF NOT EXISTS debtSummary (
        debtName TEXT PRIMARY KEY,
        debtType TEXT NOT NULL,
        debtDescription TEXT NOT NULL,
        interestRate REAL NOT NULL,
        amountOwed REAL NOT NULL,
        dueDate TEXT
    );
`;

export const BANK_TRANSACTIONS = `
    CREATE TABLE IF NOT EXISTS bankTransactions (
        transactionID INTEGER PRIMARY KEY AUTOINCREMENT,
        transactionDate TEXT NOT NULL,
        transactionDescription TEXT NOT NULL,
        transactionNotes TEXT,
        transactionAmount REAL NOT NULL,
        balanceAfterTransaction REAL NOT NULL,
        accountID INTEGER NOT NULL,
        FOREIGN KEY (accountID) REFERENCES accounts (accountID)
    );
`;

// We define Expense Transaction Categories as accounts that make transactions
// mappable to either the expenses/savings/debt budget

export const EXPENSE_TRANSACTION_CATEGORIES = `
    CREATE TABLE IF NOT EXISTS expenseTransactionCategories (
        transactionID TEXT PRIMARY KEY NOT NULL,
        budgetCategory TEXT,
        date TEXT NOT NULL,
        FOREIGN KEY (transactionID) REFERENCES bankTransactions (transactionID),
        FOREIGN KEY (date, budgetCategory) REFERENCES budget (date, budgetCategory)
    );
`;
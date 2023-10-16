CREATE TABLE IF NOT EXISTS jobHistory (
  jobTitle TEXT NOT NULL,
  employer TEXT NOT NULL,
  activeJob INTEGER NOT NULL DEFAULT true,
  startDate TEXT NOT NULL,
  endDate TEXT,
  type TEXT NOT NULL,
  salary REAL NOT NULL,
  PRIMARY KEY (jobTitle, employer)
);

CREATE TABLE IF NOT EXISTS descriptionToCategory (
  transactionDescription TEXT PRIMARY KEY,
  budegetCategory TEXT NOT NULL,
  FOREIGN KEY (budegetCategory) REFERENCES budget (budgetCategory)
);

CREATE TABLE IF NOT EXISTS debtBudget (
  date TEXT NOT NULL,
  budgetCategory TEXT NOT NULL,
  debtName TEXT NOT NULL,
  PRIMARY KEY (date, budgetCategory),
  FOREIGN KEY (debtName) REFERENCES debtSummary (debtName),
  FOREIGN KEY (date, budgetCategory) REFERENCES budget (date, budgetCategory)
);

CREATE TABLE IF NOT EXISTS budget (
  date TEXT NOT NULL,
  budgetCategory TEXT NOT NULL,
  amount REAL NOT NULL,
  percentage REAL NOT NULL,
  notes TEXT NOT NULL,
  PRIMARY KEY (date, budgetCategory)
);

CREATE TABLE IF NOT EXISTS savingsBudget (
  date TEXT NOT NULL,
  budgetCategory TEXT NOT NULL,
  accountID TEXT NOT NULL,
  PRIMARY KEY (date, budgetCategory),
  FOREIGN KEY (accountID) REFERENCES accounts (accountID),
  FOREIGN KEY (date, budgetCategory) REFERENCES budget (date, budgetCategory)
);

CREATE TABLE IF NOT EXISTS accounts (
  accountID INTEGER PRIMARY KEY AUTOINCREMENT,
  provider TEXT NOT NULL,
  bankAccountNumber TEXT NOT NULL,
  bankAccountSortCode TEXT NOT NULL,
  bankAccountType TEXT NOT NULL,
  interestRate REAL NOT NULL,
  balance REAL NOT NULL
);

CREATE TABLE IF NOT EXISTS debtSummary (
  debtName TEXT PRIMARY KEY,
  debtType TEXT NOT NULL,
  debtDescription TEXT NOT NULL,
  interestRate REAL NOT NULL,
  amountOwed REAL NOT NULL,
  dueDate TEXT
);

CREATE TABLE IF NOT EXISTS bankTransactions (
  transactionID INTEGER PRIMARY KEY AUTOINCREMENT,
  transactionDate TEXT NOT NULL,
  transactionDescription TEXT NOT NULL,
  transactionAmount REAL NOT NULL,
  balanceAfterTransaction REAL NOT NULL,
  accountID integer NOT NULL,
  FOREIGN KEY (accountID) REFERENCES accounts (accountID),
  FOREIGN KEY (transactionDescription) REFERENCES descriptionToCategory (transactionDescription)
);

CREATE TABLE IF NOT EXISTS bankTransactionCategory (
  transactionID TEXT PRIMARY KEY NOT NULL,
  budgetCategory TEXT,
  FOREIGN KEY (transactionID) REFERENCES bankTransactions (transactionID),
  FOREIGN KEY (budgetCategory) REFERENCES budget (budgetCategory)
);
import { Accounts, Prisma } from "@prisma/client";
import { prisma } from "../prisma.server";

export type TransactionSummary = {
    provider: string,
    y: number,
    x: string
}

export function monthlySummaryByAccount() {
    const summary = prisma.$queryRaw<TransactionSummary[]>(
        Prisma.sql`
            SELECT 
                Accounts.provider as provider,
                balanceAfterTransaction as y,
                STRFTIME('%Y-%m', DATETIME(ROUND(BankTransactions.transactionDate / 1000), 'unixepoch')) as x
            FROM BankTransactions
            INNER JOIN Accounts ON Accounts.id = BankTransactions.accountID
            GROUP BY 
                x,
                BankTransactions.accountID
            HAVING MAX(BankTransactions.transactionDate)
        `
    )
    return summary
}
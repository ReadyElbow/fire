import { prisma } from "../prisma.server"

export async function fetchHighLevelAccountsDetails() {
    const accounts = prisma.accounts.findMany({
        select: {
            id: true,
            provider: true,
            bankAccountNumber: true,
            bankAccountSortCode: true,
            bankAccountType: true,
            balance: true,
            updatedAt: true
        }
    });
    return accounts
}



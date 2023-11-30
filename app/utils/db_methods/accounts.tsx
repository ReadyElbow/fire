import { prisma } from "../prisma.server"

export async function fetchHighLevelAccountsDetails() {
    const accounts = prisma.accounts.findMany({
        select: {
            provider: true,
            bankAccountNumber: true,
            bankAccountType: true,
            balance: true,
            updatedAt: true
        }
    });
    return accounts
}



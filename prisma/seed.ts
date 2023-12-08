import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient()
async function main() {
  const marcusAccount = await prisma.accounts.upsert({
    where: { id: 1 },
    update: {},
    create: {
      provider: "Marcus",
      bankAccountNumber: 273892832,
      bankAccountSortCode: "923023",
      bankAccountType: "Savings Account",
      interestRate: 5.00,
      balance: 600,
    },
  })
  const lloydsAccount = await prisma.accounts.upsert({
    where: { id: 2 },
    update: {},
    create: {
      provider: "Lloyds",
      bankAccountNumber: 21382138,
      bankAccountSortCode: "0919237",
      bankAccountType: "Current Account",
      interestRate: 5.00,
      balance: 1289121,
    },
  })

  for (let i = 0; i < 1000; i++) {
    const date = faker.date.past({years:1});
    await prisma.bankTransactions.create({
      data: {
        transactionDate: date,
        description: faker.lorem.sentence(),
        notes: "",
        amount: parseFloat(faker.finance.amount()),
        balanceAfterTransaction: parseFloat(faker.finance.amount()),
        accountID: faker.number.int({ min:1, max:2})
      }
    })
  }
  
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
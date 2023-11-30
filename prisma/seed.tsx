import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
async function main() {
  const marcusAccount = await prisma.accounts.upsert({
    where: { id: 1 },
    update: {},
    create: {
      provider: "Marcus",
      bankAccountNumber: 273892832,
      bankAccountSortCode: "923023",
      bankAccountType: "Savings",
      interestRate: 5.00,
      balance: 600,
    },
  })
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
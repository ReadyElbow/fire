// app/utils/prisma.server.ts
import { PrismaClient } from '@prisma/client'
import { AccountValidation } from './prisma_custom_validation/accounts'

const extendedPrisma = new PrismaClient().$extends(AccountValidation)
type TExtendedPrisma = typeof extendedPrisma

let prisma: TExtendedPrisma;
declare global {
  var __db: TExtendedPrisma
}
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient().$extends(AccountValidation)
  prisma.$connect()
} else {
  if (!global.__db) {
    global.__db = new PrismaClient().$extends(AccountValidation)
    global.__db.$connect()
  }
  prisma = global.__db
}

export { prisma }
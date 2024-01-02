import { z } from "zod";
import { Prisma } from "@prisma/client";
import { accountProviders } from "../providers";
import { accountTypes } from "../account_types";

const schema = z.object({
  provider: z.string().refine((provider) => Object.keys(accountProviders).includes(provider), { message: "Unspported provider" }),
  bankAccountNumber: z.number(),
  bankAccountSortCode: z.string().length(6, { message: "Sort code must be 6 digits" }).regex(/^\d{6}$/, { message: "Sort code must be 6 digits" }),
  bankAccountType: z.string().refine((bankAccountType) => accountTypes.includes(bankAccountType), { message: "Unsupported account type" }),
  interestRate: z.number().multipleOf(0.01),
  balance: z.number().multipleOf(0.01),
}) satisfies z.Schema<Prisma.AccountsUncheckedCreateInput>;

export const AccountValidation = Prisma.defineExtension({
  query: {
    accounts: {
      create({ args, query }) {
        args.data = schema.parse(args.data);
        return query(args);
      },
      update({ args, query }) {
        args.data = schema.partial().parse(args.data);
        return query(args);
      },
      updateMany({ args, query }) {
        args.data = schema.partial().parse(args.data);
        return query(args);
      },
      upsert({ args, query }) {
        args.create = schema.parse(args.create);
        args.update = schema.partial().parse(args.update);
        return query(args);
      },
    },
  },
});
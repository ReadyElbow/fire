import { Hono } from 'hono';
import { Database } from 'bun:sqlite';
import { z } from "zod";
import { validator } from 'hono/validator'
import { db_connection } from '../index';

type Accounts = {
    accountID: number,
    provider: string,
    bankAccountNumber: string,
    bankAccountSortCode: string,
    bankAccountType: string,
    interestRate: number,
    balance: number
}[]

const AccountValidator = z.object({
    provider: z.string().toUpperCase().trim(),
    bankAccountNumber: z.string().trim(),
    bankAccountSortCode: z.string().trim(),
    bankAccountType: z.string().toUpperCase().trim(),
    balance: z.number().multipleOf(0.01),
    interestRate: z.number().multipleOf(0.01)
});

const InterestRateValidator = z.object({
    bankAccountNumber: z.string().trim(),
    bankAccountSortCode: z.string().trim(),
    interestRate: z.number().multipleOf(0.01)
});

export const accounts = new Hono()

accounts.get('/', (c) => {
    try {
        const accounts = db_connection.query(`SELECT * FROM 'accounts'`).all() as Accounts;
        return c.jsonT(accounts);
    } catch (err) {
        console.log(err)
        return c.text("Unknown Error", 500)
    }
});


// Add a new account to accounts table
accounts.post('/add', 
    validator('json', (value:unknown, c) => {
        const parsed = AccountValidator.safeParse(value)
        if (!parsed.success) {
            return c.text('Invalid!', 401)
        }
        return parsed.data
    }),
    async (c) => {
        // Validate inbound request for type safety and format
        const account = c.req.valid('json');
        try {
            // Does account already exist?
            const exisitingAccount = db_connection.prepare("SELECT * FROM accounts WHERE provider = $p AND bankAccountNumber = $ban AND bankAccountSortCode = $basc").get({
                $p: account.provider,
                $ban: account.bankAccountNumber,
                $basc: account.bankAccountSortCode
            })
            if (exisitingAccount) {
                console.log("Account already exists");
                return c.text("Account already exists", 400);
            }
            // Add account to accounts table
            const query = db_connection.prepare(
                `
                INSERT INTO accounts (provider, bankAccountNumber, bankAccountSortCode, bankAccountType, interestRate, balance) 
                VALUES ($p, $ban, $basc, $bat, $ir, $b)
                RETURNING accountID;
                `
            );
            interface insertAccountResponse  { accountID: number }
            const response = query.get({
                $p: account.provider, 
                $ban: account.bankAccountNumber, 
                $basc: account.bankAccountSortCode, 
                $bat: account.bankAccountType, 
                $ir: account.interestRate, 
                $b: account.balance
            }) as insertAccountResponse;
            return c.json(response.accountID, 200);

        } catch (err) {
            console.log("Error occured");
            return c.text("Unknown Error", 500); 
        }
    }
);

// // Modify Interest Rate
accounts.post('/ir', 
    validator('json', (value:unknown, c) => {
        const parsed = InterestRateValidator.safeParse(value)
        if (!parsed.success) {
            return c.text('Invalid!', 401)
        }
        return parsed.data
    }),
    async (c) => {
        const requestBody = c.req.valid('json');
        try {
            const query = db_connection.prepare(
                "UPDATE accounts SET interestRate = ($ir) WHERE bankAccountNumber = $ban AND bankAccountSortCode = $basc"
            );
            query.run({
                $ir: requestBody.interestRate, 
                $ban: requestBody.bankAccountNumber,
                $basc: requestBody.bankAccountSortCode
            });
        } catch (err) {
            console.log(err);
            return c.text("Unknown Error", 500); 
        }
        return c.text("Success", 200);
});

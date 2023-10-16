import { Hono } from 'hono';
import { object, z } from "zod";
import { validator } from 'hono/validator'
import { db_connection } from '../index'
import { error } from 'console';

class ExpenseTransactionError extends Error {
    constructor(message:string) {
      super(message);
      this.name = "ExpenseTransactionError";
    }
}

class ForeginKeyConstraint extends Error {
    constructor(message:string) {
      super(message);
      this.name = "ForeginKeyConstraint";
    }
}

const Transaction = z.object({
    transactionDate: z.string(),
    transactionDescription: z.string().trim(),
    transactionAmount: z.number().multipleOf(0.01),
    balanceAfterTransaction: z.number().multipleOf(0.01),
    accountID: z.number(),
    budgetCategory: z.optional(z.string().trim()),
});

const Transactions = z.array(Transaction)

export const transactions = new Hono()

function addTransactions(transactionsList: z.infer<typeof Transactions>, budgetCategory: boolean) {
    const insert = db_connection.prepare(`
    INSERT INTO bankTransactions (transactionDate, transactionDescription, transactionAmount, balanceAfterTransaction, accountID)
    VALUES($transDate, $transDesc, $transAmount, $balAfterTrans, $accID);
    `);
    const insertTransactionCategory = db_connection.prepare(`
    INSERT INTO expenseTransactionCategories (transactionID, budgetCategory)
    VALUES($transactionID, $budgetCategory);
    `);

    const insertTransactions = db_connection.transaction(transactions => {
        for (const transaction of transactions as z.infer<typeof Transactions>){
            if (budgetCategory && transaction.budgetCategory == undefined) {
                throw new ExpenseTransactionError("Current Account transactions require a budget category")
            }

            insert.run({"$transDate": transaction.transactionDate, "$transDesc": transaction.transactionDescription, "$transAmount": transaction.transactionAmount, "$balAfterTrans": transaction.balanceAfterTransaction, "$accID": transaction.accountID});
            
            if (transaction.budgetCategory){
                interface transactionIDResponse {
                    "last_insert_rowid()": number  
                }

                const response = db_connection.query("SELECT last_insert_rowid()").get() as transactionIDResponse
                insertTransactionCategory.run({"$transactionID": response["last_insert_rowid()"], "$budgetCategory": transaction.budgetCategory})
            }
        }
    });
    try {
        insertTransactions(transactionsList);
    } catch (e) {
        if (e instanceof Error && e.message.includes("constraint failed")) {
            throw new ForeginKeyConstraint("Ensure Account is created and budget if transaction is an expense.")
        }
        else
            throw e
    }
}

transactions.post('/add_transactions', 
    validator('json', (value:unknown, c) => {
        const parsed = Transactions.safeParse(value)
        if (!parsed.success) {
            return c.text("", 401)
        }
        return parsed.data
    }),
    async (c) => {
        try {
            const requestBody = c.req.valid('json');
            addTransactions(requestBody, false)
            return c.text('Success!');
        } catch (e) {
            if (e instanceof ForeginKeyConstraint) {
                return c.text(e.message, 400);
            }
            return c.text("Unknown Error", 500);
        }
    }
)

transactions.post('/add_transactions/current_account',
    validator('json', (value:unknown, c) => {
        const parsed = Transactions.safeParse(value)
        if (!parsed.success) {
            return c.text('Invalid!', 401)
        }
        return parsed.data
    }),
    async (c) => {
        try {
            const requestBody = c.req.valid('json');
            addTransactions(requestBody, true)
            return c.text('Success!');
        } catch (e) {
            if (e instanceof ForeginKeyConstraint || e instanceof ExpenseTransactionError) {
                return c.text(e.message, 400);
            }
            return c.text("Unknown Error", 500);
        }
    }
)

transactions.get('/:accountID', c => {
    try {
        const accountID = c.req.param('accountID')
        const transactions = db_connection.query(`
        SELECT bankTransactions.transactionDate, bankTransactions.transactionDescription, bankTransactions.transactionAmount, bankTransactions.balanceAfterTransaction, expenseTransactionCategories.budgetCategory
        FROM bankTransactions 
        LEFT JOIN expenseTransactionCategories ON bankTransactions.transactionID = expenseTransactionCategories.transactionID
        ORDER BY bankTransactions.transactionDate DESC`).all({ $accountID: accountID});
        if (transactions == null)
            return c.text("Transactions not found", 404);
        return c.json(transactions, 200);
        }
        catch (err) {
            return c.text("Unknown Error", 500);
        }
})
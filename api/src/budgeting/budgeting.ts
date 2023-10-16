import { Hono } from 'hono';
import { z } from "zod";
import { validator } from 'hono/validator'
import { db_connection } from '../index';

const transactionsCategoryMapping = z.object({
    transactionDescription: z.string().trim(),
    budgetCategory: z.string().trim(),
});

const transactionsCategoryMappings = z.array(transactionsCategoryMapping)

const budgetEntry = z.object({
        budgetCategory: z.string().trim(),
        amount: z.number().multipleOf(0.01),
        percentage: z.number().multipleOf(0.01),
        notes: z.string().trim(),
        debtName: z.optional(z.string().trim()),
        accountID: z.optional(z.number()),
});

const monthlyBudget = z.object({
    entries: z.array(budgetEntry),
    date: z.string().trim()
});

const requestBudget = z.object({
    date: z.string().trim(),
})


const mappingsFile = Bun.file("./assets/mappings.json", { type: "application/json" });
if (mappingsFile.size == 0)
    Bun.write(mappingsFile, '{}');
interface Mappings {
    [key: string]: string
}
let mappingsObject:Mappings = await mappingsFile.json()

export const budgeting = new Hono()

// Add new mappings
budgeting.post('/add_mappings',
    validator('json', (value:unknown, c) => {
        const parsed = transactionsCategoryMappings.safeParse(value)
        if (!parsed.success) {
            return c.text('Invalid!', 401)
        }
        return parsed.data
    }),
    async (c) => {
        try {
            const newMappings = c.req.valid('json');
            newMappings.forEach( mapping => {
                mappingsObject[mapping.transactionDescription] = mapping.budgetCategory;
            })
            Bun.write(mappingsFile, JSON.stringify(mappingsObject));
            return c.text("Success", 200);
        }
        catch (err) {
            console.log(err);
            return c.text("Unknown Error", 500);
        }
    }
)

// Fetch an associated mapping
budgeting.get('/get_mapping/:transactionDescription', c => {
    try {
        const mapping = mappingsObject[c.req.param('transactionDescription')];
        if (mapping == undefined)
            return c.text("Mapping not found", 404);
        return c.json(mapping, 200);
    } catch (err) {
        console.log(err);
        return c.text("Unknown Error", 500);
    }
})

// Save this months budget
budgeting.post('/save_budget',
    validator('json', (value:unknown, c) => {
        const parsed = monthlyBudget.safeParse(value);
        if (!parsed.success) {
            return c.text("Invalid", 404)
        }
        return parsed.data
    }),
    async (c) => {
        const budget = await c.req.json() as z.infer< typeof monthlyBudget>
        try {
            insertBudgetEntry(budget.date, budget.entries);
        } catch (err) {
            return c.text("Unknown Error", 500);
        }
        return c.text("Success", 200);
    }
)

function insertBudgetEntry(date:string, entries:z.infer<typeof budgetEntry>[], accountID?:number, debtName?:string) {
    const query = db_connection.prepare(
        "INSERT INTO budget (date, budgetCategory, amount, percentage, notes, debtName, accountID) VALUES ($date, $bc, $amount, $percentage, $notes, $debtName, $accountID)"
    );
    const debtMapping = db_connection.prepare(
        "INSERT INTO debtSummary (date, budgetCategory, debtName) VALUES ($date, $bc, $debtName);"
    )
    const accountIDMapping = db_connection.prepare(
        "INSERT INTO account (date, budgetCategory, accountID) VALUES ($date, $bc, $accountID);"
    )
    const transaction = db_connection.transaction(entries => {
        for (const entry of entries as z.infer<typeof budgetEntry>[]){
            query.run({
                $date: date,
                $bc: entry.budgetCategory,
                $amount: entry.amount,
                $percentage: entry.percentage,
                $notes: entry.notes
            })
            if (debtName) {
                debtMapping.run({
                    $date: date,
                    $bc: entry.budgetCategory,
                    $debtName: debtName
                })
            }
            if (accountID) {
                accountIDMapping.run({
                    $date: date,
                    $bc: entry.budgetCategory,
                    $accountID: accountID
                })
            }
        }
    
    })
    transaction(entries);
}


// Notes

// Fetch a month's budget
budgeting.post('/fetch_budget/expenses',
    validator('json', (value:unknown, c) => {
        const parsed = requestBudget.safeParse(value);
        if (!parsed.success) {
            return c.text("Invalid", 404)
        }
        return parsed.data
    }), 
    async (c) => {
        // Need to figure out if I am using a left join on the other tables...
        const budget = await c.req.json() as z.infer< typeof requestBudget>
        // Will need to do two left joins and then filter it by saying where 
        // Left Join on expenses, Inner Join on the budget/savings
        try {
            const expensesBudget = db_connection.prepare(
                `
                SELECT *
                FROM budget
                WHERE NOT EXISTS (
                    SELECT 1
                    FROM savingsBudget
                    WHERE savingsBudget.date = $date AND savingsBudget.budgetCategory = budget.budgetCategory
                )
                AND NOT EXISTS (
                    SELECT 1
                    FROM debtBudget
                    WHERE debtBudget.date = $date AND debtBudget.budgetCategory = budget.budgetCategory
                );
                AND budget.date = $date;
            `).all({ $date: budget.date });
            return c.json(expensesBudget, 200)
        } catch (err) {
            return c.text("Unknown Error", 500);
        }
    }
)

// Fetch a month's debt budget
budgeting.post('/fetch_budget/debt',
    validator('json', (value:unknown, c) => {
        const parsed = requestBudget.safeParse(value);
        if (!parsed.success) {
            return c.text("Invalid", 404)
        }
        return parsed.data
    }),
    async (c) => {
        const budget = await c.req.json() as z.infer< typeof requestBudget>
        try {
            const debtBudget = db_connection.prepare(
                `
                SELECT *
                FROM debtBudget
                INNER JOIN
                WHERE debtBudget.date = $date;
            `).all({ $date: budget.date });
            return c.json(debtBudget, 200)
        } catch (err) {
            return c.text("Unknown Error", 500);
        }
    }
)
        
        // Automatically look backwards to detect a budget? - if there is none for this month
        // fetch the most recent 
    // let requestedDate = new Date(budget.date);
    // let previousDate = `${requestedDate.getFullYear()}-${requestedDate.getMonth().toString().padStart(2, "0")}`
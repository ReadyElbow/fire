import { Hono } from 'hono';
import { Database } from 'bun:sqlite';
import { JOB_HISTORY, DEBT_BUDGET, BUDGET, SAVINGS_BUDGET, ACCOUNTS, DEBT_SUMMARY, BANK_TRANSACTIONS, EXPENSE_TRANSACTION_CATEGORIES} from './db_init';
import { accounts } from './accounts/accounts';
import { jobs } from './jobs/jobs';
import { budgeting } from './budgeting/budgeting';
import { transactions } from './transactions/transactions';

export const db_connection = new Database('./assets/financial_database.sqlite', { create: true });
// db_connection.exec("PRAGMA journal_mode = WAL;");
db_connection.exec("PRAGMA foreign_keys = ON;");

// Check if any tables have been created in the database
const table_count = db_connection.query("SELECT name FROM sqlite_schema WHERE type='table'").values();
if (table_count.length === 0) {
    console.log("First execution DB init")
    const createTables = db_connection.transaction(tables => {
        for (const table of tables as string) {
            db_connection.exec(table);
        };
    });
    createTables([
        JOB_HISTORY, 
        DEBT_BUDGET, 
        BUDGET, 
        SAVINGS_BUDGET, 
        ACCOUNTS, 
        DEBT_SUMMARY, 
        BANK_TRANSACTIONS, 
        EXPENSE_TRANSACTION_CATEGORIES]);
}

const app = new Hono()
app.route('/accounts', accounts)
app.route('/jobs', jobs)
app.route('/budgeting', budgeting)
app.route('/transactions', transactions)
export default app

import { Hono } from 'hono';
import { Database } from 'bun:sqlite';
import { z } from "zod";
import { validator } from 'hono/validator'
import { db_connection } from "../index"

const JobValidator = z.object({
    jobTitle: z.string().trim(),
    employer: z.string().toUpperCase().trim(),
    start_date: z.string(),
    // end_date: z.nullable(z.string().pipe(z.coerce.date())),
    type: z.string().toUpperCase().trim(),
    salary: z.number().multipleOf(0.01)
});
    
const LeavingJobValidator = z.object({
    jobTitle: z.string().trim(),
    employer: z.string().toUpperCase().trim(),
    end_date: z.string(),
})

export const jobs = new Hono()

// Add new Job
jobs.post('/joining',
    validator('json', (value:unknown, c) => {
        const parsed = JobValidator.safeParse(value)
        if (!parsed.success) {
            return c.text('Invalid!', 401)
        }
        return parsed.data
    }),
    async (c) => {
        const { jobTitle, employer, start_date, type, salary } = c.req.valid('json');
        try {
            const statement = db_connection.prepare("INSERT INTO jobHistory (jobTitle, employer, startDate, type, salary) VALUES ($jobTitle, $employer, $startDate, $type, $salary)")
            statement.run(
                {
                    "$jobTitle": jobTitle,
                    "$employer": employer,
                    "$startDate": start_date,
                    "$type": type,
                    "$salary": salary
                }
            )
            return c.text("Success", 200);
        } catch (err) {
            console.log(err);
            return c.text("Unknown Error", 500);
        }
    }
)

// Leaving Job
jobs.post('/resignation',
    validator('json', (value:unknown, c) => {
        const parsed = LeavingJobValidator.safeParse(value)
        if (!parsed.success) {
            return c.text('Invalid!', 401)
        }
        return parsed.data
    }),
    async (c) => {
        const { jobTitle, employer, end_date } = c.req.valid('json');
        try {
            const statement = db_connection.prepare("UPDATE jobHistory SET activeJob = 0, endDate = $endDate WHERE jobTitle = $jobTitle AND employer = $employer")
            statement.run(
                {
                    "$jobTitle": jobTitle,
                    "$employer": employer,
                    "$endDate": end_date,
                }
            )
            return c.text("Success", 200);
        } catch (err) {
            console.log(err);
            return c.text("Unknown Error", 500);
        }
    }
)
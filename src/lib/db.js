// db.js (or db.ts if you're using TypeScript)
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false, 
    },
});

async function connectToDatabase() {
    const client = await pool.connect();
    return client;
}

export default connectToDatabase;

import type { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "../../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        try {
            const client = await connectToDatabase();
            const visible = req.query.visible || "1";

            // Auto-create 'categories' table if not exists
            await client.query(`
                CREATE TABLE IF NOT EXISTS categories (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    description TEXT,
                    visible BOOLEAN DEFAULT TRUE,
                    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
            `);

            const result = await client.query(
                `SELECT * FROM categories WHERE visible = $1`,
                [visible === "1"]
            );

            client.release();

            return res.status(200).json({
                success: true,
                code: 200,
                categories: result.rows,
            });

        } catch (error) {
            console.error("Error fetching categories:", error);
            return res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

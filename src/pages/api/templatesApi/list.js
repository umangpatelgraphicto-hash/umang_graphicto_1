import connectToDatabase from "../../../lib/db"; // your pg connection helper

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const client = await connectToDatabase();

            const result = await client.query(`
                SELECT ct.id, ct.category_id, c.name AS category_name, ct.image_path, ct.is_active
                FROM category_templates ct
                JOIN categories c ON ct.category_id = c.id
            `);

            client.release();

            return res.status(200).json(result.rows);
        } catch (error) {
            console.error("Database query error:", error);
            return res.status(500).json({ error: "Database query failed" });
        }
    } else {
        return res.status(405).json({ error: "Method not allowed" });
    }
}

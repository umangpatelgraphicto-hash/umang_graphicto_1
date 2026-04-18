import connectToDatabase from "../../../lib/db";
 
export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const searchQuery = req.query.search;
 
            if (!searchQuery || searchQuery.trim() === '') {
                return res.status(400).json({ success: false, message: "Search parameter is required" });
            }
 
            const connection = await connectToDatabase();
            const query = `%${searchQuery}%`;
 
            const [icons] = await connection.query(
                `SELECT id, size, type, svg FROM icons WHERE name LIKE ?`, [query]
            );
 
            return res.status(200).json({ success: true, icons });
        } catch (error) {
            console.error("Database error:", error);
            return res.status(500).json({ success: false, message: "Database error" });
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
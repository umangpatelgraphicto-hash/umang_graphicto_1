import connectToDatabase from "../../../lib/db";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            // Establish a connection to the database
            const connection = await connectToDatabase();

            try {
                const [colorsRows] = await connection.query(
                    `SELECT * FROM colors`
                );
                return res.status(200).json({ success: true, code: 200, colors: colorsRows });
            } catch (error) {
                console.error('Error fetching colors:', error.message);
                return res.status(500).json({ success: false, message: error.message });
            } finally {
                // connection.release();
            }
        } catch (error) {
            console.error('Database connection error:', error.message);
            return res.status(500).json({ success: false, message: 'Database connection error' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

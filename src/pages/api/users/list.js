import connectToDatabase from "../../../lib/db";


export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            // Establish a connection to the database
            const connection = await connectToDatabase();

            try {

                const [usersRows] = await connection.query(`SELECT * FROM users where is_active = true`);
                return res.status(200).json({ success: true, code: 200, users: usersRows });
            } catch (error) {
                console.error('Error fetching plans:', error.message);
                return res.status(500).json({ success: false, message: error.message });
            } finally {
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

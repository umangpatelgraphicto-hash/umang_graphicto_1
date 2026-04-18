import connectToDatabase from '../../../lib/db';
import initMiddleware from '../../../lib/init-middleware';

export default async function handler(req, res) {
    const middleware = initMiddleware(async (req, res) => {
        if (req.method === 'DELETE') {
            const { id } = req.query; // Get the 'id' parameter from the query string

            if (!id) {
                return res.status(400).json({ success: false, message: 'ID is required' });
            }

            try {
                const connection = await connectToDatabase();

                try {
                    // Begin a transaction
                    await connection.beginTransaction();

                    const [result] = await connection.query('DELETE FROM users WHERE id = ?', [id]);

                    // Check if the deletion was successful
                    if (result.affectedRows === 0) {
                        await connection.rollback();
                        return res.status(404).json({ success: false, code: 404, message: 'USer not found' });
                    }
                    await connection.commit();
                    // Send a success response
                    return res.status(200).json({ success: true, code: 200, message: 'User deleted successfully' });
                } catch (error) {
                    // Rollback the transaction on error
                    await connection.rollback();
                    console.error('Error deleting room:', error.message);
                    return res.status(500).json({ success: false, code: 500, message: error.message });
                } finally {
                }
            } catch (error) {
                console.error('Database connection error:', error.message);
                return res.status(500).json({ success: false, message: 'Database connection error' });
            }
        } else {
            res.setHeader('Allow', ['DELETE']);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    });
    await middleware(req, res);
}

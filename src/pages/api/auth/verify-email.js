import initMiddleware from '../../../lib/init-middleware';
import connectToDatabase from "../../../lib/db";

export default async function handler(req, res) {
    const middleware = initMiddleware(async (req, res) => {
        if (req.method === 'GET') {
            try {
                const { token } = req.query;

                if (!token) {
                    return res.status(400).json({ message: 'Missing verification token' });
                }

                const connection = await connectToDatabase();
                const [users] = await connection.query(
                    `SELECT * FROM users WHERE verification_token = ?`,
                    [token]
                );

                if (users.length === 0) {
                    return res.status(400).json({ message: 'Invalid verification token' });
                }

                await connection.query(
                    `UPDATE users SET email_verified = 1, verification_token = NULL WHERE id = ?`,
                    [users[0].id]
                );

                return res.status(200).json({ message: 'Email verified successfully' });
            } catch (error) {
                console.error('Error verifying email:', error.message);
                return res.status(500).json({ message: error.message });
            }
        } else {
            res.setHeader('Allow', ['GET']);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    });

    await middleware(req, res);
}

import initMiddleware from '../../../lib/init-middleware';
import connectToDatabase from "../../../lib/db";
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

export default async function handler(req, res) {
    const middleware = initMiddleware(async (req, res) => {
        if (req.method === 'POST') {
            try {
                const { token, newPassword } = req.body;

                if (!token || !newPassword) {
                    return res.status(400).json({ success: false, message: 'Missing required fields' });
                }

                const connection = await connectToDatabase();
                const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
                const [users] = await connection.query(
                    `SELECT * FROM users WHERE reset_password_token = ? AND reset_password_expires > NOW()`,
                    [tokenHash]
                );

                if (users.length === 0) {
                    return res.status(400).json({ success: false, message: 'Invalid or expired token' });
                }

                const hashedPassword = await bcrypt.hash(newPassword, 10);

                await connection.query(
                    `UPDATE users SET password_hash = ?, reset_password_token = NULL, reset_password_expires = NULL WHERE id = ?`,
                    [hashedPassword, users[0].id]
                );

                return res.status(200).json({ success: true, message: 'Password reset successful' });
            } catch (error) {
                console.error('Error resetting password:', error.message);
                return res.status(500).json({ success: false, message: error.message });
            }
        } else {
            res.setHeader('Allow', ['POST']);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    });

    await middleware(req, res);
}

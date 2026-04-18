import initMiddleware from '../../../lib/init-middleware';
import connectToDatabase from "../../../lib/db";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
    const middleware = initMiddleware(async (req, res) => {
        if (req.method === 'POST') {
            try {
                const { email, password } = req.body;

                if (!email || !password) {
                    return res.status(400).json({ message: 'Missing email or password' });
                }

                const client = await connectToDatabase();

                const result = await client.query(`SELECT * FROM users WHERE email = $1`, [email]);

                if (result.rows.length === 0) {
                    client.release();
                    return res.status(401).json({ message: 'Invalid credentials' });
                }

                const user = result.rows[0];
                const isMatch = await bcrypt.compare(password, user.password_hash);

                if (!isMatch) {
                    client.release();
                    return res.status(401).json({ success: false, message: 'Invalid credentials' });
                }

                const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

                const userData = {
                    id: user.id,
                    userName: user.user_name,
                    userEmail: user.email,
                    authToken: token
                };

                client.release();

                return res.status(200).json({
                    success: true,
                    message: 'Login successful',
                    user: userData
                });

            } catch (error) {
                console.error('Error logging in:', error);
                return res.status(500).json({ success: false, message: 'Server error: ' + error.message });
            }
        } else {
            res.setHeader('Allow', ['POST']);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    });

    await middleware(req, res);
}

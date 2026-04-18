// pages/api/auth/register.js
import initMiddleware from '../../../lib/init-middleware';
import connectToDatabase from "../../../lib/db";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
    const middleware = initMiddleware(async (req, res) => {
        if (req.method === 'POST') {
            try {
                const { user_name, email, password } = req.body;

                if (!user_name || !email || !password) {
                    return res.status(400).json({ success: false, message: 'Missing required fields' });
                }

                const client = await connectToDatabase();

                // Auto-create 'users' table if not exists
                await client.query(`
                    CREATE TABLE IF NOT EXISTS users (
                        id SERIAL PRIMARY KEY,
                        user_name VARCHAR(255) NOT NULL,
                        email VARCHAR(255) NOT NULL UNIQUE,
                        password_hash VARCHAR(255) NOT NULL,
                        created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        is_active BOOLEAN DEFAULT TRUE
                    );
                `);

                const hashedPassword = await bcrypt.hash(password, 10);

                const result = await client.query(
                    `INSERT INTO users (user_name, email, password_hash, created_on, is_active) 
                     VALUES ($1, $2, $3, NOW(), TRUE) RETURNING id`,
                    [user_name, email, hashedPassword]
                );

                const userId = result.rows[0].id;

                const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });

                const userData = {
                    id: userId,
                    userName: user_name,
                    userEmail: email,
                    authToken: token
                };

                client.release(); // Release connection back to pool

                return res.status(201).json({ success: true, message: 'Registration successfully!!', data: userData });

            } catch (error) {
                console.error('Error registering user:', error);
                return res.status(500).json({ success: false, message: 'Server error: ' + error.message });
            }
        } else {
            res.setHeader('Allow', ['POST']);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    });

    await middleware(req, res);
}

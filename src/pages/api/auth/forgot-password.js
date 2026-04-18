import initMiddleware from '../../../lib/init-middleware';
import connectToDatabase from "../../../lib/db";
import crypto from 'crypto';
import nodemailer from 'nodemailer';


const FRONTEND_URL = 'http://localhost:3000/password/reset';

export default async function handler(req, res) {
    const middleware = initMiddleware(async (req, res) => {
        if (req.method === 'POST') {
            try {
                const { email } = req.body;

                if (!email) {
                    return res.status(400).json({ message: 'Missing email' });
                }

                const connection = await connectToDatabase();
                const [users] = await connection.query(`SELECT * FROM users WHERE email = ?`, [email]);

                if (users.length === 0) {
                    return res.status(404).json({ success: false, message: 'User not found' });
                }

                const resetToken = crypto.randomBytes(32).toString('hex');
                const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');
                const resetTokenExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

                await connection.query(
                    `UPDATE users SET reset_password_token = ?, reset_password_expires = ? WHERE email = ?`,
                    [resetTokenHash, resetTokenExpires, email]
                );

                if (resetToken) {
                    await sendResetEmail(email, resetToken);

                    // Commit the transaction
                    await connection.commit();

                    return res.status(200).json({ success: true, code: 200, message: 'Password reset email sent' });
                } else {
                    // Rollback transaction in case of error
                    await connection.rollback();
                    return res.status(404).json({ success: false, message: 'Email address not found' });
                }
            } catch (error) {
                console.error('Error during forgot password:', error.message);
                return res.status(500).json({ success: false, message: error.message });
            }
        } else {
            res.setHeader('Allow', ['POST']);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    });

    await middleware(req, res);
}
const sendResetEmail = async (email, token) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        }
    });

    const mailOptions = {
        to: email,
        from: 'no-reply@i-visits.com',
        subject: 'Password Reset',
        text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process:\n\n
        ${FRONTEND_URL}?token=${token}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.`,
    };

    return transporter.sendMail(mailOptions);
};
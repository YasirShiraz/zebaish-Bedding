import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            // Return success even if user not found to prevent email enumeration
            return NextResponse.json({ success: true });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

        // Save to database
        await prisma.user.update({
            where: { id: user.id },
            data: {
                resetToken,
                resetTokenExpiry,
            },
        });

        // Send Email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;

        const mailOptions = {
            from: `"Zebaish Security" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Reset Your Password - Zebaish Bedding',
            html: `
                <div style="font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #4a5568; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
                    <h2 style="color: #2d3748; text-align: center;">Password Reset Request</h2>
                    <p>Hello ${user.name || 'User'},</p>
                    <p>We received a request to reset your password for your Zebaish Bedding account.</p>
                    <p>Click the button below to set a new password:</p>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${resetUrl}" style="background-color: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">Reset Password</a>
                    </div>
                    <p style="font-size: 14px; color: #718096;">This link will expire in 1 hour.</p>
                    <p style="font-size: 14px; color: #718096;">If you didn't request this, you can safely ignore this email.</p>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("Forgot password error:", error);
        return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
    }
}

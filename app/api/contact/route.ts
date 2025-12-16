import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const { name, email, message } = await request.json();

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Email to Admin
        const mailOptionsAdmin = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Send to self (admin)
            replyTo: email,
            subject: `New Contact Form Submission from ${name}`,
            html: `
                <h3>New Message from Website</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `,
        };

        // Auto-reply to User
        const mailOptionsUser = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Thank you for contacting Zebaish Bedding',
            html: `
                <h3>Hello ${name},</h3>
                <p>Thank you for reaching out to us. We have received your message and will get back to you shortly.</p>
                <br>
                <p>Best regards,</p>
                <p><strong>Zebaish Bedding Team</strong></p>
            `,
        };

        // Send both emails
        await Promise.all([
            transporter.sendMail(mailOptionsAdmin),
            transporter.sendMail(mailOptionsUser),
        ]);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Email sending error:', error);
        return NextResponse.json(
            { error: 'Failed to send email' },
            { status: 500 }
        );
    }
}

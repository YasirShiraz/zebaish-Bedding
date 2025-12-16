import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const session = await getSession();
        // Allow guest checkout? For now let's assume user might not be logged in, 
        // but better if they are. If not, userId is null.

        const body = await request.json();
        const { items, customerDetails } = body;

        if (!items || items.length === 0) {
            return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
        }

        // Calculate total from database prices to be secure
        let total = 0;
        const orderItemsData = [];

        for (const item of items) {
            // Fetch product to get real price (avoid client manipulation)
            // Note: item.id in cart might be 'code'? or database ID?
            // In current app, cart items have 'id' which seems to be 'code' or similar.
            // Let's assume we need to find by some identifier. 
            // Ideally cart items should reference database Product IDs.
            // If we are transitioning, we might need to look up by slug or code if DB id is not present.
            // Let's try to match by ID first.

            let product = await prisma.product.findUnique({ where: { id: item.id } });

            // Fallback: try finding by slug/code if ID lookup fails (legacy support)
            if (!product) {
                // This might fail if the frontend is still sending old IDs. 
                // For the new "dynamic" app, frontend should send DB IDs.
                // We will handle this in frontend integration.
                // For now, assume valid DB IDs.
                continue;
            }

            total += product.price * item.quantity;
            orderItemsData.push({
                productId: product.id,
                quantity: item.quantity,
                price: product.price,
            });
        }

        if (orderItemsData.length === 0) {
            return NextResponse.json({ error: 'Invalid products' }, { status: 400 });
        }


        const order = await prisma.order.create({
            data: {
                userId: (session?.id || session?.userId) as string || null,
                status: 'PENDING',
                total: total,
                customerName: customerDetails?.fullName,
                customerEmail: customerDetails?.email,
                phone: customerDetails?.phone,
                address: customerDetails?.address,
                city: customerDetails?.city,
                items: {
                    create: orderItemsData,
                },
            },
        });

        // Send Email Notifications
        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            // Email to Customer
            const mailOptionsCustomer = {
                from: `"Zebaish Administration" <${process.env.EMAIL_USER}>`,
                to: customerDetails.email,
                subject: `Order Confirmation - #${order.id.slice(-6).toUpperCase()}`,
                html: `
                    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #4a5568; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
                        <div style="text-align: center; margin-bottom: 20px;">
                            <h2 style="color: #2d3748; margin: 0;">ZEBAISH BEDDING</h2>
                            <p style="font-size: 14px; color: #718096;">Premium Comfort for Your Home</p>
                        </div>
                        
                        <p>Dear ${customerDetails.fullName},</p>
                        <p>Thank you for choosing Zebaish. Your order has been successfully placed and is pending processing.</p>
                        
                        <div style="background: #f7fafc; padding: 20px; border-radius: 8px; margin: 25px 0; border: 1px solid #edf2f7;">
                            <h3 style="margin-top: 0; color: #2d3748; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">Order Summary</h3>
                            <p style="margin: 5px 0;"><strong>Order ID:</strong> #${order.id.slice(-6).toUpperCase()}</p>
                            <p style="margin: 5px 0;"><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
                            <p style="margin: 5px 0;"><strong>Total Amount:</strong> <span style="color: #48bb78; font-weight: bold;">Rs ${total.toFixed(2)}</span></p>
                            <p style="margin: 5px 0;"><strong>Payment Method:</strong> Cash on Delivery (COD)</p>
                        </div>
                        
                        <h3 style="color: #2d3748;">Items Ordered:</h3>
                        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                            ${items.map((item: any) => `
                                <tr style="border-bottom: 1px solid #edf2f7;">
                                    <td style="padding: 10px 0;">${item.name || 'Product'} <span style="color: #718096; font-size: 12px;">(x${item.quantity})</span></td>
                                    <td style="padding: 10px 0; text-align: right;">Rs ${(item.price * item.quantity).toFixed(2)}</td>
                                </tr>
                            `).join('')}
                        </table>

                        <div style="background: #ebf8ff; padding: 15px; border-radius: 6px; font-size: 13px; color: #2c5282;">
                            <p style="margin: 0;"><strong>Shipping Address:</strong><br/>${customerDetails.address}, ${customerDetails.city}<br/>${customerDetails.phone}</p>
                        </div>

                        <p style="margin-top: 30px; font-size: 12px; text-align: center; color: #a0aec0;">
                            If you have questions, reply to this email or contact support.<br/>
                            &copy; ${new Date().getFullYear()} Zebaish Bedding. All rights reserved.
                        </p>
                    </div>
                `,
            };

            // Email to Admin
            const mailOptionsAdmin = {
                from: `"Zebaish System" <${process.env.EMAIL_USER}>`,
                to: process.env.EMAIL_USER,
                subject: `[ADMIN] New Order #${order.id.slice(-6).toUpperCase()}`,
                html: `
                    <div style="font-family: monospace; line-height: 1.4; color: #333; max-width: 600px; border: 2px solid #000; padding: 20px;">
                        <h2 style="border-bottom: 2px solid #000; padding-bottom: 10px; margin-top: 0;">ADMINISTRATION NOTIFICATION</h2>
                        
                        <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
                            <div>
                                <strong>TYPE:</strong> NEW_ORDER<br/>
                                <strong>ID:</strong> #${order.id.slice(-6).toUpperCase()}<br/>
                                <strong>TIME:</strong> ${new Date().toISOString()}
                            </div>
                            <div style="text-align: right;">
                                <strong>VALUE:</strong> Rs ${total.toFixed(2)}<br/>
                                <strong>STATUS:</strong> PENDING
                            </div>
                        </div>

                        <div style="background: #eee; padding: 10px; margin-bottom: 20px;">
                            <strong>CUSTOMER DETAILS:</strong><br/>
                            Name: ${customerDetails.fullName}<br/>
                            Email: ${customerDetails.email}<br/>
                            Phone: ${customerDetails.phone}<br/>
                            Location: ${customerDetails.city}
                        </div>

                        <strong>ACTION REQUIRED:</strong><br/>
                        1. Verify inventory.<br/>
                        2. Print shipping label.<br/>
                        3. Dispatch package.<br/>
                        <br/>
                        
                        <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/admin/orders" 
                           style="display: block; background: #000; color: #fff; text-decoration: none; padding: 15px; text-align: center; font-weight: bold; text-transform: uppercase;">
                           ACCESS ADMIN PANEL
                        </a>
                    </div>
                `,
            };

            await Promise.all([
                transporter.sendMail(mailOptionsCustomer),
                transporter.sendMail(mailOptionsAdmin),
            ]);

        } catch (emailError) {
            console.error("Failed to send order emails:", emailError);
            // Don't fail the request if email fails, just log it
        }

        return NextResponse.json({ success: true, orderId: order.id });
    } catch (error) {
        console.error("Checkout error:", error);
        return NextResponse.json({ error: 'Checkout failed' }, { status: 500 });
    }
}

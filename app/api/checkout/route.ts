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

        console.log('=== CHECKOUT API CALLED ===');
        console.log('Items received:', JSON.stringify(items, null, 2));
        console.log('Customer details:', customerDetails);

        if (!items || items.length === 0) {
            console.log('ERROR: Cart is empty');
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

            console.log(`Looking up product with ID: ${item.id}`);
            let product = null;

            // Try ID lookup only if it looks like a valid MongoDB ObjectId
            if (item.id && typeof item.id === 'string' && item.id.length === 24 && /^[0-9a-fA-F]+$/.test(item.id)) {
                try {
                    product = await prisma.product.findUnique({ where: { id: item.id } });
                } catch (e) {
                    console.log(`Prisma ID lookup failed for ${item.id}, moving to slug...`);
                }
            }

            // Fallback: try finding by slug or code
            if (!product) {
                const searchIdentifier = item.slug || item.id || item.code;
                console.log(`Product not found by ID, trying identifier: ${searchIdentifier}`);
                try {
                    product = await prisma.product.findUnique({ where: { slug: searchIdentifier } });
                } catch (e) {
                    console.error(`Prisma identifier lookup failed for ${searchIdentifier}`);
                }
            }

            if (!product) {
                console.error(`ERROR: Product not found for item:`, item.name || item.id);
                return NextResponse.json({
                    error: `Product "${item.name || 'Unknown'}" not found. Please refresh your cart and try again.`
                }, { status: 400 });
            }

            console.log(`Found product: ${product.name} (${product.id}) - Price: Rs ${product.price}`);

            total += (product.salePrice && product.salePrice < product.price ? product.salePrice : product.price) * item.quantity;
            orderItemsData.push({
                productId: product.id,
                quantity: item.quantity,
                price: product.salePrice && product.salePrice < product.price ? product.salePrice : product.price,
            });
        }

        if (orderItemsData.length === 0) {
            console.log('ERROR: No valid products in order');
            return NextResponse.json({ error: 'Invalid products' }, { status: 400 });
        }

        console.log(`Creating order with ${orderItemsData.length} items, total: Rs ${total}`);



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
            include: {
                items: {
                    include: {
                        product: {
                            select: {
                                name: true,
                                slug: true
                            }
                        }
                    }
                }
            }
        });

        // Send Email Notification to Admin
        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            const itemsHtml = order.items.map(item => `
                <tr>
                    <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.product.name}</td>
                    <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.quantity}</td>
                    <td style="padding: 8px; border-bottom: 1px solid #eee;">Rs ${Math.round(item.price).toLocaleString()}</td>
                    <td style="padding: 8px; border-bottom: 1px solid #eee;">Rs ${Math.round(item.price * item.quantity).toLocaleString()}</td>
                </tr>
            `).join('');

            const mailOptionsAdmin = {
                from: `"Zebaish Bedding" <${process.env.EMAIL_USER}>`,
                to: process.env.EMAIL_USER, // Admin Email
                subject: `New Order Received! #${order.id.slice(0, 8).toUpperCase()}`,
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
                        <div style="background-color: #000; color: #fff; padding: 20px; text-align: center;">
                            <h1 style="margin: 0; font-size: 24px;">New Order Received</h1>
                            <p style="margin: 5px 0 0; opacity: 0.8;">Order ID: #${order.id}</p>
                        </div>
                        
                        <div style="padding: 20px;">
                            <h2 style="font-size: 18px; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px;">Customer Details</h2>
                            <p><strong>Name:</strong> ${order.customerName}</p>
                            <p><strong>Email:</strong> ${order.customerEmail}</p>
                            <p><strong>Phone:</strong> ${order.phone}</p>
                            <p><strong>Address:</strong> ${order.address}, ${order.city}</p>
                            
                            <h2 style="font-size: 18px; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px; margin-top: 30px;">Order Summary</h2>
                            <table style="width: 100%; border-collapse: collapse;">
                                <thead>
                                    <tr style="background-color: #f8f8f8;">
                                        <th style="padding: 8px; text-align: left;">Item</th>
                                        <th style="padding: 8px; text-align: left;">Qty</th>
                                        <th style="padding: 8px; text-align: left;">Price</th>
                                        <th style="padding: 8px; text-align: left;">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${itemsHtml}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colspan="3" style="padding: 15px 8px; text-align: right; font-weight: bold;">Grand Total:</td>
                                        <td style="padding: 15px 8px; font-weight: bold; color: #000;">Rs ${Math.round(total).toLocaleString()}</td>
                                    </tr>
                                </tfoot>
                            </table>
                            
                            <div style="margin-top: 30px; padding: 15px; background-color: #fff8e1; border-radius: 5px; text-align: center;">
                                <p style="margin: 0; font-weight: bold; color: #f57c00;">Awaiting WhatsApp Confirmation</p>
                            </div>
                        </div>
                        
                        <div style="background-color: #f8f8f8; color: #888; padding: 15px; text-align: center; font-size: 12px;">
                            <p style="margin: 0;">&copy; ${new Date().getFullYear()} Zebaish Bedding. All rights reserved.</p>
                        </div>
                    </div>
                `,
            };

            await transporter.sendMail(mailOptionsAdmin);
            console.log("✅ Admin notification email sent");

        } catch (emailError) {
            console.error("❌ Failed to send admin notification email:", emailError);
            // Don't fail the request if email fails, just log it
        }

        console.log(`✅ Order created successfully! Order ID: ${order.id}`);
        return NextResponse.json({
            success: true,
            orderId: order.id,
            message: "Order placed successfully"
        });
    } catch (error) {
        console.error("❌ CHECKOUT API ERROR:", error);
        return NextResponse.json({
            error: (error as Error).message || 'An unexpected error occurred',
            success: false
        }, { status: 500 });
    }
}

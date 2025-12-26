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
            let product = await prisma.product.findUnique({ where: { id: item.id } });

            // Fallback: try finding by slug if ID lookup fails
            if (!product && item.slug) {
                console.log(`Product not found by ID, trying slug: ${item.slug}`);
                product = await prisma.product.findUnique({ where: { slug: item.slug } });
            }

            if (!product) {
                console.error(`ERROR: Product not found for item:`, item);
                return NextResponse.json({
                    error: `Product "${item.name}" not found. Please refresh your cart and try again.`
                }, { status: 400 });
            }

            console.log(`Found product: ${product.name} (${product.id}) - Price: Rs ${product.price}`);


            total += product.price * item.quantity;
            orderItemsData.push({
                productId: product.id,
                quantity: item.quantity,
                price: product.price,
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
        });

        // Send Email Notifications
        /* 
        NOTE: Email notifications disabled in favor of manual WhatsApp confirmation.
        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            // ... email sending logic ...

            await Promise.all([
                transporter.sendMail(mailOptionsCustomer),
                transporter.sendMail(mailOptionsAdmin),
            ]);

        } catch (emailError) {
            console.error("Failed to send order emails:", emailError);
            // Don't fail the request if email fails, just log it
        }
        */

        console.log(`✅ Order created successfully! Order ID: ${order.id}`);
        return NextResponse.json({ success: true, orderId: order.id });
    } catch (error) {
        console.error("❌ CHECKOUT ERROR:", error);
        return NextResponse.json({ error: 'Checkout failed: ' + (error as Error).message }, { status: 500 });
    }
}

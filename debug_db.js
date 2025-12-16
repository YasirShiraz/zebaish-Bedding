
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        console.log("Attempting to create a test product directly via Prisma...");
        const product = await prisma.product.create({
            data: {
                name: "Debug Product " + Date.now(),
                slug: "debug-product-" + Date.now(),
                description: "Test description",
                price: 100,
                categoryId: (await prisma.category.findFirst()).id, // Get first existing category
                images: "[]",
                shippingCost: 0,
                taxRate: 0,
                variants: {
                    create: [
                        { name: "Test Size", price: 110, stock: 5 }
                    ]
                }
            }
        });
        console.log("SUCCESS: Product created!", product.id);
    } catch (e) {
        console.error("FAILURE: Error creating product:", e);
    } finally {
        await prisma.$disconnect();
    }
}

main();

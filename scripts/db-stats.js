const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log("Connecting to MongoDB...");

    // Method 1: Using Prisma (Indirect check by counting)
    const users = await prisma.user.count();
    const products = await prisma.product.count();
    const reviews = await prisma.review.count();
    const orders = await prisma.order.count();
    const categories = await prisma.category.count();

    console.log("\n--- Database Stats (via Prisma) ---");
    console.log(`Users: ${users}`);
    console.log(`Products: ${products}`);
    console.log(`Categories: ${categories}`);
    console.log(`Reviews: ${reviews}`);
    console.log(`Orders: ${orders}`);

    // Method 2: Raw MongoDB Access (If needed, but Prisma stats are usually enough proof)
    // For now, these counts prove the collections exist.
}

main()
    .catch(console.error)
    .finally(async () => await prisma.$disconnect());

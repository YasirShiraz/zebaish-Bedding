const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const products = await prisma.product.findMany({
            include: { category: true }
        });
        console.log("Total Products:", products.length);
        products.forEach(p => {
            console.log(`- Name: ${p.name}, Price: ${p.price}, Category: ${p.category?.name}`);
        });
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();

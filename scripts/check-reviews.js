const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const count = await prisma.review.count();
        console.log(`Total Reviews: ${count}`);

        const reviews = await prisma.review.findMany({
            include: {
                user: true,
                product: true
            }
        });
        console.log('Reviews fetched successfully');
        console.log(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
    }
}

main()
    .finally(async () => await prisma.$disconnect());

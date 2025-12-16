const { PrismaClient } = require('@prisma/client');
const { hash } = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    // Seed Categories
    const categories = [
        "Bed Sheets",
        "Duvet Sets",
        "Comforters",
        "Pillows",
        "Kids Bedding",
        "Bridal Bedding",
        "Sofa Covers",
    ];

    for (const name of categories) {
        await prisma.category.upsert({
            where: { slug: name.toLowerCase().replace(/ /g, '-') },
            update: {},
            create: {
                name,
                slug: name.toLowerCase().replace(/ /g, '-'),
                description: `Premium ${name} collection`,
            },
        });
    }

    // Seed Admin User (Optional - helpful for dev)
    const password = await hash('admin123', 12);
    await prisma.user.upsert({
        where: { email: 'admin@zebaish.com' },
        update: {},
        create: {
            email: 'admin@zebaish.com',
            name: 'Admin User',
            password,
            role: 'ADMIN',
        },
    });

    console.log('Database seeded!');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });


import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Seeding CMS content...')

    // 1. Seed Hero Slides
    const heroSlides = [
        {
            title: "Luxury Bedding Collection",
            description: "Experience the comfort of royalty with our premium cotton and velvet bedding sets.",
            cta: "Home Collection",
            link: "/products",
            image: "/images/bedding/new/hero_new_1.png",
            order: 0,
            isActive: true
        },
        {
            title: "Bridal Bedroom Essentials",
            description: "Transform your special space with our exquisite bridal sets, designed for elegance and romance.",
            cta: "View Bridal Sets",
            link: "/products",
            image: "/images/zebaish1 (1).jpg",
            order: 1,
            isActive: true
        },
        {
            title: "Premium Home Textiles",
            description: "From soft duvets to crisp sheets, find everything you need for a perfect night's sleep.",
            cta: "Explore More",
            link: "/products",
            image: "/images/bedding/new/hero_new_2.png",
            order: 2,
            isActive: true
        },
    ]

    for (const slide of heroSlides) {
        await prisma.heroSlide.create({
            data: slide
        })
    }

    // 2. Seed Site Settings
    const settings = [
        { key: "contact_email", value: "zebaishbedding@gmail.com" },
        { key: "contact_phone", value: "+92 345 3177990" },
        { key: "contact_address", value: "Home# 35, Mohammadi Homeping Center,\nHydri Market, Block G,\nNorth Nazimabad Town, Karachi" },
        { key: "footer_description", value: "Transform your living space with our premium bedding and home accessories. Quality, comfort, and style in every thread." },
        { key: "social_instagram", value: "https://instagram.com" },
        { key: "social_facebook", value: "https://facebook.com" },
    ]

    for (const setting of settings) {
        await prisma.siteSetting.upsert({
            where: { key: setting.key },
            update: {},
            create: setting
        })
    }

    // 3. Seed Home Page Content
    // Stats
    await prisma.homePageContent.upsert({
        where: { sectionId: "stats" },
        update: {},
        create: {
            sectionId: "stats",
            content: JSON.stringify([
                { value: "500+", label: "Premium Designs" },
                { value: "10k+", label: "Happy Customers" },
                { value: "100%", label: "Cotton Guarantee" },
                { value: "24/7", label: "Customer Support" },
            ])
        }
    })

    // Services
    await prisma.homePageContent.upsert({
        where: { sectionId: "services" },
        update: {},
        create: {
            sectionId: "services",
            content: JSON.stringify([
                {
                    title: "Nationwide Delivery",
                    description: "Fast and reliable shipping across the country directly to your doorstep.",
                    icon: "truck"
                },
                {
                    title: "Premium Packaging",
                    description: "Beautifully packaged, making our products perfect for wedding gifts.",
                    icon: "gift"
                },
                {
                    title: "Easy Returns",
                    description: "Not satisfied? Return within 30 days for a full refund, no questions asked.",
                    icon: "refresh"
                },
                {
                    title: "Secure Payments",
                    description: "Home with confidence using our encrypted payment gateway.",
                    icon: "shield"
                },
            ])
        }
    })

    // CTA
    await prisma.homePageContent.upsert({
        where: { sectionId: "cta" },
        update: {},
        create: {
            sectionId: "cta",
            content: JSON.stringify({
                title: "Ready to Transform <br /> Your Space?",
                description: "Explore our premium collection and discover the perfect bedding for your home sanctuary.",
                image: "/images/zebaish2.jpg",
                buttonText: "Shop Now",
                buttonLink: "/products"
            })
        }
    })

    console.log('CMS content seeded successfully.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

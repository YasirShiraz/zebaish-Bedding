import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://zebaishbedding.com'

    // Static routes
    const staticRoutes = [
        '',
        '/products',
        '/cart',
        '/login',
        '/signup',
        '/contact',
        '/shipping-policy',
        '/returns',
        '/faq',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    // Dynamic Product routes
    const products = await prisma.product.findMany({
        select: {
            slug: true,
            updatedAt: true,
        },
    })

    const productRoutes = products.map((product) => ({
        url: `${baseUrl}/products/${product.slug}`,
        lastModified: product.updatedAt,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }))

    return [...staticRoutes, ...productRoutes]
}

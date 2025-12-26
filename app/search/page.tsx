import ProductGrid from "@/components/home/ProductGrid";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
    title: "Search Results - Zebaish Bedding",
    description: "Search results for your query",
};

// Helper to get image
const getProductImage = (product: any): string => {
    if (product.image && typeof product.image === "string") return product.image;
    if (product.images && typeof product.images === "string") {
        try {
            const parsed = JSON.parse(product.images);
            return Array.isArray(parsed) && parsed[0] ? parsed[0] : "/images/placeholder.jpg";
        } catch {
            return "/images/placeholder.jpg";
        }
    }
    return "/images/placeholder.jpg";
};

export default async function SearchPage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string }>;
}) {
    const { q } = await searchParams;
    const query = q || "";
    const searchTerm = query.toLowerCase().trim();

    // Fetch products from DB
    const dbProducts = await prisma.product.findMany({
        where: {
            OR: [
                { name: { contains: searchTerm, mode: 'insensitive' } },
                { description: { contains: searchTerm, mode: 'insensitive' } },
                {
                    category: {
                        name: { contains: searchTerm, mode: 'insensitive' }
                    }
                }
            ]
        },
        include: {
            category: true
        }
    });

    // Map to ProductGrid format
    const gridProducts = dbProducts.map((p) => ({
        id: p.slug,
        name: p.name,
        price: p.salePrice || p.price,
        oldPrice: p.salePrice ? p.price : undefined,
        image: getProductImage(p),
        category: p.category.name,
        discountBadge: p.salePrice ? `-${Math.round(((p.price - p.salePrice) / p.price) * 100)}%` : undefined
    }));

    return (
        <div className="bg-white dark:bg-black min-h-screen">
            <div className="bg-gray-50 dark:bg-gray-900/50 py-10 md:py-16 border-b border-gray-100 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-3xl font-serif text-gray-900 dark:text-white">
                        Search Results
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Found {gridProducts.length} results for "{query}"
                    </p>
                </div>
            </div>

            {gridProducts.length > 0 ? (
                <ProductGrid
                    title=""
                    products={gridProducts}
                />
            ) : (
                <div className="max-w-7xl mx-auto px-4 text-center py-20">
                    <p className="text-xl text-gray-500">
                        No products found matching your search.
                    </p>
                    <a href="/" className="mt-4 inline-block text-blue-600 hover:scale-105 transition-transform">
                        Return to Home
                    </a>
                </div>
            )}
        </div>
    );
}

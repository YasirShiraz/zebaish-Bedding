import { allCollections } from "@/lib/products";
import ProductGrid from "@/components/home/ProductGrid";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Search Results - Zebaish Bedding",
    description: "Search results for your query",
};

export default async function SearchPage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string }>;
}) {
    const { q } = await searchParams;
    const query = q || "";
    const searchTerm = query.toLowerCase().trim();

    // Filter products
    const filteredProducts = allCollections.filter((product) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );

    // Map to ProductGrid format
    const gridProducts = filteredProducts.map((p) => ({
        id: p.slug,
        name: p.name,
        price: p.price,
        image: p.image,
    }));

    return (
        <div className="pt-8 pb-16 min-h-screen">
            <div className="bg-gray-50 dark:bg-gray-900 py-8 mb-8">
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

import Link from "next/link";
import Image from "next/image";
import { allCollections, getProductImage, getProductPrice } from "@/lib/products";

export default function NewArrivals() {
    // Get the latest 4 products (or just the first 4 for now)
    const newArrivals = allCollections.slice(0, 4);

    return (
        <section className="py-12 bg-gray-50 dark:bg-gray-900">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">New Arrivals</h2>
                    <Link href="/products" className="text-blue-600 hover:text-blue-500 font-medium">
                        View All &rarr;
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {newArrivals.map((product) => (
                        <Link key={product.code} href={product.link} className="group">
                            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-700">
                                    <Image
                                        src={getProductImage(product.code)}
                                        alt={product.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                                        NEW
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors line-clamp-1">
                                        {product.name}
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{product.category}</p>
                                    <div className="mt-2 flex items-center justify-between">
                                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                                            ${getProductPrice(product.code).toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

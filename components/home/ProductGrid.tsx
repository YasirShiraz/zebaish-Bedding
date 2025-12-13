"use client";

import Link from "next/link";
import Image from "next/image";

interface Product {
    id: string;
    name: string;
    price: number;
    oldPrice?: number;
    image: string;
    discountBadge?: string; // e.g., "-20%"
}

interface ProductGridProps {
    title: string;
    products: Product[];
    viewAllLink?: string;
}

export default function ProductGrid({ title, products, viewAllLink }: ProductGridProps) {
    return (
        <section className="py-16 bg-white dark:bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-center mb-10 relative">
                    <h2 className="text-3xl md:text-4xl font-serif text-center text-gray-900 dark:text-white uppercase tracking-widest relative z-10 px-4 bg-white dark:bg-black">
                        {title}
                    </h2>
                    <div className="absolute w-full h-[1px] bg-gray-300 dark:bg-gray-700 top-1/2 left-0 -z-0"></div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
                    {products.map((product) => (
                        <div key={product.id} className="group relative">
                            {/* Image Container */}
                            <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4 rounded-sm">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
                                />

                                {/* Discount Badge */}
                                {product.discountBadge && (
                                    <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-sm">
                                        {product.discountBadge}
                                    </div>
                                )}

                                {/* Quick Action Overlay */}
                                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full transition-transform duration-300 group-hover:translate-y-0 flex justify-center pb-6">
                                    <button className="bg-white text-black text-sm font-semibold px-6 py-2 shadow-lg hover:bg-black hover:text-white transition-colors duration-300 uppercase tracking-wide">
                                        Quick View
                                    </button>
                                </div>
                            </div>

                            {/* Product Info */}
                            <div className="text-center">
                                <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                    <Link href={`/products/${product.id}`}>
                                        <span aria-hidden="true" className="absolute inset-0" />
                                        {product.name}
                                    </Link>
                                </h3>
                                <div className="mt-1 flex items-center justify-center gap-2">
                                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                                        ${product.price.toFixed(2)}
                                    </p>
                                    {product.oldPrice && (
                                        <p className="text-sm text-gray-500 line-through">
                                            ${product.oldPrice.toFixed(2)}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {viewAllLink && (
                    <div className="mt-12 text-center">
                        <Link
                            href={viewAllLink}
                            className="inline-block border-b-2 border-black dark:border-white pb-1 text-sm font-bold uppercase tracking-widest hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                        >
                            View All Products
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}

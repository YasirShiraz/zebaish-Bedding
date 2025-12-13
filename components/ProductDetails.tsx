"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";

import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";

export default function ProductDetails({
    product,
    relatedProducts,
}: {
    product: any;
    relatedProducts: any[];
}) {
    const router = useRouter();
    const { addToCart } = useCart();
    const [activeTab, setActiveTab] = useState("description");

    return (
        <div className="bg-white dark:bg-black min-h-screen">
            {/* Breadcrumbs */}
            <nav className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center space-x-2 text-sm">
                        <Link
                            href="/"
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                            Home
                        </Link>
                        <span className="text-gray-400 dark:text-gray-600">/</span>
                        <Link
                            href="/products"
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                            Collections
                        </Link>
                        <span className="text-gray-400 dark:text-gray-600">/</span>
                        <span className="text-gray-900 dark:text-white font-medium truncate max-w-[200px] sm:max-w-none">
                            {product.name}
                        </span>
                    </div>
                </div>
            </nav>

            <section className="py-12 sm:py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
                        {/* Left Column: Product Image */}
                        <div className="space-y-4">
                            <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800 relative shadow-lg group">
                                {/* Badge */}
                                <div className="absolute top-4 left-4 z-10">
                                    <span className="inline-flex items-center rounded-full bg-white/90 backdrop-blur-md px-4 py-1.5 text-xs font-bold text-gray-900 shadow-sm border border-gray-100">
                                        {product.price > 150 ? "Premium Collection" : "Best Seller"}
                                    </span>
                                </div>

                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    priority
                                />
                            </div>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-3 gap-4">
                                <div className="flex flex-col items-center text-center p-3 rounded-lg bg-gray-50 dark:bg-gray-900">
                                    <svg
                                        className="w-6 h-6 text-blue-600 mb-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                                        />
                                    </svg>
                                    <span className="text-xs font-semibold text-gray-900 dark:text-white">
                                        Free Shipping
                                    </span>
                                </div>
                                <div className="flex flex-col items-center text-center p-3 rounded-lg bg-gray-50 dark:bg-gray-900">
                                    <svg
                                        className="w-6 h-6 text-blue-600 mb-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <span className="text-xs font-semibold text-gray-900 dark:text-white">
                                        Premium Quality
                                    </span>
                                </div>
                                <div className="flex flex-col items-center text-center p-3 rounded-lg bg-gray-50 dark:bg-gray-900">
                                    <svg
                                        className="w-6 h-6 text-blue-600 mb-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                        />
                                    </svg>
                                    <span className="text-xs font-semibold text-gray-900 dark:text-white">
                                        Secure Checkout
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Product Details */}
                        <div className="flex flex-col">
                            <div className="border-b border-gray-100 dark:border-gray-800 pb-8 mb-8">
                                <div className="mb-4 flex items-center gap-2">
                                    <Link
                                        href="/products"
                                        className="text-sm font-medium text-blue-600 hover:underline"
                                    >
                                        {product.category}
                                    </Link>
                                    <span className="h-1 w-1 rounded-full bg-gray-300"></span>
                                    <span className="text-sm text-green-600 font-medium flex items-center gap-1">
                                        <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                                        In Stock
                                    </span>
                                </div>

                                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 font-serif leading-tight">
                                    {product.name}
                                </h1>

                                <div className="flex items-center gap-4 mb-6">
                                    <div className="flex text-yellow-400 text-sm">
                                        {[...Array(5)].map((_, i) => (
                                            <svg
                                                key={i}
                                                className="w-5 h-5 fill-current"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <span className="text-sm text-gray-500 underline decoration-gray-300 underline-offset-4">
                                        42 Reviews
                                    </span>
                                </div>

                                <div className="flex items-baseline gap-4 mb-6">
                                    <p className="text-4xl font-bold text-gray-900 dark:text-white">
                                        ${product.price.toFixed(2)}
                                    </p>
                                    <p className="text-lg text-gray-400 line-through">
                                        ${(product.price * 1.2).toFixed(2)}
                                    </p>
                                    <span className="text-sm font-bold text-red-600 bg-red-50 dark:bg-red-900/30 px-2 py-1 rounded">
                                        Save 20%
                                    </span>
                                </div>

                                <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                                    {product.description}
                                </p>
                            </div>

                            {/* Add to Cart */}
                            <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-2xl mb-8">
                                <div className="flex flex-col gap-4">
                                    <AddToCartButton
                                        product={{
                                            id: product.code,
                                            name: product.name,
                                            code: product.code,
                                            category: product.category,
                                            image: product.image,
                                            slug: product.slug,
                                        }}
                                        variant="large"
                                        className="w-full text-lg py-4"
                                    />
                                    <button
                                        onClick={() => {
                                            addToCart({
                                                id: product.code,
                                                name: product.name,
                                                code: product.code,
                                                category: product.category,
                                                image: product.image,
                                                price: product.price,
                                                slug: product.slug,
                                            });
                                            router.push("/checkout");
                                        }}
                                        className="w-full rounded-lg bg-black dark:bg-white text-white dark:text-black py-4 text-lg font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors shadow-lg"
                                    >
                                        Buy Now
                                    </button>
                                    <p className="text-xs text-center text-gray-500">
                                        Free 30-Day Returns • 100% Satisfaction Guarantee
                                    </p>
                                </div>
                            </div>

                            {/* Tabs */}
                            <div className="mt-8">
                                <div className="flex border-b border-gray-200 dark:border-gray-800">
                                    {["description", "specifications", "reviews"].map((tab) => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveTab(tab)}
                                            className={`px-6 py-3 text-sm font-medium transition-all relative ${activeTab === tab
                                                ? "text-blue-600 dark:text-white"
                                                : "text-gray-500 hover:text-gray-700 dark:text-gray-400"
                                                }`}
                                        >
                                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                            {activeTab === tab && (
                                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></span>
                                            )}
                                        </button>
                                    ))}
                                </div>

                                <div className="py-6">
                                    {activeTab === "description" && (
                                        <div className="prose dark:prose-invert max-w-none animate-fade-in-up">
                                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                                                {product.longDescription || product.description}
                                            </p>
                                            {product.features && (
                                                <div className="mt-6">
                                                    <h4 className="font-bold text-gray-900 dark:text-white mb-3 text-lg">
                                                        Key Features
                                                    </h4>
                                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                        {product.features.map(
                                                            (feature: string, idx: number) => (
                                                                <li
                                                                    key={idx}
                                                                    className="flex items-center text-gray-600 dark:text-gray-300"
                                                                >
                                                                    <svg
                                                                        className="w-5 h-5 text-green-500 mr-2"
                                                                        fill="none"
                                                                        stroke="currentColor"
                                                                        viewBox="0 0 24 24"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            strokeWidth={2}
                                                                            d="M5 13l4 4L19 7"
                                                                        />
                                                                    </svg>
                                                                    {feature}
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {activeTab === "specifications" && product.specifications && (
                                        <div className="animate-fade-in-up">
                                            <dl className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                                                {Object.entries(product.specifications).map(
                                                    ([key, value]) => (
                                                        <div
                                                            key={key}
                                                            className="border-b border-gray-100 dark:border-gray-800 pb-3"
                                                        >
                                                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                                {key}
                                                            </dt>
                                                            <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:col-span-2 sm:mt-0">
                                                                {value as string}
                                                            </dd>
                                                        </div>
                                                    )
                                                )}
                                            </dl>
                                        </div>
                                    )}

                                    {activeTab === "reviews" && (
                                        <div className="animate-fade-in-up text-center py-8">
                                            <div className="inline-flex flex-col items-center">
                                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                                    4.8
                                                </h3>
                                                <div className="flex text-yellow-400 my-2">
                                                    {[...Array(5)].map((_, i) => (
                                                        <svg
                                                            key={i}
                                                            className="w-5 h-5 fill-current"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                    ))}
                                                </div>
                                                <p className="text-sm text-gray-500">
                                                    Based on 42 reviews
                                                </p>
                                            </div>
                                            <div className="mt-8 text-left space-y-6">
                                                {[1, 2].map((review) => (
                                                    <div
                                                        key={review}
                                                        className="border-b border-gray-100 dark:border-gray-800 pb-6"
                                                    >
                                                        <div className="flex items-center justify-between mb-2">
                                                            <div className="flex items-center gap-2">
                                                                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                                                                    U{review}
                                                                </div>
                                                                <span className="font-medium text-gray-900 dark:text-white">
                                                                    Verified Buyer
                                                                </span>
                                                            </div>
                                                            <span className="text-xs text-gray-500">
                                                                2 days ago
                                                            </span>
                                                        </div>
                                                        <div className="flex text-yellow-400 text-xs mb-2">
                                                            {[...Array(5)].map((_, i) => (
                                                                <svg
                                                                    key={i}
                                                                    className="w-3 h-3 fill-current"
                                                                    viewBox="0 0 20 20"
                                                                >
                                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                </svg>
                                                            ))}
                                                        </div>
                                                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                                                            Absolutely love this product! The quality is
                                                            outstanding and it arrived faster than expected.
                                                            Highly recommended.
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <section className="py-16 bg-white dark:bg-black border-t border-gray-100 dark:border-gray-900">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-8 font-serif">
                            You May Also Like
                        </h2>
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {relatedProducts.map((related) => (
                                <Link
                                    key={related.slug}
                                    href={`/products/${related.slug}`}
                                    className="group relative flex flex-col rounded-2xl bg-white border border-gray-100 p-4 transition-all hover:shadow-xl dark:bg-gray-900 dark:border-gray-800"
                                >
                                    <div className="aspect-[4/5] w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 relative mb-4">
                                        <Image
                                            src={related.image}
                                            alt={related.name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:text-blue-600 transition-colors">
                                        {related.name}
                                    </h3>
                                    <div className="flex items-center justify-between mt-2">
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {related.category}
                                        </p>
                                        <p className="font-bold text-gray-900 dark:text-white">
                                            ${related.price.toFixed(2)}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <section className="bg-gray-900 py-20 dark:bg-gray-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl font-serif">
                            Complete Your Bedroom Look
                        </h2>
                        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
                            Browse our full catalog for matching accessories, cushions, and
                            throws.
                        </p>
                        <div className="mt-10">
                            <Link
                                href="/products"
                                className="inline-block rounded-full bg-white px-8 py-4 text-base font-bold text-gray-900 shadow-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300 animate-pulse-slow"
                            >
                                View Full Catalog
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

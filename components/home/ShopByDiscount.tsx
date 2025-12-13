"use client";

import Link from "next/link";

export default function ShopByDiscount() {
    const discounts = [
        { label: "FLAT 50% OFF", link: "/products?discount=50" },
        { label: "FLAT 60% OFF", link: "/products?discount=60" },
        { label: "FLAT 70% OFF", link: "/products?discount=70" },
        { label: "UNDER 99$", link: "/products?price_max=99" }
    ];

    return (
        <section className="py-12 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 dark:text-white mb-8 uppercase tracking-wide">
                    Shop By Discount
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {discounts.map((item, index) => (
                        <Link
                            key={index}
                            href={item.link}
                            className="group block overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="h-40 bg-gray-200 dark:bg-gray-800 flex items-center justify-center p-6 transition-transform transform group-hover:scale-105 duration-300">
                                <span className="text-xl md:text-2xl font-bold text-gray-700 dark:text-gray-200 border-2 border-gray-400 dark:border-gray-600 p-4 w-full text-center">
                                    {item.label}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

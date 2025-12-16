"use client";

import { useCart } from "@/contexts/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartPage() {
    const {
        items,
        removeFromCart,
        updateQuantity,
        getTotalPrice,
        clearCart,
    } = useCart();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                    Shopping Cart
                </h1>

                {items.length === 0 ? (
                    <div className="bg-white dark:bg-gray-900 rounded-2xl p-12 text-center border border-gray-200 dark:border-gray-800 shadow-sm">
                        <div className="flex justify-center mb-6">
                            <svg
                                className="h-24 w-24 text-gray-300 dark:text-gray-700"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            Your cart is empty
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                            Looks like you haven't added anything to your cart yet. content matches your premium bedding needs!
                        </p>
                        <Link
                            href="/products"
                            className="inline-flex items-center justify-center rounded-xl bg-[var(--primary)] px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-[var(--primary-hover)] transition-all hover:scale-105"
                        >
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                        {/* Cart Items List */}
                        <div className="lg:col-span-8">
                            <div className="space-y-4">
                                {items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex gap-6 p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm transition-shadow hover:shadow-md"
                                    >
                                        {/* Product Image */}
                                        <div className="relative h-24 w-24 sm:h-32 sm:w-32 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>

                                        {/* Product Details */}
                                        <div className="flex flex-1 flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <p className="text-sm text-[var(--primary)] font-medium mb-1">
                                                            {item.category}
                                                        </p>
                                                        <Link
                                                            href={`/products/${item.slug}`}
                                                            className="text-lg font-bold text-gray-900 dark:text-white hover:text-[var(--primary)] transition-colors line-clamp-2"
                                                        >
                                                            {item.name}
                                                        </Link>
                                                    </div>
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                                        aria-label="Remove item"
                                                    >
                                                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between mt-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex items-center rounded-lg border border-gray-200 dark:border-gray-700 p-1">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
                                                            disabled={item.quantity <= 1}
                                                        >
                                                            <svg className="h-4 w-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                                            </svg>
                                                        </button>
                                                        <span className="w-8 text-center font-medium text-gray-900 dark:text-white">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
                                                        >
                                                            <svg className="h-4 w-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                                <p className="text-xl font-bold text-gray-900 dark:text-white">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-4 mt-8 lg:mt-0">
                            <div className="rounded-2xl bg-white dark:bg-gray-900 p-6 border border-gray-200 dark:border-gray-800 shadow-sm sticky top-24">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                                    Order Summary
                                </h2>

                                <div className="space-y-4 text-sm">
                                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                        <span>Subtotal</span>
                                        <span>${getTotalPrice().toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                        <span>Shipping</span>
                                        <span>Calculated at checkout</span>
                                    </div>
                                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex justify-between items-center text-lg font-bold text-gray-900 dark:text-white">
                                        <span>Total</span>
                                        <span>${getTotalPrice().toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="mt-8 space-y-4">
                                    <Link
                                        href="/checkout"
                                        className="block w-full rounded-xl bg-[var(--primary)] px-6 py-4 text-center text-base font-semibold text-white shadow-lg hover:bg-[var(--primary-hover)] transition-all hover:scale-[1.02]"
                                    >
                                        Proceed to Checkout
                                    </Link>
                                    <button
                                        onClick={clearCart}
                                        className="block w-full rounded-xl border border-gray-200 dark:border-gray-700 px-6 py-4 text-center text-base font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                    >
                                        Clear Cart
                                    </button>
                                    <Link
                                        href="/products"
                                        className="block w-full text-center text-sm text-[var(--primary)] hover:underline"
                                    >
                                        Continue Shopping
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

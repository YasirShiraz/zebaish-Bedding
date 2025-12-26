"use client";

import { useCart } from "@/contexts/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface CartProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Cart({ isOpen, onClose }: CartProps) {
    const { items, removeFromCart, updateQuantity, getTotalPrice } = useCart();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"
                    }`}
                onClick={onClose}
            />

            {/* Cart Drawer */}
            <div
                className={`fixed inset-y-0 right-0 z-50 w-full max-w-md transform bg-white shadow-2xl transition-transform duration-300 ease-in-out dark:bg-gray-900 ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="flex h-full flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-gray-100 px-6 py-6 dark:border-gray-800">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <span className="text-2xl">🛒</span> Shopping Cart
                        </h2>
                        <button
                            onClick={onClose}
                            className="rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Cart Items */}
                    <div className="flex-1 overflow-y-auto px-6 py-4 scrollbar-hide">
                        {items.length === 0 ? (
                            <div className="flex h-full flex-col items-center justify-center text-center">
                                <div className="mb-4 text-6xl">🛍️</div>
                                <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                                    Your cart is empty
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Add some beautiful bedding to your cart to see them here!
                                </p>
                                <button
                                    onClick={onClose}
                                    className="mt-6 rounded-xl bg-[var(--primary)] px-8 py-3 text-sm font-bold text-white shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {items.map((item) => (
                                    <div key={item.id} className="group relative flex gap-4">
                                        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-100 dark:border-gray-800">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover transition-transform duration-300 group-hover:scale-110"
                                            />
                                        </div>
                                        <div className="flex flex-1 flex-col justify-between py-0.5">
                                            <div>
                                                <div className="flex justify-between items-start gap-2">
                                                    <Link
                                                        href={`/products/${item.slug}`}
                                                        className="text-sm font-bold text-gray-900 dark:text-white hover:text-[var(--primary)] transition-colors line-clamp-1"
                                                        onClick={onClose}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="text-gray-400 hover:text-red-500 transition-colors"
                                                    >
                                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                                <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                                                    {item.category}
                                                </p>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 p-1">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="p-1 hover:bg-white dark:hover:bg-gray-700 rounded transition-colors"
                                                    >
                                                        <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                                        </svg>
                                                    </button>
                                                    <span className="w-6 text-center text-xs font-bold text-gray-700 dark:text-gray-300">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="p-1 hover:bg-white dark:hover:bg-gray-700 rounded transition-colors"
                                                    >
                                                        <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                        </svg>
                                                    </button>
                                                </div>
                                                <p className="text-sm font-bold text-gray-900 dark:text-white">
                                                    Rs {(item.price * item.quantity).toFixed(0)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    {items.length > 0 && (
                        <div className="border-t border-gray-100 bg-gray-50/50 px-6 py-8 dark:border-gray-800 dark:bg-gray-900/50">
                            <div className="mb-6 flex items-center justify-between">
                                <span className="text-base font-medium text-gray-600 dark:text-gray-400">Subtotal</span>
                                <span className="text-xl font-bold text-gray-900 dark:text-white">Rs {getTotalPrice().toFixed(0)}</span>
                            </div>
                            <div className="space-y-4">
                                <Link
                                    href="/checkout"
                                    onClick={onClose}
                                    className="block w-full rounded-xl bg-gradient-to-r from-[#667eea] to-[#764ba2] py-4 text-center text-sm font-bold text-white shadow-lg shadow-purple-200 dark:shadow-none transition-all hover:scale-[1.02] active:scale-95"
                                >
                                    Proceed to Checkout
                                </Link>
                                <Link
                                    href="/cart"
                                    onClick={onClose}
                                    className="block w-full rounded-xl border border-gray-200 bg-white py-4 text-center text-sm font-bold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                                >
                                    View Full Cart
                                </Link>
                            </div>
                            <p className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
                                Shipping & taxes calculated at checkout
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

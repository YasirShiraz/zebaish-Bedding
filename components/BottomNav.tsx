"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";

export default function BottomNav() {
    const pathname = usePathname();
    const { items: cart } = useCart();
    const { wishlist } = useWishlist();

    const isActive = (path: string) => pathname === path;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 lg:hidden font-sans">
            <div className="flex items-center justify-around h-16">
                {/* Home */}
                <Link
                    href="/"
                    className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${isActive("/") ? "text-orange-600" : "text-gray-500"
                        }`}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isActive("/") ? 2 : 1.5} d="M3 12l2-2m0 0l7-7 7 7 9.17-1.144M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isActive("/") ? 2 : 1.5} d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10" />
                    </svg>
                    <span className="text-[10px] font-medium">Home</span>
                </Link>

                {/* Account */}
                <Link
                    href="/profile"
                    className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${isActive("/profile") ? "text-orange-600" : "text-gray-500"
                        }`}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isActive("/profile") ? 2 : 1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="text-[10px] font-medium">Account</span>
                </Link>

                {/* New In */}
                <Link
                    href="/products"
                    className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${isActive("/products") ? "text-orange-600" : "text-gray-500"
                        }`}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isActive("/products") ? 2 : 1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <span className="text-[10px] font-medium">New In</span>
                </Link>

                {/* Wishlist */}
                <Link
                    href="/wishlist"
                    className={`flex flex-col items-center justify-center w-full h-full space-y-1 relative ${isActive("/wishlist") ? "text-orange-600" : "text-gray-500"
                        }`}
                >
                    <div className="relative">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isActive("/wishlist") ? 2 : 1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        {wishlist.length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[9px] font-bold w-3.5 h-3.5 flex items-center justify-center rounded-full">{wishlist.length}</span>
                        )}
                    </div>
                    <span className="text-[10px] font-medium">Wishlist</span>
                </Link>

                {/* Cart */}
                <Link
                    href="/cart"
                    className={`flex flex-col items-center justify-center w-full h-full space-y-1 relative ${isActive("/cart") ? "text-orange-600" : "text-gray-500"
                        }`}
                >
                    <div className="relative">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isActive("/cart") ? 2 : 1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        {cart.length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[9px] font-bold w-3.5 h-3.5 flex items-center justify-center rounded-full">
                                {cart.length}
                            </span>
                        )}
                    </div>
                    <span className="text-[10px] font-medium">Cart</span>
                </Link>

            </div >
        </div >
    );
}

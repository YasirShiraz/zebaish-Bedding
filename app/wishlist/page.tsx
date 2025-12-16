"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';

export default function WishlistPage() {
    const { wishlist, removeFromWishlist, loading } = useWishlist();
    const { addToCart } = useCart();
    const { isAuthenticated } = useAuth();
    const [wishlistProducts, setWishlistProducts] = useState<any[]>([]);
    const [pageLoading, setPageLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated) return;

        // Fetch product details for wishlist items
        // Since useWishlist only gives IDs (based on my previous context implementation), 
        // I might need to update API to return full objects or fetch them here.
        // Actually, the API GET /api/wishlist returns full objects { product: ... }.
        // Let's modify useWishlist or fetch directly here.
        // For simplicity, let's fetch here.
        fetch('/api/wishlist')
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to fetch wishlist');
                }
                return res.json();
            })
            .then(data => {
                if (Array.isArray(data)) {
                    setWishlistProducts(data.map((item: any) => item.product));
                } else {
                    console.error("Wishlist data is not an array:", data);
                    setWishlistProducts([]);
                }
                setPageLoading(false);
            })
            .catch(err => {
                console.error(err);
                setWishlistProducts([]);
                setPageLoading(false);
            });
    }, [isAuthenticated, wishlist.length]); // Re-fetch if wishlist count changes (e.g. removed)

    if (pageLoading || loading) {
        return (
            <div className="min-h-screen bg-white dark:bg-black flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-white dark:bg-black py-16 px-4 text-center">
                <h2 className="text-2xl font-bold mb-4 dark:text-white">Please Log In</h2>
                <p className="text-gray-500 mb-8">You need to be logged in to view your wishlist.</p>
                <Link href="/login" className="bg-black text-white px-6 py-3 rounded-lg font-bold uppercase dark:bg-white dark:text-black">
                    Log In
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-black py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-2">My Wishlist</h1>
                <p className="text-gray-500 dark:text-gray-400 mb-12">{wishlistProducts.length} items</p>

                {wishlistProducts.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                        <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                        <p className="text-gray-500 mb-6">Your wishlist is empty.</p>
                        <Link href="/products" className="text-blue-600 font-bold hover:underline">
                            Browse Products
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {wishlistProducts.map(product => (
                            <div key={product.id} className="group relative">
                                <Link href={`/products/${product.slug}`} className="block aspect-[4/5] overflow-hidden bg-gray-100 relative mb-4">
                                    {product.images && (
                                        <Image
                                            src={JSON.parse(product.images)[0]}
                                            alt={product.name}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    )}
                                </Link>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                                            <Link href={`/products/${product.slug}`}>
                                                {product.name}
                                            </Link>
                                        </h3>
                                        <p className="text-sm font-bold text-gray-500">
                                            Rs {product.price.toLocaleString()}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => removeFromWishlist(product.id)}
                                        className="text-gray-400 hover:text-red-500 transition-colors"
                                        title="Remove from Wishlist"
                                    >
                                        <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>
                                    </button>
                                </div>
                                <button
                                    onClick={() => addToCart({
                                        id: product.id,
                                        name: product.name,
                                        price: product.price,
                                        image: product.images ? JSON.parse(product.images)[0] : '', // Fallback? Product model stores images as JSON string
                                        category: product.categoryId, // Might need to fetch category name or adjust
                                        code: product.slug, // Using slug as code fallback
                                        slug: product.slug
                                    })}
                                    className="w-full mt-4 bg-gray-900 text-white py-2 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors dark:bg-white dark:text-black dark:hover:bg-gray-200"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

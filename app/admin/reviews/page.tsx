"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Review {
    id: string;
    rating: number;
    comment: string | null;
    createdAt: string;
    user: {
        name: string | null;
        email: string;
        image: string | null;
    };
    product: {
        name: string;
        slug: string;
        images: string;
    };
}

export default function AdminReviews() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, 5, 4, 3, 2, 1

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const res = await fetch('/api/reviews', { cache: 'no-store' });
            if (res.ok) {
                const data = await res.json();
                setReviews(data);
            }
        } catch (error) {
            console.error('Failed to fetch reviews', error);
        } finally {
            setIsLoading(false);
        }
    };

    const deleteReview = async (id: string) => {
        if (!confirm('Are you sure you want to delete this review?')) return;

        try {
            const res = await fetch(`/api/reviews/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setReviews(reviews.filter((r) => r.id !== id));
            } else {
                alert('Failed to delete review');
            }
        } catch (error) {
            console.error('Delete review error', error);
        }
    };

    const getFirstImage = (imgString: string) => {
        if (!imgString) return '/placeholder.png';
        try {
            if (imgString.startsWith('[')) {
                const parsed = JSON.parse(imgString);
                return Array.isArray(parsed) && parsed.length > 0 ? parsed[0] : '/placeholder.png';
            }
            return imgString;
        } catch (e) {
            return imgString;
        }
    };

    const filteredReviews = reviews.filter(r => {
        if (filter === 'all') return true;
        return r.rating === parseInt(filter);
    });

    if (isLoading) return <div className="p-8 flex justify-center text-gray-500">Loading reviews...</div>;

    return (
        <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Product Reviews</h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                    Manage customer feedback and ratings for your products.
                </p>
            </div>

            {/* Filter */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col md:flex-row gap-4 items-center">
                <div className="flex-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Showing {filteredReviews.length} reviews
                </div>
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="w-full md:w-48 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition-all"
                >
                    <option value="all">All Ratings</option>
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="2">2 Stars</option>
                    <option value="1">1 Star</option>
                </select>
            </div>

            {/* Grid for Reviews */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredReviews.map((review) => (
                    <div
                        key={review.id}
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col hover:shadow-md transition-shadow"
                    >
                        {/* Review Content */}
                        <div className="p-6 flex-1">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex gap-1 text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-gray-300 dark:text-gray-600'}`}
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="text-xs text-gray-400">
                                    {new Date(review.createdAt).toLocaleDateString()}
                                </span>
                            </div>

                            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed italic mb-6">
                                "{review.comment || 'No comment provided.'}"
                            </p>

                            <div className="flex items-center gap-3 border-t border-gray-100 dark:border-gray-700 pt-4">
                                <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden relative">
                                    {review.user.image ? (
                                        <Image src={review.user.image} alt={review.user.name || 'User'} fill className="object-cover" />
                                    ) : (
                                        <div className="h-full w-full flex items-center justify-center text-gray-500 font-bold text-sm">
                                            {review.user.name?.[0] || 'U'}
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                                        {review.user.name || 'Anonymous'}
                                    </p>
                                    <p className="text-xs text-gray-500 truncate">{review.user.email}</p>
                                </div>
                            </div>
                        </div>

                        {/* Product info footer */}
                        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/30 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                            <Link
                                href={`/products/${review.product.slug}`}
                                className="flex items-center gap-3 flex-1 min-w-0 group"
                            >
                                <div className="h-8 w-8 rounded bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 overflow-hidden relative flex-shrink-0">
                                    <Image
                                        src={getFirstImage(review.product.images)}
                                        alt={review.product.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform"
                                    />
                                </div>
                                <span className="text-xs font-medium text-gray-600 dark:text-gray-400 truncate group-hover:text-blue-500 transition-colors">
                                    {review.product.name}
                                </span>
                            </Link>

                            <button
                                onClick={() => deleteReview(review.id)}
                                className="ml-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                title="Delete Review"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {filteredReviews.length === 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center border border-gray-200 dark:border-gray-700">
                    <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">No reviews found</h3>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">There are no reviews matching your criteria.</p>
                </div>
            )}
        </div>
    );
}

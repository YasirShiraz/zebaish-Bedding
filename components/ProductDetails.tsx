"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";

import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";





import { useWishlist } from "@/contexts/WishlistContext";

const WishlistButton = ({ productId }: { productId: string }) => {
    const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
    const isWishlisted = isInWishlist(productId);

    return (
        <button
            onClick={() => isWishlisted ? removeFromWishlist(productId) : addToWishlist(productId)}
            className={`w-14 flex items-center justify-center border transition-colors ${isWishlisted ? 'bg-red-50 border-red-200 text-red-500' : 'border-gray-200 text-gray-400 hover:border-black hover:text-black dark:border-gray-700 dark:hover:border-white dark:hover:text-white'}`}
            title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        >
            <svg className={`w-6 h-6 ${isWishlisted ? 'fill-current' : 'fill-none'}`} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isWishlisted ? 0 : 1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
        </button>
    );
};

export default function ProductDetails({
    product,
    relatedProducts,
}: {
    product: any;
    relatedProducts: any[];
}) {
    const [openAccordion, setOpenAccordion] = useState<string | null>("description");
    const [addingToCart, setAddingToCart] = useState(false);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const reviewFormRef = useRef<HTMLDivElement>(null);
    const { addToCart } = useCart();

    const effectivePrice = product.salePrice && product.salePrice < product.price ? product.salePrice : product.price;

    const toggleAccordion = (id: string) => {
        setOpenAccordion(openAccordion === id ? null : id);
    };

    // Date logic removed as timeline section is removed

    const handleAddToCart = () => {
        setAddingToCart(true);
        addToCart({
            id: product.id || product.code, // Fallback to code if id is missing
            name: product.name,
            code: product.code,
            category: product.category,
            image: product.image,
            price: effectivePrice,
            slug: product.slug,
        });
        setTimeout(() => setAddingToCart(false), 1000);
    };

    // Review Stats Calculation
    const totalReviews = product.reviews?.length || 0;
    const averageRating = totalReviews > 0
        ? (product.reviews.reduce((acc: any, r: any) => acc + r.rating, 0) / totalReviews).toFixed(1)
        : "0.0";

    // Mock distribution for now if no real detailed stats, or calculate from reviews
    const ratingDistribution = [0, 0, 0, 0, 0]; // 1 to 5 stars
    if (product.reviews) {
        product.reviews.forEach((r: any) => {
            if (r.rating >= 1 && r.rating <= 5) ratingDistribution[r.rating - 1]++;
        });
    }
    // Reverse for display (5 stars at top)
    const reversedDistribution = [...ratingDistribution].reverse();

    return (
        <div className="bg-white dark:bg-black min-h-screen font-sans">
            {/* Minimal Breadcrumbs */}
            <nav className="border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-black">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
                    <div className="flex items-center text-xs uppercase tracking-widest text-gray-500">
                        <Link href="/" className="hover:text-black dark:hover:text-white transition-colors">Home</Link>
                        <span className="mx-2">/</span>
                        <Link href="/products" className="hover:text-black dark:hover:text-white transition-colors">Bedding</Link>
                        <span className="mx-2">/</span>
                        <span className="text-black dark:text-white font-semibold truncate">{product.name}</span>
                    </div>
                </div>
            </nav>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

                    {/* LEFT COLUMN: IMAGES */}
                    <div className="space-y-6">
                        <div className="aspect-[4/5] w-full overflow-hidden bg-gray-100 relative group">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                priority
                            />
                            {/* Sale Badge Overlay */}
                            {product.salePrice && product.salePrice < product.price && (
                                <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 uppercase tracking-wider">
                                    Save {Math.round(((product.price - product.salePrice) / product.price) * 100)}%
                                </div>
                            )}
                        </div>
                    </div>

                    {/* RIGHT COLUMN: DETAILS */}
                    <div className="flex flex-col">

                        {/* Title & Rating */}
                        <div className="mb-6 border-b border-gray-100 dark:border-gray-800 pb-6">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="flex text-black dark:text-white text-xs">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className={`w-3 h-3 ${i < Math.round(Number(averageRating)) ? "fill-current" : "text-gray-300"}`} viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                    ))}
                                </div>
                                <span className="text-xs text-gray-500">({totalReviews})</span>
                            </div>

                            <h1 className="text-3xl font-serif font-medium text-gray-900 dark:text-white mb-2 uppercase tracking-wide">
                                {product.name}
                            </h1>

                            <div className="flex items-baseline gap-3 mt-4">
                                <p className="text-lg font-bold text-red-700">
                                    Rs {effectivePrice.toLocaleString()}
                                </p>
                                {product.salePrice && product.salePrice < product.price && (
                                    <>
                                        <p className="text-sm text-gray-400 line-through">
                                            Rs {product.price.toLocaleString()}
                                        </p>
                                        <span className="text-xs font-bold text-white bg-red-700 px-2 py-0.5">
                                            SAVE {Math.round(((product.price - product.salePrice) / product.price) * 100)}%
                                        </span>
                                    </>
                                )}
                            </div>

                        </div>



                        {/* Actions */}
                        <div className="space-y-4 mb-8">


                            <div className="flex gap-4">
                                <button
                                    onClick={handleAddToCart}
                                    disabled={addingToCart}
                                    className="flex-1 bg-gray-900 hover:bg-black text-white py-4 px-6 text-sm font-bold uppercase tracking-widest transition-all disabled:opacity-75 disabled:cursor-not-allowed hover:shadow-lg dark:bg-white dark:text-black dark:hover:bg-gray-200"
                                >
                                    {addingToCart ? "Adding..." : "Add to Cart"}
                                </button>
                                <WishlistButton productId={product.id || product.code} />
                            </div>

                            <div className="border border-gray-300 dark:border-gray-700 py-3 text-center">
                                <h4 className="font-serif text-lg text-gray-900 dark:text-white">Trusted By Over 10 Million Sleepers</h4>
                            </div>
                        </div>



                        <button
                            onClick={() => {
                                const phoneNumber = "923453177990";
                                const message = `Hi, I'm interested in buying ${product.name}. Could you please share more details?`;
                                const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                                window.open(whatsappUrl, '_blank');
                            }}
                            className="w-full bg-green-900 text-white py-3 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 mb-10 hover:bg-green-800 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                            Buy with WhatsApp
                        </button>

                        {/* Accordions */}
                        <div className="border-t border-gray-200 dark:border-gray-700">
                            {[
                                { id: "description", title: "DESCRIPTION", content: product.description },
                                { id: "care", title: "CARE GUIDE", content: "Machine wash warm, gentle cycle. Wash with like colors. Do not bleach. Tumble dry low. Warm iron if needed." },
                                { id: "exchanges", title: "EASY EXCHANGES & RETURNS", content: "We allow clear exchanges within 7 days of purchase. See full policy for details." },
                                { id: "shipping", title: "SHIPPING & DELIVERY", content: "Free shipping on orders over Rs. 3000. Standard delivery times calculated at checkout." }
                            ].map((item) => (
                                <div key={item.id} className="border-b border-gray-200 dark:border-gray-700">
                                    <button
                                        onClick={() => toggleAccordion(item.id)}
                                        className="w-full flex items-center justify-between py-4 text-left group"
                                    >
                                        <span className="text-xs font-bold uppercase tracking-widest text-gray-900 dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                                            {item.title}
                                        </span>
                                        <span className="text-gray-400">
                                            {openAccordion === item.id ?
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg> :
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                                            }
                                        </span>
                                    </button>
                                    <div className={`overflow-hidden transition-all duration-300 ${openAccordion === item.id ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-serif">
                                            {item.content}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* REVIEWS SECTION */}
                <div className="mt-20 border-t border-gray-200 dark:border-gray-800 pt-16">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-2 uppercase tracking-wider">
                            Customer Reviews
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                        {/* Rating Summary */}
                        <div className="md:col-span-4 bg-gray-50 dark:bg-gray-900 p-8 rounded-sm h-fit">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="flex text-black dark:text-white">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className={`w-5 h-5 ${i < Math.round(Number(averageRating)) ? "fill-current" : "text-gray-300"}`} viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                    ))}
                                </div>
                                <span className="text-xl font-bold">{averageRating} out of 5</span>
                            </div>
                            <p className="text-sm text-gray-500 mb-6">Based on {totalReviews} review{totalReviews !== 1 ? 's' : ''}</p>

                            <div className="space-y-3">
                                {reversedDistribution.map((count, index) => {
                                    const stars = 5 - index;
                                    const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                                    return (
                                        <div key={stars} className="flex items-center text-xs">
                                            <div className="w-16 flex text-black dark:text-white">
                                                {[...Array(5)].map((_, i) => (
                                                    <svg key={i} className={`w-3 h-3 ${i < stars ? "fill-current" : "text-transparent"}`} viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                                ))}
                                            </div>
                                            <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mx-3 overflow-hidden">
                                                <div className="h-full bg-black dark:bg-white" style={{ width: `${percentage}%` }}></div>
                                            </div>
                                            <span className="w-6 text-right text-gray-500">{count}</span>
                                        </div>
                                    )
                                })}
                            </div>

                            <button
                                onClick={() => {
                                    setShowReviewForm(true);
                                    setTimeout(() => {
                                        reviewFormRef.current?.scrollIntoView({ behavior: 'smooth' });
                                    }, 100);
                                }}
                                className="w-full mt-8 border border-black dark:border-white text-black dark:text-white py-3 text-sm font-bold uppercase tracking-widest hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                            >
                                Write a Review
                            </button>
                        </div>

                        {/* Recent Reviews (Placeholder or List) */}
                        <div className="md:col-span-8">
                            <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
                                <span className="font-bold">Most Recent</span>
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                            </div>

                            {/* Reuse existing reviews list mapping logic if reviews exist */}
                            {product.reviews && product.reviews.length > 0 ? (
                                <div className="space-y-8">
                                    {product.reviews.map((review: any) => (
                                        <div key={review.id} className="pb-8 border-b border-gray-100 dark:border-gray-800 last:border-0">
                                            <div className="flex items-center gap-1 text-black dark:text-white mb-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <svg key={i} className={`w-4 h-4 ${i < review.rating ? "fill-current" : "text-gray-300"}`} viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                                ))}
                                            </div>
                                            <div className="flex items-center gap-3 mb-4">
                                                <span className="font-bold text-sm">{review.user?.name || "Verified Buyer"}</span>
                                                <span className="bg-black text-white text-[10px] px-2 py-0.5 font-bold uppercase">Verified</span>
                                                <span className="text-xs text-gray-400 ml-auto">{new Date(review.createdAt).toLocaleDateString()}</span>
                                            </div>
                                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-serif">
                                                {review.comment}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 italic">No reviews yet. Be the first to share your thoughts!</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Review Form Area */}
                {showReviewForm && (
                    <div ref={reviewFormRef} className="mt-12 bg-gray-50 dark:bg-gray-900 p-8 max-w-2xl mx-auto rounded-lg animate-fade-in-up">
                        <div className="text-center mb-8">
                            <h3 className="text-xl font-serif font-bold text-gray-900 dark:text-white">Write Your Review</h3>
                            <p className="text-gray-500 text-sm mt-2">Share your experience with this product</p>
                        </div>
                        <ReviewForm productId={product.id || product.code} />
                    </div>
                )}
            </div>

            {/* Related Products Section (Using previously defined logic for Related Products if needed, or simplified) */}
            {/* ... (Optional, can keep if desired, or remove to match strict screenshot) */}
        </div>

    );
}

const ReviewForm = ({ productId }: { productId: string }) => {
    const { isAuthenticated } = useAuth();
    const router = useRouter();
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    if (!isAuthenticated) {
        return (
            <div className="text-center py-8 bg-white dark:bg-black rounded-lg border border-gray-200 dark:border-gray-800">
                <p className="text-gray-600 dark:text-gray-400 mb-4 font-serif">Please log in to write a review.</p>
                <Link href="/login" className="inline-block bg-black dark:bg-white text-white dark:text-black px-8 py-3 text-xs font-bold uppercase tracking-widest transition-transform hover:scale-105">
                    Log In
                </Link>
            </div>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (rating === 0) {
            setError("Please select a five-star rating.");
            return;
        }

        setIsSubmitting(true);

        try {
            const res = await fetch("/api/reviews", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    productId,
                    rating,
                    comment
                })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to submit review");
            }

            setSuccess(true);
            setRating(0);
            setComment("");
            router.refresh();

            setTimeout(() => setSuccess(false), 5000);

        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (success) {
        return (
            <div className="bg-green-50 dark:bg-green-900/30 p-6 rounded-lg text-center border border-green-100 dark:border-green-800">
                <svg className="w-12 h-12 text-green-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <p className="text-green-800 dark:text-green-300 font-bold mb-1">Review Submitted!</p>
                <p className="text-sm text-green-600 dark:text-green-400">Thank you for sharing your feedback.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 text-sm rounded text-center">
                    {error}
                </div>
            )}

            <div className="flex flex-col items-center">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">Your Rating</label>
                <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="focus:outline-none transform transition-transform hover:scale-110"
                        >
                            <svg
                                className={`w-8 h-8 transition-colors ${star <= (hoverRating || rating)
                                    ? "text-black dark:text-white fill-current"
                                    : "text-gray-300 hover:text-gray-400"
                                    }`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={star <= (hoverRating || rating) ? 0 : 1.5}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Your Review</label>
                <textarea
                    rows={5}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-sm p-4 text-sm focus:ring-1 focus:ring-black dark:focus:ring-white outline-none transition-all resize-y font-serif"
                    placeholder="Tell us what you like or dislike about this product..."
                    required
                />
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black dark:bg-white text-white dark:text-black py-4 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-gray-200 transition-all disabled:opacity-75 disabled:cursor-not-allowed"
            >
                {isSubmitting ? "Submitting..." : "Submit Review"}
            </button>
        </form>
    );
}

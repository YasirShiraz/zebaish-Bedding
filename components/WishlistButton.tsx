"use client";
import { useWishlist } from "@/contexts/WishlistContext";

interface WishlistButtonProps {
    productId: string;
    className?: string;
    iconSize?: string;
}

export default function WishlistButton({ productId, className = "", iconSize = "w-6 h-6" }: WishlistButtonProps) {
    const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
    const isWishlisted = isInWishlist(productId);

    return (
        <button
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (isWishlisted) removeFromWishlist(productId);
                else addToWishlist(productId);
            }}
            className={`flex items-center justify-center transition-all duration-200 focus:outline-none ${className} ${isWishlisted ? 'text-red-500 scale-110' : 'text-gray-400 hover:text-red-500 hover:scale-110'}`}
            title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        >
            <svg 
                className={`${iconSize} ${isWishlisted ? 'fill-current' : 'fill-none'}`} 
                stroke="currentColor" 
                viewBox="0 0 24 24"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isWishlisted ? 0 : 1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
        </button>
    );
}

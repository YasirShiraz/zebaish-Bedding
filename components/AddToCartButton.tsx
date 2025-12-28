"use client";

import { useCart } from "@/contexts/CartContext";
import { getProductPrice } from "@/lib/products";
import { useState } from "react";

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    code: string;
    category: string;
    image: string;
    slug: string;
  };
  variant?: "default" | "large" | "small";
  className?: string;
  price?: number;
}

export default function AddToCartButton({
  product,
  variant = "default",
  className = "",
  price: propPrice,
}: AddToCartButtonProps) {
  const { addToCart, isInCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const price = propPrice ?? getProductPrice(product.code);
  const inCart = isInCart(product.id);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart({
      id: product.id,
      name: product.name,
      code: product.code,
      category: product.category,
      image: product.image,
      price,
      slug: product.slug,
    });

    setTimeout(() => {
      setIsAdding(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    }, 300);
  };

  const baseClasses =
    "inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClasses = {
    default:
      "px-6 py-3 text-base bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white shadow-md hover:shadow-lg hover:from-[#764ba2] hover:to-[#667eea] rounded-xl transform hover:-translate-y-0.5 transition-all duration-200 active:scale-95 focus:ring-2 focus:ring-offset-2 focus:ring-[#667eea]",
    large:
      "px-8 py-4 text-lg bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white shadow-md hover:shadow-lg hover:from-[#764ba2] hover:to-[#667eea] rounded-xl transform hover:-translate-y-0.5 transition-all duration-200 active:scale-95 focus:ring-2 focus:ring-offset-2 focus:ring-[#667eea]",
    small:
      "px-4 py-2 text-sm bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white shadow-md hover:shadow-lg hover:from-[#764ba2] hover:to-[#667eea] rounded-xl transform hover:-translate-y-0.5 transition-all duration-200 active:scale-95 focus:ring-2 focus:ring-offset-2 focus:ring-[#667eea]",
  };

  const secondaryClasses = {
    default:
      "px-6 py-3 text-base border-2 border-[var(--primary)] text-[var(--primary)] hover:bg-blue-50 dark:hover:bg-blue-900/20 focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary)]",
    large:
      "px-8 py-4 text-lg border-2 border-[var(--primary)] text-[var(--primary)] hover:bg-blue-50 dark:hover:bg-blue-900/20 focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary)]",
    small:
      "px-4 py-2 text-sm border-2 border-[var(--primary)] text-[var(--primary)] hover:bg-blue-50 dark:hover:bg-blue-900/20 focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary)]",
  };

  if (showSuccess) {
    return (
      <button
        disabled
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      >
        <svg
          className="mr-2 h-5 w-5"
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
        Added to Cart!
      </button>
    );
  }

  /* 
  // Commented out to allow re-adding (which updates price/quantity)
  if (inCart) {
    return (
      <button
        disabled
        className={`${baseClasses} ${secondaryClasses[variant]} ${className} opacity-75 cursor-not-allowed`}
      >
        <svg
          className="mr-2 h-5 w-5"
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
        In Cart
      </button>
    );
  }
  */

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdding}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {isAdding ? (
        <>
          <svg
            className="mr-2 h-5 w-5 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Adding...
        </>
      ) : (
        <>
          <svg
            className="mr-2 h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          Add to Cart • Rs {Math.round(price).toLocaleString()}
        </>
      )}
    </button>
  );
}


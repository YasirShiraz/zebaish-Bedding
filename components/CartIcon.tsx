"use client";

import { useEffect, useState } from "react";

export default function CartIcon({ onClick }: { onClick: () => void }) {
  const [totalItems, setTotalItems] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Read cart from localStorage
    const updateCartCount = () => {
      try {
        const cart = localStorage.getItem("cart");
        if (cart) {
          const items = JSON.parse(cart);
          const total = items.reduce((sum: number, item: any) => sum + (item.quantity || 0), 0);
          setTotalItems(total);
        }
      } catch (error) {
        // Error reading cart
      }
    };

    updateCartCount();
    
    // Listen for storage changes
    const handleStorageChange = () => {
      updateCartCount();
    };
    
    window.addEventListener("storage", handleStorageChange);
    // Also check periodically for changes (in case of same-tab updates)
    const interval = setInterval(updateCartCount, 500);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  return (
    <button
      onClick={onClick}
      className="relative hidden rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white md:block"
      aria-label="Cart"
    >
      <svg
        className="h-5 w-5"
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
      {mounted && totalItems > 0 && (
        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--primary)] px-1 text-xs text-white animate-pulse">
          {totalItems}
        </span>
      )}
    </button>
  );
}

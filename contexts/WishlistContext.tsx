"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "./AuthContext";

interface WishlistContextType {
    wishlist: string[]; // List of Product IDs
    addToWishlist: (productId: string) => Promise<void>;
    removeFromWishlist: (productId: string) => Promise<void>;
    isInWishlist: (productId: string) => boolean;
    loading: boolean;
    isInitialized: boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
    const { isAuthenticated, logout } = useAuth();
    const [wishlist, setWishlist] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            fetchWishlist();
        } else {
            setWishlist([]); // Clear on logout
            setIsInitialized(true);
        }
    }, [isAuthenticated]);

    const fetchWishlist = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/wishlist');
            if (res.ok) {
                const data = await res.json();
                // Store IDs
                if (Array.isArray(data)) {
                    setWishlist(data.map((item: any) => item.productId));
                } else {
                    console.error("Wishlist data invalid:", data);
                }
            } else if (res.status === 401) {
                logout();
            }
        } catch (err) {
            console.error("Failed to fetch wishlist", err);
        } finally {
            setLoading(false);
            setIsInitialized(true);
        }
    };

    const addToWishlist = async (productId: string) => {
        if (wishlist.includes(productId)) return;

        // Optimistic update
        setWishlist(prev => [...prev, productId]);

        try {
            const res = await fetch('/api/wishlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productId })
            });

            if (!res.ok) {
                if (res.status === 401) {
                    // Revert and logout
                    setWishlist(prev => prev.filter(id => id !== productId));
                    logout();
                    return;
                }
                throw new Error(`Failed with status: ${res.status}`);
            }
        } catch (err) {
            // Revert
            setWishlist(prev => prev.filter(id => id !== productId));
            console.error("Failed to add to wishlist:", err);
        }
    };

    const removeFromWishlist = async (productId: string) => {
        if (!wishlist.includes(productId)) return;

        // Optimistic update
        setWishlist(prev => prev.filter(id => id !== productId));

        try {
            const res = await fetch(`/api/wishlist?productId=${productId}`, {
                method: 'DELETE',
            });
            if (!res.ok) {
                if (res.status === 401) {
                    // Revert and logout
                    setWishlist(prev => [...prev, productId]);
                    logout();
                    return;
                }
                throw new Error(`Failed with status: ${res.status}`);
            }
        } catch (err) {
            // Revert
            setWishlist(prev => [...prev, productId]);
            console.error("Failed to remove from wishlist:", err);
        }
    };

    const isInWishlist = (productId: string) => wishlist.includes(productId);

    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist, loading, isInitialized }}>
            {children}
        </WishlistContext.Provider>
    );
}

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) throw new Error("useWishlist must be used within WishlistProvider");
    return context;
};

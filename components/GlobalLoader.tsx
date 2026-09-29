"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useEffect, useState } from "react";
import Preloader from "./Preloader";

export default function GlobalLoader() {
    const { isLoading: authLoading, isAuthenticated } = useAuth();
    const { isLoading: cartLoading } = useCart();
    const { loading: wishlistLoading } = useWishlist();

    const [showLoader, setShowLoader] = useState(true);
    const [minTimeElapsed, setMinTimeElapsed] = useState(false);

    useEffect(() => {
        // Enforce minimum display time of 2 seconds for premium feel
        const timer = setTimeout(() => {
            setMinTimeElapsed(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        // Check if all necessary data is loaded
        const isReady =
            !authLoading &&
            !cartLoading &&
            // If authenticated, also wait for wishlist. 
            // Note: Wishlist loading might be false initially before effect runs, 
            // but sticking to provided types for now. 
            // Using a small delay or checking explicit done state would be better,
            // but for now relying on Auth completion to trigger Wishlist fetch quickly.
            (!isAuthenticated || (isAuthenticated && !wishlistLoading));

        if (isReady && minTimeElapsed) {
            // Add a small buffer to ensure smooth transition
            const fadeTimer = setTimeout(() => {
                setShowLoader(false);
            }, 500);
            return () => clearTimeout(fadeTimer);
        }
    }, [authLoading, cartLoading, wishlistLoading, isAuthenticated, minTimeElapsed]);

    if (!showLoader) return null;

    return <Preloader />;
}

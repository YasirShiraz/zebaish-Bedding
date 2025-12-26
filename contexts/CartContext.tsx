"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { firebaseHelpers } from "@/lib/firebase-helpers";
import { useAuth } from "./AuthContext";

export interface CartItem {
  id: string;
  name: string;
  code: string;
  category: string;
  image: string;
  price: number;
  quantity: number;
  slug: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  isInCart: (id: string) => boolean;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    setMounted(true);

    // Load cart from Firebase or localStorage
    const loadCart = async () => {
      if (user?.id) {
        // User is logged in - load from Firebase
        try {
          const firebaseCart = await firebaseHelpers.getCart(user.id);

          // Migrate from localStorage if Firebase cart is empty
          if (firebaseCart.length === 0) {
            const localCart = localStorage.getItem("cart");
            if (localCart) {
              const parsedCart = JSON.parse(localCart);
              setItems(parsedCart);
              // Save to Firebase
              await firebaseHelpers.saveCart(user.id, parsedCart);
              // Clear localStorage after migration
              localStorage.removeItem("cart");
            }
          } else {
            setItems(firebaseCart);
          }
        } catch (error) {
          console.error("Error loading cart from Firebase:", error);
          // Fallback to localStorage
          const savedCart = localStorage.getItem("cart");
          if (savedCart) {
            setItems(JSON.parse(savedCart));
          }
        }
      } else {
        // Guest user - use localStorage
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
          try {
            setItems(JSON.parse(savedCart));
          } catch (error) {
            console.error("Error loading cart from localStorage:", error);
          }
        }
      }
    };

    loadCart();
  }, [user]);

  useEffect(() => {
    if (mounted && items.length >= 0) {
      // Save cart to Firebase or localStorage
      const saveCart = async () => {
        if (user?.id) {
          // Save to Firebase for logged-in users
          try {
            await firebaseHelpers.saveCart(user.id, items);
          } catch (error) {
            console.error("Error saving cart to Firebase:", error);
            // Fallback to localStorage
            localStorage.setItem("cart", JSON.stringify(items));
          }
        } else {
          // Save to localStorage for guest users
          localStorage.setItem("cart", JSON.stringify(items));
        }
      };

      saveCart();
    }
  }, [items, mounted, user]);

  const addToCart = (product: Omit<CartItem, "quantity">, quantity: number = 1) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        // If item exists, increase quantity by the specified amount
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity, price: product.price }
            : item
        );
      } else {
        // If item doesn't exist, add it with the specified quantity
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  const removeFromCart = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const isInCart = (id: string) => {
    return items.some((item) => item.id === id);
  };

  // Always provide the context, even during SSR
  // This ensures components can use useCart hook without errors
  return (
    <CartContext.Provider
      value={{
        items: mounted ? items : [], // Return empty array during SSR
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
        isInCart,
        isLoading: !mounted, // Expose loading state (true until mounted and loaded)
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}


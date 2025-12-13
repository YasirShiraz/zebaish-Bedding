"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import Image from "next/image";
import { getProductImage } from "@/lib/products";

interface Order {
  orderId: string;
  items: Array<{
    id: string;
    name: string;
    code: string;
    image: string;
    price: number;
    quantity: number;
  }>;
  shipping: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  total: number;
  orderDate: string;
  status?: string;
}

export default function Orders() {
  const router = useRouter();
  const { isAuthenticated, isLoading, user } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [mounted, isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (mounted && user) {
      // Load orders from localStorage
      const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
      // Filter orders by current user's email
      const userOrders = savedOrders.filter(
        (order: Order) => order.shipping.email === user.email
      );
      // Sort by date (newest first)
      userOrders.sort(
        (a: Order, b: Order) =>
          new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
      );
      setOrders(userOrders);
    }
  }, [mounted, user]);

  if (!mounted || isLoading) {
    return (
      <div className="bg-white dark:bg-black min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  const getOrderStatus = (order: Order) => {
    return order.status || "Pending";
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "processing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "shipped":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      default:
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
    }
  };

  return (
    <div className="bg-white dark:bg-black min-h-screen">
      {/* Header */}
      <div className="bg-[var(--primary)] py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">My Orders</h1>
              <p className="mt-2 text-purple-100">
                View and track your order history
              </p>
            </div>
            <Link
              href="/products"
              className="rounded-lg bg-white/20 px-4 py-2 text-sm font-semibold text-white hover:bg-white/30 transition-colors"
            >
              Continue Homeping
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {orders.length === 0 ? (
          <div className="text-center py-16">
            <svg
              className="mx-auto h-16 w-16 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
              No orders yet
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Start Homeping to see your orders here.
            </p>
            <div className="mt-6">
              <Link
                href="/products"
                className="inline-flex items-center rounded-lg bg-[var(--primary)] px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-[var(--primary-hover)] transition-colors"
              >
                Browse Products
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.orderId}
                className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 p-6 shadow-sm"
              >
                {/* Order Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 pb-6 border-b border-gray-200 dark:border-gray-800">
                  <div>
                    <div className="flex items-center gap-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Order #{order.orderId.split("-")[1]}
                      </h3>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(
                          getOrderStatus(order)
                        )}`}
                      >
                        {getOrderStatus(order)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Placed on{" "}
                      {new Date(order.orderDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <div className="mt-4 sm:mt-0 text-right">
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      ${order.total.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {order.items.reduce(
                        (sum, item) => sum + item.quantity,
                        0
                      )}{" "}
                      {order.items.reduce((sum, item) => sum + item.quantity, 0) ===
                        1
                        ? "item"
                        : "items"}
                    </p>
                  </div>
                </div>

                {/* Order Items */}
                <div className="space-y-4 mb-6">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800"
                    >
                      <div className="relative h-20 w-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                          {item.name}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {item.code} • Qty: {item.quantity}
                        </p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white mt-2">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Actions */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200 dark:border-gray-800">
                  <button
                    onClick={() =>
                      setSelectedOrder(
                        selectedOrder?.orderId === order.orderId ? null : order
                      )
                    }
                    className="flex-1 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    {selectedOrder?.orderId === order.orderId
                      ? "Hide Details"
                      : "View Details"}
                  </button>
                  <Link
                    href="/contact"
                    className="flex-1 rounded-lg bg-[var(--primary)] px-4 py-2 text-center text-sm font-semibold text-white hover:bg-[var(--primary-hover)] transition-colors"
                  >
                    Contact Support
                  </Link>
                </div>

                {/* Order Details */}
                {selectedOrder?.orderId === order.orderId && (
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Shipping Address */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                          Shipping Address
                        </h4>
                        <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          <p>
                            {order.shipping.firstName} {order.shipping.lastName}
                          </p>
                          <p>{order.shipping.address}</p>
                          <p>
                            {order.shipping.city}, {order.shipping.state}{" "}
                            {order.shipping.zipCode}
                          </p>
                          <p>{order.shipping.country}</p>
                          <p className="mt-2">{order.shipping.phone}</p>
                          <p>{order.shipping.email}</p>
                        </div>
                      </div>

                      {/* Order Summary */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                          Order Summary
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between text-gray-600 dark:text-gray-400">
                            <span>Subtotal</span>
                            <span>${order.total.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-gray-600 dark:text-gray-400">
                            <span>Shipping</span>
                            <span>Free</span>
                          </div>
                          <div className="flex justify-between text-gray-600 dark:text-gray-400">
                            <span>Tax</span>
                            <span>${(order.total * 0.1).toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between pt-2 border-t border-gray-200 dark:border-gray-800 font-semibold text-gray-900 dark:text-white">
                            <span>Total</span>
                            <span>
                              ${(order.total + order.total * 0.1).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


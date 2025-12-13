"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState, Suspense } from "react";

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    if (orderId) {
      // Get order from localStorage
      const orders = JSON.parse(localStorage.getItem("orders") || "[]");
      const foundOrder = orders.find((o: any) => o.orderId === orderId);
      setOrder(foundOrder);
    }
  }, [orderId]);

  return (
    <div className="bg-white dark:bg-black min-h-screen">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          {/* Success Icon */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20 mb-6">
            <svg
              className="h-12 w-12 text-green-600 dark:text-green-400"
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
          </div>

          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Order Placed Successfully!
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
            Thank you for your order.
          </p>
          {orderId && (
            <p className="text-sm text-gray-500 dark:text-gray-500 mb-8">
              Order ID: <span className="font-semibold">{orderId}</span>
            </p>
          )}

          {order && (
            <div className="mt-8 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6 text-left">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Order Details
              </h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Total Items:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {order.items.reduce(
                      (sum: number, item: any) => sum + item.quantity,
                      0
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Total Amount:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    ${order.total.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Shipping To:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {order.shipping.city}, {order.shipping.country}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 space-y-4">
            <p className="text-gray-600 dark:text-gray-400">
              We will contact you shortly to confirm your order and arrange payment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="inline-flex items-center rounded-lg bg-[var(--primary)] px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-[var(--primary-hover)] transition-colors"
              >
                Continue Homeping
              </Link>
              <Link
                href="/"
                className="inline-flex items-center rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-6 py-3 text-base font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Go to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccess() {
  return (
    <Suspense
      fallback={
        <div className="bg-white dark:bg-black min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading...</p>
          </div>
        </div>
      }
    >
      <CheckoutSuccessContent />
    </Suspense>
  );
}


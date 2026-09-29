"use client";

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';

export default function CheckoutSuccess() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { clearCart } = useCart();
  const [orderId, setOrderId] = useState<string | null>(null);
  const [cartCleared, setCartCleared] = useState(false);

  useEffect(() => {
    const id = searchParams.get('orderId');
    if (!id) {
      router.push('/');
      return;
    }
    setOrderId(id);

    // Clear cart only once
    if (!cartCleared) {
      clearCart();
      setCartCleared(true);
    }
  }, [searchParams, router, cartCleared]); // Removed clearCart from dependencies

  if (!orderId) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 dark:bg-green-900/20 rounded-full mb-6 animate-bounce">
            <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Order Confirmed! 🎉
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
            Thank you for your purchase
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Order ID: <span className="font-mono font-bold text-blue-600 dark:text-blue-400">#{orderId.slice(0, 8).toUpperCase()}</span>
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            What's Next?
          </h2>

          <div className="space-y-6">
            {/* Step 1 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-400 font-bold">1</span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">Order Confirmation</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  We've received your order and will contact you via WhatsApp shortly to confirm delivery details.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-400 font-bold">2</span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">Processing</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Your order will be carefully prepared and packed within 24-48 hours.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-400 font-bold">3</span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">Delivery</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Your order will be delivered to your doorstep within 3-7 business days.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* WhatsApp Notice */}
        <div className="bg-green-50 dark:bg-green-900/10 border-2 border-green-200 dark:border-green-800 rounded-2xl p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-green-900 dark:text-green-300 mb-2">WhatsApp Confirmation Coming Soon</h3>
              <p className="text-sm text-green-800 dark:text-green-400">
                Our team will contact you on WhatsApp within the next few hours to confirm your order and delivery details. Please keep your phone handy!
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/orders"
            className="flex items-center justify-center gap-2 bg-black dark:bg-white text-white dark:text-black py-4 rounded-xl text-sm font-bold uppercase tracking-widest hover:scale-[1.02] transition-all shadow-xl"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            View My Orders
          </Link>
          <Link
            href="/products"
            className="flex items-center justify-center gap-2 border-2 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white py-4 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Continue Shopping
          </Link>
        </div>

        {/* Support Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            Need help with your order?
          </p>
          <Link href="/contact" className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline">
            Contact Support →
          </Link>
        </div>
      </div>
    </div>
  );
}

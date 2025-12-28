"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import Image from 'next/image';
import { toast } from 'react-hot-toast';

export default function CheckoutPage() {
    const router = useRouter();
    const { items: cart, clearCart } = useCart();
    const { user, isAuthenticated, isLoading } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        fullName: user?.name || '',
        email: user?.email || '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
        notes: ''
    });

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            toast.error('Please log in to proceed with checkout');
            router.push('/login?redirect=/checkout');
            return;
        }
        if (!cart || cart.length === 0) {
            router.push('/cart');
        }
    }, [cart, router, isAuthenticated, isLoading]);

    if (isLoading || !isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    const subtotal = (cart || []).reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shippingCost = subtotal >= 3500 ? 0 : 250;
    const total = subtotal + shippingCost;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!cart || cart.length === 0) {
            toast.error('Your cart is empty');
            return;
        }

        setIsSubmitting(true);
        console.log('Submitting order with data:', { items: cart, customerDetails: formData });

        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    items: cart,
                    customerDetails: formData
                })
            });

            // Check if response is JSON
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                console.error('API returned non-JSON response:', await response.text());
                toast.error('Server error. Please try again later.');
                return;
            }

            const data = await response.json();
            console.log('Checkout response:', { status: response.status, data });

            if (response.ok && data.orderId) {
                toast.success('Order placed successfully!');
                clearCart();
                // Small delay to ensure cart is cleared before navigation
                setTimeout(() => {
                    router.push(`/checkout/success?orderId=${data.orderId}`);
                }, 500);
            } else {
                toast.error(data.error || 'Checkout failed. Please try again.');
                console.error('Checkout failed:', data);
            }
        } catch (error) {
            console.error('Checkout error:', error);
            toast.error('An error occurred during checkout. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!cart || cart.length === 0) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">Checkout</h1>
                    <p className="text-gray-500 dark:text-gray-400">Complete your order</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Form */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Contact Information */}
                            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                            placeholder="+92 300 1234567"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Shipping Address */}
                            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Shipping Address</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Street Address *
                                        </label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                            placeholder="House #123, Street Name"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                City *
                                            </label>
                                            <input
                                                type="text"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                                placeholder="Lahore"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Postal Code
                                            </label>
                                            <input
                                                type="text"
                                                name="postalCode"
                                                value={formData.postalCode}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                                placeholder="54000"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Order Notes (Optional)
                                        </label>
                                        <textarea
                                            name="notes"
                                            value={formData.notes}
                                            onChange={handleChange}
                                            rows={3}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                                            placeholder="Any special instructions for delivery..."
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Payment Method</h2>
                                <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/10 border-2 border-blue-500 rounded-xl">
                                    <div className="w-5 h-5 rounded-full border-4 border-blue-500 bg-white dark:bg-black flex items-center justify-center">
                                        <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold text-gray-900 dark:text-white">Cash on Delivery (COD)</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Pay when you receive your order</p>
                                    </div>
                                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                            </div>

                            <button
                                type="submit"
                                onClick={(e) => {
                                    console.log('🔘 Place Order button clicked!');
                                    console.log('Cart data:', cart);
                                    console.log('Form data:', formData);
                                    console.log('Is submitting:', isSubmitting);
                                }}
                                disabled={isSubmitting || !cart || cart.length === 0}
                                className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-xl text-sm font-bold uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing Order...
                                    </span>
                                ) : (
                                    `Place Order (Rs ${total.toLocaleString()})`
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Right Column - Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 sticky top-24">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 shrink-0">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                                                {item.quantity}
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-sm font-bold text-gray-900 dark:text-white truncate">{item.name}</h3>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.category}</p>
                                            <p className="text-sm font-bold text-blue-600 dark:text-blue-400 mt-2 whitespace-nowrap">
                                                Rs {Math.round(item.price * item.quantity).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-gray-200 dark:border-gray-800 pt-4 space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                                    <span className="font-bold text-gray-900 dark:text-white">Rs {Math.round(subtotal).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                                    <span className={`font-bold ${shippingCost === 0 ? 'text-green-500' : 'text-gray-900 dark:text-white'}`}>
                                        {shippingCost === 0 ? 'FREE' : `Rs ${shippingCost}`}
                                    </span>
                                </div>
                                {subtotal < 3500 && (
                                    <div className="text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/10 p-2 rounded-lg">
                                        Add Rs {Math.round(3500 - subtotal).toLocaleString()} more for free shipping!
                                    </div>
                                )}
                                <div className="flex justify-between text-lg font-bold pt-3 border-t border-gray-200 dark:border-gray-800">
                                    <span className="text-gray-900 dark:text-white">Total</span>
                                    <span className="text-blue-600 dark:text-blue-400">Rs {Math.round(total).toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                                <div className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-green-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                    <div>
                                        <p className="text-xs font-bold text-gray-900 dark:text-white">Secure Checkout</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Your information is protected</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

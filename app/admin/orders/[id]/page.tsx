"use client";

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface OrderDetail {
    id: string;
    status: string;
    total: number;
    createdAt: string;
    customerName: string;
    customerEmail: string;
    phone: string;
    address: string;
    city: string;
    items: {
        id: string;
        quantity: number;
        price: number;
        product: {
            name: string;
            images: string;
        };
    }[];
}

export default function OrderDetails({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [order, setOrder] = useState<OrderDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/orders/${id}`)
            .then(res => res.json())
            .then(data => {
                if (!data.error) setOrder(data);
            })
            .catch(err => console.error(err))
            .finally(() => setIsLoading(false));
    }, [id]);

    if (isLoading) return <div className="p-8 text-center text-gray-500">Loading order details...</div>;
    if (!order) return <div className="p-8 text-center text-red-500">Order not found</div>;

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Order #{order.id.slice(-6)}</h1>
                    <p className="text-gray-500 mt-1">Placed on {new Date(order.createdAt).toLocaleString()}</p>
                </div>
                <Link href="/admin/orders" className="text-sm font-medium text-gray-500 hover:text-gray-900">
                    ← Back to Orders
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Customer Info */}
                <div className="md:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Shipping Details</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-gray-500">Customer Name</p>
                            <p className="font-medium text-gray-900 dark:text-white">{order.customerName}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="font-medium text-gray-900 dark:text-white">{order.customerEmail}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Phone</p>
                            <p className="font-medium text-gray-900 dark:text-white">{order.phone || 'N/A'}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Address</p>
                            <p className="font-medium text-gray-900 dark:text-white">
                                {order.address}, {order.city}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Status & Total */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Order Summary</h2>
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Status</p>
                            <div className="flex items-center gap-3">
                                <span className={`inline-block px-3 py-1 text-sm rounded-full font-medium
                                    ${order.status === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                                        order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'}`}>
                                    {order.status}
                                </span>
                                {order.status === 'PENDING' && (
                                    <button
                                        onClick={async () => {
                                            if (!confirm('Mark order as Completed?')) return;
                                            try {
                                                const res = await fetch(`/api/orders/${order.id}`, {
                                                    method: 'PUT',
                                                    headers: { 'Content-Type': 'application/json' },
                                                    body: JSON.stringify({ status: 'COMPLETED' })
                                                });
                                                if (res.ok) {
                                                    setOrder({ ...order, status: 'COMPLETED' });
                                                } else {
                                                    alert('Failed to update status');
                                                }
                                            } catch (err) {
                                                console.error(err);
                                                alert('Error updating status');
                                            }
                                        }}
                                        className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition-colors"
                                    >
                                        Approve
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                            <p className="text-sm text-gray-500">Total Amount</p>
                            <p className="text-3xl font-bold text-gray-900 dark:text-white">${order.total.toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Order Items */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Items ({order.items.length})</h2>
                </div>
                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                    {order.items.map((item) => {
                        let validImage = '/images/placeholder.jpg';
                        try {
                            if (item.product.images) {
                                const parsed = JSON.parse(item.product.images)[0];
                                if (parsed && (parsed.startsWith('http') || parsed.startsWith('/'))) validImage = parsed;
                            }
                        } catch (e) { }

                        return (
                            <div key={item.id} className="p-6 flex items-center gap-4">
                                <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                    <Image
                                        src={validImage}
                                        alt={item.product.name}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-medium text-gray-900 dark:text-white">{item.product.name}</h3>
                                    <p className="text-sm text-gray-500">${item.price.toFixed(2)} x {item.quantity}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-gray-900 dark:text-white">${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

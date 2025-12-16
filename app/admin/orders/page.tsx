"use client";

import { useEffect, useState } from 'react';

import Link from 'next/link';

interface Order {
    id: string;
    customerName: string;
    total: number;
    status: string;
    createdAt: string;
    items: { product: { name: string }; quantity: number }[];
}

export default function AdminOrders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('/api/orders')
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) setOrders(data);
            })
            .catch((err) => console.error(err))
            .finally(() => setIsLoading(false));
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this order? This action cannot be undone.')) return;

        try {
            const res = await fetch(`/api/orders/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setOrders(orders.filter(order => order.id !== id));
            } else {
                alert('Failed to delete order');
            }
        } catch (error) {
            console.error('Error deleting order:', error);
            alert('Error deleting order');
        }
    };

    if (isLoading) return <div className="p-8">Loading orders...</div>;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Orders</h1>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead className="bg-gray-50 dark:bg-gray-700/50">
                            <tr>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Order ID</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Items summary</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 text-right uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {orders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                    <td className="px-6 py-4 text-xs font-mono text-gray-500">{order.id.slice(0, 8)}...</td>
                                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{order.customerName || 'Guest'}</td>
                                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{new Date(order.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">Rs {order.total.toFixed(2)}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs rounded-full font-medium
                        ${order.status === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                                                order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                                        {order.items.map(i => `${i.quantity}x ${i.product?.name}`).join(', ')}
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-3">
                                        <Link href={`/admin/orders/${order.id}`} className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                                            View
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(order.id)}
                                            className="text-red-600 hover:text-red-800 font-medium text-sm"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {orders.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                        No orders found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

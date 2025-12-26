"use client";

import { useEffect, useState } from 'react';

import Link from 'next/link';

interface Order {
    id: string;
    customerName: string;
    phone: string;
    address: string;
    city: string;
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

    const generateWhatsAppLink = (order: Order) => {
        // Format: 923xxxxxxxxx
        let phone = order.phone?.replace(/\D/g, '') || '';
        if (phone.startsWith('0')) phone = '92' + phone.substring(1);

        const message = `🛍️ *ZEBAISH BEDDING - ORDER CONFIRMATION*

━━━━━━━━━━━━━━━━━━━━━━━━

📋 *Order ID:* #${order.id.slice(0, 8).toUpperCase()}
💰 *Total Amount:* PKR ${order.total.toLocaleString()}

━━━━━━━━━━━━━━━━━━━━━━━━

👤 *CUSTOMER DETAILS*

• *Name:* ${order.customerName}
• *Phone:* ${order.phone}
• *Address:* ${order.address}
• *City:* ${order.city}

━━━━━━━━━━━━━━━━━━━━━━━━

📦 *ORDERED ITEMS*

${order.items.map((i, idx) => `${idx + 1}. ${i.quantity} x ${i.product?.name} - PKR ${(i.price * i.quantity).toLocaleString()}`).join('\n')}

━━━━━━━━━━━━━━━━━━━━━━━━

✅ *PLEASE CONFIRM YOUR ORDER*

Reply with:
• *"YES"* to confirm this order
• *"NO"* to cancel this order

_We will process your order once confirmed._

Thank you for shopping with Zebaish Bedding! 🌟`;

        return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    };

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
                                        <select
                                            value={order.status}
                                            onChange={(e) => {
                                                const newStatus = e.target.value;
                                                const oldStatus = order.status;
                                                // Optimistic update
                                                setOrders(orders.map(o => o.id === order.id ? { ...o, status: newStatus } : o));

                                                fetch(`/api/orders/${order.id}`, {
                                                    method: 'PATCH',
                                                    headers: { 'Content-Type': 'application/json' },
                                                    body: JSON.stringify({ status: newStatus })
                                                }).catch(() => {
                                                    alert('Failed to update status');
                                                    setOrders(orders.map(o => o.id === order.id ? { ...o, status: oldStatus } : o));
                                                });
                                            }}
                                            className={`px-2 py-1 text-xs rounded-full font-medium border-none outline-none cursor-pointer
                                                ${order.status === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                                                    order.status === 'SHIPPED' ? 'bg-blue-100 text-blue-700' :
                                                        order.status === 'CANCELLED' ? 'bg-red-100 text-red-700' :
                                                            order.status === 'PROCESSING' ? 'bg-purple-100 text-purple-700' :
                                                                'bg-yellow-100 text-yellow-700'}`}
                                        >
                                            <option value="PENDING">Pending</option>
                                            <option value="PROCESSING">Processing</option>
                                            <option value="SHIPPED">Shipped</option>
                                            <option value="COMPLETED">Completed</option>
                                            <option value="CANCELLED">Cancelled</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                                        {order.items.map(i => `${i.quantity}x ${i.product?.name}`).join(', ')}
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-3 flex justify-end items-center">
                                        <a
                                            href={generateWhatsAppLink(order)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-green-600 hover:text-green-800 bg-green-100 hover:bg-green-200 dark:bg-green-900/30 dark:hover:bg-green-900/50 p-2 rounded-lg transition-colors"
                                            title="Confirm on WhatsApp"
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                            </svg>
                                        </a>
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

"use client";

import { useEffect, useState, use } from 'react';
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

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="max-w-4xl mx-auto p-8 my-8 bg-white text-black shadow-lg print:shadow-none print:m-0 print:p-0 print:max-w-full">
            <style jsx global>{`
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    #invoice-content, #invoice-content * {
                        visibility: visible;
                    }
                    #invoice-content {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                    }
                    /* Hide admin sidebar and header if they are outside this scope */
                    nav, aside, header {
                        display: none !important;
                    }
                    .no-print {
                        display: none !important;
                    }
                }
            `}</style>

            <div id="invoice-content">
                {/* Header Actions */}
                <div className="flex justify-between items-center mb-8 no-print">
                    <Link href="/admin/orders" className="text-gray-500 hover:text-black">
                        ← Back to Orders
                    </Link>
                    <div className="flex gap-3">
                        <button
                            onClick={handlePrint}
                            className="bg-gray-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-black transition-colors"
                        >
                            Print Invoice
                        </button>
                    </div>
                </div>

                {/* Invoice Header */}
                <div className="flex justify-between items-start border-b-2 border-gray-100 pb-8 mb-8">
                    <div>
                        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">INVOICE</h1>
                        <p className="text-gray-500 mt-1"># {order.id.slice(0, 8).toUpperCase()}</p>
                    </div>
                    <div className="text-right">
                        <h2 className="text-xl font-bold text-gray-900">Zebaish Bedding</h2>
                        <p className="text-sm text-gray-600 mt-1">Quality Bedding & Home Decor</p>
                        <p className="text-sm text-gray-600">contact@zebaishbedding.com</p>
                    </div>
                </div>

                {/* Order Details */}
                <div className="flex justify-between mb-12">
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Billed To</h3>
                        <p className="font-bold text-lg text-gray-900">{order.customerName}</p>
                        <p className="text-gray-600">{order.address}</p>
                        <p className="text-gray-600">{order.city}</p>
                        <p className="text-gray-600 mt-2">{order.phone}</p>
                        <p className="text-gray-600">{order.customerEmail}</p>
                    </div>
                    <div className="text-right">
                        <div className="mb-4">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Invoice Date</h3>
                            <p className="font-medium text-gray-900">{new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Status</h3>
                            <span className={`inline-block px-3 py-1 text-sm rounded-full font-bold border
                                ${order.status === 'COMPLETED' ? 'bg-green-50 text-green-700 border-green-200' :
                                    order.status === 'PENDING' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 'bg-gray-50 text-gray-700 border-gray-200'}`}>
                                {order.status}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Items Table */}
                <table className="w-full mb-12">
                    <thead>
                        <tr className="border-b-2 border-gray-900">
                            <th className="text-left py-3 font-bold text-gray-900">Item Description</th>
                            <th className="text-center py-3 font-bold text-gray-900">Quantity</th>
                            <th className="text-right py-3 font-bold text-gray-900">Price</th>
                            <th className="text-right py-3 font-bold text-gray-900">Total</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {order.items.map((item) => (
                            <tr key={item.id} className="text-sm">
                                <td className="py-4 text-gray-900 font-medium">
                                    {item.product.name}
                                </td>
                                <td className="py-4 text-center text-gray-600">{item.quantity}</td>
                                <td className="py-4 text-right text-gray-600">Rs {item.price.toFixed(2)}</td>
                                <td className="py-4 text-right font-bold text-gray-900">Rs {(item.price * item.quantity).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Footer / Totals */}
                <div className="flex justify-end border-t border-gray-100 pt-8">
                    <div className="w-64 space-y-3">
                        <div className="flex justify-between text-gray-600">
                            <span>Subtotal</span>
                            <span>Rs {order.total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Shipping</span>
                            <span>Rs 0.00</span>
                        </div>
                        <div className="flex justify-between border-t border-gray-900 pt-3">
                            <span className="font-bold text-xl text-gray-900">Total</span>
                            <span className="font-bold text-xl text-gray-900">Rs {order.total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                {/* Print Footer */}
                <div className="mt-16 pt-8 border-t border-gray-100 text-center text-sm text-gray-400">
                    <p>Thank you for your business!</p>
                </div>
            </div>
        </div>
    );
}

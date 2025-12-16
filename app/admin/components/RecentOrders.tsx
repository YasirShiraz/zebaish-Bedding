import Link from 'next/link';
import { Prisma } from '@prisma/client';

// Define a type that includes the user relation
type OrderWithUser = Prisma.OrderGetPayload<{
    include: { user: true }
}>;

export default function RecentOrders({ orders }: { orders: OrderWithUser[] }) {
    const getStatusColor = (status: string) => {
        switch (status.toUpperCase()) {
            case 'COMPLETED':
            case 'DELIVERED':
                return 'bg-green-100 text-green-800';
            case 'PROCESSING':
            case 'SHIPPED':
                return 'bg-blue-100 text-blue-800';
            case 'CANCELLED':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-yellow-100 text-yellow-800';
        }
    };

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-800">Recent Orders</h2>
                <Link href="/admin/orders" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                    View All
                </Link>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-600">
                    <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-semibold">
                        <tr>
                            <th className="px-6 py-4">Order ID</th>
                            <th className="px-6 py-4">Customer</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Amount</th>
                            <th className="px-6 py-4">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                    No orders found.
                                </td>
                            </tr>
                        ) : (
                            orders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        #{order.id.slice(-6).toUpperCase()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            {order.user?.image ? (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img src={order.user.image} alt="" className="h-8 w-8 rounded-full mr-3 object-cover" />
                                            ) : (
                                                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-3 text-xs font-bold text-gray-500">
                                                    {(order.customerName?.[0] || order.user?.name?.[0] || '?').toUpperCase()}
                                                </div>
                                            )}
                                            <div>
                                                <div className="font-medium text-gray-900">
                                                    {order.customerName || order.user?.name || 'Guest'}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    {order.customerEmail || order.user?.email || ''}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">
                                        {formatDate(order.createdAt)}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        {formatCurrency(order.total)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

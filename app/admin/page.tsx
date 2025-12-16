import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import DashboardStats from './components/DashboardStats';
import RecentOrders from './components/RecentOrders';
import RecentReviews from './components/RecentReviews';

export const dynamic = 'force-dynamic';

async function getDashboardStats() {
    const [
        totalRevenueResult,
        totalOrders,
        totalCustomers,
        totalProducts,
        recentOrders,
        lowStockProducts,
        recentReviews
    ] = await Promise.all([
        prisma.order.aggregate({
            _sum: {
                total: true
            },
            where: {
                status: {
                    not: 'CANCELLED'
                }
            }
        }),
        prisma.order.count(),
        prisma.user.count({
            where: {
                role: 'CUSTOMER'
            }
        }),
        prisma.product.count(),
        prisma.order.findMany({
            take: 5,
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                user: true
            }
        }),
        prisma.product.findMany({
            where: {
                stock: {
                    lt: 5
                }
            },
            take: 5,
            select: {
                id: true,
                name: true,
                stock: true,
                slug: true
            }
        }),
        prisma.review.findMany({
            take: 5,
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                user: true,
                product: true
            }
        })
    ]);

    return {
        stats: {
            totalRevenue: totalRevenueResult._sum.total || 0,
            totalOrders,
            totalCustomers,
            totalProducts
        },
        recentOrders,
        lowStockProducts,
        recentReviews
    };
}

import SalesChart from './components/SalesChart';

export default async function AdminDashboard() {
    const { stats, recentOrders, lowStockProducts, recentReviews } = await getDashboardStats();

    return (
        <div className="p-8 max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Good Afternoon, Admin 👋</h1>
                    <p className="text-gray-500 mt-1">Here's what's happening with your store today.</p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-500 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
                        {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                    <a href="/" target="_blank" className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200">
                        View Live Store
                    </a>
                </div>
            </div>

            <DashboardStats stats={stats} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-2">
                    <SalesChart />
                </div>
                <div>
                    <RecentReviews reviews={recentReviews} />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-2">
                    <RecentOrders orders={recentOrders} />
                </div>
                <div>
                    {/* Quick Actions */}
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg p-6 text-white h-full">
                        <h2 className="text-lg font-bold mb-6">Quick Actions</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <Link href="/admin/products/new" className="flex flex-col items-center justify-center p-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-colors border border-white/10 group">
                                <svg className="w-8 h-8 mb-2 text-white/90 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                <span className="text-sm font-medium text-white/90">Add Product</span>
                            </Link>
                            <Link href="/admin/cms" className="flex flex-col items-center justify-center p-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-colors border border-white/10 group">
                                <svg className="w-8 h-8 mb-2 text-white/90 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                <span className="text-sm font-medium text-white/90">Content</span>
                            </Link>
                            <Link href="/admin/orders" className="flex flex-col items-center justify-center p-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-colors border border-white/10 group">
                                <svg className="w-8 h-8 mb-2 text-white/90 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                <span className="text-sm font-medium text-white/90">Orders</span>
                            </Link>
                            <Link href="/admin/users" className="flex flex-col items-center justify-center p-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-colors border border-white/10 group">
                                <svg className="w-8 h-8 mb-2 text-white/90 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                                <span className="text-sm font-medium text-white/90">Customers</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Low Stock Alert */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-full">
                    <div className="p-4 border-b border-gray-200 bg-red-50 flex justify-between items-center">
                        <div className="flex items-center text-red-800">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <h2 className="font-bold">Low Stock Alert</h2>
                        </div>
                        <Link href="/admin/products" className="text-xs font-semibold text-red-700 hover:text-red-900">Manage Inventory →</Link>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {lowStockProducts.length === 0 ? (
                            <div className="p-8 flex flex-col items-center text-center text-gray-500">
                                <span className="text-4xl mb-2">✅</span>
                                <p>All items are well stocked!</p>
                            </div>
                        ) : (
                            lowStockProducts.map((product) => (
                                <div key={product.id} className="p-4 flex justify-between items-center hover:bg-gray-50">
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{product.name}</p>
                                        <Link href={`/admin/products/${product.slug}`} className="text-xs text-blue-500 hover:underline">Edit Product</Link>
                                    </div>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                                        {product.stock} left
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

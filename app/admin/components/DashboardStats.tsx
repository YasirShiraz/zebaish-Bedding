import React from 'react';

interface DashboardStatsProps {
    stats: {
        totalRevenue: number;
        totalOrders: number;
        totalCustomers: number;
        totalProducts: number;
    };
}

export default function DashboardStats({ stats }: DashboardStatsProps) {
    const formatCurrency = (amount: number) => {
        return `Rs ${amount.toLocaleString()}`;
    };

    const statCards = [
        {
            title: 'Total Revenue',
            value: formatCurrency(stats.totalRevenue),
            description: 'Total earnings to date',
            // Green gradient
            gradient: 'from-emerald-500 to-teal-500',
            icon: (
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
        },
        {
            title: 'Total Orders',
            value: stats.totalOrders.toString(),
            description: 'Processed orders',
            // Blue gradient
            gradient: 'from-blue-500 to-cyan-500',
            icon: (
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
            ),
        },
        {
            title: 'Customers',
            value: stats.totalCustomers.toString(),
            description: 'Registered users',
            // Purple gradient
            gradient: 'from-purple-500 to-indigo-500',
            icon: (
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
        },
        {
            title: 'Products',
            value: stats.totalProducts.toString(),
            description: 'Active items',
            // Orange gradient
            gradient: 'from-orange-500 to-amber-500',
            icon: (
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
            ),
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statCards.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-transform hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.gradient} shadow-lg shadow-gray-200`}>
                            {stat.icon}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                        <p className="text-xs text-gray-400 mt-1">{stat.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

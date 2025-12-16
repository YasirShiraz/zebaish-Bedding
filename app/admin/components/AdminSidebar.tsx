"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminSidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path || pathname.startsWith(`${path}/`);

    const navItems = [
        { href: '/admin', label: '📊 Dashboard', exact: true },
        { href: '/admin/products', label: '📦 Products' },
        { href: '/admin/cms', label: '📰 Content' },
        { href: '/admin/orders', label: '🛍️ Orders' },
        { href: '/admin/users', label: '👥 Users' },
        { href: '/admin/reviews', label: '⭐ Reviews' },
    ];

    return (
        <>
            {/* Mobile Header with Toggle */}
            <div className="md:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between">
                <Link href="/admin" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
                    ZEBAISH
                </Link>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {isOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Sidebar Overlay for Mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar Content */}
            <aside className={`
                fixed md:static inset-y-0 left-0 z-30 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 
                transform transition-transform duration-200 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
                flex flex-col h-full
            `}>
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 hidden md:block">
                    <Link href="/admin" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
                        ZEBAISH
                    </Link>
                    <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest">Admin Panel</p>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {navItems.map((item) => {
                        const active = item.exact ? pathname === item.href : isActive(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${active
                                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300'
                                    : 'text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700'
                                    }`}
                            >
                                {item.label}
                            </Link>
                        );
                    })}

                    <Link
                        href="/"
                        className="flex items-center px-4 py-3 text-sm font-medium text-blue-600 rounded-lg hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20 transition-colors mt-8"
                    >
                        ⬅️ Back to Store
                    </Link>
                </nav>
            </aside>
        </>
    );
}

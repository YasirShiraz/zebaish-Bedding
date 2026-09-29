"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface AdminSidebarProps {
    isOpenMobile: boolean;
    onCloseMobile: () => void;
    collapsed: boolean;
    onCollapse: (val: boolean) => void;
}

export default function AdminSidebar({ isOpenMobile, onCloseMobile, collapsed, onCollapse }: AdminSidebarProps) {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path || pathname.startsWith(`${path}/`);

    const navItems = [
        {
            href: '/admin', label: 'Dashboard', icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            ), exact: true
        },
        {
            href: '/admin/products', label: 'Products', icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            )
        },
        {
            href: '/admin/orders', label: 'Orders', icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            )
        },
        {
            href: '/admin/categories', label: 'Categories', icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            )
        },
        {
            href: '/admin/coupons', label: 'Coupons', icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h10a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z" />
            )
        },
        {
            href: '/admin/users', label: 'Customers', icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            )
        },
        {
            href: '/admin/cms', label: 'Content', icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            )
        },
        {
            href: '/admin/reviews', label: 'Reviews', icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            )
        },
        {
            href: '/admin/settings', label: 'Settings', icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            )
        },
    ];

    return (
        <>
            {/* Sidebar Overlay for Mobile */}
            {isOpenMobile && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity"
                    onClick={onCloseMobile}
                />
            )}

            {/* Sidebar Container */}
            <aside className={`
                fixed inset-y-0 left-0 z-50 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800
                transform transition-all duration-300 ease-in-out shadow-2xl md:shadow-none
                ${isOpenMobile ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
                ${collapsed ? 'w-[80px]' : 'w-72'}
                flex flex-col h-full
            `}>
                {/* Brand Logo */}
                <div className={`h-[72px] flex items-center ${collapsed ? 'justify-center' : 'justify-between px-6'} border-b border-gray-100 dark:border-gray-800`}>
                    <Link href="/admin" className={`font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500 transition-all ${collapsed ? 'text-xl' : 'text-2xl'}`}>
                        {collapsed ? 'Z' : 'ZEBAISH'}
                    </Link>

                    {/* Desktop Collapse Toggle */}
                    <button
                        onClick={() => onCollapse(!collapsed)}
                        className="hidden md:flex p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        <svg className={`w-5 h-5 transition-transform ${collapsed ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* Mobile Close Button */}
                    <button
                        onClick={onCloseMobile}
                        className="md:hidden p-2 text-gray-500"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Nav Items */}
                <div className="flex-1 overflow-y-auto py-6 px-3 space-y-2 custom-scrollbar">
                    {!collapsed && (
                        <p className="px-3 mb-2 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                            Menu
                        </p>
                    )}

                    {navItems.map((item) => {
                        const active = item.exact ? pathname === item.href : isActive(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={onCloseMobile}
                                className={`
                                    group flex items-center px-3 py-3 rounded-xl transition-all duration-200 relative
                                    ${active
                                        ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 shadow-sm'
                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-200'
                                    }
                                    ${collapsed ? 'justify-center' : ''}
                                `}
                                title={collapsed ? item.label : undefined}
                            >
                                <svg className={`w-6 h-6 ${collapsed ? '' : 'mr-3'} ${active ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    {item.icon}
                                </svg>

                                {!collapsed && (
                                    <span className="font-medium text-sm">{item.label}</span>
                                )}

                                {active && !collapsed && (
                                    <span className="absolute right-2 w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                )}
                            </Link>
                        );
                    })}
                </div>

                {/* Footer / Logout */}
                <div className="p-4 border-t border-gray-100 dark:border-gray-800">
                    <Link
                        href="/"
                        className={`flex items-center ${collapsed ? 'justify-center' : 'px-4'} py-3 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 rounded-xl transition-colors`}
                    >
                        <svg className={`w-5 h-5 ${collapsed ? '' : 'mr-2'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        {!collapsed && <span>Exit Admin</span>}
                    </Link>
                </div>
            </aside>
        </>
    );
}


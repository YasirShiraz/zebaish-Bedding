"use client";

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import Image from 'next/image';

export default function AdminHeader({ onMenuClick }: { onMenuClick: () => void }) {
    const { user, logout } = useAuth();
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    return (
        <header className="sticky top-0 z-20 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
                {/* Mobile Menu Toggle */}
                <button
                    onClick={onMenuClick}
                    className="md:hidden p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                {/* Global Search Removed */}
            </div>

            <div className="flex items-center gap-4">
                {/* Notifications */}
                <button className="relative p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                    <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-900"></span>
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                </button>

                {/* Profile Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center gap-2 focus:outline-none"
                    >
                        <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 p-[2px]">
                            <div className="h-full w-full rounded-full bg-white dark:bg-gray-900 overflow-hidden relative">
                                {user?.image ? (
                                    <Image
                                        src={user.image}
                                        alt="Profile"
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="h-full w-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-500 font-bold text-xs">
                                        {user?.name?.[0] || 'A'}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="hidden md:block text-left">
                            <p className="text-sm font-semibold text-gray-900 dark:text-white leading-none">{user?.name || 'Admin User'}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Administrator</p>
                        </div>
                        <svg className={`w-4 h-4 text-gray-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {isProfileOpen && (
                        <>
                            <div className="fixed inset-0 z-30 cursor-default" onClick={() => setIsProfileOpen(false)} />
                            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 py-1 z-40 animate-fade-in-up">
                                <Link href="/admin/settings" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                    Settings
                                </Link>
                                <div className="border-t border-gray-100 dark:border-gray-700 my-1" />
                                <button
                                    onClick={logout}
                                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                >
                                    Sign out
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}

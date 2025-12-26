"use client";

import { useState } from 'react';
import AdminSidebar from './components/AdminSidebar';
import AdminHeader from './components/AdminHeader';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-black font-sans">
            <AdminSidebar
                isOpenMobile={isMobileMenuOpen}
                onCloseMobile={() => setIsMobileMenuOpen(false)}
                collapsed={isCollapsed}
                onCollapse={setIsCollapsed}
            />

            <div
                className={`flex-1 flex flex-col min-h-screen transition-all duration-300 w-full relative ${isCollapsed ? 'md:ml-[80px]' : 'md:ml-72'}`}
            >
                <AdminHeader onMenuClick={() => setIsMobileMenuOpen(true)} />

                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-black p-4 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}

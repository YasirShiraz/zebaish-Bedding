"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CMSLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const tabs = [
        { name: "Dashboard", href: "/admin/cms" },
        { name: "Hero Slider", href: "/admin/cms/hero" },
        { name: "Home Sections", href: "/admin/cms/home" },
        { name: "Settings", href: "/admin/cms/settings" },
    ];

    return (
        <div className="space-y-6">
            <div className="border-b border-gray-200 dark:border-gray-800">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    {tabs.map((tab) => {
                        const isActive = pathname === tab.href;
                        return (
                            <Link
                                key={tab.name}
                                href={tab.href}
                                className={`
                  ${isActive
                                        ? "border-black text-black dark:border-white dark:text-white"
                                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                    }
                  whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium transition-colors
                `}
                                aria-current={isActive ? "page" : undefined}
                            >
                                {tab.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>
            <div className="min-h-[600px]">{children}</div>
        </div>
    );
}

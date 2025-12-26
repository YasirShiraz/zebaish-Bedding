"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import BottomNav from "./BottomNav";

export default function PublicAppShell({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith("/admin");

    if (isAdmin) {
        return <>{children}</>;
    }

    return (
        <div className="flex min-h-screen flex-col bg-white text-gray-900 transition-colors duration-300 dark:bg-black dark:text-gray-100 pb-16 lg:pb-0 overflow-x-hidden pt-[96px] sm:pt-[96px] lg:pt-[112px]">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
            <BottomNav />
        </div>
    );
}

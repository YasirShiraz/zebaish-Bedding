"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function NotFound() {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-white dark:bg-black">
            <h1 className="text-9xl font-bold font-serif text-gray-200 dark:text-gray-800">404</h1>
            <div className="absolute">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Page Not Found</h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>
                <Link
                    href="/"
                    className="inline-block bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors dark:bg-white dark:text-black dark:hover:bg-gray-200"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
}

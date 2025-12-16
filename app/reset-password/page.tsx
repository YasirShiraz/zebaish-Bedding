"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function ResetPasswordForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match");
            return;
        }

        if (password.length < 6) {
            setErrorMessage("Password must be at least 6 characters");
            return;
        }

        setStatus("loading");
        setErrorMessage("");

        try {
            const res = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, password }),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus("success");
                setTimeout(() => {
                    router.push("/login");
                }, 3000);
            } else {
                setStatus("error");
                setErrorMessage(data.error || "Invalid or expired token.");
            }
        } catch (error) {
            setStatus("error");
            setErrorMessage("Failed to connect to the server.");
        }
    };

    if (!token) {
        return (
            <div className="text-center p-12">
                <h2 className="text-2xl font-bold text-red-600">Invalid Link</h2>
                <p className="mt-2 text-gray-600">This password reset link is invalid or missing a token.</p>
                <Link href="/forgot-password" className="mt-4 inline-block text-blue-600 hover:underline">
                    Request a new link
                </Link>
            </div>
        );
    }

    return (
        <div className="w-full max-w-md space-y-8">
            <div className="text-center lg:text-left">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Set New Password
                </h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Please enter your new password below.
                </p>
            </div>

            {status === "success" ? (
                <div className="rounded-xl bg-green-50 p-6 text-center shadow-sm border border-green-100 dark:bg-green-900/20 dark:border-green-800">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4 dark:bg-green-800">
                        <svg className="h-6 w-6 text-green-600 dark:text-green-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-green-800 dark:text-green-200">Password Updated!</h3>
                    <p className="mt-2 text-sm text-green-700 dark:text-green-300">
                        Redirecting you to login...
                    </p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                            New Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="block w-full rounded-xl border-0 py-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 dark:bg-gray-900 dark:ring-gray-800 dark:text-white"
                        />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                            Confirm Password
                        </label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="block w-full rounded-xl border-0 py-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 dark:bg-gray-900 dark:ring-gray-800 dark:text-white"
                        />
                    </div>

                    {status === "error" && (
                        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                            {errorMessage}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={status === "loading"}
                        className="flex w-full justify-center rounded-xl bg-gray-900 px-3 py-3.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all dark:bg-white dark:text-black dark:hover:bg-gray-100"
                    >
                        {status === "loading" ? "Updating..." : "Update Password"}
                    </button>
                </form>
            )}
        </div>
    );
}

export default function ResetPassword() {
    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white dark:bg-black">
            {/* Left Side - Image/Brand */}
            <div className="hidden lg:block relative h-full">
                <div className="absolute inset-0 bg-gray-900">
                    <img
                        src="/images/zebaish4.jpg"
                        alt="Luxury Bedding"
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                </div>

                <div className="relative h-full flex flex-col justify-between p-12 text-white">
                    <Link href="/" className="text-3xl font-serif font-bold tracking-wider">
                        ZEBAISH
                    </Link>
                    <div className="animate-fade-in-up">
                        <h1 className="text-5xl font-serif font-medium leading-tight mb-6">
                            Secure Your <br /> Experience
                        </h1>
                        <p className="text-lg text-gray-200 max-w-md font-light">
                            Create a new strong password to keep your account safe.
                        </p>
                    </div>
                    <div className="text-sm text-gray-400">
                        © 2025 Zebaish. All rights reserved.
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex items-center justify-center p-8 sm:p-12 lg:p-16 relative">
                <Suspense fallback={<div>Loading...</div>}>
                    <ResetPasswordForm />
                </Suspense>
            </div>
        </div>
    );
}

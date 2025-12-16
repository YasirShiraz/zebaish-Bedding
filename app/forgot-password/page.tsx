"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMessage("");

        try {
            const res = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus("success");
            } else {
                setStatus("error");
                setErrorMessage(data.error || "Something went wrong.");
            }
        } catch (error) {
            setStatus("error");
            setErrorMessage("Failed to connect to the server.");
        }
    };

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white dark:bg-black">
            {/* Left Side - Image/Brand (Matches Login Page) */}
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
                            Recover Access <br /> to Luxury
                        </h1>
                        <p className="text-lg text-gray-200 max-w-md font-light">
                            Don't worry, even the best of us forget. Let's get you back to your premium shopping experience.
                        </p>
                    </div>
                    <div className="text-sm text-gray-400">
                        © 2025 Zebaish. All rights reserved.
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex items-center justify-center p-8 sm:p-12 lg:p-16 relative">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Forgot Password?
                        </h2>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            Enter your email address and we'll send you a link to reset your password.
                        </p>
                    </div>

                    {status === "success" ? (
                        <div className="rounded-xl bg-green-50 p-6 text-center shadow-sm border border-green-100 dark:bg-green-900/20 dark:border-green-800">
                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4 dark:bg-green-800">
                                <svg className="h-6 w-6 text-green-600 dark:text-green-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-green-800 dark:text-green-200">Email Sent!</h3>
                            <p className="mt-2 text-sm text-green-700 dark:text-green-300">
                                Check your inbox for the password reset link. It will expire in 1 hour.
                            </p>
                            <div className="mt-6">
                                <Link href="/login" className="text-sm font-semibold text-green-700 hover:text-green-600 dark:text-green-200 underline">
                                    Back to Login
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full rounded-xl border-0 py-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 dark:bg-gray-900 dark:ring-gray-800 dark:text-white"
                                    placeholder="you@example.com"
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
                                {status === "loading" ? "Sending..." : "Send Reset Link"}
                            </button>

                            <div className="text-center text-sm">
                                <Link
                                    href="/login"
                                    className="font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                                >
                                    <span aria-hidden="true">&larr;</span> Back to Login
                                </Link>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

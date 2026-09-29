"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

export default function ChangePassword() {
    const router = useRouter();
    const { isAuthenticated, isLoading } = useAuth();
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Protect route
    if (!isLoading && !isAuthenticated) {
        router.push("/login");
        return null;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (formData.newPassword !== formData.confirmPassword) {
            setError("New passwords do not match");
            return;
        }

        if (formData.newPassword.length < 6) {
            setError("Password must be at least 6 characters long");
            return;
        }

        setIsSubmitting(true);

        try {
            const res = await fetch("/api/auth/change-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    currentPassword: formData.currentPassword,
                    newPassword: formData.newPassword,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to update password");
            }

            setSuccess("Password updated successfully!");
            setFormData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            });

            // Optional: Redirect after delay
            setTimeout(() => {
                router.push("/profile");
            }, 2000);

        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) return null;

    return (
        <div className="bg-white dark:bg-black min-h-screen">
            {/* Header */}
            <div className="bg-[var(--primary)] py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-white">Change Password</h1>
                            <p className="mt-2 text-purple-100">
                                Update your account security
                            </p>
                        </div>
                        <Link
                            href="/profile"
                            className="rounded-lg bg-white/20 px-4 py-2 text-sm font-semibold text-white hover:bg-white/30 transition-colors"
                        >
                            Back to Profile
                        </Link>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-md px-4 py-12">
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 shadow-sm">

                    {error && (
                        <div className="mb-6 rounded-lg bg-red-50 dark:bg-red-900/20 p-4 text-sm text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="mb-6 rounded-lg bg-green-50 dark:bg-green-900/20 p-4 text-sm text-green-600 dark:text-green-400 border border-green-200 dark:border-green-800">
                            {success}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Current Password
                            </label>
                            <input
                                type="password"
                                name="currentPassword"
                                value={formData.currentPassword}
                                onChange={handleChange}
                                required
                                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                                placeholder="Enter current password"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                New Password
                            </label>
                            <input
                                type="password"
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleChange}
                                required
                                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                                placeholder="Enter new password"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Confirm New Password
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                                placeholder="Confirm new password"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full rounded-lg bg-[var(--primary)] px-4 py-3 text-base font-semibold text-white shadow-sm hover:bg-[var(--primary-hover)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Updating...
                                </>
                            ) : (
                                "Update Password"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

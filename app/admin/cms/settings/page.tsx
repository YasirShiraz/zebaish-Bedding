"use client";

import { useState, useEffect } from "react";
import ImageUpload from "@/components/ImageUpload";

export default function SettingsManager() {
    const [settings, setSettings] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await fetch("/api/cms/settings");
            const data = await res.json();
            setSettings(data);
        } catch (error) {
            console.error("Failed to fetch settings", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/cms/settings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(settings),
            });

            if (res.ok) {
                alert("Settings saved successfully!");
            }
        } catch (error) {
            alert("Failed to save settings");
        }
    };

    const handleChange = (key: string, value: string) => {
        setSettings((prev) => ({ ...prev, [key]: value }));
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="max-w-4xl">
            <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
                Global Site Settings
            </h2>

            <form onSubmit={handleSave} className="space-y-8">
                {/* Contact Information */}
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
                        Contact Information
                    </h3>
                    <div className="grid gap-6 sm:grid-cols-2">
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Contact Email
                            </label>
                            <input
                                type="email"
                                value={settings["contact_email"] || ""}
                                onChange={(e) => handleChange("contact_email", e.target.value)}
                                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black dark:border-gray-600 dark:bg-gray-700"
                            />
                        </div>
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Phone Number
                            </label>
                            <input
                                type="text"
                                value={settings["contact_phone"] || ""}
                                onChange={(e) => handleChange("contact_phone", e.target.value)}
                                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black dark:border-gray-600 dark:bg-gray-700"
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Address
                            </label>
                            <textarea
                                rows={3}
                                value={settings["contact_address"] || ""}
                                onChange={(e) => handleChange("contact_address", e.target.value)}
                                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black dark:border-gray-600 dark:bg-gray-700"
                            />
                        </div>
                    </div>
                </div>

                {/* Footer Content */}
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
                        Footer Content
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Footer Description
                            </label>
                            <textarea
                                rows={2}
                                value={settings["footer_description"] || ""}
                                onChange={(e) => handleChange("footer_description", e.target.value)}
                                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black dark:border-gray-600 dark:bg-gray-700"
                            />
                        </div>
                        <div className="grid gap-6 sm:grid-cols-2">
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Instagram URL
                                </label>
                                <input
                                    type="url"
                                    value={settings["social_instagram"] || ""}
                                    onChange={(e) => handleChange("social_instagram", e.target.value)}
                                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black dark:border-gray-600 dark:bg-gray-700"
                                />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Facebook URL
                                </label>
                                <input
                                    type="url"
                                    value={settings["social_facebook"] || ""}
                                    onChange={(e) => handleChange("social_facebook", e.target.value)}
                                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black dark:border-gray-600 dark:bg-gray-700"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Media Assets */}
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
                        Media Assets
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Site Logo (Header & Footer)
                            </label>
                            <div className="max-w-md">
                                <ImageUpload
                                    value={settings["site_logo"] || ""}
                                    onChange={(url) => handleChange("site_logo", url)}
                                />
                                <p className="mt-2 text-xs text-gray-500">
                                    Recommended height: 40px. Format: SVG, PNG.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="rounded-lg bg-black px-8 py-3 text-base font-semibold text-white shadow-sm hover:bg-gray-800 dark:bg-white dark:text-black hover:scale-105 transition-transform"
                    >
                        Save All Settings
                    </button>
                </div>
            </form>
        </div>
    );
}

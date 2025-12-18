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
                {/* Header / Global UI */}
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
                        Header & Announcement Bar
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                    Show Top Marquee Banner
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Control the black discount banner at the very top of the site.
                                </p>
                            </div>
                            <label className="inline-flex cursor-pointer items-center">
                                <span className="mr-3 text-xs font-medium text-gray-600 dark:text-gray-300">
                                    Off
                                </span>
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleChange(
                                            "show_top_banner",
                                            (settings["show_top_banner"] ?? "true") === "true" ? "false" : "true"
                                        )
                                    }
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                        (settings["show_top_banner"] ?? "true") === "true"
                                            ? "bg-emerald-500"
                                            : "bg-gray-300 dark:bg-gray-600"
                                    }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                                            (settings["show_top_banner"] ?? "true") === "true"
                                                ? "translate-x-5"
                                                : "translate-x-1"
                                        }`}
                                    />
                                </button>
                                <span className="ml-3 text-xs font-medium text-gray-600 dark:text-gray-300">
                                    On
                                </span>
                            </label>
                        </div>

                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Marquee Text
                            </label>
                            <textarea
                                rows={2}
                                value={
                                    settings["top_banner_text"] ||
                                    "Over 30% Discount - Zebaish Store - Free delivery on orders of Rs. 5,000 and above"
                                }
                                onChange={(e) => handleChange("top_banner_text", e.target.value)}
                                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black dark:border-gray-600 dark:bg-gray-700 text-sm"
                            />
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                This text will scroll in the top marquee. Keep it short for best results.
                            </p>
                        </div>
                    </div>
                </div>

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
                                    placeholder="https://instagram.com/your-page"
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
                                    placeholder="https://facebook.com/your-page"
                                    value={settings["social_facebook"] || ""}
                                    onChange={(e) => handleChange("social_facebook", e.target.value)}
                                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black dark:border-gray-600 dark:bg-gray-700"
                                />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    WhatsApp URL
                                </label>
                                <input
                                    type="url"
                                    placeholder="https://wa.me/92345xxxxxxx"
                                    value={settings["social_whatsapp"] || ""}
                                    onChange={(e) => handleChange("social_whatsapp", e.target.value)}
                                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black dark:border-gray-600 dark:bg-gray-700"
                                />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    TikTok URL
                                </label>
                                <input
                                    type="url"
                                    placeholder="https://www.tiktok.com/@your-page"
                                    value={settings["social_tiktok"] || ""}
                                    onChange={(e) => handleChange("social_tiktok", e.target.value)}
                                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black dark:border-gray-600 dark:bg-gray-700"
                                />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    YouTube URL
                                </label>
                                <input
                                    type="url"
                                    placeholder="https://youtube.com/@your-channel"
                                    value={settings["social_youtube"] || ""}
                                    onChange={(e) => handleChange("social_youtube", e.target.value)}
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

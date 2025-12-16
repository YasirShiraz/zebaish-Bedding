"use client";

import { useState, useEffect } from "react";
import ImageUpload from "@/components/ImageUpload";

export default function HomeContentManager() {
    const [activeTab, setActiveTab] = useState("stats");
    const [stats, setStats] = useState<any[]>([]);
    const [services, setServices] = useState<any[]>([]);
    const [cta, setCta] = useState<any>({});
    const [collections, setCollections] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            const [statsRes, servicesRes, ctaRes, collectionsRes] = await Promise.all([
                fetch("/api/cms/content/stats"),
                fetch("/api/cms/content/services"),
                fetch("/api/cms/content/cta"),
                fetch("/api/cms/content/signature_collections"),
            ]);

            if (statsRes.ok) setStats(await statsRes.json());
            if (servicesRes.ok) setServices(await servicesRes.json());
            if (ctaRes.ok) setCta(await ctaRes.json());
            if (collectionsRes.ok) {
                const data = await collectionsRes.json();
                if (Array.isArray(data) && data.length > 0) {
                    setCollections(data);
                } else {
                    // Default structure if empty
                    setCollections([
                        { name: "", category: "", description: "", image: "", link: "" },
                        { name: "", category: "", description: "", image: "", link: "" },
                        { name: "", category: "", description: "", image: "", link: "" },
                        { name: "", category: "", description: "", image: "", link: "" },
                    ]);
                }
            } else {
                // Initialize with 4 empty slots if fetch fails (or 404)
                 setCollections([
                        { name: "", category: "", description: "", image: "", link: "" },
                        { name: "", category: "", description: "", image: "", link: "" },
                        { name: "", category: "", description: "", image: "", link: "" },
                        { name: "", category: "", description: "", image: "", link: "" },
                    ]);
            }
        } catch (error) {
            console.error("Failed to fetch content", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (section: string, data: any) => {
        try {
            const res = await fetch(`/api/cms/content/${section}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                alert("Saved successfully!");
            }
        } catch (error) {
            alert("Failed to save content");
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="space-y-6">
            <div className="flex space-x-1 rounded-xl bg-gray-100 p-1 dark:bg-gray-800 overflow-x-auto">
                {["Stats", "Services", "CTA", "Collections"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab.toLowerCase())}
                        className={`w-full min-w-[100px] rounded-lg py-2.5 text-sm font-medium leading-5 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 ${activeTab === tab.toLowerCase()
                            ? "bg-white text-black shadow dark:bg-gray-700 dark:text-white"
                            : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                {activeTab === "stats" && (
                    <div className="space-y-6">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                            Homepage Statistics
                        </h3>
                        <div className="grid gap-6 sm:grid-cols-2">
                            {stats.map((stat, index) => (
                                <div key={index} className="space-y-3 rounded-lg border border-gray-100 p-4 dark:border-gray-700">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500">
                                            Value (e.g. 500+)
                                        </label>
                                        <input
                                            value={stat.value}
                                            onChange={(e) => {
                                                const newStats = [...stats];
                                                newStats[index].value = e.target.value;
                                                setStats(newStats);
                                            }}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black dark:border-gray-600 dark:bg-gray-700"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500">
                                            Label (e.g. Happy Customers)
                                        </label>
                                        <input
                                            value={stat.label}
                                            onChange={(e) => {
                                                const newStats = [...stats];
                                                newStats[index].label = e.target.value;
                                                setStats(newStats);
                                            }}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black dark:border-gray-600 dark:bg-gray-700"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={() => handleSave("stats", stats)}
                                className="rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 dark:bg-white dark:text-black"
                            >
                                Save Stats
                            </button>
                        </div>
                    </div>
                )}

                {activeTab === "services" && (
                    <div className="space-y-6">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                            Service Features
                        </h3>
                        <div className="space-y-4">
                            {services.map((service, index) => (
                                <div key={index} className="rounded-lg border border-gray-100 p-4 dark:border-gray-700">
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div className="col-span-2 sm:col-span-1">
                                            <label className="block text-xs font-medium text-gray-500">Title</label>
                                            <input
                                                value={service.title}
                                                onChange={(e) => {
                                                    const newServices = [...services];
                                                    newServices[index].title = e.target.value;
                                                    setServices(newServices);
                                                }}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black dark:border-gray-600 dark:bg-gray-700"
                                            />
                                        </div>
                                        <div className="col-span-2 sm:col-span-1">
                                            <label className="block text-xs font-medium text-gray-500">Icon Key (e.g. truck, gift)</label>
                                            <input
                                                value={service.icon}
                                                onChange={(e) => {
                                                    const newServices = [...services];
                                                    newServices[index].icon = e.target.value;
                                                    setServices(newServices);
                                                }}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black dark:border-gray-600 dark:bg-gray-700"
                                            />
                                        </div>
                                        <div className="col-span-2">
                                            <label className="block text-xs font-medium text-gray-500">Description</label>
                                            <textarea
                                                rows={2}
                                                value={service.description}
                                                onChange={(e) => {
                                                    const newServices = [...services];
                                                    newServices[index].description = e.target.value;
                                                    setServices(newServices);
                                                }}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black dark:border-gray-600 dark:bg-gray-700"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={() => handleSave("services", services)}
                                className="rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 dark:bg-white dark:text-black"
                            >
                                Save Services
                            </button>
                        </div>
                    </div>
                )}

                {activeTab === "cta" && (
                    <div className="space-y-6">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                            Call to Action Section
                        </h3>
                        <div className="grid gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title (HTML allowed)</label>
                                <input
                                    value={cta.title || ""}
                                    onChange={(e) => setCta({ ...cta, title: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black dark:border-gray-600 dark:bg-gray-700"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                                <textarea
                                    rows={3}
                                    value={cta.description || ""}
                                    onChange={(e) => setCta({ ...cta, description: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black dark:border-gray-600 dark:bg-gray-700"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Background Image</label>
                                <ImageUpload
                                    value={cta.image || ""}
                                    onChange={(url) => setCta({ ...cta, image: url })}
                                />
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Button Text</label>
                                    <input
                                        value={cta.buttonText || "Shop Now"}
                                        onChange={(e) => setCta({ ...cta, buttonText: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black dark:border-gray-600 dark:bg-gray-700"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Button Link</label>
                                    <input
                                        value={cta.buttonLink || "/products"}
                                        onChange={(e) => setCta({ ...cta, buttonLink: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black dark:border-gray-600 dark:bg-gray-700"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={() => handleSave("cta", cta)}
                                className="rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 dark:bg-white dark:text-black"
                            >
                                Save CTA
                            </button>
                        </div>
                    </div>
                )}

                {activeTab === "collections" && (
                    <div className="space-y-6">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                            Signature Collections (Featured 4)
                        </h3>
                        <div className="grid gap-6 md:grid-cols-2">
                            {collections.map((item, index) => (
                                <div key={index} className="rounded-lg border border-gray-100 p-4 dark:border-gray-700 space-y-4">
                                    <h4 className="font-semibold text-gray-700 dark:text-gray-300">Collection Item #{index + 1}</h4>
                                    
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500">Name (Title)</label>
                                        <input
                                            value={item.name}
                                            onChange={(e) => {
                                                const newItems = [...collections];
                                                newItems[index].name = e.target.value;
                                                setCollections(newItems);
                                            }}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black dark:border-gray-600 dark:bg-gray-700"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-gray-500">Category Tag</label>
                                        <input
                                            value={item.category}
                                            onChange={(e) => {
                                                const newItems = [...collections];
                                                newItems[index].category = e.target.value;
                                                setCollections(newItems);
                                            }}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black dark:border-gray-600 dark:bg-gray-700"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-gray-500">Description</label>
                                        <textarea
                                            rows={2}
                                            value={item.description}
                                            onChange={(e) => {
                                                const newItems = [...collections];
                                                newItems[index].description = e.target.value;
                                                setCollections(newItems);
                                            }}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black dark:border-gray-600 dark:bg-gray-700"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-2">Image</label>
                                        <ImageUpload
                                            value={item.image || ""}
                                            onChange={(url) => {
                                                const newItems = [...collections];
                                                newItems[index].image = url;
                                                setCollections(newItems);
                                            }}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-gray-500">Link URL</label>
                                        <input
                                            value={item.link}
                                            onChange={(e) => {
                                                const newItems = [...collections];
                                                newItems[index].link = e.target.value;
                                                setCollections(newItems);
                                            }}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black dark:border-gray-600 dark:bg-gray-700"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={() => handleSave("signature_collections", collections)}
                                className="rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 dark:bg-white dark:text-black"
                            >
                                Save Collections
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ImageUpload from "@/components/ImageUpload";

interface HeroSlide {
    id: string;
    title: string;
    description: string;
    image: string;
    link: string;
    cta: string;
    isActive: boolean;
    order: number;
}

export default function HeroManager() {
    const [slides, setSlides] = useState<HeroSlide[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentSlide, setCurrentSlide] = useState<Partial<HeroSlide>>({});

    useEffect(() => {
        fetchSlides();
    }, []);

    const fetchSlides = async () => {
        try {
            const res = await fetch("/api/cms/hero");
            const data = await res.json();
            setSlides(data);
        } catch (error) {
            console.error("Failed to fetch slides", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const method = currentSlide.id ? "PUT" : "POST";
            const res = await fetch("/api/cms/hero", {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(currentSlide),
            });

            if (res.ok) {
                setIsEditing(false);
                setCurrentSlide({});
                fetchSlides();
            }
        } catch (error) {
            console.error("Failed to save slide", error);
        }
    };

    const handleDelete = async (id: string) => {
        // In a real app, DELETE implementation would be here.
        // For now, toggle isActive to false or just hide it.
        if (!confirm("Are you sure you want to deactivate this slide?")) return;

        // We'll update isActive to false as a soft delete
        try {
            await fetch("/api/cms/hero", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, isActive: false }),
            });
            fetchSlides();
        } catch (error) {
            console.error("Failed to deactivate slide", error);
        }
    };

    const handleReorder = async (index: number, direction: 'up' | 'down') => {
        const newSlides = [...slides];
        const newIndex = direction === 'up' ? index - 1 : index + 1;

        if (newIndex < 0 || newIndex >= newSlides.length) return;

        // Swap
        [newSlides[index], newSlides[newIndex]] = [newSlides[newIndex], newSlides[index]];

        // Update local state immediately for responsiveness
        setSlides(newSlides);

        // Prepare payload for backend
        const reorderedPayload = newSlides.map((slide, idx) => ({
            id: slide.id,
            order: idx, // Assign new order based on array index
        }));

        try {
            await fetch("/api/cms/hero/reorder", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ slides: reorderedPayload }),
            });
            // Ideally toast success or silent update
        } catch (error) {
            console.error("Failed to save order", error);
            // Revert on error would be good practice, but skipping for MVP speed
            fetchSlides(); // Re-fetch to sync with server
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Hero Slides
                </h2>
                <button
                    onClick={() => {
                        setCurrentSlide({
                            title: "",
                            description: "",
                            image: "",
                            link: "/products",
                            cta: "Shop Now",
                            isActive: true,
                        });
                        setIsEditing(true);
                    }}
                    className="rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                >
                    Add New Slide
                </button>
            </div>

            {isEditing && (
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
                        {currentSlide.id ? "Edit Slide" : "New Slide"}
                    </h3>
                    <form onSubmit={handleSave} className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Slide Title
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={currentSlide.title || ""}
                                    onChange={(e) =>
                                        setCurrentSlide({ ...currentSlide, title: e.target.value })
                                    }
                                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                                />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    CTA Text
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={currentSlide.cta || ""}
                                    onChange={(e) =>
                                        setCurrentSlide({ ...currentSlide, cta: e.target.value })
                                    }
                                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Description
                            </label>
                            <textarea
                                required
                                rows={3}
                                value={currentSlide.description || ""}
                                onChange={(e) =>
                                    setCurrentSlide({ ...currentSlide, description: e.target.value })
                                }
                                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                            />
                        </div>

                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Slide Image
                            </label>
                            <ImageUpload
                                value={currentSlide.image || ""}
                                onChange={(url) => setCurrentSlide({ ...currentSlide, image: url })}
                            />
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <button
                                type="button"
                                onClick={() => setIsEditing(false)}
                                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                            >
                                Save Slide
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800 flex flex-col"
                    >
                        <div className="aspect-video relative bg-gray-100 dark:bg-gray-900">
                            <Image
                                src={slide.image}
                                alt={slide.title}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100" />
                            <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 transition-opacity group-hover:opacity-100">
                                <button
                                    onClick={() => {
                                        setCurrentSlide(slide);
                                        setIsEditing(true);
                                    }}
                                    className="rounded-full bg-white p-2 text-gray-900 shadow-sm hover:text-blue-600"
                                    aria-label="Edit"
                                >
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => handleDelete(slide.id)}
                                    className="rounded-full bg-white p-2 text-gray-900 shadow-sm hover:text-red-600"
                                    aria-label="Delete"
                                >
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="p-4 flex-1">
                            <h3 className="font-bold text-gray-900 dark:text-white">
                                {slide.title}
                            </h3>
                            <p className="mt-1 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
                                {slide.description}
                            </p>
                            <div className="mt-3 flex items-center justify-between text-xs">
                                <span className="rounded-full bg-gray-100 px-2 py-1 font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                                    {slide.cta}
                                </span>
                                <span className={`h-2 w-2 rounded-full ${slide.isActive ? 'bg-green-500' : 'bg-gray-300'}`} />
                            </div>
                        </div>

                        {/* Ordering Controls */}
                        <div className="border-t border-gray-100 dark:border-gray-700 p-2 flex justify-between bg-gray-50 dark:bg-gray-900/50">
                            <button
                                onClick={() => handleReorder(index, 'up')}
                                disabled={index === 0}
                                className="p-1.5 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                                title="Move Up"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                </svg>
                            </button>
                            <span className="text-xs text-gray-400 flex items-center">#{index + 1}</span>
                            <button
                                onClick={() => handleReorder(index, 'down')}
                                disabled={index === slides.length - 1}
                                className="p-1.5 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                                title="Move Down"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

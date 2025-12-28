"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface HeroSlide {
    id: string;
    title: string;
    description: string;
    image: string;
    link: string;
    cta: string;
}

export default function HeroCarousel() {
    const [slides, setSlides] = useState<HeroSlide[]>([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch slides from CMS API
        const fetchSlides = async () => {
            try {
                const res = await fetch("/api/cms/hero");
                if (res.ok) {
                    const data = await res.json();
                    if (data.length > 0) {
                        setSlides(data);
                    }
                }
            } catch (error) {
                console.error("Failed to load hero slides", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSlides();
    }, []);

    // Auto-advance slides
    useEffect(() => {
        if (slides.length <= 1) return;

        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [slides.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    if (loading) {
        return <div className="h-[400px] sm:h-[600px] w-full bg-gray-900 animate-pulse" />;
    }

    if (slides.length === 0) return null;

    return (
        <div className="relative h-[400px] sm:h-[600px] w-full overflow-hidden bg-gray-900 hover:shadow-2xl transition-shadow duration-500 rounded-2xl sm:rounded-3xl">
            {/* Slides */}
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100" : "opacity-0"
                        }`}
                >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                        <Image
                            src={slide.image}
                            alt={slide.title}
                            fill
                            className="object-cover opacity-60"
                            priority={index === 0}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
                    </div>

                    {/* Content */}
                    <div className="relative flex h-full items-center justify-center text-center">
                        <div className="max-w-4xl px-4 sm:px-6 lg:px-8">
                            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl drop-shadow-lg animate-fade-in-up font-serif px-2">
                                {slide.title}
                            </h1>
                            <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-white/95 drop-shadow-md animate-fade-in-up-delay line-clamp-3 sm:line-clamp-none">
                                {slide.description}
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6 animate-fade-in-up-delay-2">
                                <Link
                                    href={slide.link}
                                    className="rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all hover:scale-105"
                                >
                                    {slide.cta}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Navigation Arrows */}
            {slides.length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white/75 backdrop-blur-sm hover:bg-white/20 hover:text-white transition-all sm:left-8"
                        aria-label="Previous slide"
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2.5"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 19.5L8.25 12l7.5-7.5"
                            />
                        </svg>
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white/75 backdrop-blur-sm hover:bg-white/20 hover:text-white transition-all sm:right-8"
                        aria-label="Next slide"
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2.5"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8.25 4.5l7.5 7.5-7.5 7.5"
                            />
                        </svg>
                    </button>

                    {/* Dots Navigation */}
                    <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 justify-center space-x-3">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`h-2.5 w-2.5 rounded-full transition-all ${index === currentSlide
                                    ? "bg-white w-8"
                                    : "bg-white/50 hover:bg-white/75"
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

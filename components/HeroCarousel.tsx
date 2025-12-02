"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Leading Stroller Manufacturer in China",
      description:
        "Backed by advanced production lines and OEM/ODM expertise, we deliver safe and stylish baby strollers for global brands.",
      cta: "View Products",
      link: "/products",
      image: "/images/carousel/slider_image_04.webp",
    },
    {
      title: "Factory-Direct Baby Cribs & Furniture",
      description:
        "Produced in our 11,800㎡ facility with strict quality control, delivering sustainable and durable baby care products.",
      cta: "View Products",
      link: "/products",
      image: "/images/carousel/slider_image_05.webp",
    },
    {
      title: "Certified Baby Car Seat Factory",
      description:
        "With 56+ patents and ECE/CCC certifications, our factory ensures reliable safety solutions trusted worldwide.",
      cta: "View Products",
      link: "/products",
      image: "/images/carousel/slider_image_06.webp",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[600px] sm:h-[700px] lg:h-[800px]">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
                quality={90}
              />
              {/* Dark overlay for better text readability */}
              <div className="absolute inset-0 bg-black/40 dark:bg-black/60" />
            </div>
            
            {/* Content */}
            <div className="relative h-full w-full flex items-center justify-center">
              <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
                <div
                  className={`text-center transition-all duration-1000 ${
                    index === currentSlide
                      ? "translate-y-0 opacity-100"
                      : "translate-y-10 opacity-0"
                  }`}
                >
                  <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl drop-shadow-lg animate-fade-in-up">
                    {slide.title}
                  </h1>
                  <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90 drop-shadow-md animate-fade-in-up-delay">
                    {slide.description}
                  </p>
                  <div className="mt-10 flex items-center justify-center gap-x-6 animate-fade-in-up-delay-2">
                    <Link
                      href={slide.link}
                      className="rounded-lg bg-white px-6 py-3 text-base font-semibold text-gray-900 shadow-lg hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-transform hover:scale-105"
                    >
                      {slide.cta}
                    </Link>
                    <Link
                      href="/contact"
                      className="text-base font-semibold leading-6 text-white hover:text-white/80 transition-colors drop-shadow-md"
                    >
                      Contact Us <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/80 p-2 text-gray-800 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:scale-110 dark:bg-gray-800/80 dark:text-white dark:hover:bg-gray-800"
          aria-label="Previous slide"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/80 p-2 text-gray-800 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:scale-110 dark:bg-gray-800/80 dark:text-white dark:hover:bg-gray-800"
          aria-label="Next slide"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "w-8 bg-gray-900 dark:bg-white"
                  : "w-2 bg-gray-400 dark:bg-gray-600 hover:bg-gray-600 dark:hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}


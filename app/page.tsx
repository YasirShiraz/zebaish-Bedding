"use client";

import Link from "next/link";
import Image from "next/image";
import HeroCarousel from "../components/HeroCarousel";
import { useEffect } from "react";
import { getProductImage } from "@/lib/products";

export default function Home() {
  const mainProducts = [
    {
      name: "Bridal Bedding Sets",
      category: "Bridal Collection",
      description: "Exquisite bridal sets designed for luxury and elegance on your special day.",
      image: "/images/zebaish1 (1).jpg",
      link: "/products/elegant-bridal-bedding",
    },
    {
      name: "Royal Comfort Duvet",
      category: "Duvet Sets",
      description: "Experience the embrace of royalty with our premium velvet-touch duvets.",
      image: "/images/bedding/new/duvet_01.png",
      link: "/products/royal-comfort-duvet",
    },
    {
      name: "Luxury Cotton Sheets",
      category: "Bed Sheets",
      description: "Breathable, 100% cotton sheets for a cool, crisp, and comfortable sleep.",
      image: "/images/bedding/new/sheet_01.png",
      link: "/products/luxury-cotton-sheet",
    },
    {
      name: "Premium Sofa Covers",
      category: "Sofa Covers",
      description: "Transform your living room with our elegant, durable sofa covers in various designs.",
      image: "/images/bedding/new/sofa_cover.png",
      link: "/products/sofa-cover-premium",
    },
  ];

  const stats = [
    { value: "500+", label: "Premium Designs" },
    { value: "10k+", label: "Happy Customers" },
    { value: "100%", label: "Cotton Guarantee" },
    { value: "24/7", label: "Customer Support" },
  ];

  const services = [
    {
      title: "Nationwide Delivery",
      description: "Fast and reliable shipping across the country directly to your doorstep.",
      icon: (
        <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
      ),
    },
    {
      title: "Premium Packaging",
      description: "Beautifully packaged, making our products perfect for wedding gifts.",
      icon: (
        <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
    },
    {
      title: "Easy Returns",
      description: "Not satisfied? Return within 30 days for a full refund, no questions asked.",
      icon: (
        <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
    },
    {
      title: "Secure Payments",
      description: "Shop with confidence using our encrypted payment gateway.",
      icon: (
        <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="bg-white dark:bg-black transition-colors duration-300">
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Stats Section - Modern Design */}
      <section className="py-12 sm:py-16 bg-gray-50 dark:bg-gray-950 border-y border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center text-center p-4 sm:p-6 rounded-xl bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Products Section - Enhanced */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12 sm:mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-orange-600 dark:text-orange-500 mb-3">
              Featured Collections
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white font-serif mb-4">
              Our Signature Collections
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-gray-600 dark:text-gray-400">
              Transform your bedroom into a sanctuary of comfort and style with Zebaish Corner's premium bedding collections.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {mainProducts.map((product, index) => (
              <Link
                key={product.name}
                href={product.link}
                className="group relative overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-900 transition-transform hover:scale-105"
              >
                {/* Image Container */}
                <div className="aspect-[3/4] overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-0 transition-transform">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-orange-400 mb-1">
                    {product.category}
                  </p>
                  <h3 className="text-sm sm:text-lg font-bold mb-1 line-clamp-2">
                    {product.name}
                  </h3>
                  <button className="mt-2 w-full py-2 bg-white text-black text-xs font-bold uppercase tracking-wider rounded-md opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300">
                    View Details
                  </button>
                </div>
              </Link>
            ))}
          </div>

          {/* View All Button */}
          <div className="mt-12 text-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            >
              View All Collection
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section - Modern Cards */}
      <section className="py-16 sm:py-24 bg-gray-50 dark:bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12 sm:mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-orange-600 dark:text-orange-500 mb-3">
              Why Choose Us
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white font-serif">
              Premium Service Guaranteed
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <div
                key={index}
                className="relative p-6 sm:p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                {/* Icon */}
                <div className="mb-4 text-orange-600 dark:text-orange-500 transform group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>

                {/* Content */}
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {service.description}
                </p>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-orange-500 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-im-auto max-w-7xl text-center mb-12 sm:mb-16 px-6 py-16 sm:px-12 sm:py-20 lg:px-16">
            <Image
              src="/images/zebaish2.jpg"
              alt="CTA Background"
              fill
              className="object-cover"
            />
            <div className="relative z-10 mx-auto max-w-7xl text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-serif mb-6">
                Ready to Transform Your Space?
              </h2>
              <p className="text-lg sm:text-xl text-blue-100 mb-8">
                Explore our premium collection and discover the perfect bedding for your home.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-orange-600 font-semibold rounded-full hover:bg-gray-100 transition-colors"
                >
                  Shop Now
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-orange-600 transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 -mt-4 -mr-4 h-32 w-32 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 -mb-4 -ml-4 h-32 w-32 rounded-full bg-white/10 blur-3xl" />
          </div>
        </div>
      </section>
    </div>
  );
}

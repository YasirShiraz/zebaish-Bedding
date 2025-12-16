"use client";

import Link from "next/link";
import Image from "next/image";
import HeroCarousel from "../components/HeroCarousel";
import { useEffect, useState } from "react";
import { getProductImage } from "@/lib/products";

interface Stat {
  value: string;
  label: string;
}

interface Service {
  title: string;
  description: string;
  icon: string;
}

interface CTA {
  title: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
}

export default function Home() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [cta, setCta] = useState<CTA | null>(null);
  const [signatureCollections, setSignatureCollections] = useState<any[]>([]);

  useEffect(() => {
    // Fetch CMS content
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
            setSignatureCollections(data);
          }
        }
      } catch (error) {
        console.error("Failed to fetch home content", error);
      }
    };

    fetchContent();
  }, []);

  const defaultProducts = [
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

  const mainProducts = signatureCollections.length > 0 ? signatureCollections : defaultProducts;

  const getIcon = (key: string) => {
    switch (key) {
      case "truck":
        return (
          <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
          </svg>
        );
      case "gift":
        return (
          <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        );
      case "refresh":
        return (
          <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        );
      case "shield":
        return (
          <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-black transition-colors duration-300 font-sans">
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Stats Section - Premium White Cards */}
      {stats.length > 0 && (
        <section className="py-12 -mt-10 relative z-20 px-4">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="flex flex-col items-center justify-center text-center p-6 sm:p-8 rounded-xl bg-white dark:bg-gray-900 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300"
                >
                  <div className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-2 font-serif">
                    {stat.value}
                  </div>
                  <div className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Products Section - Signature Collections */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12 sm:mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600 dark:text-orange-500 mb-4">
              Featured Collections
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white font-serif mb-6 leading-tight">
              Our Signature Collections
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto font-light">
              Transform your bedroom into a sanctuary of comfort and style with Zebaish Corner's premium bedding collections.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mainProducts.map((product, index) => (
              <Link
                key={product.name}
                href={product.link}
                className="group relative h-[400px] overflow-hidden rounded-2xl cursor-pointer"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-orange-400 mb-2">
                    {product.category}
                  </p>
                  <h3 className="text-2xl font-bold text-white font-serif mb-2 leading-tight">
                    {product.name}
                  </h3>
                  <div className="h-0.5 w-12 bg-white group-hover:w-full transition-all duration-500" />
                </div>
              </Link>
            ))}
          </div>

          {/* View All Button */}
          <div className="mt-16 text-center">
            <Link
              href="/products"
              className="group inline-flex items-center gap-3 px-10 py-5 bg-gray-900 dark:bg-white text-white dark:text-black font-medium rounded-full hover:bg-black dark:hover:bg-gray-200 transform hover:-translate-y-1 transition-all duration-300 shadow-xl shadow-gray-200/50 dark:shadow-none"
            >
              View All Collection
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section - Why Choose Us */}
      {services.length > 0 && (
        <section className="py-20 bg-gray-50 dark:bg-black">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600 dark:text-orange-500 mb-4">
                Why Choose Us
              </p>
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white font-serif">
                Premium Service Guaranteed
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-shadow duration-300 text-left border border-gray-100 dark:border-gray-800"
                >
                  <div className="w-14 h-14 bg-orange-50 dark:bg-orange-900/20 rounded-xl flex items-center justify-center text-orange-600 dark:text-orange-500 mb-6">
                    {getIcon(service.icon)}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section - Ready to Transform */}
      {cta && (
        <section className="py-16 sm:py-24 px-4">
          <div className="mx-auto max-w-7xl relative overflow-hidden rounded-[2.5rem]">
            <div className="absolute inset-0">
              <Image
                src={cta.image}
                alt="Luxury Bedding"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-red-900/90 to-red-950/40 mix-blend-multiply"></div>
              <div className="absolute inset-0 bg-black/20"></div>
            </div>

            <div className="relative z-10 px-6 py-24 sm:px-12 lg:px-20 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-12">
              <div className="max-w-2xl">
                <h2
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-serif mb-6 leading-tight"
                  dangerouslySetInnerHTML={{ __html: cta.title }}
                />
                <p className="text-lg text-white/90 font-light max-w-lg">
                  {cta.description}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                <Link
                  href={cta.buttonLink || "/products"}
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-900 font-bold rounded-full hover:bg-gray-50 hover:scale-105 hover:shadow-lg transition-all duration-300 transform"
                >
                  {cta.buttonText}
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white/30 text-white font-bold rounded-full hover:bg-white/10 hover:border-white transition-all"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

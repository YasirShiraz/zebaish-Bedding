"use client";

import Link from "next/link";
import Image from "next/image";
import HeroCarousel from "../components/HeroCarousel";
import { useEffect, useState } from "react";

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

interface HomeSectionConfig {
  id: string;
  title: string;
  category: string;
  limit: number;
  enabled: boolean;
  image?: string;
}

// Helper to safely get a product image from DB model (images stored as JSON string)
const getDbProductImage = (product: any): string => {
  if (!product) return "/images/zebaish1 (1).jpg";

  if (product.image && typeof product.image === "string") {
    return product.image;
  }

  if (product.images && typeof product.images === "string") {
    try {
      const parsed = JSON.parse(product.images);
      if (Array.isArray(parsed) && parsed[0]) {
        return parsed[0];
      }
    } catch (e) {
      console.error("Failed to parse product images JSON", e);
    }
  }

  return "/images/zebaish1 (1).jpg";
};

export default function Home() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [cta, setCta] = useState<CTA | null>(null);
  const [signatureCollections, setSignatureCollections] = useState<any[]>([]);
  const [homeSections, setHomeSections] = useState<HomeSectionConfig[] | null>(
    null
  );

  useEffect(() => {
    // Fetch CMS content
    const fetchContent = async () => {
      try {
        const [statsRes, servicesRes, sectionsRes] = await Promise.all([
          fetch("/api/cms/content/stats"),
          fetch("/api/cms/content/services"),
          fetch("/api/cms/home-sections"),
        ]);

        if (statsRes.ok && statsRes.headers.get("content-type")?.includes("application/json")) {
          setStats(await statsRes.json());
        }
        if (servicesRes.ok && servicesRes.headers.get("content-type")?.includes("application/json")) {
          setServices(await servicesRes.json());
        }
        if (sectionsRes.ok && sectionsRes.headers.get("content-type")?.includes("application/json")) {
          const data = await sectionsRes.json();
          if (Array.isArray(data) && data.length > 0) {
            setHomeSections(data);
          }
        }
      } catch (error) {
        console.error("Failed to fetch home content", error);
      }
    };

    fetchContent();
  }, []);

  const effectiveHomeSections: HomeSectionConfig[] =
    homeSections && homeSections.length === 3
      ? homeSections
      : [
          {
            id: "bridal",
            title: "Bridal Bedding",
            category: "bridal-bedding",
            limit: 8,
            enabled: true,
          },
          {
            id: "kitchen",
            title: "Home & Kitchen",
            category: "mats",
            limit: 8,
            enabled: true,
          },
          {
            id: "beauty",
            title: "Towels & Bath Shawls",
            category: "towels",
            limit: 8,
            enabled: true,
          },
        ];

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

  const featureRow: Service[] =
    services && services.length > 0
      ? services.slice(0, 4)
      : [
          {
            title: "Premium Quality",
            description: "Soft, durable fabrics selected for everyday comfort.",
            icon: "shield",
          },
          {
            title: "Fast Delivery",
            description: "Quick dispatch across Pakistan with safe packaging.",
            icon: "truck",
          },
          {
            title: "Easy Exchange",
            description: "Simple return & exchange policy on eligible orders.",
            icon: "refresh",
          },
          {
            title: "Gift Ready",
            description: "Perfect for bridal trousseau & special occasions.",
            icon: "gift",
          },
        ];

  return (
    <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 font-sans">
      {/* Hero Banner */}
      <section className="bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 pb-10">
          <HeroCarousel />
        </div>
      </section>

      {/* Feature Row (icons) */}
      <section className="bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {featureRow.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 rounded-xl bg-slate-50 dark:bg-slate-900 px-4 py-3 shadow-sm"
              >
                <div className="text-rose-500 dark:text-rose-300">
                  {getIcon(item.icon)}
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-700 dark:text-slate-200">
                    {item.title}
                  </p>
                  <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <NewArrivalsSection />

      {/* Repeating sections: banner + grid (like reference layout) */}
      <section className="bg-slate-50 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-10 sm:space-y-12">
          {effectiveHomeSections
            .filter((section) => section.enabled)
            .map((section) => (
              <CategorySection key={section.id} config={section} />
            ))}
        </div>
      </section>
    </div>
  );
}

type CategorySectionProps = {
  config: HomeSectionConfig;
};

function NewArrivalsSection() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = new URLSearchParams();
        params.set("limit", String(8));

        const res = await fetch(`/api/products?${params.toString()}`);
        if (!res.ok) {
          console.error("Failed to fetch new arrivals", res.status, res.statusText);
          return;
        }

        const contentType = res.headers.get("content-type") || "";
        if (!contentType.includes("application/json")) {
          // API ne HTML ya koi aur response bheja, JSON parse nahi karenge
          console.error("Expected JSON for /api/products but got", contentType);
          return;
        }

        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch new arrivals", error);
      }
    };

    fetchProducts();
  }, []);

  if (!products || products.length === 0) return null;

  return (
    <section className="bg-slate-50 dark:bg-slate-950 border-b border-slate-100 dark:border-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-rose-500 dark:text-rose-300">
              Just In
            </p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-semibold font-serif text-slate-900 dark:text-slate-50">
              New Arrivals
            </h2>
          </div>
          <Link
            href="/products"
            className="text-xs sm:text-sm font-medium text-rose-600 dark:text-rose-300 hover:underline"
          >
            View all products
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {products.slice(0, 8).map((product) => {
            const imageSrc = getDbProductImage(product);

            return (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="group bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-slate-100 dark:border-slate-800"
              >
                <div className="relative h-40 sm:h-48">
                  <Image
                    src={imageSrc}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 rounded-full bg-rose-600 text-white text-[10px] font-semibold px-2 py-0.5">
                    NEW
                  </div>
                </div>
                <div className="p-3 sm:p-4 space-y-1">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">
                    {product.category?.name || ""}
                  </p>
                  <h3 className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-50 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-xs font-medium text-slate-900 dark:text-slate-50">
                    Rs. {product.salePrice ?? product.price}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CategorySection({ config }: CategorySectionProps) {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = new URLSearchParams();
        if (config.category) params.set("category", config.category);
        if (config.limit) params.set("limit", String(config.limit));

        const res = await fetch(`/api/products?${params.toString()}`);
        if (res.ok) {
          const data = await res.json();
          setProducts(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("Failed to fetch section products", error);
      }
    };

    fetchProducts();
  }, [config.category, config.limit]);

  if (!products || products.length === 0) return null;

  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Optional large banner image */}
        {config.image && (
          <div className="relative h-40 sm:h-60 w-full overflow-hidden rounded-3xl bg-gray-200 dark:bg-gray-800">
            <Image
              src={config.image}
              alt={config.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/10 to-transparent" />
            <div className="relative z-10 h-full flex items-center px-6 sm:px-10">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-[0.25em] uppercase text-white">
                {config.title}
              </h2>
            </div>
          </div>
        )}

        {!config.image && (
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-[0.2em] uppercase text-gray-900 dark:text-white">
              {config.title}
            </h2>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {products.slice(0, config.limit).map((product) => {
            const imageSrc = getDbProductImage(product);
            return (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="group bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-800"
              >
                <div className="relative h-40 sm:h-48">
                  <Image
                    src={imageSrc}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-3 sm:p-4 space-y-1">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-gray-400">
                    {product.category?.name || ""}
                  </p>
                  <h3 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-xs font-medium text-gray-900 dark:text-white">
                    Rs. {product.salePrice ?? product.price}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

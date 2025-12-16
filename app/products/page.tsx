"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useMemo, useEffect } from "react";
import AddToCartButton from "@/components/AddToCartButton";
import { useCart } from "@/contexts/CartContext";
import WhatsAppButton from "@/components/WhatsAppButton";

const categories = [
  "All Categories",
  "Bed Sheets",
  "Duvet Sets",
  "Comforters",
  "Pillows",
  "Kids Bedding",
  "Bridal Bedding",
  "Sofa Covers",
];

type SortOption = "default" | "name-asc" | "name-desc" | "price-asc" | "price-desc";

export default function Products() {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });

  // Fetch products from API
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products', { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        // Map API data to frontend format
        const mapped = Array.isArray(data) ? data.map(p => {
          // Images stored as JSON string in DB
          let validImage = '/images/placeholder.jpg';
          try {
            if (p.images) {
              const parsed = JSON.parse(p.images)[0];
              // Check if it's a valid relative or absolute URL (simple check)
              if (parsed && (parsed.startsWith('/') || parsed.startsWith('http'))) {
                validImage = parsed;
              }
            }
          } catch (e) {
            // Keep placeholder
          }

          return {
            ...p,
            code: p.id,
            image: validImage,
            category: p.category?.name || 'Uncategorized',
            link: `/products/${p.slug}`,
            salePrice: p.salePrice,
            price: p.price,
            rating: p.reviews?.length
              ? p.reviews.reduce((acc: any, review: any) => acc + review.rating, 0) / p.reviews.length
              : 0,
            reviewCount: p.reviews?.length || 0
          };
        }) : [];
        setProducts(mapped);
      })
      .catch(err => console.error("Failed to load products", err))
      .finally(() => setLoading(false));
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    // Use API products only
    let filtered = [...products];

    // Filter by category
    if (selectedCategory !== "All Categories") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    // Filter by price
    filtered = filtered.filter(
      (p) => p.price >= priceRange.min && p.price <= priceRange.max
    );

    // Sort products
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        default:
          return 0;
      }
    });

    return sorted;
  }, [selectedCategory, sortBy, searchQuery, priceRange, products]);

  const clearFilters = () => {
    setSelectedCategory("All Categories");
    setSortBy("default");
    setSearchQuery("");
    setPriceRange({ min: 0, max: 100000 });
  };

  return (
    <div className="bg-gray-50 dark:bg-black min-h-screen">
      {/* Breadcrumbs */}
      <nav className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center space-x-2 text-sm">
            <Link
              href="/"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
              Home
            </Link>
            <span className="text-gray-400 dark:text-gray-600">/</span>
            <span className="text-gray-900 dark:text-white font-medium">Collections</span>
          </div>
        </div>
      </nav>

      {/* Mobile Header - Reference Replica */}
      <section className="relative h-[250px] lg:hidden">
        <Image
          src="/images/zebaish4.jpg"
          alt="Bedding Category"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-3xl font-bold tracking-widest uppercase mb-1">BEDDING</h1>
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide opacity-90">
            <span>Home</span>
            <span>/</span>
            <span>BEDDING</span>
          </div>
        </div>
      </section>

      {/* Mobile Filter Bar - Reference Replica */}
      <div className="lg:hidden sticky top-[60px] z-30 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          {/* Filter Button - Black */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex-1 bg-black text-white dark:bg-white dark:text-black text-[10px] font-bold uppercase tracking-widest py-2.5 px-4 flex items-center justify-center gap-2"
          >
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
            </svg>
            Filter
          </button>

          {/* Sort Button - Gray/White */}
          <div className="flex-1 relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="w-full appearance-none bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100 text-[10px] font-bold uppercase tracking-widest py-2.5 px-4 text-center rounded-none border-none"
            >
              <option value="default">Sort By</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
            <svg className="w-3 h-3 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* Grid Icons */}
          <div className="flex items-center gap-2 text-gray-400 pl-2 border-l border-gray-200">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M4 4h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 10h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 16h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4z" /></svg>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M4 5h16v2H4zm0 6h16v2H4zm0 6h16v2H4z" /></svg>
          </div>
        </div>
      </div>

      {/* Desktop Hero (Hidden on Mobile) */}
      <section className="hidden lg:block relative h-[40vh] min-h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/zebaish4.jpg"
            alt="Zebaish Bedding Collection"
            fill
            className="object-cover transition-transform duration-1000 hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
        </div>
        <div className="relative mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl animate-fade-in-up">
            <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-md mb-6 border border-white/20">
              Premium Collection 2025
            </span>
            <h1 className="text-5xl font-bold text-white sm:text-6xl lg:text-7xl font-serif leading-none mb-6">
              Elevate Your <br />
              <span className="text-blue-400">Living Space</span>
            </h1>
            <p className="text-lg text-gray-200 sm:text-xl font-light leading-relaxed max-w-lg">
              Discover our curated selection of luxury bedding, combining comfort with timeless elegance.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-4 lg:py-20">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

            {/* Sidebar Filters */}
            <aside className="lg:w-72 flex-shrink-0 animate-fade-in-up">
              <div className="sticky top-24 space-y-8">
                {/* Search Bar (Mobile & Desktop) */}
                <div className="relative group">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 pl-11 text-sm shadow-sm transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-gray-800 dark:bg-gray-910 dark:text-white"
                  />
                  <svg
                    className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>

                {/* Mobile Filter Toggle */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden w-full flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-white"
                >
                  <div className="flex items-center gap-2">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                    <span>Filters & Sort</span>
                  </div>
                  <svg
                    className={`h-5 w-5 transition-transform duration-200 ${showFilters ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Filters Panel */}
                <div className={`${showFilters ? "block" : "hidden"} lg:block space-y-8`}>

                  {/* Categories */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Categories</h3>
                      {selectedCategory !== "All Categories" && (
                        <button onClick={() => setSelectedCategory("All Categories")} className="text-xs text-blue-600 font-medium hover:underline">
                          Clear
                        </button>
                      )}
                    </div>
                    <div className="space-y-1">
                      {categories.map((category) => (
                        <label
                          key={category}
                          className={`flex items-center justify-between cursor-pointer rounded-lg px-3 py-2.5 transition-all duration-200 group ${selectedCategory === category
                            ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 font-medium shadow-sm"
                            : "hover:bg-gray-100 text-gray-600 dark:text-gray-400 dark:hover:bg-gray-800 hover:pl-4"
                            }`}
                        >
                          <div className="flex items-center">
                            <input
                              type="radio"
                              name="category"
                              value={category}
                              checked={selectedCategory === category}
                              onChange={(e) => setSelectedCategory(e.target.value)}
                              className="sr-only" // Hide default radio
                            />
                            <span className="text-sm">{category}</span>
                          </div>
                          {selectedCategory === category && (
                            <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="space-y-4 pt-6 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Price Range</h3>
                      {(priceRange.min > 0 || priceRange.max < 100000) && (
                        <button onClick={() => setPriceRange({ min: 0, max: 100000 })} className="text-xs text-blue-600 font-medium hover:underline">
                          Reset
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-gray-500 mb-1.5 block font-medium">Min</label>
                        <div className="relative group">
                          <span className="absolute left-3 top-2.5 text-gray-400">Rs</span>
                          <input
                            type="number"
                            min="0"
                            value={priceRange.min}
                            onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 pl-6 text-sm transition-colors focus:bg-white focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 mb-1.5 block font-medium">Max</label>
                        <div className="relative group">
                          <span className="absolute left-3 top-2.5 text-gray-400">Rs</span>
                          <input
                            type="number"
                            min="0"
                            value={priceRange.max}
                            onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 pl-6 text-sm transition-colors focus:bg-white focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Results Section */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in-up">
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium hidden sm:block">
                  Showing <span className="text-gray-900 dark:text-white font-bold">{filteredAndSortedProducts.length}</span> results
                </p>

                <div className="flex items-center gap-3 hidden sm:flex">
                  <label htmlFor="sort" className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                    Sort by:
                  </label>
                  <div className="relative">
                    <select
                      id="sort"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as SortOption)}
                      className="appearance-none rounded-lg border border-gray-200 bg-white px-4 py-2 pr-10 text-sm font-medium text-gray-700 hover:border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 transition-shadow cursor-pointer shadow-sm"
                    >
                      <option value="default">Featured</option>
                      <option value="name-asc">Name (A-Z)</option>
                      <option value="name-desc">Name (Z-A)</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Products Grid - Optimized for Mobile (2 cols with tighter gap) */}
              {filteredAndSortedProducts.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 gap-x-2 gap-y-6 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:gap-8">
                    {filteredAndSortedProducts.map((product, index) => (
                      <div
                        key={product.code || index}
                        className="group relative animate-fade-in-up flex flex-col h-full bg-transparent"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        {/* Image */}
                        <div className="aspect-[3/4] w-full overflow-hidden bg-gray-100 dark:bg-gray-800 relative mb-3 rounded-xl">
                          {/* NEW IN Badge - Exact Replica */}
                          <div className="absolute top-3 left-3 z-10">
                            <span className="bg-white text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                              New In
                            </span>
                          </div>

                          <Link href={product.link} className="block h-full w-full">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            />
                          </Link>

                          {/* Cart Button Overlay (Desktop Only) */}
                          <div className="absolute bottom-3 right-3 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hidden lg:block">
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                addToCart({
                                  id: product.code,
                                  code: product.code,
                                  name: product.name,
                                  price: product.salePrice && product.salePrice < product.price ? product.salePrice : product.price,
                                  image: product.image,
                                  category: product.category,
                                  slug: product.slug,
                                });
                              }}
                              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black shadow-lg hover:scale-110 active:scale-95"
                            >
                              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                              </svg>
                            </button>
                          </div>
                        </div>

                        {/* Product Details - Reference Replica */}
                        <div className="flex flex-col flex-1 px-1 pt-2 pb-1 justify-between">
                          <div>
                            <Link href={product.link} className="block">
                              <h3 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-1 line-clamp-2 min-h-[2.5em]">
                                {product.name}
                              </h3>
                            </Link>

                            {/* Star Rating */}
                            <div className="flex items-center gap-1 mt-1 mb-1">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <svg
                                    key={i}
                                    className={`w-3 h-3 ${i < Math.round(product.rating || 0) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                  </svg>
                                ))}
                              </div>
                              <span className="text-[10px] text-gray-500 font-medium">({product.reviewCount || 0})</span>
                            </div>
                            <div className="flex items-center flex-wrap gap-2 mt-2">
                              {product.salePrice && product.salePrice < product.price ? (
                                <>
                                  <p className="text-base font-bold text-gray-900 dark:text-white">
                                    Rs {product.salePrice.toLocaleString()}
                                  </p>
                                  <p className="text-xs text-gray-500 line-through">
                                    Rs {product.price.toLocaleString()}
                                  </p>
                                  <span className="text-[10px] font-bold text-red-600 bg-red-100 px-1.5 py-0.5 rounded-sm dark:bg-red-900/30 dark:text-red-400">
                                    SAVE {Math.round(((product.price - product.salePrice) / product.price) * 100)}%
                                  </span>
                                </>
                              ) : (
                                <p className="text-base font-bold text-gray-900 dark:text-white">
                                  Rs {product.price.toLocaleString()}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Add to Cart Button (Mobile/All Screens) - Outlined Style */}
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              addToCart({
                                id: product.code,
                                code: product.code,
                                name: product.name,
                                price: product.salePrice && product.salePrice < product.price ? product.salePrice : product.price,
                                image: product.image,
                                category: product.category,
                                slug: product.slug,
                              });
                            }}
                            className="mt-3 w-full py-2.5 border border-gray-900 dark:border-white text-gray-900 dark:text-white text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-200"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="rounded-3xl bg-white p-16 text-center shadow-sm border border-gray-100 dark:bg-gray-900 dark:border-gray-800 animate-fade-in-up">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                    <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">No products found</h3>
                  <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                    We couldn't find any products matching your current filters. Try adjusting your search or filter settings.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-500 hover:shadow-blue-600/30 transition-all"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Floating Button */}
      <WhatsAppButton />

      {/* CTA Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/zebaish1 (1).jpg"
            alt="Custom Bedding Background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-[2px]"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl font-serif">
              Looking for Custom Sizes?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-200">
              We offer bespoke bedding solutions and exclusive bridal packages tailored to your specific needs.
            </p>
            <div className="mt-10">
              <Link
                href="/contact"
                className="inline-block rounded-full bg-white px-8 py-4 text-base font-bold text-gray-900 shadow-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300"
              >
                Contact Our Specialists
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

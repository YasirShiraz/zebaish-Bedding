"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useMemo, useEffect } from "react";
import AddToCartButton from "@/components/AddToCartButton";
import { allCollections } from "@/lib/products";
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
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...allCollections];

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
  }, [selectedCategory, sortBy, searchQuery, priceRange]);

  const clearFilters = () => {
    setSelectedCategory("All Categories");
    setSortBy("default");
    setSearchQuery("");
    setPriceRange({ min: 0, max: 1000 });
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

      {/* Enhanced Hero Section */}
      <section className="relative h-[40vh] min-h-[400px] overflow-hidden">
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

      {/* New Arrivals Section (Mobile/Tablet Highlight) */}
      <section className="py-8 pl-4 lg:hidden">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white font-serif">
          New Arrivals
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x pr-4 scrollbar-hide">
          {allCollections.slice(0, 5).map((product) => (
            <Link
              key={`new-${product.code}`}
              href={product.link}
              className="relative min-w-[160px] snap-start rounded-lg overflow-hidden flex-shrink-0 group"
            >
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover rounded-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 pt-8">
                  <p className="text-white text-sm font-bold truncate">{product.name}</p>
                  <p className="text-gray-200 text-xs">${product.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
                      {(priceRange.min > 0 || priceRange.max < 1000) && (
                        <button onClick={() => setPriceRange({ min: 0, max: 1000 })} className="text-xs text-blue-600 font-medium hover:underline">
                          Reset
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-gray-500 mb-1.5 block font-medium">Min</label>
                        <div className="relative group">
                          <span className="absolute left-3 top-2.5 text-gray-400">$</span>
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
                          <span className="absolute left-3 top-2.5 text-gray-400">$</span>
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
              <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in-up">
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  Showing <span className="text-gray-900 dark:text-white font-bold">{filteredAndSortedProducts.length}</span> results
                </p>

                <div className="flex items-center gap-3">
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
                  <div className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:gap-8">
                    {filteredAndSortedProducts.map((product, index) => (
                      <div
                        key={product.code}
                        className="group relative animate-fade-in-up"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        {/* Image - Minimalist: No border, just the image */}
                        <div className="aspect-[3/4] w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 relative">
                          {/* Badges - Simplified */}
                          {product.price > 200 && (
                            <div className="absolute top-2 left-2 z-10">
                              <span className="inline-block px-2 py-1 text-[10px] font-bold tracking-widest text-white bg-black uppercase shadow-sm">
                                Premium
                              </span>
                            </div>
                          )}
                          {product.price < 80 && (
                            <div className="absolute top-2 left-2 z-10">
                              <span className="inline-block px-2 py-1 text-[10px] font-bold tracking-widest text-white bg-red-600 uppercase shadow-sm">
                                Sale
                              </span>
                            </div>
                          )}

                          <Link href={product.link} className="block h-full w-full">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            />
                            {/* Subtle dark overlay on hover */}
                            <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
                          </Link>

                          {/* Quick Add - Minimalist: Floating button */}
                          <div className="absolute bottom-3 right-3 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hidden sm:block">
                            <button
                              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black shadow-lg transition-transform hover:scale-110 active:scale-95"
                              title="Add to Cart"
                            >
                              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                              </svg>
                            </button>
                          </div>
                        </div>

                        {/* Product Details - Red Home Store Style */}
                        <div className="mt-2 space-y-1 text-center">
                          <div className="min-w-0">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-1">
                              {product.category}
                            </p>
                            <Link href={product.link} className="block group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              <h3 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 leading-tight">
                                {product.name}
                              </h3>
                            </Link>
                          </div>

                          <div className="flex flex-col items-center gap-2 pt-1">
                            <div className="mt-1 flex items-center gap-2">
                              <p className="text-sm font-bold text-gray-900 dark:text-white">
                                ${product.price}
                              </p>
                            </div>

                            {/* Quick Add Button - Always Visible */}
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                // Add to cart logic here
                              }}
                              className="w-full py-1.5 px-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                            >
                              Quick Add
                            </button>

                            {/* Rating stars - Small and subtle */}
                            <div className="flex items-center gap-0.5 sm:gap-1 text-yellow-500">
                              <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <span className="text-xs text-gray-400">(24)</span>
                            </div>
                          </div>
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

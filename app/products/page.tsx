"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useMemo } from "react";
import AddToCartButton from "@/components/AddToCartButton";
import { getProductImage, getProductPrice, getProductSlug } from "@/lib/products";


// All products data
const allProducts = [
  { name: "H2D+C Baby Stroller", code: "H2D+C", category: "Baby Strollers", brand: "Kidilo", link: "/products/stroller-h2dc" },
  { name: "A10 Baby Stroller", code: "A10", category: "Baby Strollers", brand: "Kidilo", link: "/products/stroller-a10" },
  { name: "KBH311 Baby Car Seat", code: "KBH311", category: "Baby Car Seats", brand: "Kidilo", link: "/products/car-seat-kbh311" },
  { name: "C002 Baby Car Seat", code: "C002", category: "Baby Car Seats", brand: "Kidilo", link: "/products/car-seat-c002" },
  { name: "UP650X Baby Crib", code: "UP650X", category: "Baby Cribs", brand: "Kidilo", link: "/products/crib-up650x" },
  { name: "AP9405 Baby Crib", code: "AP9405", category: "Baby Cribs", brand: "Kidilo", link: "/products/crib-ap9405" },
  { name: "DC02 Baby High Chair", code: "DC02", category: "Baby High Chairs", brand: "Kidilo", link: "/products/high-chair-dc02" },
  { name: "TY-02 Baby High Chair", code: "TY-02", category: "Baby High Chairs", brand: "Kidilo", link: "/products/high-chair-ty02" },
  { name: "TY01 Swing Chair", code: "TY01", category: "Baby Gear", brand: "Kidilo", link: "/products/swing-ty01" },
  { name: "X177 Learning Walker", code: "X177", category: "Baby Gear", brand: "Kidilo", link: "/products/walker-x177" },
];

const categories = [
  "All Categories",
  "Baby Strollers",
  "Baby Car Seats",
  "Baby Cribs",
  "Baby High Chairs",
  "Baby Gear",
];

type SortOption = "default" | "name-asc" | "name-desc" | "code-asc" | "code-desc";

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [showFilters, setShowFilters] = useState(false);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...allProducts];

    // Filter by category
    if (selectedCategory !== "All Categories") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Sort products
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "code-asc":
          return a.code.localeCompare(b.code);
        case "code-desc":
          return b.code.localeCompare(a.code);
        default:
          return 0;
      }
    });

    return sorted;
  }, [selectedCategory, sortBy]);

  const clearFilters = () => {
    setSelectedCategory("All Categories");
    setSortBy("default");
  };

  return (
    <div className="bg-white dark:bg-black">
      {/* Hero Section */}
     <section className="relative h-[400px] overflow-hidden">
            <div className="absolute inset-0">
              <Image
                src="/images/kidilo-building.jpg.webp"
                alt="Kidilo Building"
                fill
                className="object-cover blur-sm"
              />
              <div className="absolute inset-0 bg-black/50"></div>
            </div>
            <div className="relative mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
              <div>
                <h1 className="text-5xl font-bold text-white sm:text-6xl lg:text-7xl">
                 Our Baby Products
                </h1>
                <p className="mt-4 text-xl text-white sm:text-2xl">
                    Browse our complete collection of safe, certified baby products.
        All products are <br/> developed  and produced in our certified factory.
                </p>
              </div>
            </div>
          </section>


      {/* Products Section with Filters */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="lg:w-64 flex-shrink-0">
              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden w-full mb-4 flex items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                <span>Filters</span>
                <svg
                  className={`h-5 w-5 transition-transform ${showFilters ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Filters Panel */}
              <div
                className={`${showFilters ? "block" : "hidden"
                  } lg:block space-y-6 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900`}
              >
                {/* Header */}
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h2>
                  <button
                    onClick={clearFilters}
                    className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    Clear All
                  </button>
                </div>

                {/* Categories Filter */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label
                        key={category}
                        className="flex items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 rounded px-2 py-1"
                      >
                        <input
                          type="radio"
                          name="category"
                          value={category}
                          checked={selectedCategory === category}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                        />
                        <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Results Count */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Showing <span className="font-semibold text-gray-900 dark:text-white">{filteredAndSortedProducts.length}</span>{" "}
                    {filteredAndSortedProducts.length === 1 ? "product" : "products"}
                  </p>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Showing <span className="font-semibold text-gray-900 dark:text-white">{filteredAndSortedProducts.length}</span>{" "}
                    {filteredAndSortedProducts.length === 1 ? "product" : "products"}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <label htmlFor="sort" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Sort by:
                  </label>
                  <select
                    id="sort"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                  >
                    <option value="default">Default</option>
                    <option value="name-asc">Name (A-Z)</option>
                    <option value="name-desc">Name (Z-A)</option>
                    <option value="code-asc">Code (A-Z)</option>
                    <option value="code-desc">Code (Z-A)</option>
                  </select>
                </div>
              </div>

              {/* Products Grid */}
              {filteredAndSortedProducts.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
                  {filteredAndSortedProducts.map((product) => {
                    const productImage = getProductImage(product.code);
                    const productSlug = getProductSlug(product.code);
                    return (
                      <div
                        key={product.code}
                        className="group relative flex flex-col overflow-hidden rounded-xl bg-white border border-gray-200 p-4 transition-all hover:shadow-lg hover:border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-600 h-full"
                      >
                        <Link href={product.link} className="block flex-grow flex flex-col">
                          {/* Product Image */}
                          <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700 relative mb-4 flex-shrink-0">
                            <Image
                              src={productImage}
                              alt={product.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>

                          {/* Product Info */}
                          <div className="space-y-2 flex-grow">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                  {product.name}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                  Code: <span className="font-medium">{product.code}</span>
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center justify-between pt-2">
                              <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{product.category}</p>
                                <p className="text-xs font-medium text-blue-600 dark:text-blue-400">{product.brand}</p>
                              </div>
                              <p className="text-lg font-bold text-gray-900 dark:text-white">
                                ${getProductPrice(product.code).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </Link>

                        {/* Add to Cart Button */}
                        <div className="pt-4 border-t border-gray-200 dark:border-gray-700 mt-4 flex-shrink-0">
                          <AddToCartButton
                            product={{
                              id: product.code,
                              name: product.name,
                              code: product.code,
                              category: product.category,
                              image: productImage,
                              slug: productSlug,
                            }}
                            variant="small"
                            className="w-full"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                  <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">No products found</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Try adjusting your filters to see more results.
                  </p>
                  <div className="mt-6">
                    <button
                      onClick={clearFilters}
                      className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                      Clear Filters
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 py-16 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Need Custom Products?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
              We offer full OEM/ODM services with custom design and branding options.
            </p>
            <div className="mt-10">
              <Link
                href="/contact"
                className="rounded-lg bg-white px-6 py-3 text-base font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

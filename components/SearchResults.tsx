"use client";

import Link from "next/link";
import Image from "next/image";
import { getProductImage, getProductSlug } from "@/lib/products";

interface SearchResultsProps {
  query: string;
  onClose: () => void;
}

// Product data for search
const allProducts = [
  { name: "H2D+C Baby Stroller", code: "H2D+C", category: "Baby Strollers", link: "/products/stroller-h2dc" },
  { name: "A10 Baby Stroller", code: "A10", category: "Baby Strollers", link: "/products/stroller-a10" },
  { name: "KBH311 Baby Car Seat", code: "KBH311", category: "Baby Car Seats", link: "/products/car-seat-kbh311" },
  { name: "C002 Baby Car Seat", code: "C002", category: "Baby Car Seats", link: "/products/car-seat-c002" },
  { name: "UP650X Baby Crib", code: "UP650X", category: "Baby Cribs", link: "/products/crib-up650x" },
  { name: "AP9405 Baby Crib", code: "AP9405", category: "Baby Cribs", link: "/products/crib-ap9405" },
  { name: "DC02 Baby High Chair", code: "DC02", category: "Baby High Chairs", link: "/products/high-chair-dc02" },
  { name: "TY-02 Baby High Chair", code: "TY-02", category: "Baby High Chairs", link: "/products/high-chair-ty02" },
  { name: "TY01 Swing Chair", code: "TY01", category: "Baby Gear", link: "/products/swing-ty01" },
  { name: "X177 Learning Walker", code: "X177", category: "Baby Gear", link: "/products/walker-x177" },
];

// Blog posts data for search
const blogPosts = [
  {
    title: "Introduction: Best Newborn Stroller – The Ultimate Guide",
    excerpt: "The best newborn stroller is an essential item for parents. Discover what makes a stroller perfect for your newborn baby.",
    category: "Product Guide",
    link: "/blog/best-newborn-stroller-guide",
  },
  {
    title: "Kidilo: Your Trusted Partner for Premium Baby Gear, Including Top-Quality Kidilo Stroller",
    excerpt: "When it comes to reliable and safe baby products, Kidilo stands out as a leading manufacturer. Learn about our premium stroller collection.",
    category: "Company News",
    link: "/blog/kidilo-premium-baby-gear",
  },
  {
    title: "Kidilo Launches New Baby Walkers to Support Safe First Steps",
    excerpt: "Kidilo, a leading Baby Carriage Chinese manufacturer and trusted brand, announces the launch of new baby walkers designed to support safe first steps.",
    category: "Product Launch",
    link: "/blog/new-baby-walkers-launch",
  },
  {
    title: "Baby Crib Market Sees New Growth: Eco-Friendly and Multi-Functional Designs Take the Spotlight",
    excerpt: "With the growing popularity of 'refined parenting,' the baby crib market is experiencing new growth trends focusing on eco-friendly and multi-functional designs.",
    category: "Market Insights",
    link: "/blog/baby-crib-market-growth",
  },
];

export default function SearchResults({ query, onClose }: SearchResultsProps) {
  if (!query || query.trim().length < 2) {
    return null;
  }

  const searchTerm = query.toLowerCase().trim();

  // Search products
  const productResults = allProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.code.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
  );

  // Search blog posts
  const blogResults = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm) ||
      post.excerpt.toLowerCase().includes(searchTerm) ||
      post.category.toLowerCase().includes(searchTerm)
  );

  const totalResults = productResults.length + blogResults.length;

  if (totalResults === 0) {
    return (
      <div className="absolute left-0 right-0 top-full mt-2 z-50 max-h-96 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-900">
        <div className="p-6 text-center">
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
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
            No results found
          </p>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Try searching for products or blog posts
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute left-0 right-0 top-full mt-2 z-50 max-h-96 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-900">
      {/* Products Results */}
      {productResults.length > 0 && (
        <div className="p-4">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-3">
            Products ({productResults.length})
          </h3>
          <div className="space-y-2">
            {productResults.map((product) => {
              const productImage = getProductImage(product.code);
              return (
                <Link
                  key={product.code}
                  href={product.link}
                  onClick={onClose}
                  className="flex items-center gap-3 rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                >
                  <div className="relative h-12 w-12 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                    <Image
                      src={productImage}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 truncate">
                      {product.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {product.code} • {product.category}
                    </p>
                  </div>
                  <svg
                    className="h-5 w-5 text-gray-400 flex-shrink-0"
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
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Blog Results */}
      {blogResults.length > 0 && (
        <div className={`p-4 ${productResults.length > 0 ? "border-t border-gray-200 dark:border-gray-800" : ""}`}>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-3">
            Blog Posts ({blogResults.length})
          </h3>
          <div className="space-y-2">
            {blogResults.map((post) => (
              <Link
                key={post.link}
                href={post.link}
                onClick={onClose}
                className="block rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
              >
                <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-1">
                  {post.title}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">
                  {post.excerpt}
                </p>
                <span className="mt-2 inline-block text-xs text-gray-400 dark:text-gray-500">
                  {post.category}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* View All Results */}
      {(productResults.length > 3 || blogResults.length > 3) && (
        <div className="border-t border-gray-200 dark:border-gray-800 p-4">
          <Link
            href={`/search?q=${encodeURIComponent(query)}`}
            onClick={onClose}
            className="block text-center text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            View All Results ({totalResults})
          </Link>
        </div>
      )}
    </div>
  );
}


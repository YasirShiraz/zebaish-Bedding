"use client";

import Link from "next/link";
import Image from "next/image";
import { allCollections } from "@/lib/products";

interface SearchResultsProps {
  query: string;
  onClose: () => void;
}

// Use centralized product data for search
const allProducts = allCollections.map((product) => ({
  name: product.name,
  code: product.code,
  category: product.category,
  link: product.link,
}));

// Blog posts data for search  
const blogPosts = [
  {
    title: "Choosing the Perfect Thread Count: A Guide",
    excerpt: "Understanding thread count is key to finding the perfect sheets. Learn what matters most for your comfort.",
    category: "Fabric Guide",
    link: "/blog/thread-count-guide",
  },
  {
    title: "Bridal Bedding Trends for 2024",
    excerpt: "From royal velvets to subtle embroidery, discover the trends defining elegant bridal bedrooms this year.",
    category: "Trends",
    link: "/blog/bridal-trends-2024",
  },
  {
    title: "Why Bamboo Pillows Are a Game Changer",
    excerpt: "Discover the cooling and hypoallergenic benefits of bamboo memory foam pillows for a better night's sleep.",
    category: "Sleep Health",
    link: "/blog/bamboo-pillow-benefits",
  },
  {
    title: "Caring for Your Luxury Duvets",
    excerpt: "Extend the life of your premium bedding with these simple care and washing tips.",
    category: "Care Tips",
    link: "/blog/bedding-care-tips",
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
            Try searching for bedding products or blog posts
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
              const fullProduct = allCollections.find((p) => p.code === product.code);
              const productImage = fullProduct?.image || "/images/bedding/new/hero_new_1.png";
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

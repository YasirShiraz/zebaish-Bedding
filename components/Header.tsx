"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import Cart from "@/components/Cart";
import CartIcon from "@/components/CartIcon";
import SearchResults from "@/components/SearchResults";
import UserMenu from "@/components/UserMenu";
import { useAuth } from "@/contexts/AuthContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [settings, setSettings] = useState<Record<string, string>>({});
  const searchRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Fetch settings
    fetch("/api/cms/settings")
      .then((res) => res.json())
      .then((data) => setSettings(data))
      .catch((err) => console.error("Failed to load settings", err));
  }, []);

  // Use auth hook - it's safe because AuthProvider wraps Header in layout
  const { user, isAuthenticated, logout } = useAuth();

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        // Don't close if clicking on search button
        const target = event.target as HTMLElement;
        if (!target.closest('button[aria-label="Search"]')) {
          setIsSearchOpen(false);
        }
      }
    };

    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/contact", label: "Contact" },
  ];

  const email = settings.contact_email || "zebaishbedding@gmail.com";
  const phone = settings.contact_phone || "+92 345 3177990";

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-gray-800 dark:bg-gray-900/95">
      {/* Top Bar */}
      <div className="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <a
              href={`mailto:${email}`}
              className="hidden text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white sm:block"
            >
              Email: {email}
            </a>
            <span className="hidden text-gray-400 sm:inline">|</span>
            <a
              href={`tel:${phone.replace(/\s/g, "")}`}
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              <span className="hidden sm:inline">Order Hotline: </span>{phone}
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              aria-label="Search"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            <span className="text-gray-400">Search</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
        {/* Logo - Centered on Mobile, Left on Desktop */}
        <Link
          href="/"
          className="flex items-center transition-transform hover:scale-105"
        >
          <Image
            src="/images/logo-brand.png"
            alt="Zebaish Corner"
            width={180}
            height={60}
            className="h-12 w-auto md:h-16 object-contain"
            priority
          />
        </Link>

        {/* Desktop Navigation - Centered */}
        <div className="hidden items-center space-x-12 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative text-xs font-semibold uppercase tracking-[0.2em] text-gray-900 transition-colors hover:text-gray-600 dark:text-gray-100 dark:hover:text-gray-300"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-6">
          {/* Theme Switcher */}
          <div className="hidden sm:block">
            <ThemeSwitcher />
          </div>

          {/* Search Icon */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="hidden text-gray-700 transition-colors hover:text-black dark:text-gray-300 dark:hover:text-white md:block"
            aria-label="Search"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          {/* Wishlist Icon */}
          <Link
            href="/wishlist"
            className="hidden text-gray-700 transition-colors hover:text-black dark:text-gray-300 dark:hover:text-white md:block"
            aria-label="Wishlist"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </Link>

          {/* Cart Icon */}
          <div className="relative">
            <CartIcon onClick={() => setIsCartOpen(true)} />
          </div>

          {/* User Account */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center space-x-2 text-gray-700 transition-colors hover:text-black dark:text-gray-300 dark:hover:text-white"
              aria-label="Account"
            >
              {mounted && isAuthenticated && user ? (
                <div className="h-8 w-8 rounded-full bg-gray-900 border border-gray-200 flex items-center justify-center text-white text-xs font-medium dark:bg-white dark:text-black">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
              ) : (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              )}
            </button>
            <UserMenu isOpen={isUserMenuOpen} onClose={() => setIsUserMenuOpen(false)} />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6 text-gray-900 dark:text-white"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Search Bar */}
      {isSearchOpen && (
        <div className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <div className="relative" ref={searchRef}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && searchQuery.trim().length > 0) {
                    // Save to history
                    const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
                    const newHistory = [searchQuery.trim(), ...history.filter((h: string) => h !== searchQuery.trim())].slice(0, 5);
                    localStorage.setItem('searchHistory', JSON.stringify(newHistory));

                    window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
                    setIsSearchOpen(false);
                  }
                }}
                onFocus={() => setIsSearchOpen(true)}
                placeholder="Search products, blog posts..."
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pl-10 pr-4 text-gray-900 placeholder-gray-500 focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:border-gray-700 dark:bg-gray-800 !dark:text-white dark:placeholder-gray-400 dark:focus:border-gray-600"
                autoFocus
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              {/* Search Results */}
              <SearchResults query={searchQuery} onClose={() => setIsSearchOpen(false)} />
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 md:hidden">
          <div className="space-y-1 px-4 pb-4 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {/* Admin Link - Mobile Only */}
            {mounted && user?.role === 'ADMIN' && (
              <Link
                href="/admin"
                className="flex items-center justify-between rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Admin Dashboard</span>
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </Link>
            )}

            {/* Wishlist Mobile Link */}
            <Link
              href="/wishlist"
              className="flex items-center justify-between rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              <span>Wishlist</span>
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </Link>

            {/* Login/Signup Button - Mobile Only */}
            <div className="mt-4 space-y-2">
              {mounted && isAuthenticated ? (
                <>
                  <Link
                    href="/profile"
                    className="block rounded-lg bg-black px-4 py-3 text-center text-sm font-semibold text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Account
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-center text-sm font-semibold text-red-600 hover:bg-red-100 dark:border-red-900 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex gap-2">
                  <Link
                    href="/login"
                    className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-center text-sm font-semibold text-gray-900 hover:bg-gray-50 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="flex-1 rounded-lg bg-black px-4 py-3 text-center text-sm font-semibold text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            <div className="mt-4 space-y-2 border-t border-gray-200 pt-4 dark:border-gray-800">
              <a
                href={`mailto:${email}`}
                className="text-xs hover:text-gray-200 transition-colors"
                aria-label={`Email us at ${email}`}
              >
                {email}
              </a>
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400"
              >
                {phone}
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Cart Component */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
}



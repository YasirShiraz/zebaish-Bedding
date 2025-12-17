"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Footer() {
  const [settings, setSettings] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch("/api/cms/settings")
      .then((res) => res.json())
      .then((data) => setSettings(data))
      .catch((err) => console.error("Failed to load settings", err));
  }, []);

  const email = settings.contact_email || "zebaishbedding@gmail.com";
  const phone = settings.contact_phone || "+92 345 3177990";
  const address = settings.contact_address || "Home# 35, Mohammadi Homeping Center,\nHydri Market, Block G,\nNorth Nazimabad Town, Karachi";
  const description = settings.footer_description || "Transform your living space with our premium bedding and home accessories. Quality, comfort, and style in every thread.";
  const instagram = settings.social_instagram || "https://instagram.com";
  const facebook = settings.social_facebook || "https://facebook.com";
  const whatsapp = settings.social_whatsapp || "https://wa.me/923453177990";
  const tiktok = settings.social_tiktok || "https://www.tiktok.com/@zebaish";
  const youtube = settings.social_youtube || "https://www.youtube.com";

  return (
    <footer className="bg-gray-50 dark:bg-black border-t border-gray-200 dark:border-gray-800">
      {/* Newsletter Section - Premium Band */}
      <div className="border-b border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-serif font-medium text-gray-900 dark:text-white">
                Join Our Newsletter
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Subscribe to receive updates, access to exclusive deals, and more.
              </p>
            </div>
            <form className="flex w-full max-w-md flex-col gap-3 sm:flex-row sm:gap-2">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full min-w-0 appearance-none rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-black focus:ring-1 focus:ring-black dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-white dark:focus:ring-white"
              />
              <button
                type="submit"
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-black px-6 py-2.5 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 dark:bg-white dark:text-black dark:hover:bg-gray-200 sm:w-auto"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Zebaish Bedding</span>
              <Image
                className="h-8 w-auto dark:invert dark:brightness-0 dark:sepia dark:hue-rotate-15 dark:saturate-50"
                width={150}
                height={40}
                src="/images/logo-text.svg"
                alt="Zebaish Bedding"
              />
            </Link>
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              {description}
            </p>
            {/* Social Links */}
            <div className="flex flex-wrap gap-3">
              {/* Instagram */}
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-yellow-200 via-pink-300 to-purple-300 text-white shadow-sm ring-1 ring-transparent hover:shadow-md hover:brightness-105 transition-all dark:from-yellow-300 dark:via-pink-400 dark:to-purple-400"
              >
                <span className="sr-only">Instagram</span>
                <span className="flex h-7 w-7 items-center justify-center rounded-[0.9rem] bg-black/80 group-hover:bg-black transition-colors">
                  {/* Classic Instagram glyph: rounded square, circle, small dot */}
                  <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="5"
                      ry="5"
                      fill="none"
                      stroke="white"
                      strokeWidth="1.6"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="4"
                      fill="none"
                      stroke="white"
                      strokeWidth="1.6"
                    />
                    <circle cx="17" cy="7" r="1.1" fill="white" />
                  </svg>
                </span>
              </a>
              {/* Facebook */}
              <a
                href={facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-[#1877F2] shadow-sm ring-1 ring-gray-200 hover:bg-[#1877F2] hover:text-white hover:ring-[#1877F2] transition-colors dark:bg-gray-900 dark:text-[#70a4ff] dark:ring-gray-800 dark:hover:bg-[#1877F2] dark:hover:text-white"
              >
                <span className="sr-only">Facebook</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12Z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              {/* WhatsApp */}
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-emerald-500 shadow-sm ring-1 ring-gray-200 hover:bg-emerald-500 hover:text-white hover:ring-emerald-500 transition-colors dark:bg-gray-900 dark:text-emerald-400 dark:ring-gray-800 dark:hover:bg-emerald-500 dark:hover:text-white"
              >
                <span className="sr-only">WhatsApp</span>
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.52 3.48A11.78 11.78 0 0 0 12.04 0C5.73 0 .6 5.11.6 11.4c0 2.01.53 3.98 1.54 5.72L0 24l7.07-2.09a11.47 11.47 0 0 0 4.97 1.12h.01c6.31 0 11.44-5.11 11.44-11.4 0-3.05-1.21-5.92-3.47-8.15ZM12.05 21.3h-.01a9.7 9.7 0 0 1-4.95-1.36l-.36-.21-4.2 1.24 1.23-4.09-.24-.42A9.37 9.37 0 0 1 2.41 11.4C2.4 6.2 6.8 1.87 12.04 1.87c2.6 0 5.04 1.01 6.88 2.84a9.52 9.52 0 0 1 2.83 6.7c0 5.2-4.4 9.53-9.7 9.53Zm5.34-7.1c-.29-.15-1.7-.84-1.96-.93-.26-.1-.45-.15-.64.15-.19.29-.74.92-.91 1.11-.17.19-.34.21-.63.06-.29-.15-1.22-.49-2.32-1.55-.86-.83-1.44-1.85-1.61-2.15-.17-.29-.02-.45.13-.6.14-.14.29-.34.43-.51.15-.17.19-.29.29-.49.1-.19.05-.36-.02-.51-.07-.15-.64-1.55-.88-2.12-.23-.55-.47-.48-.64-.49h-.55c-.19 0-.5.07-.76.36-.26.29-1 1-1 2.44 0 1.44 1.03 2.84 1.17 3.04.15.19 2.03 3.1 4.92 4.35.69.3 1.23.48 1.65.62.69.22 1.32.19 1.82.12.56-.08 1.7-.69 1.94-1.36.24-.68.24-1.26.17-1.36-.07-.1-.26-.17-.54-.32Z" />
                </svg>
              </a>
              {/* TikTok */}
              <a
                href={tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-900 shadow-sm ring-1 ring-gray-200 hover:bg-black hover:text-white hover:ring-black transition-colors dark:bg-gray-900 dark:text-gray-100 dark:ring-gray-800 dark:hover:bg-white dark:hover:text-black"
              >
                <span className="sr-only">TikTok</span>
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19.69 7.35a5.54 5.54 0 0 1-3.32-1.1A5.67 5.67 0 0 1 14.8 3h-.01A3.1 3.1 0 0 0 11.7 0H9.46v14.02a1.77 1.77 0 0 1-1.8 1.74 1.77 1.77 0 0 1-1.8-1.74 1.77 1.77 0 0 1 1.8-1.74c.18 0 .35.03.52.08V9.3a5.57 5.57 0 0 0-.52-.02A5.72 5.72 0 0 0 2 14.02 5.72 5.72 0 0 0 8.14 20a5.72 5.72 0 0 0 5.76-5.65V9c.59.43 1.26.77 1.97.99.6.2 1.23.31 1.87.33V7.35Z" />
                </svg>
              </a>
              {/* YouTube */}
              <a
                href={youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-red-600 shadow-sm ring-1 ring-gray-200 hover:bg-red-600 hover:text-white hover:ring-red-600 transition-colors dark:bg-gray-900 dark:text-red-400 dark:ring-gray-800 dark:hover:bg-red-600 dark:hover:text-white"
              >
                <span className="sr-only">YouTube</span>
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M23.5 6.2s-.23-1.64-.95-2.36c-.9-.95-1.9-.96-2.36-1.01C16.4 2.5 12 2.5 12 2.5h-.01s-4.4 0-8.19.33c-.46.05-1.46.06-2.36 1.01C.73 4.56.5 6.2.5 6.2S.27 8.12.27 10.03v1.88c0 1.92.23 3.84.23 3.84s.23 1.64.95 2.36c.9.95 2.08.92 2.61 1.03 1.9.19 7.94.33 7.94.33s4.41-.01 8.2-.34c.46-.05 1.46-.06 2.36-1.01.72-.72.95-2.36.95-2.36s.23-1.92.23-3.84v-1.88c0-1.91-.23-3.83-.23-3.83ZM9.75 14.73V7.77l6.13 3.48-6.13 3.48Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
              Explore
            </h3>
            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <Link href="/" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/products?sort=newest" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/orders" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors">
                  Track Your Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
              Customer Care
            </h3>
            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <Link href="/shipping-policy" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors">
                  Returns & Exchange
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
              Contact Us
            </h3>
            <ul className="mt-6 space-y-4 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start">
                <span className="mr-3 text-black dark:text-white">📍</span>
                <span>
                  {address}
                </span>
              </li>
              <li className="flex items-center">
                <span className="mr-3 text-black dark:text-white">📞</span>
                <a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-black dark:hover:text-white transition-colors">
                  {phone}
                </a>
              </li>
              <li className="flex items-center">
                <span className="mr-3 text-black dark:text-white">✉️</span>
                <a href={`mailto:${email}`} className="hover:text-black dark:hover:text-white transition-colors">
                  {email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900/50">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 text-xs text-gray-500 dark:text-gray-500 sm:flex-row">
            <p>© 2025 Zebaish Corner. All Rights Reserved.</p>
            <div className="flex items-center gap-4">
              <p></p>
              <span className="h-4 w-px bg-gray-300 dark:bg-gray-700"></span>
              <p></p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

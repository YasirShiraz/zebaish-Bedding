import Link from "next/link";
import Image from "next/image";

export default function Footer() {
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
                className="h-8 w-auto dark:invert dark:brightness-0 dark:sepia dark:hue-rotate-15 dark:saturate-50" // Invert for dark mode if needed, but currentcolor works better on svg if rendered inline. However Next/Image renders as img tag. We might need CSS filter for dark mode if currentColor doesn't work in img tag.
                width={150}
                height={40}
                src="/images/logo-text.svg"
                alt="Zebaish Bedding"
              />
            </Link>
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              Transform your living space with our premium bedding and home accessories. Quality, comfort, and style in every thread.
            </p>
            {/* Social Links */}
            <div className="flex space-x-5">
              <a href="https://instagram.com" className="text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772 4.902 4.902 0 011.772-1.153c.636-.247 1.363-.416 2.427-.465C9.673 2.013 10.03 2 12.315 2zm-1.2 1.95c-2.048.078-3.468.25-4.228.84a3.1 3.1 0 00-.97 1.083c-.352.57-.487 1.407-.542 3.018l-.004 1.258c0 2.213.067 2.859.395 3.513.111.22.25.422.412.603.498.558 1.144.75 3.06.775 2.502.032 3.19.043 4.298-.01 1.758-.084 2.66-.464 3.061-.884.22-.232.392-.495.508-.779.317-.798.353-2.031.353-4.706V8.293c0-2.31.006-2.909-.323-3.64a2.95 2.95 0 00-.507-.779c-.401-.42-1.303-.8-3.061-.884-1.358-.065-1.766-.07-4.298-.02l.067.013zm6 6.84c0 3.32-2.69 6.01-6.01 6.01-3.32 0-6.01-2.69-6.01-6.01 0-3.32 2.69-6.01 6.01-6.01 3.32 0 6.01 2.69 6.01 6.01z" clipRule="evenodd" /></svg>
              </a>
              <a href="https://facebook.com" className="text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
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
                  Home# 35, Mohammadi Homeping Center,<br />
                  Hydri Market, Block G,<br />
                  North Nazimabad Town, Karachi
                </span>
              </li>
              <li className="flex items-center">
                <span className="mr-3 text-black dark:text-white">📞</span>
                <a href="tel:+923453177990" className="hover:text-black dark:hover:text-white transition-colors">
                  +92 345 3177990
                </a>
              </li>
              <li className="flex items-center">
                <span className="mr-3 text-black dark:text-white">✉️</span>
                <a href="mailto:zebaishbedding@gmail.com" className="hover:text-black dark:hover:text-white transition-colors">
                  zebaishbedding@gmail.com
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
              <p>Designed for Comfort</p>
              <span className="h-4 w-px bg-gray-300 dark:bg-gray-700"></span>
              <p>Powered by Next.js</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

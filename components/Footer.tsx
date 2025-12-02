import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* About Section */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              About Kidilio
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Leading Baby Carriage Chinese manufacturer specializing in baby car
              seats, strollers, cribs, and high chairs. Factory-direct OEM/ODM
              services.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Main Products */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              Main Products
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/products?category=strollers"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Strollers
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=car-seats"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Car Seats
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=cribs"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Cribs
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=high-chairs"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  High Chairs
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              Contact Info
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                Air China Century Center, Aviation Road,
                <br />
                Wuhou District, Chengdu,
                <br />
                Sichuan Province, China
              </li>
              <li>
                <a
                  href="mailto:info@kidilo.cn"
                  className="hover:text-gray-900 dark:hover:text-white"
                >
                  info@kidilo.cn
                </a>
              </li>
              <li>
                <a
                  href="tel:+8613548125510"
                  className="hover:text-gray-900 dark:hover:text-white"
                >
                  +86-135 4812 5510
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8 dark:border-gray-800">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            © Copyright – 2010-2025 : Kidilio All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}


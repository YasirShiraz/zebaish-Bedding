"use client";

import Link from "next/link";
import Image from "next/image";
import HeroCarousel from "@/components/HeroCarousel";
import { useEffect } from "react";
import { getProductImage } from "@/lib/products";

export default function Home() {
  const mainProducts = [
    {
      name: "H2D+C Baby Stroller",
      category: "Baby Strollers",
      description: "Safe, portable, and designed for modern families on the move.",
      image: "/images/004_Kidilo H2D 2-in-1 Convertible Cribs and Strollers Flat Padded Sleep Surface Bed .webp",
      link: "/products/stroller-h2dc",
    },
    {
      name: "UP650X Baby Crib",
      category: "Baby Cribs",
      description: "Durable, eco-friendly designs that protect sweet dreams every night.",
      image: "/images/015_3-in-1 Foldable Crib Stroller Lightweight Aluminum Alloy Frame Newborn Bassinet .webp",
      link: "/products/crib-up650x",
    },
    {
      name: "KBH311 Baby Car Seat",
      category: "Baby Car Seats",
      description: "ECE & CCC approved, ensure maximum safety and comfort.",
      image: "/images/001_Kidilo Convertible Infant Seat Stroller Baby Travel Pram FMVSS ASTM Certificated.webp",
      link: "/products/car-seat-kbh311",
    },
    {
      name: "DC02 Baby High Chair",
      category: "Baby High Chairs",
      description: "Safe, portable, and designed for modern families on the move.",
      image: "/images/002_2-in-1 Convertible Chair Stroller Mobile Durable Adjustable Backrest Baby Pushch.webp",
      link: "/products/high-chair-dc02",
    },
  ];

  const coreProducts = [
    {
      name: "AP9405 Crib",
      code: "AP9405",
      category: "Crib",
      link: "/products/crib-ap9405",
    },
    {
      name: "A10 Stroller",
      code: "A10",
      category: "stroller",
      link: "/products/stroller-a10",
    },
    {
      name: "C002 Car Seat",
      code: "C002",
      category: "Car Seat",
      link: "/products/car-seat-c002",
    },
    {
      name: "TY-02 High Chair",
      code: "TY-02",
      category: "High Chair",
      link: "/products/high-chair-ty02",
    },
    {
      name: "TY01 Swing Chair",
      code: "TY01",
      category: "Swing Chair",
      link: "/products/swing-ty01",
    },
    {
      name: "X177 Learning walker",
      code: "X177",
      category: "Learning walker",
      link: "/products/walker-x177",
    },
  ];

  const stats = [
    { value: "11,800", label: "Factory (㎡)" },
    { value: "200+", label: "Employees" },
    { value: "700,000+", label: "Annual Output" },
    { value: "20+", label: "Countries Sold to" },
  ];

  const blogPosts = [
    {
      title: "Introduction: Best Newborn Stroller – The Ultimate Guide",
      excerpt:
        "The best newborn stroller is an essential item for parents. Discover what makes a stroller perfect for your newborn baby.",
      date: "2024-01-15",
      category: "Product Guide",
      link: "/blog/best-newborn-stroller-guide",
      image: "/images/003_2025 Stylish Stroller High-fashion Design Foldable Traveling Pushchair With Shoc.webp",
    },
    {
      title:
        "Kidilo: Your Trusted Partner for Premium Baby Gear, Including Top-Quality Kidilo Stroller",
      excerpt:
        "When it comes to reliable and safe baby products, Kidilo stands out as a leading manufacturer. Learn about our premium stroller collection.",
      date: "2024-01-10",
      category: "Company News",
      link: "/blog/kidilo-premium-baby-gear",
      image: "/images/004_Kidilo H2D 2-in-1 Convertible Cribs and Strollers Flat Padded Sleep Surface Bed .webp",
    },
    {
      title:
        "Kidilo Launches New Baby Walkers to Support Safe First Steps",
      excerpt:
        "Kidilo, a leading Baby Carriage Chinese manufacturer and trusted brand, announces the launch of new baby walkers designed to support safe first steps.",
      date: "2024-01-05",
      category: "Product Launch",
      link: "/blog/new-baby-walkers-launch",
      image: "/images/008_3-in-1 Stroller with Car Seat Global Standards Safety Baby Carriage With Univers.webp",
    },
    {
      title:
        "Baby Crib Market Sees New Growth: Eco-Friendly and Multi-Functional Designs Take the Spotlight",
      excerpt:
        "With the growing popularity of 'refined parenting,' the baby crib market is experiencing new growth trends focusing on eco-friendly and multi-functional designs.",
      date: "2023-12-20",
      category: "Market Insights",
      link: "/blog/baby-crib-market-growth",
      image: "/images/015_3-in-1 Foldable Crib Stroller Lightweight Aluminum Alloy Frame Newborn Bassinet .webp",
    },
  ];

  const services = [
    {
      title: "CAD Design & Engineering",
      description:
        "Professional design and engineering support for custom baby products",
      icon: (
        <svg
          className="h-8 w-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
    {
      title: "Custom Colors & Fabrics",
      description:
        "Flexible customization options including colors, fabrics, and logos",
      icon: (
        <svg
          className="h-8 w-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
          />
        </svg>
      ),
    },
    {
      title: "Fast Prototyping",
      description: "Prototype samples available within 15 days",
      icon: (
        <svg
          className="h-8 w-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
  ];

  // Intersection Observer for animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll(".fade-in-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="bg-white dark:bg-black transition-colors duration-300">
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Main Products Section */}
      <section className="py-20 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center fade-in-on-scroll">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
              Main Products
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600 dark:text-gray-400">
              Our factory has specialized in the R&D, production, and global sales
              of baby car seats, strollers, cribs, high chairs, and other baby
              care products.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-4 lg:items-stretch">
            {mainProducts.map((product, index) => (
              <Link
                key={product.name}
                href={product.link}
                className="group relative flex flex-col overflow-hidden rounded-2xl bg-gray-50 p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800 fade-in-on-scroll h-full"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 transition-transform duration-300 group-hover:scale-110 relative flex-shrink-0">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-6 text-lg font-semibold text-gray-900 dark:text-white transition-colors group-hover:text-gray-600 dark:group-hover:text-gray-300 flex-shrink-0">
                  {product.name}
                </h3>
                <p className="mt-2 text-sm font-medium text-[var(--primary)] flex-shrink-0">
                  {product.category}
                </p>
                <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-400 flex-grow">
                  {product.description}
                </p>
                <span className="mt-auto pt-4 inline-flex items-center text-sm font-semibold text-gray-900 group-hover:text-gray-600 dark:text-white dark:group-hover:text-gray-300 transition-all flex-shrink-0">
                  View More{" "}
                  <span className="ml-2 transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-12 text-center fade-in-on-scroll">
            <Link
              href="/products"
              className="inline-flex items-center text-base font-semibold text-gray-900 hover:text-gray-600 dark:text-white dark:hover:text-gray-300 transition-all hover:gap-2 gap-1"
            >
              View All Products <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-gray-50 py-20 dark:bg-gray-900 transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="fade-in-on-scroll">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                  About Us
                </h2>
                <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
                  We are a professional{" "}
                  <strong className="text-gray-900 dark:text-white">
                    Baby Carriage Chinese manufacturer
                  </strong>
                  , specializing in the R&D, production, and sales of{" "}
                  <strong className="text-gray-900 dark:text-white">
                    baby car seats, strollers, and cribs
                  </strong>
                  . With a modern 11,800㎡ factory, 200+ employees, and an
                  annual output of 700,000+ units, we provide safe, innovative,
                  and reliable products trusted in 20+ countries.
                </p>
                <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-400">
                  We are the official international sales division of{" "}
                  <strong className="text-gray-900 dark:text-white">
                    EEMCLE Factory (Zhejiang, China)
                  </strong>
                  , a professional Baby Carriage Chinese manufacturer. Our
                  factory covers 11,800㎡, with 200+ employees and 3 advanced
                  production lines.
                </p>
                <div className="mt-8">
                  <Link
                    href="/about"
                    className="inline-flex items-center text-base font-semibold text-gray-900 hover:text-gray-600 dark:text-white dark:hover:text-gray-300 transition-all hover:gap-2 gap-1"
                  >
                    Learn More <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
              <div className="mt-10 lg:mt-0 fade-in-on-scroll">
                <div className="grid grid-cols-2 gap-8">
                  {stats.map((stat, index) => (
                    <div
                      key={stat.label}
                      className="rounded-lg bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="text-3xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </div>
                      <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Core Baby Products Section */}
      <section className="py-20 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center fade-in-on-scroll">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
              Our Core Baby Products
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600 dark:text-gray-400">
              As a trusted Baby Carriage Chinese manufacturer, we specialize in
              baby car seats, strollers, cribs, and high chairs. All products are
              developed and produced in our certified factory, ensuring global
              safety standards, innovative designs, and flexible OEM/ODM
              customization for international partners.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:items-stretch">
            {coreProducts.map((product, index) => (
              <Link
                key={product.code}
                href={product.link}
                className="group relative flex flex-col overflow-hidden rounded-2xl bg-gray-50 p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800 fade-in-on-scroll h-full"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Product Image */}
                <div className="relative h-48 w-full mb-4 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
                  <Image
                    src={getProductImage(product.code)}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="flex items-center justify-between flex-shrink-0">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {product.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      {product.category}
                    </p>
                  </div>
                  <span className="text-2xl font-bold text-gray-400 group-hover:text-gray-600 dark:text-gray-600 dark:group-hover:text-gray-400 transition-colors">
                    Kidilo
                  </span>
                </div>
                <div className="mt-auto pt-4 flex items-center text-sm font-semibold text-gray-900 group-hover:text-gray-600 dark:text-white dark:group-hover:text-gray-300">
                  View More{" "}
                  <span className="ml-2 transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-12 text-center fade-in-on-scroll">
            <Link
              href="/products"
              className="inline-flex items-center text-base font-semibold text-gray-900 hover:text-gray-600 dark:text-white dark:hover:text-gray-300 transition-all hover:gap-2 gap-1"
            >
              All Products <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Partner Brands Section */}
      <section className="py-15 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    {/* Heading */}
    <div className="max-w-2xl mx-auto text-center">
      <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
        Partner Brands
      </h2>

      <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
        <strong className="text-gray-900 dark:text-white">Kidilo & ZHONG BA</strong>{" "}
        power diverse market segments through a trusted portfolio of brands,
        built with an unwavering commitment to quality and safety.
      </p>
    </div>

    {/* Cards */}
    <div className="grid max-w-3xl mx-auto sm:mt-16 mt-12 gap-10 lg:max-w-none lg:grid-cols-2">

      {/* Card 1 */}
      <div className="group rounded-2xl overflow-hidden :bg-gray-800 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
        
        <div className="relative h-72 w-full overflow-hidden">
          <img
            src="/images/patner.webp"
            alt="KIDILO Brand"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="px-8 py-8 text-center">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white tracking-wide">
            KIDILO
          </h3>

          <p className="mt-3 text-gray-600 dark:text-gray-400">Discover More</p>

          <Link
            href="/products"
            className="inline-flex items-center mt-5 text-sm font-semibold text-gray-900 dark:text-white hover:text-teal-600 dark:hover:text-teal-400 transition-all gap-2"
          >
            Learn More <span>→</span>
          </Link>
        </div>
      </div>

      {/* Card 2 */}
      <div className="group rounded-2xl overflow-hidden :bg-gray-800 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
        
        <div className="relative h-72 w-full overflow-hidden">
          <img
            src="/images/patner2.webp"
            alt="ZHONG BA Brand"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="px-8 py-8 text-center">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white tracking-wide">
            ZHONG BA
          </h3>

          <p className="mt-3 text-gray-600 dark:text-gray-400">Discover More</p>

          <Link
            href="/products"
            className="inline-flex items-center mt-5 text-sm font-semibold text-gray-900 dark:text-white hover:text-teal-600 dark:hover:text-teal-400 transition-all gap-2"
          >
            Learn More <span>→</span>
          </Link>
        </div>
      </div>

    </div>
  </div>
</section>
      {/* Services Section */}
      <section className="py-2 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center fade-in-on-scroll">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
              Our Services
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600 dark:text-gray-400">
              We offer full OEM/ODM support for your baby product needs
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:items-stretch">
            {services.map((service, index) => (
              <div
                key={service.title}
                className="group flex flex-col rounded-2xl bg-gray-50 p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800 fade-in-on-scroll h-full"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-4 text-[var(--primary)] transition-transform group-hover:scale-110 flex-shrink-0">
                  {service.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex-shrink-0">
                  {service.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-400 flex-grow">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center fade-in-on-scroll">
            <Link
              href="/services"
              className="inline-flex items-center text-base font-semibold text-gray-900 hover:text-gray-600 dark:text-white dark:hover:text-gray-300 transition-all hover:gap-2 gap-1"
            >
              View All Services <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest News & Insights Section */}
      <section className="bg-gray-50 py-15 dark:bg-gray-900 transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center fade-in-on-scroll">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
              Latest News & Insights
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600 dark:text-gray-400">
              Stay updated with the latest news from our factory and the global
              baby products industry. From new product launches to market
              insights and safety standards, we share valuable updates to keep
              our partners and customers informed.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-stretch">
            {blogPosts.map((post, index) => (
              <article
                key={post.link}
                className="group relative flex flex-col overflow-hidden rounded-2xl bg-white p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 fade-in-on-scroll h-full"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Blog Image */}
                <div className="relative h-64 w-full mb-6 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 flex-shrink-0">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="flex items-center gap-x-4 text-xs flex-shrink-0">
                  <time
                    dateTime={post.date}
                    className="text-gray-500 dark:text-gray-400"
                  >
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <span className="rounded-full bg-gray-200 px-3 py-1 text-xs font-semibold text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                    {post.category}
                  </span>
                </div>
                <div className="mt-4 flex-grow">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    <Link href={post.link}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-400">
                    {post.excerpt}
                  </p>
                </div>
                <div className="mt-auto pt-6 flex-shrink-0">
                  <Link
                    href={post.link}
                    className="text-sm font-semibold text-gray-900 hover:text-gray-600 dark:text-white dark:hover:text-gray-300 inline-flex items-center transition-all hover:gap-2 gap-1"
                  >
                    Read More <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-12 text-center fade-in-on-scroll">
            <Link
              href="/blog"
              className="inline-flex items-center text-base font-semibold text-gray-900 hover:text-gray-600 dark:text-white dark:hover:text-gray-300 transition-all hover:gap-2 gap-1"
            >
              View All <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[var(--primary)] py-16 dark:bg-[var(--primary)] transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center fade-in-on-scroll">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Grow Your Baby Product Line?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
              Work with Kidilio – your trusted factory-direct OEM/ODM partner.
            </p>
            <div className="mt-10">
              <Link
                href="/contact"
                className="rounded-lg bg-white px-6 py-3 text-base font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-transform hover:scale-105"
              >
                Contact Us Today
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

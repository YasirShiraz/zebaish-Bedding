"use client";

import Link from "next/link";
import Image from "next/image";

export default function About() {
  const stats = [
    { value: "11,800㎡", label: "Factory" },
    { value: "200+", label: "Employees" },
    { value: "700,000+", label: "Annual Output" },
    { value: "20+", label: "Countries Sold to" },
  ];

  const factoryImages = [
    "/images/001_Kidilo Convertible Infant Seat Stroller Baby Travel Pram FMVSS ASTM Certificated.webp",
    "/images/002_2-in-1 Convertible Chair Stroller Mobile Durable Adjustable Backrest Baby Pushch.webp",
    "/images/003_2025 Stylish Stroller High-fashion Design Foldable Traveling Pushchair With Shoc.webp",
    "/images/004_Kidilo H2D 2-in-1 Convertible Cribs and Strollers Flat Padded Sleep Surface Bed .webp",
    "/images/005_3-in-1 Car Seat and Stroller Anti-rebound Safety-certified Materials With Fashio.webp",
    "/images/006_Kidilo 2-in-1 Cheap Car Seat Stroller ASTM F833 Certificated Baby Pram With Safe.webp",
  ];

  const advantages = [
    {
      title: "MANUFACTURING PROWESS AT SCALE",
      description:
        "Covering 11,800㎡ with 200+ employees and 3 advanced production lines, we deliver an annual output of 700,000+ units.",
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      iconColor: "text-orange-600 dark:text-orange-400",
    },
    {
      title: "UNCOMPROMISING QUALITY & GLOBAL CERTIFICATION",
      description:
        "Backed by 50+ national patents and major certifications including ECE, CCC, ISO9001, ISO14001, ISO45001, and BSCI.",
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      iconColor: "text-green-600 dark:text-green-400",
    },
    {
      title: "SUSTAINABLE & ETHICAL OPERATIONS",
      description:
        "Committed to sustainable manufacturing practices and ethical business operations that protect our planet and communities.",
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      iconColor: "text-green-600 dark:text-green-400",
    },
    {
      title: "FLEXIBLE OEM/ODM EXPERTISE",
      description:
        "Full OEM/ODM support with CAD design, custom colors, fabrics, logos, and prototype samples within 15 days.",
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      iconColor: "text-gray-900 dark:text-gray-100",
    },
    {
      title: "PROVEN GLOBAL PARTNERSHIP",
      description:
        "Trusted in more than 20 countries across Europe, Asia, and beyond with dedicated overseas support.",
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "INTEGRATED R&D AND INNOVATION",
      description:
        "In-house R&D team continuously innovating to create safe, cutting-edge baby products that meet global standards.",
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      iconColor: "text-gray-900 dark:text-gray-100",
    },
  ];

  const mainProducts = [
    {
      name: "BABY STROLLER",
      image: "/images/003_2025 Stylish Stroller High-fashion Design Foldable Traveling Pushchair With Shoc.webp",
      link: "/products",
    },
    {
      name: "BABY CRIB",
      image: "/images/015_3-in-1 Foldable Crib Stroller Lightweight Aluminum Alloy Frame Newborn Bassinet .webp",
      link: "/products",
    },
    {
      name: "BABY CAR SAFETY SEAT",
      image: "/images/001_Kidilo Convertible Infant Seat Stroller Baby Travel Pram FMVSS ASTM Certificated.webp",
      link: "/products",
    },
    {
      name: "BABY HIGH CHAIR",
      image: "/images/002_2-in-1 Convertible Chair Stroller Mobile Durable Adjustable Backrest Baby Pushch.webp",
      link: "/products",
    },
  ];

  return (
    <div className="bg-white dark:bg-black">
      {/* Hero Section - ABOUT KIDILO Banner */}
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
              ABOUT KIDILO
            </h1>
            <p className="mt-4 text-xl text-white sm:text-2xl">
              KIDILO - OEM manufacturer of strollers, car seats, cribs, and baby
              walkers.
            </p>
          </div>
        </div>
      </section>

      {/* About KIDILO Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Left Side - Text Content */}
            <div>
              <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
                ABOUT KIDILO
              </h2>
              <div className="mt-6 space-y-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
                <p>
                  <strong className="text-gray-900 dark:text-white">
                    Chengdu Kamingon Trading Co., Ltd.
                  </strong>{" "}
                  is the official international sales division of{" "}
                  <strong className="text-gray-900 dark:text-white">
                    EEMCLE Factory (Zhejiang, China)
                  </strong>{" "}
                  — the original manufacturer behind the trusted baby brands
                  ZHONGBA and KIDILO.
                </p>
                <p>
                  Founded in 2015, our factory specializes in the R&D,
                  production, and sales of baby car safety seats, strollers,
                  cribs, high chairs, and other baby care products. Covering
                  11,800㎡ with 200+ employees and 3 advanced production lines,
                  we deliver an annual output of 700,000+ units.
                </p>
                <p>
                  Backed by 50+ national patents and major certifications
                  including ECE, CCC, ISO9001, ISO14001, ISO45001, and BSCI,
                  our products consistently meet the highest global standards.
                  Today, ZHONGBA car seats and KIDILO baby products are trusted
                  in more than 20 countries across Europe, Asia, and beyond.
                </p>
                <p>
                  As a factory-direct supplier, we provide flexible OEM/ODM
                  solutions, wholesale services, and dedicated overseas support.
                  By combining manufacturing strength with professional
                  international sales expertise, we help global partners build
                  strong, competitive product lines with confidence.
                </p>
                <p>
                  <strong className="text-gray-900 dark:text-white">
                    Our Mission:
                  </strong>{" "}
                  To create safe, innovative, and reliable baby products that
                  protect every child's journey and bring peace of mind to
                  families worldwide.
                </p>
              </div>
              <div className="mt-8">
                <svg
                  className="h-24 w-24 text-gray-300 dark:text-gray-700"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
            </div>

            {/* Right Side - Building Image and Factory Images Grid */}
            <div className="space-y-6">
              {/* Main Building Image */}
              <div className="relative h-[400px] w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                <Image
                  src="/images/kidilo-building.jpg.webp"
                  alt="Kidilo Factory Building"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Factory Images Grid */}
              <div className="grid grid-cols-3 gap-4">
                {factoryImages.slice(0, 6).map((image, index) => (
                  <div
                    key={index}
                    className="relative h-32 w-full overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-700"
                  >
                    <Image
                      src={image}
                      alt={`Factory image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Row - Below Main Content */}
          <div className="mt-16">
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center"
                >
                  <div className="text-5xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-lg text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Advantages Section */}
      <section className="py-16 sm:py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
              OUR ADVANTAGES
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
              Let's create the most amazing iconbox and give it a perfect look
              with box shadow style.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {advantages.map((advantage, index) => (
              <div
                key={index}
                className="rounded-lg bg-white p-8 shadow-sm transition-all hover:shadow-md dark:bg-gray-800"
              >
                <div className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900/20 ${advantage.iconColor || "text-gray-900 dark:text-gray-100"}`}>
                  {advantage.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {advantage.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-400">
                  {advantage.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Products Section */}
      <section className="bg-gray-50 py-16 sm:py-24 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
              MAIN PRODUCTS
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
              Our factory has specialized in the R&D, production, and global
              sales of baby car seats, strollers, cribs, high chairs, and other
              baby care products.
            </p>
          </div>
          <div className="mt-22 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {mainProducts.map((product, index) => (
              <Link
                key={index}
                href={product.link}
                className="group overflow-hidden rounded-lg bg-white shadow-sm transition-all hover:shadow-lg dark:bg-gray-800"
              >
                <div className="relative h-64 w-full overflow-hidden bg-gray-100 dark:bg-gray-700">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {product.name}
                  </h3>
                  <div className="mt-4 flex items-center text-sm font-semibold text-gray-900 group-hover:text-gray-600 dark:text-white dark:group-hover:text-gray-300">
                    EXPLORE{" "}
                    <span className="ml-2 transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[var(--primary)] py-16 sm:py-24 dark:bg-[var(--primary)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              READY TO PARTNER WITH A MANUFACTURER YOU CAN TRUST?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
              Work with Kidilo – your trusted factory direct OEM/ODM partner.
            </p>
            <div className="mt-10">
              <Link
                href="/contact"
                className="rounded-lg border-2 border-white bg-white px-8 py-4 text-base font-semibold text-gray-900 shadow-sm transition-all hover:bg-gray-100 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                CONTACT US TODAY
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";

export default function About() {
  const stats = [
    { value: "500+", label: "Unique Designs" },
    { value: "10k+", label: "Happy Homes" },
    { value: "100%", label: "Satisfaction" },
    { value: "24/7", label: "Support" },
  ];

  const galleryImages = [
    "/images/zebaish1 (1).jpg",
    "/images/zebaish2.jpg",
    "/images/zebaish3.jpg",
    "/images/zebaish4.jpg",
    "/images/bedding/new/hero_new_1.png",
    "/images/bedding/new/hero_new_2.png",
  ];

  const advantages = [
    {
      title: "PREMIUM FABRICS",
      description:
        "We source only the finest cotton and blends to ensure breathable, soft, and durable bedding for your home.",
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      iconColor: "text-purple-600 dark:text-purple-400",
    },
    {
      title: "EXQUISITE DESIGNS",
      description:
        "Our design team creates unique patterns and styles, from bridal elegance to modern minimalist trends.",
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      iconColor: "text-pink-600 dark:text-pink-400",
    },
    {
      title: "AFFORDABLE LUXURY",
      description:
        "We believe everyone deserves a good night's sleep. We offer luxury quality at prices that break the bank.",
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      iconColor: "text-green-600 dark:text-green-400",
    },
    {
      title: "NATIONWIDE DELIVERY",
      description:
        "Wherever you are, we bring comfort to your doorstep with our fast and reliable shipping partners.",
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
        </svg>
      ),
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "CUSTOMER LOVED",
      description:
        "With thousands of happy reviews, our customers trust us for their bedding and home decor needs.",
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      iconColor: "text-yellow-500 dark:text-yellow-400",
    },
    {
      title: "LOCAL CRAFTSMANSHIP",
      description:
        "Proudly Pakistani. We celebrate our local textile heritage in every stitch and seam.",
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      iconColor: "text-emerald-600 dark:text-emerald-400",
    },
  ];

  return (
    <div className="bg-white dark:bg-black">
      {/* Hero Section - ABOUT ZEBAISH Banner */}
      <section className="relative h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/zebaish1 (1).jpg"
            alt="Zebaish Corner Bedding"
            fill
            className="object-cover blur-sm"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-5xl font-bold text-white sm:text-6xl lg:text-7xl font-serif">
              ABOUT ZEBAISH
            </h1>
            <p className="mt-4 text-xl text-white sm:text-2xl">
              Where comfort meets elegance. Redefining your sleep experience.
            </p>
          </div>
        </div>
      </section>

      {/* About Content Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Left Side - Text Content */}
            <div>
              <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white font-serif">
                OUR STORY
              </h2>
              <div className="mt-6 space-y-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
                <p>
                  Welcome to <strong className="text-gray-900 dark:text-white">Zebaish Corner</strong>, your premier destination for luxury bedding and home textiles.
                  Based in Pakistan, we are passionate about transforming houses into homes with our curated collection of comfort.
                </p>
                <p>
                  Started with a vision to make premium quality bedding accessible to everyone, we have grown into a brand that is synonymous with
                  elegance and durability. Our products range from everyday cotton essentials to bridal luxury sets, tailored to suit every taste and occasion.
                </p>
                <p>
                  We understand that your bedroom is your personal sanctuary. That represents who you are and provides the rest you need.
                  That is why we meticulously select our fabrics, ensuring high thread counts, colorfastness, and skin-friendly materials.
                </p>
                <p>
                  Whether you are setting up a new home, looking for the perfect wedding gift, or simply upgrading your sleep experience,
                  Zebaish Corner is here to serve you with the best. Experience the art of fine living with us.
                </p>
                <p>
                  <strong className="text-gray-900 dark:text-white">
                    Our Mission:
                  </strong>{" "}
                  To provide exceptional quality home textiles that combine traditional craftsmanship with modern design, delivering comfort to every doorstep.
                </p>
              </div>
            </div>

            {/* Right Side - Images Grid */}
            <div className="space-y-6">
              {/* Main Image */}
              <div className="relative h-[400px] w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                <Image
                  src="/images/zebaish2.jpg"
                  alt="Zebaish Corner Interior"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Gallery Grid */}
              <div className="grid grid-cols-3 gap-4">
                {galleryImages.slice(2, 5).map((image, index) => (
                  <div
                    key={index}
                    className="relative h-32 w-full overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-700"
                  >
                    <Image
                      src={image}
                      alt={`Gallery image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="mt-16">
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center"
                >
                  <div className="text-5xl font-bold text-gray-900 dark:text-white font-serif">
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
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white font-serif">
              Why Zebaish Corner?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
              We go the extra mile to ensure your satisfaction and comfort.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {advantages.map((advantage, index) => (
              <div
                key={index}
                className="rounded-lg bg-white p-8 shadow-sm transition-all hover:shadow-md dark:bg-gray-800"
              >
                <div className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 ${advantage.iconColor || "text-gray-900 dark:text-gray-100"}`}>
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

      {/* CTA Section */}
      <section className="bg-[var(--primary)] py-16 sm:py-24 dark:bg-[var(--primary)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl font-serif">
              Transform Your Bedroom Today
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
              Discover the luxury you deserve. Home our latest collection now.
            </p>
            <div className="mt-10">
              <Link
                href="/contact"
                className="rounded-lg border-2 border-white bg-white px-8 py-4 text-base font-semibold text-gray-900 shadow-sm transition-all hover:bg-gray-100 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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

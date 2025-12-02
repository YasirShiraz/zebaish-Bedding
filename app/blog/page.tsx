import Link from "next/link";
import Image from "next/image";

export default function Blog() {
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
                   Latest News & Insights
                   </h1>
                   <p className="mt-4 text-xl text-white sm:text-2xl">
                    Stay updated with the latest news from our factory and the global
        baby products <br /> industry. From new product launches to market
        insights and safety standards
                   </p>
                 </div>
               </div>
             </section>


      {/* Blog Posts */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-2 items-stretch">
            {blogPosts.map((post) => (
              <article
                key={post.link}
                className="group relative flex flex-col overflow-hidden rounded-2xl bg-gray-50 p-8 transition-all hover:shadow-lg dark:bg-gray-900 h-full"
              >
                {/* Blog Image */}
                <div className="relative h-64 w-full mb-6 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-800 flex-shrink-0">
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
                  <span className="rounded-full bg-gray-200 px-3 py-1 text-xs font-semibold text-gray-600 dark:bg-gray-800 dark:text-gray-400">
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
                    className="text-sm font-semibold text-gray-900 hover:text-gray-600 dark:text-white dark:hover:text-gray-300"
                  >
                    Read More <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gray-50 py-16 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
              Stay Updated
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-400">
              Subscribe to our newsletter to receive the latest updates and
              insights.
            </p>
            <form className="mt-8 flex gap-x-4">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="min-w-0 flex-auto rounded-lg border-0 bg-white px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
                placeholder="Enter your email"
              />
              <button
                type="submit"
                className="flex-none rounded-lg bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}


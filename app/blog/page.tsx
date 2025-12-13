import Link from "next/link";
import Image from "next/image";

export default function Blog() {
  const blogPosts = [
    {
      title: "The Ultimate Guide to Choosing the Right Duvet for Every Season",
      excerpt:
        "Struggling to find the perfect duvet? Discover how to choose the right tog rating and material for year-round comfort.",
      date: "2024-02-15",
      category: "Buying Guide",
      link: "/blog/choosing-right-duvet",
      image: "/images/bedding/new/duvet_01.png",
    },
    {
      title: "Why Thread Count Matters: Decoding Bed Sheet Quality",
      excerpt:
        "Is higher thread count always better? We debunk common myths and explain what really makes sheets soft and durable.",
      date: "2024-02-10",
      category: "Fabric Care",
      link: "/blog/thread-count-guide",
      image: "/images/bedding/new/sheet_01.png",
    },
    {
      title: "5 Tips for Creating a Relaxing Bedroom Sanctuary",
      excerpt:
        "Transform your bedroom into a stress-free haven with these simple interior design and bedding tips.",
      date: "2024-01-25",
      category: "Interior Design",
      link: "/blog/bedroom-sanctuary-tips",
      image: "/images/zebaish1 (1).jpg",
    },
    {
      title: "The Benefits of Silk vs. Cotton Pillowcases",
      excerpt:
        "Which is better for your skin and hair? We compare the two most popular pillowcase materials.",
      date: "2024-01-12",
      category: "Wellness",
      link: "/blog/silk-vs-cotton-pillowcases",
      image: "/images/bedding/new/pillow_01.jpg",
    },
  ];

  return (
    <div className="bg-white dark:bg-black">
      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/zebaish2.jpg"
            alt="Zebaish Blog - Sleep & Comfort"
            fill
            className="object-cover blur-sm"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-5xl font-bold text-white sm:text-6xl lg:text-7xl font-serif">
              Sleep & Style Journal
            </h1>
            <p className="mt-4 text-xl text-white sm:text-2xl">
              Expert advice on bedding care, bedroom styling, <br /> and achieving the perfect night's sleep.
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
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {post.category}
                  </span>
                </div>
                <div className="mt-4 flex-grow">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors font-serif">
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
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white font-serif">
              Join Our Community
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-400">
              Subscribe to get exclusive offers, care tips, and new collection alerts.
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

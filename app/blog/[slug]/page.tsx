import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

// Mock data for blog posts (in a real app, this would come from a CMS or database)
const blogPosts: { [key: string]: any } = {
  "choosing-right-duvet": {
    title: "The Ultimate Guide to Choosing the Right Duvet for Every Season",
    date: "2024-02-15",
    category: "Buying Guide",
    image: "/images/bedding/new/duvet_01.png",
    content: (
      <>
        <p>
          A good night's sleep is invaluable, and your duvet plays a massive role in that.
          Whether you run hot or cold, finding the right tog rating and filling is essential for year-round comfort.
        </p>
        <h3>Understanding Tog Ratings</h3>
        <p>
          Tog refers to the thermal resistance of a duvet.
          <br />
          <strong>4.5 Tog:</strong> Perfect for summer or hot sleepers.
          <br />
          <strong>10.5 Tog:</strong> Ideal for spring and autumn (or year-round use in moderate climates).
          <br />
          <strong>13.5 - 15 Tog:</strong> The best choice for cold winter nights.
        </p>
        <h3>Natural vs. Synthetic Fillings</h3>
        <p>
          <strong>Natural (Down/Feather):</strong> Breathable, lightweight, and long-lasting. Great for regulating temperature.
          <br />
          <strong>Synthetic (Microfiber/Hollowfiber):</strong> Hypoallergenic, easy to wash, and budget-friendly. A great alternative to down.
        </p>
        <p>
          At <strong>Zebaish Corner</strong>, we offer a range of premium duvets to suit every sleeper's needs.
        </p>
      </>
    ),
  },
  "thread-count-guide": {
    title: "Why Thread Count Matters: Decoding Bed Sheet Quality",
    date: "2024-02-10",
    category: "Fabric Care",
    image: "/images/bedding/new/sheet_01.png",
    content: (
      <>
        <p>
          We've all heard that higher thread count equals better quality, but is that always true?
          Let's break down what thread count really means for your bed sheets.
        </p>
        <h3>What is Thread Count?</h3>
        <p>
          Thread count is the number of threads woven into one square inch of fabric.
          While a count of 200-800 usually indicates good quality, anything above 1000 can sometimes be a marketing gimmick using multi-ply yards.
        </p>
        <h3>Material Matters More</h3>
        <p>
          The fiber quality is often more important than the count.
          A 300-thread-count sheet made from <strong>long-staple Egyptian cotton</strong> will feel softer and last longer than a 1000-thread-count sheet made from short-staple cotton.
        </p>
        <p>
          Our <strong>Luxury Cotton Sheets</strong> focus on the perfect balance of breathability and softness, ensuring you sleep in pure comfort.
        </p>
      </>
    ),
  },
  "bedroom-sanctuary-tips": {
    title: "5 Tips for Creating a Relaxing Bedroom Sanctuary",
    date: "2024-01-25",
    category: "Interior Design",
    image: "/images/zebaish1 (1).jpg",
    content: (
      <>
        <p>
          Your bedroom should be your escape from the world. A place where stress melts away.
          Here are 5 simple ways to make your bedroom a sanctuary.
        </p>
        <ol>
          <li><strong>Declutter:</strong> A clear space equals a clear mind. Keep nightstands tidy.</li>
          <li><strong>Layer Your Lighting:</strong> Use warm, soft lamps instead of harsh overhead lights.</li>
          <li><strong>Invest in Bedding:</strong> You spend a third of your life in bed. Make it comfortable with high-quality sheets and pillows.</li>
          <li><strong>Add Greenery:</strong> Plants improve air quality and add a calming touch of nature.</li>
          <li><strong>Choose Calming Colors:</strong> Soft blues, greens, and neutrals promote relaxation.</li>
        </ol>
      </>
    ),
  },
  "silk-vs-cotton-pillowcases": {
    title: "The Benefits of Silk vs. Cotton Pillowcases",
    date: "2024-01-12",
    category: "Wellness",
    image: "/images/bedding/new/pillow_01.jpg",
    content: (
      <>
        <p>
          Pillowcases are the unsung heroes of beauty sleep. But should you choose silk or cotton?
        </p>
        <h3>Cotton</h3>
        <p>
          Crisp, cool, and breathable. Cotton is durable and easy to wash. It's the classic choice for a reason.
        </p>
        <h3>Silk/Satin</h3>
        <p>
          Silk is less absorbent than cotton, meaning your expensive night creams stay on your face, not your pillow.
          It also creates less friction, reducing hair breakage and "bed head."
        </p>
        <p>
          Ultimately, the choice depends on your personal preference and skin needs. Both can provide a wonderful night's sleep when chosen correctly.
        </p>
      </>
    ),
  },
};

export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({
    slug: slug,
  }));
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts[slug];

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-white dark:bg-black">
      {/* Blog Post Header */}
      <div className="relative h-[400px] w-full">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="text-center max-w-4xl">
            <span className="inline-block rounded-full bg-blue-600 px-4 py-1 text-sm font-semibold text-white mb-4">
              {post.category}
            </span>
            <h1 className="text-4xl font-bold text-white sm:text-5xl font-serif">
              {post.title}
            </h1>
            <p className="mt-4 text-gray-200">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <article className="mx-auto max-w-3xl px-6 py-16">
        <div className="prose prose-lg prose-blue dark:prose-invert mx-auto">
          {post.content}
        </div>

        {/* Back Link */}
        <div className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-800">
          <Link
            href="/blog"
            className="text-base font-semibold text-blue-600 hover:text-blue-500"
          >
            ← Back to Blog
          </Link>
        </div>
      </article>

      {/* Newsletter Section */}
      <section className="bg-gray-50 py-16 dark:bg-gray-900 mt-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-serif">
            Enjoyed this article?
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400 mb-6">
            Subscribe to get more tips directly in your inbox.
          </p>
          <div className="max-w-md mx-auto">
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
              />
              <button type="submit" className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

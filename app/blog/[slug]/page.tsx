import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";

// Blog posts data structure
const blogPosts: { [key: string]: any } = {
  "best-newborn-stroller-guide": {
    title: "Introduction: Best Newborn Stroller – The Ultimate Guide",
    excerpt:
      "The best newborn stroller is an essential item for parents. Discover what makes a stroller perfect for your newborn baby.",
    date: "2024-01-15",
    category: "Product Guide",
    author: "Kidilio Editorial Team",
    readTime: "8 min read",
    content: `
      <p>Choosing the right stroller for your newborn is one of the most important decisions you'll make as a new parent. With so many options available in the market, it can be overwhelming to find the perfect stroller that combines safety, comfort, and functionality.</p>
      
      <h2>Why a Newborn Stroller Matters</h2>
      <p>A newborn stroller is more than just a means of transportation. It's a safe space for your baby to rest, sleep, and explore the world around them. The right stroller can make your daily outings with your baby much more comfortable and enjoyable.</p>
      
      <h2>Key Features to Look For</h2>
      <h3>1. Safety First</h3>
      <p>When it comes to newborn strollers, safety should always be your top priority. Look for strollers that meet international safety standards such as ECE, CCC, and ASTM certifications. These certifications ensure that the stroller has been tested for safety and durability.</p>
      
      <h3>2. Reclining Positions</h3>
      <p>Newborns need to lie flat for proper spinal development. A stroller with a fully reclining seat or a bassinet attachment is essential for babies under 6 months old. This allows your baby to sleep comfortably while you're on the go.</p>
      
      <h3>3. Shock Absorption</h3>
      <p>A good stroller should have excellent shock absorption to provide a smooth ride for your baby. Look for strollers with advanced suspension systems that can handle various terrains without disturbing your baby's sleep.</p>
      
      <h3>4. Easy Maneuverability</h3>
      <p>As a parent, you'll be pushing the stroller for hours on end. Choose a stroller with smooth-rolling wheels and good steering capabilities. Swivel wheels make it easier to navigate tight spaces, while fixed wheels provide stability on rough terrain.</p>
      
      <h2>Types of Newborn Strollers</h2>
      <h3>Full-Size Strollers</h3>
      <p>Full-size strollers offer the most features and comfort. They typically have large storage baskets, adjustable handles, and multiple recline positions. These are perfect for parents who want maximum functionality.</p>
      
      <h3>Lightweight Strollers</h3>
      <p>If you're frequently traveling or live in a city, a lightweight stroller might be more practical. These strollers are easier to carry and fold, making them ideal for public transportation and small living spaces.</p>
      
      <h3>Convertible Strollers</h3>
      <p>Convertible strollers can transform from a bassinet to a toddler seat, making them a great long-term investment. They grow with your child and can be used from birth to toddler years.</p>
      
      <h2>Maintenance and Care</h2>
      <p>To ensure your stroller lasts for years, regular maintenance is essential. Clean the fabric regularly, check the wheels for wear, and ensure all safety mechanisms are working properly. Most strollers come with removable, machine-washable covers for easy cleaning.</p>
      
      <h2>Conclusion</h2>
      <p>Finding the best newborn stroller requires careful consideration of your lifestyle, budget, and specific needs. By focusing on safety, comfort, and functionality, you can find a stroller that will serve you and your baby well for years to come.</p>
      
      <p>At Kidilio, we understand the importance of quality and safety in baby products. Our strollers are designed with both parents and babies in mind, combining innovative features with proven safety standards.</p>
    `,
    image: "/images/004_Kidilo H2D 2-in-1 Convertible Cribs and Strollers Flat Padded Sleep Surface Bed .webp",
    tags: ["Newborn", "Stroller", "Safety", "Parenting Guide"],
  },
  "kidilo-premium-baby-gear": {
    title:
      "Kidilo: Your Trusted Partner for Premium Baby Gear, Including Top-Quality Kidilo Stroller",
    excerpt:
      "When it comes to reliable and safe baby products, Kidilo stands out as a leading manufacturer. Learn about our premium stroller collection.",
    date: "2024-01-10",
    category: "Company News",
    author: "Kidilio Team",
    readTime: "6 min read",
    content: `
      <p>Kidilio has been a trusted name in the baby products industry for over a decade. As a leading Baby Carriage Chinese manufacturer, we've built our reputation on quality, safety, and innovation.</p>
      
      <h2>Our Commitment to Quality</h2>
      <p>At Kidilio, quality isn't just a promise—it's our foundation. Every product that leaves our factory undergoes rigorous testing to ensure it meets the highest international safety standards. We're proud to hold certifications including ECE, CCC, FMVSS, and ASTM.</p>
      
      <h2>Our Premium Stroller Collection</h2>
      <p>Our stroller collection represents the pinnacle of design and functionality. Each model is carefully crafted to provide the perfect balance of safety, comfort, and style.</p>
      
      <h3>H2D+C Convertible Stroller</h3>
      <p>Our flagship H2D+C model combines the functionality of a crib and stroller in one innovative design. Perfect for modern families who value versatility and convenience.</p>
      
      <h3>A10 High-Fashion Stroller</h3>
      <p>The A10 represents the latest in stroller design, featuring advanced shock absorption and a sleek, modern aesthetic that doesn't compromise on safety.</p>
      
      <h2>Innovation and Technology</h2>
      <p>We continuously invest in research and development to bring you the latest innovations in baby product design. Our engineering team works tirelessly to improve safety features, enhance comfort, and create products that make parenting easier.</p>
      
      <h2>Global Reach, Local Quality</h2>
      <p>While we're based in China, our products are trusted by families in over 20 countries worldwide. Our 11,800㎡ factory houses state-of-the-art manufacturing equipment and a team of 200+ dedicated professionals.</p>
      
      <h2>OEM/ODM Services</h2>
      <p>Beyond our own brand, we offer comprehensive OEM/ODM services to partners worldwide. Whether you need custom designs, specific color schemes, or private labeling, we can accommodate your needs.</p>
      
      <h2>Looking Forward</h2>
      <p>As we continue to grow, our commitment to quality and innovation remains unwavering. We're excited to introduce new products and features that will continue to support families around the world.</p>
    `,
    image: "/images/003_2025 Stylish Stroller High-fashion Design Foldable Traveling Pushchair With Shoc.webp",
    tags: ["Company", "Quality", "Strollers", "Manufacturing"],
  },
  "new-baby-walkers-launch": {
    title:
      "Kidilo Launches New Baby Walkers to Support Safe First Steps",
    excerpt:
      "Kidilo, a leading Baby Carriage Chinese manufacturer and trusted brand, announces the launch of new baby walkers designed to support safe first steps.",
    date: "2024-01-05",
    category: "Product Launch",
    author: "Kidilio Product Team",
    readTime: "5 min read",
    content: `
      <p>We're thrilled to announce the launch of our new line of baby walkers, designed to support your little one's journey to taking their first steps safely and confidently.</p>
      
      <h2>Introducing the X177 Learning Walker</h2>
      <p>Our new X177 Learning Walker is a revolutionary 3-in-1 design that combines a learning walker, stroller, and car seat functionality. This innovative product helps babies develop their motor skills while ensuring maximum safety.</p>
      
      <h2>Key Features</h2>
      <h3>Safety First Design</h3>
      <p>The X177 meets global safety standards including ASTM, ECE, and CCC certifications. Its wide base provides exceptional stability, reducing the risk of tipping over.</p>
      
      <h3>Adjustable Height</h3>
      <p>As your baby grows, the walker can be adjusted to the perfect height, ensuring comfortable use from 6 to 18 months.</p>
      
      <h3>Activity Center</h3>
      <p>An integrated activity center keeps your baby engaged with colorful toys and interactive elements that promote cognitive development.</p>
      
      <h3>Foldable Design</h3>
      <p>When not in use, the walker folds compactly for easy storage, making it perfect for families with limited space.</p>
      
      <h2>Why Choose Our Baby Walkers?</h2>
      <p>Our baby walkers are designed with both safety and development in mind. We understand that this is a critical stage in your baby's growth, and we've created a product that supports their natural development while keeping them safe.</p>
      
      <h2>Expert Recommendations</h2>
      <p>Pediatric experts recommend supervised use of walkers for short periods. Our walkers are designed to be used under adult supervision and provide a safe environment for your baby to practice standing and walking.</p>
      
      <h2>Availability</h2>
      <p>The X177 Learning Walker is now available through our global distribution network. Contact us for more information about availability in your region.</p>
    `,
    image: "/images/008_3-in-1 Stroller with Car Seat Global Standards Safety Baby Carriage With Univers.webp",
    tags: ["Product Launch", "Baby Walkers", "Safety", "Development"],
  },
  "baby-crib-market-growth": {
    title:
      "Baby Crib Market Sees New Growth: Eco-Friendly and Multi-Functional Designs Take the Spotlight",
    excerpt:
      "With the growing popularity of 'refined parenting,' the baby crib market is experiencing new growth trends focusing on eco-friendly and multi-functional designs.",
    date: "2023-12-20",
    category: "Market Insights",
    author: "Kidilio Market Research",
    readTime: "7 min read",
    content: `
      <p>The baby crib market is experiencing significant growth, driven by evolving consumer preferences and increasing awareness of sustainable parenting practices. Recent market analysis reveals exciting trends that are shaping the future of baby furniture.</p>
      
      <h2>Market Growth Trends</h2>
      <p>According to recent industry reports, the global baby crib market is expected to grow at a compound annual growth rate (CAGR) of 5.2% over the next five years. This growth is primarily driven by increasing birth rates in developing countries and rising disposable incomes.</p>
      
      <h2>Eco-Friendly Designs Lead the Way</h2>
      <p>Modern parents are increasingly conscious of their environmental impact. This has led to a surge in demand for eco-friendly cribs made from sustainable materials such as bamboo, recycled wood, and non-toxic finishes.</p>
      
      <h3>Sustainable Materials</h3>
      <p>Manufacturers are responding to this demand by using certified sustainable wood sources and water-based, non-toxic paints and finishes. These materials not only benefit the environment but also provide a safer sleeping environment for babies.</p>
      
      <h2>Multi-Functional Designs</h2>
      <p>Space-saving and versatility are key factors driving crib design innovation. Modern parents, especially those living in urban areas, prefer cribs that can adapt to their changing needs.</p>
      
      <h3>Convertible Cribs</h3>
      <p>Convertible cribs that transform from a bassinet to a toddler bed are becoming increasingly popular. These designs offer excellent value for money and reduce waste by extending the product's useful life.</p>
      
      <h3>3-in-1 Solutions</h3>
      <p>Our UP650X model exemplifies this trend, combining crib, stroller, and bassinet functionality in one innovative design. This type of multi-functional product is particularly appealing to modern families who value both space efficiency and versatility.</p>
      
      <h2>Safety Standards Evolution</h2>
      <p>As safety standards continue to evolve, manufacturers are incorporating new safety features such as adjustable mattress heights, breathable mesh sides, and improved stability mechanisms.</p>
      
      <h2>Regional Market Insights</h2>
      <h3>North America</h3>
      <p>The North American market shows strong preference for premium, feature-rich cribs with modern aesthetics. Safety certifications like CPSC are mandatory, driving innovation in safety features.</p>
      
      <h3>Europe</h3>
      <p>European consumers prioritize eco-friendly materials and minimalist designs. ECE certifications are standard, and there's growing interest in sustainable manufacturing practices.</p>
      
      <h3>Asia-Pacific</h3>
      <p>The Asia-Pacific region, particularly China, is experiencing rapid market growth. Consumers here value both quality and affordability, leading to innovative designs that balance these factors.</p>
      
      <h2>Future Outlook</h2>
      <p>The baby crib market is expected to continue its growth trajectory, with innovation focusing on smart features, sustainability, and multi-functionality. As consumer awareness grows, we can expect to see even more emphasis on eco-friendly materials and designs that support long-term use.</p>
      
      <h2>Conclusion</h2>
      <p>The baby crib market is evolving to meet the needs of modern parents who value safety, sustainability, and functionality. At Kidilio, we're committed to staying at the forefront of these trends, continuously innovating to provide products that meet the highest standards of quality, safety, and environmental responsibility.</p>
    `,
    image: "/images/015_3-in-1 Foldable Crib Stroller Lightweight Aluminum Alloy Frame Newborn Bassinet .webp",
    tags: ["Market Trends", "Eco-Friendly", "Cribs", "Sustainability"],
  },
};

export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({
    slug: slug,
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts[slug];

  if (!post) {
    notFound();
  }

  // Get related posts (same category, excluding current)
  const relatedPosts = Object.entries(blogPosts)
    .filter(([postSlug, p]) => p.category === post.category && postSlug !== slug)
    .slice(0, 3)
    .map(([postSlug, p]) => ({ slug: postSlug, ...p }));

  return (
    <div className="bg-white dark:bg-black">
      {/* Breadcrumbs */}
      <nav className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link
              href="/"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              Home
            </Link>
            <span className="text-gray-400 dark:text-gray-600">/</span>
            <Link
              href="/blog"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              Blog
            </Link>
            <span className="text-gray-400 dark:text-gray-600">/</span>
            <span className="text-gray-900 dark:text-white font-medium line-clamp-1">
              {post.title}
            </span>
          </div>
        </div>
      </nav>

      {/* Blog Post Hero */}
      <article className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-x-4 text-sm mb-4">
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
              <span className="text-gray-500 dark:text-gray-400">
                {post.readTime}
              </span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white mb-4">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <span>By {post.author}</span>
            </div>
          </div>

          {/* Featured Image */}
          {post.image && (
            <div className="aspect-video w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800 relative mb-8">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Content */}
          <div
            className="prose prose-lg dark:prose-invert max-w-none
              prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
              prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-8
              prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
              prose-ul:list-disc prose-ul:pl-6
              prose-ol:list-decimal prose-ol:pl-6
              prose-li:text-gray-700 dark:prose-li:text-gray-300
              prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="rounded-full bg-gray-100 dark:bg-gray-800 px-3 py-1 text-xs font-medium text-gray-700 dark:text-gray-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
            <Link
              href="/blog"
              className="inline-flex items-center text-base font-semibold text-gray-900 hover:text-gray-600 dark:text-white dark:hover:text-gray-300 transition-colors"
            >
              ← Back to Blog
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-lg bg-[var(--primary)] px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-[var(--primary-hover)] transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-gray-50 py-16 dark:bg-gray-900">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-8">
              Related Posts
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-lg dark:bg-gray-800"
                >
                  <div className="flex items-center gap-x-4 text-xs mb-3">
                    <time
                      dateTime={related.date}
                      className="text-gray-500 dark:text-gray-400"
                    >
                      {new Date(related.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                    <span className="rounded-full bg-gray-200 px-3 py-1 text-xs font-semibold text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                      {related.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {related.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {related.excerpt}
                  </p>
                  <span className="mt-4 inline-flex items-center text-sm font-semibold text-gray-900 group-hover:text-gray-600 dark:text-white dark:group-hover:text-gray-300">
                    Read More <span className="ml-2">→</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-[var(--primary)] py-16 dark:bg-[var(--primary)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Interested in Our Products?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
              Contact us for pricing, customization options, and OEM/ODM services.
              We're here to help you find the perfect solution for your needs.
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


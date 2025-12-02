import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";
import { getProductPrice } from "@/lib/products";

// Product data structure
const products: { [key: string]: any } = {
  "stroller-h2dc": {
    name: "H2D+C Baby Stroller",
    code: "H2D+C",
    category: "Baby Strollers",
    description: "A versatile 2-in-1 convertible crib and stroller with a flat padded sleep surface bed. Perfect for modern families who need flexibility and convenience.",
    longDescription: "The H2D+C is a revolutionary 2-in-1 convertible design that combines the functionality of a crib and stroller in one innovative product. Features a flat padded sleep surface bed that ensures your baby's comfort whether at home or on the go. Built with premium materials and safety-certified construction.",
    image: "/images/004_Kidilo H2D 2-in-1 Convertible Cribs and Strollers Flat Padded Sleep Surface Bed .webp",
    features: [
      "2-in-1 convertible crib and stroller design",
      "Flat padded sleep surface bed",
      "Easy conversion between modes",
      "Lightweight and portable",
      "Safety-certified materials",
      "Adjustable handlebar height",
      "Large storage basket",
      "One-hand fold mechanism"
    ],
    specifications: {
      "Weight Capacity": "Up to 15kg",
      "Age Range": "0-36 months",
      "Dimensions": "95cm x 55cm x 105cm",
      "Folded Dimensions": "95cm x 55cm x 35cm",
      "Weight": "8.5kg",
      "Certifications": "ECE, CCC, ASTM"
    }
  },
  "stroller-a10": {
    name: "A10 Baby Stroller",
    code: "A10",
    category: "Baby Strollers",
    description: "A stylish 2025 stroller with high-fashion design, foldable for easy traveling. Features shock absorption for a smooth ride.",
    longDescription: "The A10 represents the latest in stroller design for 2025, combining high-fashion aesthetics with practical functionality. This foldable traveling pushchair features advanced shock absorption technology, ensuring your baby enjoys a smooth and comfortable ride. Perfect for urban families who value both style and performance.",
    image: "/images/003_2025 Stylish Stroller High-fashion Design Foldable Traveling Pushchair With Shoc.webp",
    features: [
      "2025 high-fashion design",
      "Advanced shock absorption system",
      "One-hand fold mechanism",
      "Reversible seat unit",
      "Adjustable footrest",
      "Large canopy with UPF 50+ protection",
      "5-point safety harness",
      "All-terrain wheels"
    ],
    specifications: {
      "Weight Capacity": "Up to 22kg",
      "Age Range": "0-48 months",
      "Dimensions": "100cm x 58cm x 108cm",
      "Folded Dimensions": "100cm x 58cm x 38cm",
      "Weight": "9.2kg",
      "Certifications": "ECE, CCC, ASTM"
    }
  },
  "car-seat-kbh311": {
    name: "KBH311 Baby Car Seat",
    code: "KBH311",
    category: "Baby Car Seats",
    description: "Convertible infant seat stroller combination with FMVSS and ASTM certifications. Ensures maximum safety and comfort for your little one.",
    longDescription: "The KBH311 is a premium convertible infant seat that combines with our stroller system for ultimate convenience. FMVSS and ASTM certificated, this car seat provides superior protection with its advanced safety features. The ergonomic design ensures your baby's comfort during long journeys.",
    image: "/images/001_Kidilo Convertible Infant Seat Stroller Baby Travel Pram FMVSS ASTM Certificated.webp",
    features: [
      "FMVSS & ASTM certified",
      "Convertible design",
      "5-point safety harness",
      "Side impact protection",
      "Adjustable headrest",
      "Easy installation system",
      "Compatible with stroller base",
      "Machine washable cover"
    ],
    specifications: {
      "Weight Range": "2.3kg - 18kg",
      "Age Range": "0-4 years",
      "Dimensions": "45cm x 42cm x 68cm",
      "Weight": "4.8kg",
      "Certifications": "FMVSS, ASTM, ECE, CCC"
    }
  },
  "car-seat-c002": {
    name: "C002 Baby Car Seat",
    code: "C002",
    category: "Baby Car Seats",
    description: "3-in-1 car seat and stroller combination with anti-rebound safety features. Made with safety-certified materials and fashionable design.",
    longDescription: "The C002 is an innovative 3-in-1 system that combines a car seat, stroller, and bassinet. Features anti-rebound technology for enhanced safety and is constructed with safety-certified materials. The fashionable design doesn't compromise on safety standards.",
    image: "/images/005_3-in-1 Car Seat and Stroller Anti-rebound Safety-certified Materials With Fashio.webp",
    features: [
      "3-in-1 convertible system",
      "Anti-rebound base",
      "Safety-certified materials",
      "Fashionable design",
      "Easy installation",
      "Adjustable recline positions",
      "Removable and washable covers",
      "Energy-absorbing foam"
    ],
    specifications: {
      "Weight Range": "2.3kg - 18kg",
      "Age Range": "0-4 years",
      "Dimensions": "46cm x 43cm x 70cm",
      "Weight": "5.2kg",
      "Certifications": "ECE, CCC, FMVSS"
    }
  },
  "crib-up650x": {
    name: "UP650X Baby Crib",
    code: "UP650X",
    category: "Baby Cribs",
    description: "3-in-1 foldable crib stroller with lightweight aluminum alloy frame. Features a newborn bassinet for the ultimate in versatility.",
    longDescription: "The UP650X is a revolutionary 3-in-1 foldable crib that transforms into a stroller and includes a newborn bassinet. Built with a lightweight aluminum alloy frame, this crib offers durability without the weight. Perfect for families who need a multi-functional solution that grows with their baby.",
    image: "/images/015_3-in-1 Foldable Crib Stroller Lightweight Aluminum Alloy Frame Newborn Bassinet .webp",
    features: [
      "3-in-1 foldable design",
      "Lightweight aluminum alloy frame",
      "Newborn bassinet included",
      "Adjustable mattress height",
      "Convertible to toddler bed",
      "Easy assembly",
      "Compact storage",
      "Safety-certified materials"
    ],
    specifications: {
      "Weight Capacity": "Up to 25kg",
      "Age Range": "0-3 years",
      "Dimensions": "130cm x 70cm x 95cm",
      "Folded Dimensions": "130cm x 70cm x 20cm",
      "Weight": "12.5kg",
      "Certifications": "CPSC, ASTM, ECE"
    }
  },
  "crib-ap9405": {
    name: "AP9405 Baby Crib",
    code: "AP9405",
    category: "Baby Cribs",
    description: "Baby bassinet with UPF 50+ sunshade, CPSC certificated. Provides safe and comfortable sleeping environment for your newborn.",
    longDescription: "The AP9405 is a premium baby bassinet designed with your newborn's safety and comfort in mind. Features UPF 50+ sunshade protection and is CPSC certificated. The breathable mesh sides ensure proper air circulation while the padded mattress provides optimal comfort.",
    image: "/images/016_Baby Bassinet UPF 50+ sunshade CPSC Certificated Infant Stroller Safe and Comfor.webp",
    features: [
      "UPF 50+ sunshade protection",
      "CPSC certificated",
      "Breathable mesh sides",
      "Padded mattress included",
      "Adjustable canopy",
      "Compact and portable",
      "Easy to clean",
      "Stable base design"
    ],
    specifications: {
      "Weight Capacity": "Up to 9kg",
      "Age Range": "0-6 months",
      "Dimensions": "85cm x 50cm x 40cm",
      "Weight": "3.5kg",
      "Certifications": "CPSC, ASTM"
    }
  },
  "high-chair-dc02": {
    name: "DC02 Baby High Chair",
    code: "DC02",
    category: "Baby High Chairs",
    description: "2-in-1 convertible chair stroller with mobile, durable design. Features adjustable backrest for optimal comfort.",
    longDescription: "The DC02 is a versatile 2-in-1 high chair that converts into a mobile feeding solution. The durable construction ensures longevity while the adjustable backrest provides optimal comfort for your growing baby. Perfect for families who value versatility and quality.",
    image: "/images/002_2-in-1 Convertible Chair Stroller Mobile Durable Adjustable Backrest Baby Pushch.webp",
    features: [
      "2-in-1 convertible design",
      "Adjustable backrest",
      "Mobile and portable",
      "Durable construction",
      "5-point safety harness",
      "Removable tray",
      "Easy to clean",
      "Compact fold"
    ],
    specifications: {
      "Weight Capacity": "Up to 20kg",
      "Age Range": "6 months - 3 years",
      "Dimensions": "50cm x 50cm x 95cm",
      "Folded Dimensions": "50cm x 50cm x 30cm",
      "Weight": "6.8kg",
      "Certifications": "ASTM, ECE"
    }
  },
  "high-chair-ty02": {
    name: "TY-02 Baby High Chair",
    code: "TY-02",
    category: "Baby High Chairs",
    description: "2-in-1 car seat stroller combination, ASTM F833 certificated. Safe and reliable feeding solution for your baby.",
    longDescription: "The TY-02 combines the functionality of a high chair with the convenience of a mobile feeding solution. ASTM F833 certificated, this product meets the highest safety standards. The ergonomic design ensures your baby's comfort during meal times.",
    image: "/images/006_Kidilo 2-in-1 Cheap Car Seat Stroller ASTM F833 Certificated Baby Pram With Safe.webp",
    features: [
      "ASTM F833 certificated",
      "2-in-1 design",
      "Adjustable height",
      "Removable and washable tray",
      "5-point safety harness",
      "Stable base",
      "Easy assembly",
      "Compact storage"
    ],
    specifications: {
      "Weight Capacity": "Up to 18kg",
      "Age Range": "6 months - 3 years",
      "Dimensions": "52cm x 52cm x 98cm",
      "Weight": "7.2kg",
      "Certifications": "ASTM F833, ECE"
    }
  },
  "swing-ty01": {
    name: "TY01 Swing Chair",
    code: "TY01",
    category: "Swing Chairs",
    description: "3-in-1 stroller and car seat combination with UPF50+ premium buggy. Easy to carry and perfect for travel.",
    longDescription: "The TY01 is a premium 3-in-1 swing chair that combines stroller, car seat, and swing functionality. Features UPF50+ protection and is designed for easy carrying. Perfect for parents who need a versatile solution that adapts to different situations.",
    image: "/images/007_Kidilo 3-in-1 Stroller and Car Seat UPF50+ Premium Buggy Easy to Carry.webp",
    features: [
      "3-in-1 functionality",
      "UPF50+ protection",
      "Easy to carry",
      "Multiple swing speeds",
      "Music and vibration options",
      "Adjustable recline",
      "Machine washable fabric",
      "Battery operated"
    ],
    specifications: {
      "Weight Capacity": "Up to 13kg",
      "Age Range": "0-12 months",
      "Dimensions": "60cm x 50cm x 75cm",
      "Weight": "5.5kg",
      "Certifications": "ASTM, ECE"
    }
  },
  "walker-x177": {
    name: "X177 Learning Walker",
    code: "X177",
    category: "Learning Walkers",
    description: "3-in-1 stroller with car seat, meeting global safety standards. Universal compatibility and safety-certified construction.",
    longDescription: "The X177 is an innovative learning walker that helps your baby take their first steps safely. Features a 3-in-1 design that includes stroller and car seat functionality. Built to meet global safety standards with universal compatibility features.",
    image: "/images/008_3-in-1 Stroller with Car Seat Global Standards Safety Baby Carriage With Univers.webp",
    features: [
      "3-in-1 learning walker",
      "Global safety standards",
      "Universal compatibility",
      "Adjustable height",
      "Activity center included",
      "Wide base for stability",
      "Easy to clean",
      "Foldable design"
    ],
    specifications: {
      "Weight Capacity": "Up to 15kg",
      "Age Range": "6-18 months",
      "Dimensions": "65cm x 65cm x 55cm",
      "Folded Dimensions": "65cm x 65cm x 25cm",
      "Weight": "4.2kg",
      "Certifications": "ASTM, ECE, CCC"
    }
  }
};

export async function generateStaticParams() {
  return Object.keys(products).map((slug) => ({
    slug: slug,
  }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products[slug];

  if (!product) {
    notFound();
  }

  // Get related products (same category, excluding current)
  const relatedProducts = Object.entries(products)
    .filter(([productSlug, p]) => p.category === product.category && productSlug !== slug)
    .slice(0, 3)
    .map(([productSlug, p]) => ({ slug: productSlug, ...p }));

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
              href="/products"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              Products
            </Link>
            <span className="text-gray-400 dark:text-gray-600">/</span>
            <span className="text-gray-900 dark:text-white font-medium">
              {product.name}
            </span>
          </div>
        </div>
      </nav>

      {/* Product Hero Section */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Product Image */}
            <div className="aspect-square w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800 relative">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <div className="mb-4">
                <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  {product.category}
                </span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white mb-4">
                {product.name}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
                Product Code: <span className="font-semibold text-gray-900 dark:text-white">{product.code}</span>
              </p>
              <p className="text-xl leading-8 text-gray-700 dark:text-gray-300 mb-8">
                {product.description}
              </p>

              {/* Specifications Preview */}
              <div className="mb-8 p-6 bg-gray-50 dark:bg-gray-900 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Key Specifications
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(product.specifications)
                    .slice(0, 4)
                    .map(([key, value]) => (
                      <div key={key}>
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          {key}
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                          {value as string}
                        </dd>
                      </div>
                    ))}
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  ${getProductPrice(product.code).toFixed(2)}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Contact us for bulk pricing and OEM/ODM quotes
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <AddToCartButton
                  product={{
                    id: product.code,
                    name: product.name,
                    code: product.code,
                    category: product.category,
                    image: product.image,
                    slug: slug,
                  }}
                  variant="large"
                  className="flex-1"
                />
                <Link
                  href="/contact"
                  className="flex-1 rounded-lg border border-gray-300 bg-white px-6 py-3 text-center text-base font-semibold text-gray-900 shadow-sm hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                >
                  Request Quote
                </Link>
              </div>
              <Link
                href="/products"
                className="mt-4 text-center text-base font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                ← View All Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Section */}
      <section className="bg-gray-50 py-16 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
                Product Description
              </h2>
              <p className="text-lg leading-8 text-gray-600 dark:text-gray-400">
                {product.longDescription}
              </p>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
                Key Features
              </h2>
              <ul className="space-y-3">
                {product.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-3 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-base text-gray-700 dark:text-gray-300">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications Table */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-8">
            Complete Specifications
          </h2>
          <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800 bg-white dark:bg-gray-900">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <tr key={key} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white w-1/3">
                      {key}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {value as string}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="bg-gray-50 py-16 dark:bg-gray-900">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-8">
              Related Products
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/products/${related.slug}`}
                  className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-lg dark:bg-gray-800"
                >
                  <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700 relative mb-4">
                    <Image
                      src={related.image}
                      alt={related.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {related.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {related.category}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    Code: {related.code}
                  </p>
                  <span className="mt-4 inline-flex items-center text-sm font-semibold text-gray-900 group-hover:text-gray-600 dark:text-white dark:group-hover:text-gray-300">
                    View Details <span className="ml-2">→</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-gray-900 py-16 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Interested in This Product?
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


import Link from "next/link";
import Image from "next/image";

export default function Services() {
  const services = [
    {
      title: "Custom Bridal Bedding",
      description:
        "Create the wedding bed of your dreams with our bespoke bridal bedding service. Tailored to your theme and colors.",
      features: [
        "Personalized design consultation",
        "Fabric & color matching",
        "Custom embroidery & embellishments",
        "Matching accessory sets",
      ],
    },
    {
      title: "Made-to-Measure Sheets",
      description:
        "Have a unique mattress size? We create custom-fitted sheets that fit perfectly, no matter the dimensions.",
      features: [
        "Custom dimensions for any bed size",
        "Deep pocket options",
        "Choice of fabric & thread count",
        "Perfect fit guarantee",
      ],
    },
    {
      title: "Interior Styling Advice",
      description:
        "Not sure what matches your room? Our styling experts are here to help you choose the perfect bedding.",
      features: [
        "Color palette coordination",
        "Texture layering tips",
        "Seasonal styling advice",
        "Virtual consultations",
      ],
    },
    {
      title: "Bulk & Corporate Orders",
      description: "Premium bedding solutions for hotels, guest houses, and corporate gifting.",
      features: [
        "Volume discounts",
        "Logo embroidery",
        "Durable hospitality-grade fabrics",
        "Dedicated account manager",
      ],
    },
    {
      title: "Gift Packaging",
      description:
        "Make your gift extra special with our premium gift wrapping and personalized note services.",
      features: [
        "Luxury gift boxes",
        "Ribbon & tag customization",
        "Handwritten notes",
        "Direct delivery to recipient",
      ],
    },
    {
      title: "Nationwide Delivery",
      description:
        "Fast, reliable, and tracked shipping to every corner of the country.",
      features: [
        "Trusted courier partners",
        "Real-time tracking",
        "Secure packaging",
        "Cash on Delivery options",
      ],
    },
  ];

  return (
    <div className="bg-white dark:bg-black">
      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/zebaish3.jpg"
            alt="Zebaish Services"
            fill
            className="object-cover blur-sm"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-5xl font-bold text-white sm:text-6xl lg:text-7xl font-serif">
              Our Services
            </h1>
            <p className="mt-4 text-xl text-white sm:text-2xl">
              From custom bridal sets to interior styling, <br />
              we go the extra mile to make your home beautiful.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="group rounded-2xl p-8 bg-white/60 dark:bg-gray-900/60 hover:bg-white/80 dark:hover:bg-gray-900/80 backdrop-blur-md border border-gray-200/40 dark:border-gray-700/40 shadow-lg hover:shadow-2xl transition-all duration-300 fade-in-up"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 transition-colors font-serif">
                {service.title}
              </h2>

              <p className="mt-4 text-gray-600 dark:text-gray-400">
                {service.description}
              </p>

              <ul className="mt-6 space-y-3">
                {service.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-start text-gray-600 dark:text-gray-400"
                  >
                    <svg
                      className="h-5 w-5 mr-3 text-purple-500 dark:text-purple-400"
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
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white font-serif">
            How It Works
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-400">
            Our simple process to bring comfort to your home
          </p>

          <div className="grid grid-cols-1 mt-16 lg:grid-cols-4 gap-10">
            {["Browse & Select", "Customize (Optional)", "Place Order", "Delivery"].map(
              (step, i) => (
                <div key={i} className="fade-in-up">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-purple-600 text-white text-xl font-bold shadow-lg">
                    {i + 1}
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-gray-900 dark:text-white font-serif">
                    {step}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {
                      [
                        "Choose from our wide range of premium collections.",
                        "Need a custom size or bridal set? Let us know.",
                        "Secure checkout with multiple payment options.",
                        "Fast delivery directly to your doorstep.",
                      ][i]
                    }
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[var(--primary)] text-white">
        <div className="max-w-3xl mx-auto text-center px-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif">
            Need Expert Advice?
          </h2>
          <p className="mt-4 text-gray-200 text-lg">
            Our team is happy to help you select the perfect bedding for your home.
          </p>

          <Link
            href="/contact"
            className="inline-block mt-10 px-8 py-3 text-lg font-semibold text-[var(--primary)] bg-white rounded-lg shadow-lg hover:bg-gray-100 transition-all hover:scale-105"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}

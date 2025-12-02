import Link from "next/link";

export default function Services() {
  const services = [
    {
      title: "OEM/ODM Services",
      description:
        "Full Original Equipment Manufacturer and Original Design Manufacturer support for your baby product needs.",
      features: [
        "Custom product design and development",
        "Flexible manufacturing capabilities",
        "Quality control and testing",
        "Packaging and branding solutions",
      ],
    },
    {
      title: "CAD Design & Engineering",
      description:
        "Professional design and engineering support for custom baby products.",
      features: [
        "3D CAD modeling and design",
        "Engineering consultation",
        "Prototype development",
        "Technical documentation",
      ],
    },
    {
      title: "Custom Colors & Fabrics",
      description:
        "Flexible customization options including colors, fabrics, and logos.",
      features: [
        "Wide range of color options",
        "Premium fabric selection",
        "Custom logo printing/embroidery",
        "Brand-specific color matching",
      ],
    },
    {
      title: "Fast Prototyping",
      description: "Prototype samples available within 15 days.",
      features: [
        "Rapid prototype development",
        "Sample approval process",
        "Design iteration support",
        "Quality sample production",
      ],
    },
    {
      title: "Quality Assurance",
      description:
        "Strict quality control ensuring all products meet international safety standards.",
      features: [
        "ECE & CCC certifications",
        "56+ patents",
        "Quality testing procedures",
        "International safety compliance",
      ],
    },
    {
      title: "Global Shipping",
      description:
        "Reliable shipping and logistics support to 20+ countries worldwide.",
      features: [
        "International shipping",
        "Customs documentation",
        "Flexible packaging options",
        "Logistics coordination",
      ],
    },
  ];

  return (
    <div className="bg-white dark:bg-black">
      {/* Hero Section */}
     <section className="relative h-[400px] overflow-hidden">
               <div className="absolute inset-0">
                 <img
                   src="/images/kidilo-building.jpg.webp"
                   alt="Kidilo Building"
                   
                   className="object-cover blur-sm"
                 />
                 <div className="absolute inset-0 bg-black/50"></div>
               </div>
               <div className="relative mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
                 <div>
                   <h1 className="text-5xl font-bold text-white sm:text-6xl lg:text-7xl">
                       Our Services
                   </h1>
                   <p className="mt-4 text-xl text-white sm:text-2xl">
                     Comprehensive OEM/ODM services with advanced engineering,<br />
            customization, and global manufacturing expertise.
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
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 transition-colors">
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
                      className="h-5 w-5 mr-3 text-indigo-500 dark:text-indigo-400"
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
      <section className="py-24 bg-gray-100 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Our Process
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-400">
            A step-by-step process to bring your ideas to life
          </p>

          <div className="grid grid-cols-1 mt-16 lg:grid-cols-4 gap-10">
            {["Consultation", "Design & Prototype", "Approval", "Production"].map(
              (step, i) => (
                <div key={i} className="fade-in-up">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-white text-xl font-bold shadow-lg">
                    {i + 1}
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-gray-900 dark:text-white">
                    {step}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {
                      [
                        "Discuss your requirements and product vision",
                        "Create CAD models & develop prototypes",
                        "Review & approve before final production",
                        "Manufacturing + global delivery",
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
      <section className="py-20 bg-indigo-600 dark:bg-indigo-700">
        <div className="max-w-3xl mx-auto text-center px-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Ready to Start Your Project?
          </h2>
          <p className="mt-4 text-indigo-100 text-lg">
            Contact our team today and bring your OEM/ODM vision to reality.
          </p>

          <Link
            href="/contact"
            className="inline-block mt-10 px-8 py-3 text-lg font-semibold text-indigo-600 bg-white rounded-lg shadow-lg hover:bg-gray-100 transition-all"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}

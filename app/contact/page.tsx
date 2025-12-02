"use client";

import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We will get back to you soon.");
    setFormData({ name: "", phone: "", email: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
                         Contact Us
                        </h1>
                        <p className="mt-4 text-xl text-white sm:text-2xl">
                       Get in touch with us to learn more about our products and
        services,<br /> or request a quote for your OEM/ODM needs.
                        </p>
                      </div>
                    </div>
                  </section>


      {/* Contact Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            {/* Contact Form */}
            <div className="rounded-2xl bg-gray-50 p-8 dark:bg-gray-900">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Send us a message
              </h2>
              <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-400">
                Fill out the form below and we'll get back to you as soon as
                possible.
              </p>
              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold leading-6 text-gray-900 dark:text-white"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-2 block w-full rounded-lg border-0 bg-white px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold leading-6 text-gray-900 dark:text-white"
                  >
                    Phone/WhatsApp
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-2 block w-full rounded-lg border-0 bg-white px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
                    placeholder="+86 135 4812 5510"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold leading-6 text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-2 block w-full rounded-lg border-0 bg-white px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
                    placeholder="info@kidilo.cn"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold leading-6 text-gray-900 dark:text-white"
                  >
                    Message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="mt-2 block w-full rounded-lg border-0 bg-white px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
                    placeholder="Tell us about your requirements..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-blue-800 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 dark:bg-white dark:bg-blue-600 dark:hover:bg-gray-100"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="rounded-2xl bg-gray-50 p-8 dark:bg-gray-900">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Contact Information
              </h2>
              <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-400">
                Reach out to us through any of the following channels.
              </p>
              <div className="mt-8 space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                    Address
                  </h3>
                  <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
                    Air China Century Center, Aviation Road,
                    <br />
                    Wuhou District, Chengdu,
                    <br />
                    Sichuan Province, China
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                    Email
                  </h3>
                  <a
                    href="mailto:info@kidilo.cn"
                    className="mt-2 block text-base text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  >
                    info@kidilo.cn
                  </a>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                    Phone / WhatsApp / WeChat
                  </h3>
                  <a
                    href="tel:+8613548125510"
                    className="mt-2 block text-base text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  >
                    +86 135 4812 5510
                  </a>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                    Business Hours
                  </h3>
                  <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
                    Monday - Friday: 9:00 AM - 6:00 PM (CST)
                    <br />
                    Saturday: 9:00 AM - 1:00 PM (CST)
                    <br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
}


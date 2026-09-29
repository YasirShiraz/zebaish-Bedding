"use client";

export default function VideoSection() {
    return (
        <section className="relative w-full h-[300px] md:h-[500px] bg-black overflow-hidden flex items-center justify-center my-12">
            {/* Background - Could be an image or video */}
            <div className="absolute inset-0 bg-neutral-900">
                {/* Placeholder for video/banner image */}
                <div className="w-full h-full opacity-60 bg-[url('/images/banner-black.jpg')] bg-cover bg-center"></div>
            </div>

            <div className="relative z-10 text-center px-4">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 uppercase tracking-widest shadow-black drop-shadow-lg">
                    New Arrivals
                </h2>
                <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-8 font-light">
                    Discover the latest trends in baby care safety and comfort.
                </p>
                <button className="bg-white text-black px-8 py-3 uppercase tracking-widest font-bold hover:bg-gray-200 transition-colors">
                    Explore Now
                </button>
            </div>
        </section>
    );
}

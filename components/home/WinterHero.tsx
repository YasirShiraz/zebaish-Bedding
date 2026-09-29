"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function WinterHero() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#0066cc] to-[#0099ff] h-[500px] flex items-center justify-center">
            {/* Snow Effect Overlay */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(50)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute bg-white rounded-full opacity-70 animate-snow"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `-10px`,
                            width: `${Math.random() * 8 + 4}px`,
                            height: `${Math.random() * 8 + 4}px`,
                            animationDuration: `${Math.random() * 5 + 3}s`,
                            animationDelay: `${Math.random() * 5}s`,
                        }}
                    />
                ))}
            </div>

            {/* Hero Content */}
            <div className="relative z-10 text-center text-white px-4">
                <h3 className="text-xl md:text-2xl font-light tracking-[0.2em] mb-4 uppercase animate-fade-in-up">
                    Special Offer
                </h3>
                <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-2 drop-shadow-lg font-serif animate-fade-in-up-delay">
                    WINTER
                </h1>
                <h2 className="text-7xl md:text-9xl font-script mb-8 text-white drop-shadow-lg animate-fade-in-up-delay-2" style={{ fontFamily: 'cursive' }}>
                    Sale
                </h2>

                <div className="inline-block bg-white text-[#0066cc] px-8 py-3 text-xl md:text-2xl font-bold uppercase tracking-wider shadow-lg transform hover:scale-105 transition-transform duration-300">
                    Discount Flat 70% Off
                </div>
            </div>

            {/* Decorative Bottom Border (Snow) */}
            <div className="absolute bottom-0 left-0 w-full h-16 bg-[url('/images/snow-border.png')] bg-repeat-x bg-contain z-20"></div>

            {/* CSS for Snow Animation */}
            <style jsx>{`
        @keyframes snow {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0.8;
          }
          100% {
            transform: translateY(500px) translateX(20px);
            opacity: 0;
          }
        }
        .animate-snow {
          animation-name: snow;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
        </section>
    );
}

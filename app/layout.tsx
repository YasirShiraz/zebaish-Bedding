import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { Toaster } from "react-hot-toast";
import WhatsAppButton from "@/components/WhatsAppButton";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
    variable: "--font-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://zebaishbedding.com'),
    title: {
        default: "Zebaish Bedding - Premium Home Textiles",
        template: "%s | Zebaish Bedding"
    },
    description: "Discover luxury bedding collections from Zebaish Bedding. Premium cotton sheets, velvet duvets, bridal sets, and home textiles crafted for ultimate comfort.",
    keywords: ["bedding", "luxury bedding", "bridal sets", "duvet covers", "cotton sheets", "home textiles", "zebaish", "pakistan bedding"],
    authors: [{ name: "Zebaish Bedding" }],
    creator: "Zebaish Bedding",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "/",
        title: "Zebaish Bedding - Premium Home Textiles",
        description: "Transform your bedroom with our premium bedding collections.",
        siteName: "Zebaish Bedding",
        images: [
            {
                url: "/images/og-image.jpg", // Ensure this exists or use a dynamic one
                width: 1200,
                height: 630,
                alt: "Zebaish Bedding Collection",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Zebaish Bedding",
        description: "Premium bedding and home textiles.",
        images: ["/images/og-image.jpg"],
    },
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon.ico",
        apple: "/apple-touch-icon.png",
    },
};

import BottomNav from "@/components/BottomNav";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased`} suppressHydrationWarning>
                <ThemeProvider>
                    <AuthProvider>
                        <CartProvider>
                            <WishlistProvider>
                                <div className="flex min-h-screen flex-col bg-white text-gray-900 transition-colors duration-300 dark:bg-black dark:text-gray-100 pb-16 lg:pb-0">
                                    <Header />
                                    <main className="flex-grow">{children}</main>
                                    <Footer />
                                    <BottomNav />
                                    <WhatsAppButton />
                                </div>
                                <Toaster position="bottom-right" />
                            </WishlistProvider>
                        </CartProvider>
                    </AuthProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}

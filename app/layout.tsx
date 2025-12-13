import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
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
    title: "Zebaish Corner - Premium Bedding & Home Textiles",
    description:
        "Discover luxury bedding collections from Zebaish Corner. Premium cotton sheets, velvet duvets, bridal sets, and home textiles crafted for ultimate comfort.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
                <ThemeProvider>
                    <AuthProvider>
                        <CartProvider>
                            <div className="flex min-h-screen flex-col bg-white text-gray-900 transition-colors duration-300 dark:bg-black dark:text-gray-100">
                                <Header />
                                <main className="flex-grow">{children}</main>
                                <Footer />
                                <WhatsAppButton />
                            </div>
                            <Toaster position="bottom-right" />
                        </CartProvider>
                    </AuthProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}

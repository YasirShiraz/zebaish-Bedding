"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { toast } from "react-hot-toast";

interface Variant {
    id: string;
    name: string;
    price: number | null;
    stock: number;
}

interface Review {
    id: string;
    rating: number;
    comment: string | null;
    createdAt: string;
    user: {
        name: string | null;
        image: string | null;
    };
}

interface Product {
    id: string;
    code: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    salePrice: number | null;
    images: string; // JSON string
    category: string;
    variants?: Variant[];
    reviews?: Review[];
    stock: number;
}

const WishlistButton = ({ productId }: { productId: string }) => {
    const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
    const isWishlisted = isInWishlist(productId);

    return (
        <button
            onClick={() => isWishlisted ? removeFromWishlist(productId) : addToWishlist(productId)}
            className={`w-14 h-14 flex items-center justify-center border transition-all duration-300 rounded-xl ${isWishlisted
                ? 'bg-red-50 border-red-200 text-red-500'
                : 'border-gray-200 text-gray-400 hover:border-black hover:text-black dark:border-gray-700 dark:hover:border-white dark:hover:text-white'
                }`}
            title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        >
            <svg className={`w-6 h-6 ${isWishlisted ? 'fill-current' : 'fill-none'}`} stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
        </button>
    );
};

export default function ProductDetails({
    product,
    relatedProducts,
}: {
    product: Product;
    relatedProducts: any[];
}) {
    const router = useRouter();
    const { addToCart } = useCart();
    const { isAuthenticated } = useAuth();

    // Gallery State
    const allImages = useMemo(() => {
        try {
            const parsed = JSON.parse(product.images);
            return Array.isArray(parsed) ? parsed : [product.images];
        } catch {
            return [product.images || '/images/placeholder.jpg'];
        }
    }, [product.images]);

    const [mainImage, setMainImage] = useState(allImages[0]);

    // Variant & Quantity State
    const [selectedVariant, setSelectedVariant] = useState<Variant | null>(
        product.variants && product.variants.length > 0 ? product.variants[0] : null
    );
    const [quantity, setQuantity] = useState(1);

    // Tabs State
    const [activeTab, setActiveTab] = useState<'description' | 'reviews' | 'shipping' | 'returns'>('description');

    // UI State
    const [isSticky, setIsSticky] = useState(false);
    const buySectionRef = useRef<HTMLDivElement>(null);

    // Sticky Logic
    useEffect(() => {
        const handleScroll = () => {
            if (buySectionRef.current) {
                const rect = buySectionRef.current.getBoundingClientRect();
                setIsSticky(rect.bottom < 0);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const effectivePrice = selectedVariant?.price || (product.salePrice && product.salePrice < product.price ? product.salePrice : product.price);

    const handleAddToCart = () => {
        addToCart({
            id: product.id,
            name: `${product.name}${selectedVariant ? ` - ${selectedVariant.name}` : ''}`,
            code: product.code,
            category: product.category,
            image: mainImage,
            price: effectivePrice,
            slug: product.slug,
        }, quantity);
        toast.success("Added to cart!");
    };

    const handleWhatsApp = () => {
        const phoneNumber = "923453177990";
        const message = `Hi, I'm interested in buying ${product.name} (Qty: ${quantity}${selectedVariant ? `, Variant: ${selectedVariant.name}` : ''}). Is it available?`;
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    };

    // Rating Calc
    const totalReviews = product.reviews?.length || 0;
    const avgRating = totalReviews > 0
        ? (product.reviews!.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1)
        : "5.0";

    return (
        <div className="bg-white dark:bg-black min-h-screen pb-20">
            {/* Minimal Breadcrumbs */}
            <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 py-2 md:py-4">
                <nav className="flex items-center gap-1.5 text-[8px] md:text-[10px] uppercase tracking-[0.1em] md:tracking-widest text-gray-400 font-bold overflow-x-auto no-scrollbar whitespace-nowrap">
                    <Link href="/" className="hover:text-black dark:hover:text-white transition-colors">Home</Link>
                    <svg className="w-2 h-2 shrink-0 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                    <Link href="/products" className="hover:text-black dark:hover:text-white transition-colors">Bedding</Link>
                    <svg className="w-2 h-2 shrink-0 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                    <span className="text-gray-900 dark:text-white truncate max-w-[100px] md:max-w-[200px]">{product.name}</span>
                </nav>
            </div>

            <div className="max-w-[1440px] mx-auto px-1 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-16">

                    {/* LEFT: GALLERY SECTION */}
                    <div className="flex-1 flex flex-col-reverse md:flex-row gap-2 md:gap-4">
                        {/* Thumbnails */}
                        <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto no-scrollbar md:h-[600px] md:w-24 shrink-0">
                            {allImages.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setMainImage(img)}
                                    className={`relative aspect-[3/4] w-16 md:w-full border-2 transition-all shrink-0 rounded-lg overflow-hidden ${mainImage === img ? 'border-black dark:border-white shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                                        }`}
                                >
                                    <Image src={img} alt={`Thumbnail ${idx}`} fill className="object-cover" />
                                </button>
                            ))}
                        </div>
                        {/* Main Image */}
                        <div className="flex-1 relative aspect-[4/5] bg-gray-50 dark:bg-gray-900 rounded-lg md:rounded-2xl overflow-hidden group">
                            <Image
                                src={mainImage}
                                alt={product.name}
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                priority
                            />
                            {/* Badges */}
                            <div className="absolute top-3 left-3 md:top-6 md:left-6 flex flex-col gap-1.5 md:gap-2">
                                {product.salePrice && product.salePrice < product.price && (
                                    <span className="bg-red-600 text-white text-[8px] md:text-[10px] font-bold px-2 md:px-3 py-0.5 md:py-1 uppercase tracking-widest rounded-full shadow-lg">
                                        Sale -{Math.round(((product.price - product.salePrice) / product.price) * 100)}%
                                    </span>
                                )}
                                <span className="bg-white/90 dark:bg-black/90 backdrop-blur-md text-[8px] md:text-[10px] font-bold px-2 md:px-3 py-0.5 md:py-1 uppercase tracking-widest rounded-full border border-black/5 dark:border-white/5 shadow-sm">
                                    Premium
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: PRODUCT INFO SECTION */}
                    <div className="flex-1 lg:max-w-[500px]" ref={buySectionRef}>
                        <div className="sticky top-24">
                            {/* Brand & Stats */}
                            <div className="flex items-center justify-between mb-3 md:mb-4">
                                <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.15em] md:tracking-[0.2em] text-gray-400">Zebaish Designer Bedding</span>
                                <div className="flex items-center gap-1">
                                    <div className="flex text-yellow-400">
                                        {[...Array(5)].map((_, i) => (
                                            <svg key={i} className={`w-2.5 h-2.5 md:w-3 md:h-3 ${i < Math.round(Number(avgRating)) ? 'fill-current' : 'text-gray-300 dark:text-gray-700'}`} viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                                        ))}
                                    </div>
                                    <span className="text-[9px] md:text-[10px] font-bold text-gray-500">({totalReviews})</span>
                                </div>
                            </div>

                            <h1 className="text-2xl sm:text-3xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4 md:mb-6 uppercase tracking-tight leading-tight md:leading-none">
                                {product.name}
                            </h1>

                            <div className="flex items-center gap-4 mb-6 md:mb-8">
                                <span className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400">
                                    Rs {effectivePrice.toLocaleString()}
                                </span>
                                {product.salePrice && product.salePrice < product.price && !selectedVariant?.price && (
                                    <span className="text-base md:text-lg text-gray-400 line-through">
                                        Rs {product.price.toLocaleString()}
                                    </span>
                                )}
                            </div>

                            {/* Variant Selectors (Size/Colors/Types) */}
                            {product.variants && product.variants.length > 0 && (
                                <div className="mb-6 md:mb-8 p-4 md:p-6 bg-gray-50 dark:bg-gray-900 rounded-xl md:rounded-2xl border border-gray-100 dark:border-gray-800">
                                    <h3 className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-900 dark:text-white mb-3 md:mb-4">Select Size / Type</h3>
                                    <div className="flex flex-wrap gap-2 md:gap-3">
                                        {product.variants.map((v) => (
                                            <button
                                                key={v.id}
                                                onClick={() => setSelectedVariant(v)}
                                                className={`px-3 md:px-4 py-2 text-[10px] md:text-xs font-bold uppercase tracking-wider rounded-lg border-2 transition-all ${selectedVariant?.id === v.id
                                                    ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white shadow-lg md:shadow-xl scale-[1.02] md:scale-105'
                                                    : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-black dark:hover:border-white'
                                                    }`}
                                            >
                                                {v.name}
                                                {v.price && (
                                                    <span className="ml-1 md:ml-2 opacity-60 font-normal">
                                                        (+Rs {(v.price - product.price).toLocaleString()})
                                                    </span>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Quantity & Actions */}
                            <div className="flex flex-col gap-3 md:gap-4 mb-6 md:mb-8">
                                <div className="flex gap-3 md:gap-4">
                                    {/* Quantity Box */}
                                    <div className="flex items-center border-2 border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-black w-28 md:w-32 shrink-0 h-12 md:h-14">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="flex-1 h-full flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                                        >
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" /></svg>
                                        </button>
                                        <input
                                            type="number"
                                            value={quantity}
                                            readOnly
                                            className="w-8 md:w-10 text-center text-sm font-bold bg-transparent outline-none"
                                        />
                                        <button
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="flex-1 h-full flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                                        >
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
                                        </button>
                                    </div>

                                    <button
                                        onClick={handleAddToCart}
                                        className="flex-1 bg-black text-white dark:bg-white dark:text-black h-12 md:h-14 rounded-xl text-[10px] md:text-xs font-bold uppercase tracking-[0.1em] md:tracking-[0.2em] shadow-xl md:shadow-2xl hover:scale-[1.02] active:scale-95 transition-all"
                                    >
                                        Add to Cart
                                    </button>

                                    <div className="hidden md:block">
                                        <WishlistButton productId={product.id} />
                                    </div>
                                </div>

                                <div className="flex gap-3 md:hidden">
                                    <button
                                        onClick={handleWhatsApp}
                                        className="flex-1 h-12 bg-[#25D366] text-white rounded-xl text-[10px] font-bold uppercase tracking-[0.1em] flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"
                                    >
                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.412.13.818.144 1.121.1.339-.05 1.029-.421 1.176-.827.147-.404.147-.751.103-.827-.045-.075-.188-.12-.485-.27zM12 22.5c-1.876 0-3.714-.504-5.314-1.458l-.381-.228-3.948 1.035 1.054-3.85-.25-.397A10.444 10.444 0 012.042 11.5a10.485 10.485 0 0110.485-10.485c2.81 0 5.421 1.1 7.426 3.105a10.438 10.438 0 013.105 7.426A10.485 10.485 0 0112 22.5zM12 .024C5.642.024.477 5.19.477 11.548c0 2.031.53 4.01 1.54 5.794L.024 23.976l6.814-1.787a11.457 11.457 0 005.184 1.238c6.357 0 11.522-5.166 11.522-11.524a11.488 11.488 0 00-3.376-8.151A11.481 11.481 0 0012 .024z" /></svg>
                                        WhatsApp
                                    </button>
                                    <div className="flex-shrink-0 w-12 h-12">
                                        <WishlistButton productId={product.id} />
                                    </div>
                                </div>

                                <button
                                    onClick={handleWhatsApp}
                                    className="hidden md:flex w-full h-14 bg-[#25D366] text-white rounded-xl text-xs font-bold uppercase tracking-[0.2em] items-center justify-center gap-3 hover:shadow-xl hover:scale-[1.01] transition-all"
                                >
                                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.412.13.818.144 1.121.1.339-.05 1.029-.421 1.176-.827.147-.404.147-.751.103-.827-.045-.075-.188-.12-.485-.27zM12 22.5c-1.876 0-3.714-.504-5.314-1.458l-.381-.228-3.948 1.035 1.054-3.85-.25-.397A10.444 10.444 0 012.042 11.5a10.485 10.485 0 0110.485-10.485c2.81 0 5.421 1.1 7.426 3.105a10.438 10.438 0 013.105 7.426A10.485 10.485 0 0112 22.5zM12 .024C5.642.024.477 5.19.477 11.548c0 2.031.53 4.01 1.54 5.794L.024 23.976l6.814-1.787a11.457 11.457 0 005.184 1.238c6.357 0 11.522-5.166 11.522-11.524a11.488 11.488 0 00-3.376-8.151A11.481 11.481 0 0012 .024z" /></svg>
                                    Buy on WhatsApp
                                </button>
                            </div>

                            {/* Trust Seals */}
                            <div className="flex items-center justify-center gap-6 md:gap-8 py-4 md:py-6 border-t border-gray-100 dark:border-gray-800">
                                <div className="flex flex-col items-center gap-1.5 md:gap-2">
                                    <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-50 dark:bg-gray-900 rounded-full flex items-center justify-center text-gray-400">
                                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                                    </div>
                                    <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-gray-400 md:text-gray-500">Original</span>
                                </div>
                                <div className="flex flex-col items-center gap-1.5 md:gap-2">
                                    <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-50 dark:bg-gray-900 rounded-full flex items-center justify-center text-gray-400">
                                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    </div>
                                    <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-gray-400 md:text-gray-500">Fast Deliver</span>
                                </div>
                                <div className="flex flex-col items-center gap-1.5 md:gap-2">
                                    <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-50 dark:bg-gray-900 rounded-full flex items-center justify-center text-gray-400">
                                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                                    </div>
                                    <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-gray-400 md:text-gray-500">Secure</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-10 md:mt-24">
                    <div className="flex items-center justify-center border-b border-gray-100 dark:border-gray-800 gap-6 md:gap-16 mb-8 md:mb-12">
                        {[
                            { id: 'description', label: 'Info' },
                            { id: 'reviews', label: `Reviews (${totalReviews})` },
                            { id: 'shipping', label: 'Shipping' },
                            { id: 'returns', label: 'Returns' }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`pb-3 md:pb-4 text-[9px] md:text-xs font-bold uppercase tracking-widest md:tracking-[0.2em] transition-all relative ${activeTab === tab.id
                                    ? 'text-black dark:text-white'
                                    : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'
                                    }`}
                            >
                                {tab.label}
                                {activeTab === tab.id && (
                                    <span className="absolute bottom-0 left-0 w-full h-[2px] md:h-[3px] bg-black dark:bg-white rounded-full"></span>
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="max-w-4xl mx-auto min-h-[300px] animate-fade-in-up">
                        {activeTab === 'description' && (
                            <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 leading-relaxed md:leading-loose font-serif text-base md:text-lg">
                                {product.description.split('\n').map((line, i) => (
                                    <p key={i} className="mb-4">{line}</p>
                                ))}
                                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 not-prose">
                                    <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl">
                                        <h4 className="text-sm font-bold uppercase tracking-widest mb-4">Product Highlights</h4>
                                        <ul className="text-sm space-y-2">
                                            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span> 100% Premium Cotton Sateen</li>
                                            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span> High Thread Count for Silky Feel</li>
                                            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span> Fade-Resistant Eco-Friendly Dyes</li>
                                            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span> Hypoallergenic & Breathable</li>
                                        </ul>
                                    </div>
                                    <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl">
                                        <h4 className="text-sm font-bold uppercase tracking-widest mb-4">Package Includes</h4>
                                        <ul className="text-sm space-y-2">
                                            <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
                                                1 x {product.name}
                                            </li>
                                            <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
                                                2 x Pillow Cases (Standard Size)
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'reviews' && (
                            <div className="space-y-12">
                                {/* Review Summary */}
                                <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center justify-between p-6 md:p-8 bg-gray-50 dark:bg-gray-900 rounded-2xl md:rounded-3xl">
                                    <div className="text-center md:text-left">
                                        <span className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white">{avgRating}</span>
                                        <div className="flex text-yellow-400 justify-center md:justify-start my-2">
                                            {[...Array(5)].map((_, i) => (
                                                <svg key={i} className={`w-4 h-4 md:w-5 md:h-5 ${i < Math.round(Number(avgRating)) ? 'fill-current' : 'text-gray-200 dark:text-gray-800'}`} viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                                            ))}
                                        </div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Based on {totalReviews} Reviews</p>
                                    </div>
                                    <div className="w-full md:flex-1 md:max-w-xs space-y-2">
                                        {[5, 4, 3, 2, 1].map((stars) => {
                                            const count = product.reviews?.filter(r => r.rating === stars).length || 0;
                                            const pct = totalReviews > 0 ? (count / totalReviews) * 100 : (stars === 5 ? 100 : 0);
                                            return (
                                                <div key={stars} className="flex items-center gap-3 md:gap-4 text-[10px] font-bold">
                                                    <span className="w-2">{stars}</span>
                                                    <div className="flex-1 h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                                                        <div className="h-full bg-black dark:bg-white" style={{ width: `${pct}%` }}></div>
                                                    </div>
                                                    <span className="w-4 text-gray-400 text-right">{count}</span>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <button className="w-full md:w-auto px-8 py-3 bg-black dark:bg-white text-white dark:text-black text-[10px] font-bold uppercase tracking-widest rounded-xl md:rounded-full hover:scale-105 transition-all">
                                        Write Review
                                    </button>
                                </div>

                                <div className="space-y-8">
                                    {product.reviews && product.reviews.length > 0 ? (
                                        product.reviews.map((r) => (
                                            <div key={r.id} className="border-b border-gray-100 dark:border-gray-800 pb-8">
                                                <div className="flex items-center justify-between mb-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center font-bold text-gray-400 text-sm">
                                                            {r.user.name?.[0] || 'U'}
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-bold">{r.user.name || 'Anonymous User'}</p>
                                                            <span className="text-[10px] text-blue-500 font-bold uppercase tracking-widest">Verified Buyer</span>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="flex text-yellow-400 gap-0.5 justify-end mb-1">
                                                            {[...Array(5)].map((_, i) => (
                                                                <svg key={i} className={`w-3 h-3 ${i < r.rating ? 'fill-current' : 'text-gray-200'}`} viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                                                            ))}
                                                        </div>
                                                        <span className="text-[10px] text-gray-400">{new Date(r.createdAt).toLocaleDateString()}</span>
                                                    </div>
                                                </div>
                                                <p className="text-gray-600 dark:text-gray-400 italic text-sm leading-relaxed">"{r.comment}"</p>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-12 text-gray-400 italic">No reviews yet. Be the first to try this product!</div>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === 'shipping' && (
                            <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 space-y-6">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white font-sans uppercase tracking-widest">Delivery Timeline</h3>
                                <p>We offer nationwide delivery across Pakistan. All orders are processed within 24-48 business hours.</p>
                                <ul className="space-y-4 text-sm font-serif">
                                    <li><strong>Major Cities:</strong> 3-5 Working Days</li>
                                    <li><strong>Remote Areas:</strong> 5-7 Working Days</li>
                                    <li><strong>In-Process:</strong> You will receive a tracking ID via SMS/WhatsApp once your order is dispatched.</li>
                                </ul>
                                <div className="p-6 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/30 rounded-2xl text-blue-800 dark:text-blue-300 text-sm">
                                    <strong>Free Shipping Alert:</strong> Order above Rs. 3,500 to enjoy free door-step delivery anywhere in Pakistan!
                                </div>
                            </div>
                        )}

                        {activeTab === 'returns' && (
                            <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 space-y-6">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white font-sans uppercase tracking-widest">7-Day Return & Exchange</h3>
                                <p>We want you to be 100% satisfied with your purchase. If you're not happy, we are here to help.</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 not-prose">
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 shrink-0 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-gray-900 dark:text-white">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" /></svg>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold uppercase tracking-widest mb-1">Easy Exchanges</h4>
                                            <p className="text-xs text-gray-500">Wrong size? No problem. Exchange it within 7 days in original packaging.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 shrink-0 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-gray-900 dark:text-white">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold uppercase tracking-widest mb-1">Simple Returns</h4>
                                            <p className="text-xs text-gray-500">Returns only accepted if product is damaged or different from what was ordered.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* STICKY BOTTOM BAR (MOBILE/DESKTOP) */}
            <div className={`fixed bottom-0 left-0 w-full bg-white/95 dark:bg-black/95 backdrop-blur-lg border-t border-gray-100 dark:border-gray-800 z-50 transition-all duration-500 transform ${isSticky ? 'translate-y-0' : 'translate-y-full'
                }`}>
                <div className="max-w-[1440px] mx-auto px-2 sm:px-6 lg:px-8 py-2 md:py-4 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 md:gap-4 truncate">
                        <div className="hidden sm:block relative w-10 md:w-12 h-10 md:h-12 rounded-lg overflow-hidden border border-gray-100 dark:border-gray-800">
                            <Image src={mainImage} alt={product.name} fill className="object-cover" />
                        </div>
                        <div className="truncate">
                            <h4 className="text-xs md:text-sm font-bold text-gray-900 dark:text-white truncate max-w-[120px] md:max-w-none">{product.name}</h4>
                            <p className="text-[10px] md:text-xs font-bold text-blue-600 dark:text-blue-400">Rs {effectivePrice.toLocaleString()}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 md:gap-3">
                        <div className="hidden md:flex items-center border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden h-10 bg-white dark:bg-black">
                            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">-</button>
                            <span className="w-8 text-center text-xs font-bold">{quantity}</span>
                            <button onClick={() => setQuantity(quantity + 1)} className="px-3 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">+</button>
                        </div>
                        <button
                            onClick={handleAddToCart}
                            className="bg-black text-white dark:bg-white dark:text-black px-5 md:px-10 h-10 md:h-12 rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-lg hover:scale-[1.02] transition-all"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>

            {/* PEOPLE ALSO BOUGHT */}
            <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 mt-16 md:mt-32">
                <div className="flex items-center justify-between mb-8 md:mb-12">
                    <h2 className="text-xl md:text-3xl font-serif font-bold text-gray-900 dark:text-white uppercase tracking-tight">Also Bought</h2>
                    <Link href="/products" className="text-[9px] md:text-xs font-bold uppercase tracking-widest border-b border-black dark:border-white pb-1">View All</Link>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
                    {relatedProducts.map((p) => (
                        <Link key={p.id} href={`/products/${p.slug}`} className="group">
                            <div className="aspect-[3/4] relative rounded-xl md:rounded-2xl overflow-hidden bg-gray-50 dark:bg-gray-900 mb-3 md:mb-4">
                                <Image src={p.image} alt={p.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                            </div>
                            <h3 className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-900 dark:text-white mb-0.5 md:mb-1 group-hover:text-blue-500 transition-colors truncate">{p.name}</h3>
                            <p className="text-xs md:text-sm font-bold text-gray-400">Rs {p.price.toLocaleString()}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

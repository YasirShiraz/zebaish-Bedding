"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Product {
    id: string;
    name: string;
    price: number;
    salePrice: number | null;
    stock: number;
    images: string; // JSON string or URL
    category: { id: string; name: string } | null;
    slug: string;
}

interface Category {
    id: string;
    name: string;
}

export default function AdminProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('all');

    // Bulk Selection
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [prodRes, catRes] = await Promise.all([
                    fetch('/api/products', { cache: 'no-store' }),
                    fetch('/api/categories')
                ]);

                if (prodRes.ok) {
                    const data = await prodRes.json();
                    setProducts(data);
                }
                if (catRes.ok) {
                    const data = await catRes.json();
                    setCategories(data);
                }
            } catch (error) {
                console.error('Failed to fetch data', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const deleteProduct = async (id: string) => {
        if (!confirm('Are you sure you want to delete this product?')) return;

        try {
            const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setProducts(products.filter((p) => p.id !== id));
                selectedIds.delete(id);
                setSelectedIds(new Set(selectedIds));
            } else {
                alert('Failed to delete product');
            }
        } catch (error) {
            console.error('Delete error', error);
        }
    };

    const getFirstImage = (imgString: string) => {
        if (!imgString) return '/placeholder.png';
        try {
            // Check if it's a JSON array string
            if (imgString.startsWith('[')) {
                const parsed = JSON.parse(imgString);
                return Array.isArray(parsed) && parsed.length > 0 ? parsed[0] : '/placeholder.png';
            }
            return imgString;
        } catch (e) {
            return imgString;
        }
    };

    // Filter Logic
    const filteredProducts = products.filter(product => {
        const matchesCategory = selectedCategory === 'all' || product.category?.id === selectedCategory;
        return matchesCategory;
    });

    // Bulk selection logic
    const toggleSelectAll = () => {
        if (selectedIds.size === filteredProducts.length) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set(filteredProducts.map(p => p.id)));
        }
    };

    const toggleSelect = (id: string) => {
        const newSet = new Set(selectedIds);
        if (newSet.has(id)) newSet.delete(id);
        else newSet.add(id);
        setSelectedIds(newSet);
    };

    const deleteSelected = async () => {
        if (!confirm(`Are you sure you want to delete ${selectedIds.size} products?`)) return;

        // Sequential delete for now (simpler than bulk API if not exists)
        for (const id of Array.from(selectedIds)) {
            await fetch(`/api/products/${id}`, { method: 'DELETE' });
        }
        setProducts(products.filter(p => !selectedIds.has(p.id)));
        setSelectedIds(new Set());
    };

    if (isLoading) return <div className="p-8 flex justify-center text-gray-500">Loading products...</div>;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Products</h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Manage your catalog, prices, and stock.</p>
                </div>
                <Link
                    href="/admin/products/new"
                    className="inline-flex items-center justify-center px-6 py-2.5 bg-black dark:bg-white text-white dark:text-black font-bold rounded-lg hover:opacity-90 transition-opacity shadow-sm"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                    Add Product
                </Link>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col md:flex-row gap-4 items-center">
                <div className="flex-1 hidden md:block" />
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full md:w-48 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                >
                    <option value="all">All Categories</option>
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>

                {selectedIds.size > 0 && (
                    <button
                        onClick={deleteSelected}
                        className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 font-medium transition-colors text-sm whitespace-nowrap"
                    >
                        Delete Selected ({selectedIds.size})
                    </button>
                )}
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[900px]">
                        <thead className="bg-gray-50 dark:bg-gray-700/30 border-b border-gray-200 dark:border-gray-700">
                            <tr>
                                <th className="px-6 py-4 w-10">
                                    <input
                                        type="checkbox"
                                        checked={selectedIds.size === filteredProducts.length && filteredProducts.length > 0}
                                        onChange={toggleSelectAll}
                                        className="rounded border-gray-300 text-black focus:ring-black"
                                    />
                                </th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Product</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Stock</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Price</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 text-right uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {filteredProducts.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <input
                                            type="checkbox"
                                            checked={selectedIds.has(product.id)}
                                            onChange={() => toggleSelect(product.id)}
                                            className="rounded border-gray-300 text-black focus:ring-black"
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0">
                                                <Image
                                                    src={getFirstImage(product.images)}
                                                    alt={product.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900 dark:text-white">{product.name}</h3>
                                                <p className="text-xs text-gray-500 truncate max-w-[200px]">{product.slug}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                                        <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs font-medium">
                                            {product.category?.name || 'Uncategorized'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <span className={`w-2 h-2 rounded-full ${product.stock > 10 ? 'bg-green-500' : product.stock > 0 ? 'bg-yellow-500' : 'bg-red-500'}`}></span>
                                            <span className={`text-sm font-medium ${product.stock === 0 ? 'text-red-600' : 'text-gray-700 dark:text-gray-300'}`}>
                                                {product.stock}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-gray-900 dark:text-white">Rs {product.salePrice ?? product.price}</span>
                                            {product.salePrice && (
                                                <span className="text-xs text-gray-400 line-through">Rs {product.price}</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Link
                                                href={`/admin/products/${product.id}`}
                                                className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                                                title="Edit"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                                            </Link>
                                            <button
                                                onClick={() => deleteProduct(product.id)}
                                                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                                title="Delete"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredProducts.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                                        <div className="flex flex-col items-center justify-center">
                                            <svg className="w-12 h-12 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
                                            <p className="text-lg font-medium">No products found</p>
                                            <p className="text-sm">Try adjusting your filters or add a new product.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

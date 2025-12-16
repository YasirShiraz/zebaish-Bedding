"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import ImageUpload from '@/components/ImageUpload';

export default function NewProduct() {
    const router = useRouter();
    const { user } = useAuth();
    const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const [discountPercent, setDiscountPercent] = useState('');
    const [priceError, setPriceError] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        description: '',
        price: '',
        salePrice: '',
        stock: '',
        categoryId: '',
        image: '',
        shippingCost: '',
        taxRate: '',
    });

    const [variants, setVariants] = useState<{ name: string; price: string; stock: string }[]>([]);
    const [newVariant, setNewVariant] = useState({ name: '', price: '', stock: '' });

    useEffect(() => {
        fetch('/api/categories')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setCategories(data);
            })
            .catch(err => console.error("Failed to load categories", err));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFormData(prev => {
            const newData = { ...prev, [name]: value };

            if (name === 'price' || name === 'salePrice') {
                const p = parseFloat(name === 'price' ? value : prev.price);
                const s = parseFloat(name === 'salePrice' ? value : prev.salePrice);
                setPriceError('');
                if (p && s) {
                    if (s >= p) {
                        setPriceError('Sale Price must be less than Original Price');
                        setDiscountPercent('');
                    } else {
                        const discount = Math.round(((p - s) / p) * 100);
                        setDiscountPercent(discount.toString());
                    }
                } else {
                    setDiscountPercent('');
                }
            }
            return newData;
        });

        if (name === 'name') {
            setFormData(prev => ({
                ...prev,
                slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
            }));
        }
    };

    const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setDiscountPercent(val);
        if (val && formData.price) {
            const price = parseFloat(formData.price);
            const discount = parseFloat(val);
            if (!isNaN(price) && !isNaN(discount)) {
                const newSalePrice = price - (price * (discount / 100));
                setFormData(prev => ({
                    ...prev,
                    salePrice: Math.round(newSalePrice).toString()
                }));
                setPriceError('');
            }
        }
    };

    const addVariant = () => {
        if (!newVariant.name) return;
        setVariants([...variants, newVariant]);
        setNewVariant({ name: '', price: '', stock: '' });
    };

    const removeVariant = (index: number) => {
        setVariants(variants.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (priceError) {
            alert("Please fix the price errors before submitting.");
            return;
        }

        setIsLoading(true);

        try {
            const res = await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    images: [formData.image],
                    variants: variants,
                }),
            });

            if (res.ok) {
                router.push('/admin/products');
                router.refresh();
            } else {
                const error = await res.json();
                alert(`Error: ${error.error}`);
            }
        } catch (error) {
            console.error('Submit error:', error);
            alert('Failed to create product');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Add New Product</h1>
                <Link href="/admin/products" className="text-sm text-gray-500 hover:text-gray-900">Cancel</Link>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Product Name</label>
                        <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Slug (URL)</label>
                        <input type="text" name="slug" required value={formData.slug} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-500 bg-gray-50 focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-300" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                    <textarea name="description" rows={4} required value={formData.description} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                </div>

                <div className="space-y-6 border-t border-b border-gray-100 dark:border-gray-700 py-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Pricing & Stock</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
                        <div className="md:col-span-1">
                            <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">Original Price (Rs)</label>
                            <input type="number" name="price" min="0" step="0.01" required value={formData.price} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 font-medium focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                        </div>
                        <div className="md:col-span-1 relative">
                            <label className="block text-sm font-bold text-blue-600 dark:text-blue-400 mb-2">Discount %</label>
                            <input type="number" name="discountPercent" min="0" max="100" value={discountPercent} onChange={handleDiscountChange} className="w-full rounded-lg border border-blue-200 bg-blue-50 px-4 py-2.5 text-blue-900 font-bold focus:ring-2 focus:ring-blue-500 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-100" />
                            <div className="absolute right-3 top-[38px] text-blue-400 text-sm font-bold">%</div>
                        </div>
                        <div className="md:col-span-1">
                            <label className="block text-sm font-bold text-green-600 dark:text-green-400 mb-2">Sale Price (Rs)</label>
                            <input type="number" name="salePrice" min="0" step="0.01" value={formData.salePrice} onChange={handleChange} className={`w-full rounded-lg border px-4 py-2.5 text-gray-900 font-bold focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white ${priceError ? 'border-red-500 bg-red-50' : 'border-green-200 bg-green-50'}`} />
                        </div>
                        <div className="md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Stock Qty</label>
                            <input type="number" name="stock" min="0" required value={formData.stock} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                        </div>
                    </div>
                    {priceError && <div className="text-red-500 text-sm font-bold">{priceError}</div>}
                </div>

                {/* Shipping & Tax */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 dark:bg-gray-900/50 p-6 rounded-lg">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Shipping Cost (Rs.)</label>
                        <input type="number" name="shippingCost" min="0" value={formData.shippingCost} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="0 or empty for free" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tax Rate (%)</label>
                        <input type="number" name="taxRate" min="0" max="100" step="0.1" value={formData.taxRate} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="0" />
                    </div>
                </div>

                {/* Variants Section */}
                <div className="border rounded-lg p-6 space-y-4">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Variants (Sizes / Options)</h3>
                    <div className="flex flex-col md:flex-row gap-4">
                        <input type="text" placeholder="Name (e.g. King, Queen)" value={newVariant.name} onChange={(e) => setNewVariant({ ...newVariant, name: e.target.value })} className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm" />
                        <div className="flex gap-4">
                            <input type="number" placeholder="Price (Optional)" value={newVariant.price} onChange={(e) => setNewVariant({ ...newVariant, price: e.target.value })} className="flex-1 md:w-32 rounded-lg border border-gray-300 px-4 py-2 text-sm" />
                            <input type="number" placeholder="Stock" value={newVariant.stock} onChange={(e) => setNewVariant({ ...newVariant, stock: e.target.value })} className="flex-1 md:w-24 rounded-lg border border-gray-300 px-4 py-2 text-sm" />
                        </div>
                        <button type="button" onClick={addVariant} className="bg-black text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors">Add</button>
                    </div>

                    <div className="space-y-2">
                        {variants.map((v, i) => (
                            <div key={i} className="flex items-center justify-between bg-gray-50 dark:bg-gray-900 p-3 rounded border border-gray-200 dark:border-gray-700">
                                <div className="flex gap-4 text-sm">
                                    <span className="font-bold">{v.name}</span>
                                    {v.price && <span className="text-green-600">Rs. {v.price}</span>}
                                    <span className="text-gray-500">Stock: {v.stock || 0}</span>
                                </div>
                                <button type="button" onClick={() => removeVariant(i)} className="text-red-500 hover:text-red-700">Remove</button>
                            </div>
                        ))}
                        {variants.length === 0 && <p className="text-sm text-gray-400 italic">No variants added.</p>}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
                    <select name="categoryId" required value={formData.categoryId} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <option value="">Select a category</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Product Image</label>
                    <ImageUpload value={formData.image} onChange={(value) => setFormData(prev => ({ ...prev, image: value }))} />
                </div>

                <div className="pt-4">
                    <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow-md disabled:opacity-50">
                        {isLoading ? 'Creating...' : 'Create Product'}
                    </button>
                </div>
            </form>
        </div>
    );
}

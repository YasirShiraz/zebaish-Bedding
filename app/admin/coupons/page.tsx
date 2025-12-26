"use client";

import { useEffect, useState } from 'react';

interface Coupon {
    id: string;
    code: string;
    discountType: string;
    discountValue: number;
    minOrderValue: number | null;
    expiryDate: string | null;
    isActive: boolean;
    usageCount: number;
    usageLimit: number | null;
}

export default function AdminCoupons() {
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [formData, setFormData] = useState({
        code: '',
        discountType: 'PERCENTAGE',
        discountValue: '',
        minOrderValue: '',
        expiryDate: '',
        usageLimit: ''
    });

    useEffect(() => {
        fetchCoupons();
    }, []);

    const fetchCoupons = async () => {
        try {
            const res = await fetch('/api/coupons');
            if (res.ok) {
                const data = await res.json();
                setCoupons(data);
            }
        } catch (error) {
            console.error('Failed to fetch coupons', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            const res = await fetch('/api/coupons', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                fetchCoupons();
                setFormData({
                    code: '',
                    discountType: 'PERCENTAGE',
                    discountValue: '',
                    minOrderValue: '',
                    expiryDate: '',
                    usageLimit: ''
                });
            } else {
                const data = await res.json();
                alert(data.error || 'Failed to create coupon');
            }
        } catch (error) {
            alert('Something went wrong');
        } finally {
            setIsSaving(false);
        }
    };

    const toggleStatus = async (coupon: Coupon) => {
        try {
            const res = await fetch(`/api/coupons/${coupon.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isActive: !coupon.isActive })
            });
            if (res.ok) fetchCoupons();
        } catch (error) {
            alert('Failed to update status');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure?')) return;
        try {
            const res = await fetch(`/api/coupons/${id}`, { method: 'DELETE' });
            if (res.ok) fetchCoupons();
        } catch (error) {
            alert('Failed to delete');
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold dark:text-white">Coupons</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">Create and manage discount codes.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form */}
                <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                        <h2 className="text-xl font-bold mb-6 dark:text-white">New Coupon</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1 dark:text-gray-300">Code</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. SAVE20"
                                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-4 py-2"
                                    value={formData.code}
                                    onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1 dark:text-gray-300">Type</label>
                                    <select
                                        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-4 py-2"
                                        value={formData.discountType}
                                        onChange={(e) => setFormData({ ...formData, discountType: e.target.value })}
                                    >
                                        <option value="PERCENTAGE">Percentage (%)</option>
                                        <option value="FIXED">Fixed Amount (Rs.)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1 dark:text-gray-300">Value</label>
                                    <input
                                        type="number"
                                        required
                                        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-4 py-2"
                                        value={formData.discountValue}
                                        onChange={(e) => setFormData({ ...formData, discountValue: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 dark:text-gray-300">Min. Order (Optional)</label>
                                <input
                                    type="number"
                                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-4 py-2"
                                    value={formData.minOrderValue}
                                    onChange={(e) => setFormData({ ...formData, minOrderValue: e.target.value })}
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isSaving}
                                className="w-full bg-blue-600 text-white font-bold py-2.5 rounded-lg hover:bg-blue-700 transition"
                            >
                                {isSaving ? 'Saving...' : 'Create Coupon'}
                            </button>
                        </form>
                    </div>
                </div>

                {/* List */}
                <div className="lg:col-span-2">
                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 dark:bg-gray-700/50 border-b dark:border-gray-700">
                                <tr className="text-xs font-bold uppercase text-gray-500">
                                    <th className="px-6 py-4">Code</th>
                                    <th className="px-6 py-4">Discount</th>
                                    <th className="px-6 py-4">Used</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {coupons.map((coupon) => (
                                    <tr key={coupon.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition">
                                        <td className="px-6 py-4">
                                            <span className="font-mono font-bold bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded dark:text-white">
                                                {coupon.code}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 dark:text-gray-300">
                                            {coupon.discountType === 'PERCENTAGE'
                                                ? `${coupon.discountValue}% Off`
                                                : `Rs. ${coupon.discountValue} Off`}
                                        </td>
                                        <td className="px-6 py-4 dark:text-gray-300 text-sm">
                                            {coupon.usageCount}
                                            {coupon.usageLimit ? ` / ${coupon.usageLimit}` : ''}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => toggleStatus(coupon)}
                                                className={`px-2.5 py-1 rounded-full text-xs font-bold ${coupon.isActive
                                                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                                        : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                                    }`}
                                            >
                                                {coupon.isActive ? 'Active' : 'Inactive'}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => handleDelete(coupon.id)}
                                                className="text-gray-400 hover:text-red-600 transition"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {coupons.length === 0 && !isLoading && (
                                    <tr><td colSpan={5} className="px-6 py-12 text-center text-gray-500">No coupons found.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

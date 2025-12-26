"use client";

import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

export default function AdminSettings() {
    const [settings, setSettings] = useState<Record<string, string>>({
        contact_email: '',
        contact_phone: '',
        contact_address: '',
        whatsapp_number: '',
        facebook_url: '',
        instagram_url: '',
        footer_description: '',
        free_shipping_threshold: '0',
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await fetch('/api/cms/settings');
            if (res.ok) {
                const data = await res.json();
                setSettings(prev => ({ ...prev, ...data }));
            }
        } catch (error) {
            console.error('Failed to fetch settings', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const res = await fetch('/api/cms/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings),
            });

            if (res.ok) {
                toast.success('Settings updated successfully!');
            } else {
                toast.error('Failed to update settings');
            }
        } catch (error) {
            console.error('Save error', error);
            toast.error('An error occurred while saving');
        } finally {
            setIsSaving(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setSettings(prev => ({ ...prev, [name]: value }));
    };

    if (isLoading) return <div className="p-8 flex justify-center text-gray-500">Loading settings...</div>;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Store Settings</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Manage your store's global configuration and contact information.</p>
            </div>

            <form onSubmit={handleSave} className="space-y-8">
                {/* Contact Information */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
                        <h2 className="font-bold text-gray-900 dark:text-white">Contact Details</h2>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Contact Email</label>
                            <input
                                type="email"
                                name="contact_email"
                                value={settings.contact_email}
                                onChange={handleChange}
                                placeholder="e.g. support@zebaish.com"
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Contact Phone</label>
                            <input
                                type="text"
                                name="contact_phone"
                                value={settings.contact_phone}
                                onChange={handleChange}
                                placeholder="e.g. +92 300 1234567"
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Office Address</label>
                            <input
                                type="text"
                                name="contact_address"
                                value={settings.contact_address}
                                onChange={handleChange}
                                placeholder="e.g. Shop #123, Bedding Market, Faisalabad"
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Social Media & WhatsApp */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
                        <h2 className="font-bold text-gray-900 dark:text-white">Social & WhatsApp</h2>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">WhatsApp Number</label>
                            <input
                                type="text"
                                name="whatsapp_number"
                                value={settings.whatsapp_number}
                                onChange={handleChange}
                                placeholder="e.g. 923001234567"
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            <p className="text-xs text-gray-500">Without '+' or spaces (for chat links)</p>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Facebook URL</label>
                            <input
                                type="url"
                                name="facebook_url"
                                value={settings.facebook_url}
                                onChange={handleChange}
                                placeholder="https://facebook.com/zebaish"
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Instagram URL</label>
                            <input
                                type="url"
                                name="instagram_url"
                                value={settings.instagram_url}
                                onChange={handleChange}
                                placeholder="https://instagram.com/zebaish"
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Additional Settings */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
                        <h2 className="font-bold text-gray-900 dark:text-white">Store Preferences</h2>
                    </div>
                    <div className="p-6 space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Free Shipping Threshold (Rs)</label>
                            <input
                                type="number"
                                name="free_shipping_threshold"
                                value={settings.free_shipping_threshold}
                                onChange={handleChange}
                                className="w-full md:w-48 px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            <p className="text-xs text-gray-500">Orders above this amount will have 0 shipping cost.</p>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Footer Description</label>
                            <textarea
                                name="footer_description"
                                value={settings.footer_description}
                                onChange={handleChange}
                                rows={3}
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                                placeholder="Short description about Zebaish Bedding for footer..."
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={isSaving}
                        className={`
                            px-8 py-3 rounded-xl font-bold transition-all shadow-lg
                            ${isSaving
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 active:scale-95 shadow-blue-500/20'
                            }
                        `}
                    >
                        {isSaving ? 'Saving Changes...' : 'Save All Settings'}
                    </button>
                </div>
            </form>
        </div>
    );
}

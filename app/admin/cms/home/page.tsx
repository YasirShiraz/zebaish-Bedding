"use client";

import { useEffect, useState } from "react";
import ImageUpload from "@/components/ImageUpload";

type HomeSectionConfig = {
  id: string;
  title: string;
  category: string;
  limit: number;
  enabled: boolean;
  image?: string;
};

const CATEGORY_OPTIONS = [
  { label: "Bedsheets", value: "bedsheets" },
  { label: "Duvet Sets", value: "duvet-sets" },
  { label: "Comforters", value: "comforters" },
  { label: "Pillows", value: "pillows" },
  { label: "Kids Bedding", value: "kids-bedding" },
  { label: "Bridal Bedding", value: "bridal-bedding" },
  { label: "Sofa Covers", value: "sofa-covers" },
  { label: "Mats", value: "mats" },
  { label: "Towels", value: "towels" },
  { label: "Bath Shawl", value: "bath-shawl" },
];

const DEFAULT_SECTIONS: HomeSectionConfig[] = [
  {
    id: "bridal",
    title: "Bridal Bedding",
    category: "bridal-bedding",
    limit: 8,
    enabled: true,
  },
  {
    id: "kitchen",
    title: "Home & Kitchen",
    category: "mats",
    limit: 8,
    enabled: true,
  },
  {
    id: "beauty",
    title: "Towels & Bath Shawls",
    category: "towels",
    limit: 8,
    enabled: true,
  },
];

export default function HomeSectionsManager() {
  const [sections, setSections] = useState<HomeSectionConfig[]>(DEFAULT_SECTIONS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const res = await fetch("/api/cms/home-sections");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length === 3) {
            setSections(data);
          }
        }
      } catch (error) {
        console.error("Failed to fetch home sections", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSections();
  }, []);

  const handleChange = (index: number, patch: Partial<HomeSectionConfig>) => {
    setSections((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], ...patch };
      return copy;
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/cms/home-sections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sections),
      });
      const data = await res.json().catch(() => null);
      if (res.ok) {
        alert("Home sections saved. Front page will reload.");
        // Auto reload whole app so home page picks up latest content
        window.location.reload();
      } else {
        alert(data?.error || "Failed to save sections");
      }
    } catch (error) {
      alert("Failed to save sections (network error)");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-5xl">
      <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
        Home Page Sections
      </h2>

      <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
        Configure which categories and how many products appear on the home page.
      </p>

      <form onSubmit={handleSave} className="space-y-8">
        {sections.map((section, index) => (
          <div
            key={section.id}
            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Section {index + 1}
              </h3>
              <label className="inline-flex cursor-pointer items-center text-xs font-medium text-gray-600 dark:text-gray-300">
                <span className="mr-2">Show</span>
                <button
                  type="button"
                  onClick={() => handleChange(index, { enabled: !section.enabled })}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                    section.enabled
                      ? "bg-emerald-500"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                      section.enabled ? "translate-x-4" : "translate-x-1"
                    }`}
                  />
                </button>
              </label>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Section Title
                </label>
                <input
                  type="text"
                  value={section.title}
                  onChange={(e) => handleChange(index, { title: e.target.value })}
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black dark:border-gray-600 dark:bg-gray-700"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Products to show
                </label>
                <input
                  type="number"
                  min={1}
                  max={16}
                  value={section.limit}
                  onChange={(e) =>
                    handleChange(index, { limit: Number(e.target.value) || 8 })
                  }
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black dark:border-gray-600 dark:bg-gray-700"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Banner Image (optional)
              </label>
              <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
                Large horizontal image shown above this section on the home page.
              </p>
              <div className="max-w-md">
                <ImageUpload
                  value={section.image || ""}
                  onChange={(url) => handleChange(index, { image: url })}
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Category
              </label>
              <select
                value={section.category}
                onChange={(e) => handleChange(index, { category: e.target.value })}
                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black dark:border-gray-600 dark:bg-gray-700"
              >
                {CATEGORY_OPTIONS.map((opt, idx) => (
                  <option key={`${opt.value}-${idx}`} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-black px-8 py-3 text-base font-semibold text-white shadow-sm hover:bg-gray-800 disabled:opacity-60 dark:bg-white dark:text-black hover:scale-105 transition-transform"
          >
            {saving ? "Saving..." : "Save Sections"}
          </button>
        </div>
      </form>
    </div>
  );
}

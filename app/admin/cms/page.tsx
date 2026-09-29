import Link from "next/link";

export default function CMSDashboard() {
    const sections = [
        {
            title: "Hero Slider",
            description: "Manage the main carousel slides on the homepage.",
            href: "/admin/cms/hero",
            icon: (
                <svg className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            ),
        },
        {
            title: "Home Sections",
            description: "Update content for Stats, Services, and Call-to-Action sections.",
            href: "/admin/cms/home",
            icon: (
                <svg className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
            ),
        },
        {
            title: "Global Settings",
            description: "Edit site-wide contact information, footer links, and social media URLs.",
            href: "/admin/cms/settings",
            icon: (
                <svg className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
        },
    ];

    return (
        <div className="py-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                Content Management System
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
                Select a section below to edit the content of your website.
            </p>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {sections.map((section) => (
                    <Link
                        key={section.title}
                        href={section.href}
                        className="group relative flex flex-col items-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600 transition-all text-center"
                    >
                        <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-full mb-6 group-hover:scale-110 transition-transform">
                            {section.icon}
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                            {section.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {section.description}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
}

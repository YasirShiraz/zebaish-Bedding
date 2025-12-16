export default function Preloader() {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-black transition-colors duration-300">
            <div className="flex flex-col items-center gap-6">
                <div className="relative h-16 w-16">
                    {/* Outer Ring */}
                    <div className="absolute inset-0 rounded-full border-4 border-gray-100 dark:border-gray-800 opacity-30"></div>
                    {/* Spinning Ring */}
                    <div className="absolute inset-0 animate-spin rounded-full border-4 border-t-black dark:border-t-white border-r-transparent border-b-transparent border-l-transparent"></div>

                    {/* Inner Accent */}
                    <div className="absolute inset-4 animate-pulse rounded-full bg-gray-100 dark:bg-gray-800 opacity-50"></div>
                </div>

                {/* Brand Name */}
                <div className="flex flex-col items-center space-y-2 animate-fade-in-up">
                    <h1 className="text-xl font-bold tracking-[0.5em] text-black dark:text-white uppercase font-serif">
                        Zebaish
                    </h1>
                    <div className="h-0.5 w-8 bg-black dark:bg-white rounded-full opacity-50"></div>
                </div>
            </div>
        </div>
    );
}

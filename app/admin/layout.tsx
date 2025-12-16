import AdminSidebar from './components/AdminSidebar';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 dark:bg-gray-900">
            <AdminSidebar />

            <main className="flex-1 w-full min-h-screen md:h-screen md:overflow-y-auto p-4 md:p-8">
                {children}
            </main>
        </div>
    );
}

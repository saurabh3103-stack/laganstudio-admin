import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function MainLayout({ children }) {
    const { auth } = usePage().props;
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="min-h-screen bg-gray-100 flex">
            <aside
                className={`bg-slate-800 text-white transition-all duration-300 flex flex-col ${isSidebarOpen ? 'w-64' : 'w-20'}`}
            >
                <div className="p-4 font-bold text-center border-b border-slate-700">
                    {isSidebarOpen ? 'My App' : 'MA'}
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <Link href="/dashboard" className="block p-2 hover:bg-slate-700 rounded">Dashboard</Link>
                    <Link href="/profile" className="block p-2 hover:bg-slate-700 rounded">Settings</Link>
                </nav>
            </aside>

            <div className="flex-1 flex flex-col">
                <header className="h-16 bg-white shadow flex items-center justify-between px-6">
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-600">
                        Menu
                    </button>
                    <div className="flex items-center gap-4">
                        <span>{auth.user.name}</span>
                    </div>
                </header>

                <main className="p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}

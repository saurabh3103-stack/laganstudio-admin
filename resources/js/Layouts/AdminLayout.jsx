import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';
import Header from '@/Components/Header';

export default function AdminLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const [toasts, setToasts] = useState([]);

    useEffect(() => {
        const handleToast = (e) => {
            const { message, type } = e.detail;
            const id = Date.now();
            setToasts(prev => [...prev, { id, message, type }]);
            setTimeout(() => {
                setToasts(prev => prev.filter(t => t.id !== id));
            }, 3000);
        };

        window.addEventListener('show-toast', handleToast);

        const unregisterStart = router.on('start', () => {
            setIsLoading(true);
            setProgress(15);
        });

        const unregisterProgress = router.on('progress', (event) => {
            if (event.detail.progress) {
                setProgress(event.detail.progress.percentage);
            }
        });

        const unregisterFinish = router.on('finish', () => {
            setProgress(100);
            setTimeout(() => {
                setIsLoading(false);
                setProgress(0);
            }, 300);
        });

        // Simulate micro loading on initial render
        setIsLoading(true);
        setProgress(35);
        const timer = setTimeout(() => {
            setProgress(100);
            setTimeout(() => {
                setIsLoading(false);
                setProgress(0);
            }, 250);
        }, 400);

        return () => {
            window.removeEventListener('show-toast', handleToast);
            unregisterStart();
            unregisterProgress();
            unregisterFinish();
            clearTimeout(timer);
        };
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleMobileSidebar = () => {
        setIsMobileSidebarOpen(!isMobileSidebarOpen);
    };

    const closeMobileSidebar = () => {
        setIsMobileSidebarOpen(false);
    };

    return (
        <div className="layout flex min-h-screen bg-gray-50">
            {/* Glowing Top Preloader */}
            {isLoading && (
                <div className="fixed top-0 left-0 right-0 h-[3px] bg-transparent z-[9999] pointer-events-none">
                    <div
                        className="h-full bg-gradient-to-r from-indigo-500 via-pink-500 to-amber-500 transition-all duration-300 ease-out shadow-[0_0_8px_#6366f1,0_0_4px_#ec4899]"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            )}

            {/* Backdrop for mobile */}
            {isMobileSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
                    onClick={closeMobileSidebar}
                ></div>
            )}

            {/* Sidebar Component */}
            <Sidebar
                isOpen={isSidebarOpen}
                isMobileOpen={isMobileSidebarOpen}
                onCloseMobile={closeMobileSidebar}
            />

            {/* Main Wrapper */}
            <div className="wrapper flex-1 flex flex-col">
                {/* Header Component */}
                <Header
                    isSidebarOpen={isSidebarOpen}
                    onToggleSidebar={toggleSidebar}
                    onToggleMobile={toggleMobileSidebar}
                />

                {/* Page Content */}
                <main className="main">
                    {children}
                </main>
            </div>

            {/* Custom Toast Container */}
            <div className="fixed top-4 right-4 z-[99999] flex flex-col gap-3 pointer-events-none">
                <style>{`
                    @keyframes slideIn {
                        from { transform: translateX(120%); opacity: 0; }
                        to { transform: translateX(0); opacity: 1; }
                    }
                `}</style>
                {toasts.map((t) => (
                    <div
                        key={t.id}
                        className="pointer-events-auto flex items-center gap-3 px-4 py-3 bg-white/95 backdrop-blur-md border rounded-2xl shadow-xl border-gray-100 max-w-sm transition-all duration-300"
                        style={{
                            animation: 'slideIn 0.3s ease-out forwards',
                        }}
                    >
                        <div className={`p-1.5 rounded-lg text-white shrink-0 ${
                            t.type === 'success' ? 'bg-emerald-500' :
                            t.type === 'error' ? 'bg-red-500' :
                            t.type === 'warning' ? 'bg-amber-500' : 'bg-indigo-500'
                        }`}>
                            {t.type === 'success' && (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            )}
                            {t.type === 'error' && (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            )}
                            {t.type === 'warning' && (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                                    <line x1="12" y1="9" x2="12" y2="13" />
                                    <line x1="12" y1="17" x2="12.01" y2="17" />
                                </svg>
                            )}
                            {t.type === 'info' && (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="16" x2="12" y2="12" />
                                    <line x1="12" y1="8" x2="12.01" y2="8" />
                                </svg>
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-gray-800 break-words">{t.message}</p>
                        </div>
                        <button
                            onClick={() => setToasts(prev => prev.filter(x => x.id !== t.id))}
                            className="text-gray-400 hover:text-gray-600 transition-colors text-lg font-black leading-none px-1"
                        >
                            &times;
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Header({ isSidebarOpen = true, onToggleSidebar, onToggleMobile }) {
    const { auth } = usePage().props;
    const user = auth?.user || { name: 'John Doe', email: 'john.doe@example.com' };
    const initials = user.name
        ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
        : 'JD';

    const [showNotificationsDropdown, setShowNotificationsDropdown] = useState(false);
    const [showUserDropdown, setShowUserDropdown] = useState(false);

    const notifications = [
        { id: 1, title: 'Margo Corn invited you', description: 'to the project Untitled', time: '2 min', unread: true },
        { id: 2, title: 'Elsa Hoffman removed you', description: 'from the project', time: '1 hr', unread: false },
    ];

    return (
        <header className="navbar h-16 bg-white shadow-sm flex items-center justify-between px-4 lg:px-6 sticky top-0 z-[40]">
            {/* Left Section */}
            <div className="navbar__left flex items-center">
                {/* Mobile menu button */}
                <button
                    onClick={onToggleMobile}
                    className="lg:hidden p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                {/* Desktop sidebar toggle */}
                <button
                    onClick={onToggleSidebar}
                    className="hidden lg:block p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                {/* Bookmark/Breadcrumb Area */}
                <div className="bottombar bookmark ml-4 hidden lg:block">
                    <nav className="flex" aria-label="Breadcrumb">
                        <ol className="inline-flex items-center space-x-1 md:space-x-3">
                            <li className="inline-flex items-center">
                                <Link href="/" className="text-gray-600 hover:text-blue-600">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                    </svg>
                                </Link>
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>

            {/* Right Section */}
            <div className="navbar__right flex items-center space-x-2 lg:space-x-3">
                <div className="relative">
                    <button
                        onClick={() => setShowNotificationsDropdown(!showNotificationsDropdown)}
                        className="p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100 relative"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>

                    {/* Notifications Dropdown Content */}
                    {showNotificationsDropdown && (
                        <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg z-50 border border-gray-200">
                            <div className="notifications">
                                <div className="notifications__header flex items-center justify-between p-4 border-b">
                                    <h4 className="font-semibold text-gray-700">Notifications</h4>
                                    <button className="text-sm text-blue-600 hover:text-blue-800">Mark all as read</button>
                                </div>
                                <div className="notifications__content max-h-96 overflow-y-auto">
                                    {notifications.map((notif) => (
                                        <div
                                            key={notif.id}
                                            className={`notification hover:bg-gray-50 cursor-pointer ${notif.unread ? 'bg-blue-50' : ''}`}
                                        >
                                            <a href="#" className="block p-4" onClick={(e) => e.preventDefault()}>
                                                <span className="notification__text block">
                                                    <span className="font-medium">{notif.title}</span>
                                                    <span className="text-gray-600"> {notif.description}</span>
                                                </span>
                                                <span className="notification__date block text-xs text-gray-400 mt-1">
                                                    {notif.time}
                                                </span>
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Account Menu */}
                <div className="relative">
                    <button
                        onClick={() => setShowUserDropdown(!showUserDropdown)}
                        className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-100"
                    >
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                            {initials}
                        </div>
                        <span className="hidden lg:block text-sm font-medium text-gray-700">{user.name}</span>
                        <svg className="hidden lg:block w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {/* User Dropdown Menu */}
                    {showUserDropdown && (
                        <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-200">
                            <div className="px-4 py-3 border-b">
                                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                <p className="text-xs text-gray-500 truncate">{user.email}</p>
                            </div>
                            <Link href="/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                Profile
                            </Link>

                            <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={(e) => e.preventDefault()}>
                                <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                Tasks
                            </a>
                            <div className="border-t my-1"></div>
                            <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={(e) => e.preventDefault()}>
                                <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Settings
                            </a>
                            <Link
                                method="post"
                                href={route('logout')}
                                as="button"
                                className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                            >
                                <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                Sign Out
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

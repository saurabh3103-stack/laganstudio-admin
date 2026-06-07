import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Sidebar({ isOpen = true, isMobileOpen = false, onCloseMobile }) {
    const { url, props } = usePage();
    const appSettings = props.global?.app_settings || {};
    const [openDropdowns, setOpenDropdowns] = useState({
        services: url.startsWith('/services'),
        blog: url.startsWith('/blog'),
        portfolio: url.startsWith('/portfolio'),
        queries: url.startsWith('/queries'),
        seo: url.startsWith('/seo'),
    });

    const getParentClass = (pathOrPrefix, exact = false) => {
        const isActive = exact ? url === pathOrPrefix : url.startsWith(pathOrPrefix);
        return `w-full flex items-center p-2 rounded-xl transition-all group text-left ${isActive ? 'bg-white/10 text-white font-semibold' : 'hover:bg-white/5 text-gray-400 hover:text-white'
            }`;
    };

    const getLinkClass = (path) => {
        const isActive = url.startsWith(path);
        return `block px-4 py-3 text-[13px] font-medium rounded-xl transition-all ${isActive
            ? 'text-white bg-white/10'
            : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`;
    };

    const toggleDropdown = (menuId) => {
        setOpenDropdowns(prev => ({
            ...prev,
            [menuId]: !prev[menuId]
        }));
    };

    const isDropdownOpen = (menuId) => {
        return !!openDropdowns[menuId];
    };

    const handleLinkClick = () => {
        if (isMobileOpen && onCloseMobile) {
            onCloseMobile();
        }
    };

    return (
        <nav
            className={`sidebar bg-[#0A0A0A] shadow-[4px_0_24px_rgba(0,0,0,0.05)] fixed lg:sticky top-0 h-screen inset-y-0 left-0 z-30 transition-all duration-300 overflow-hidden flex flex-col ${isOpen ? 'w-64' : 'w-20'
                } ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
        >
            {/* Logo */}
            <div className={`logo flex items-center px-4 border-b border-white/10 transition-all bg-[#0A0A0A] ${isOpen ? 'py-2' : 'h-16 py-2'}`}>
                <a className="inline-flex items-center justify-center w-full h-full" href="#" onClick={(e) => e.preventDefault()}>
                    {appSettings.logo_path ? (
                        <div className="flex items-center justify-center w-full h-full">
                            <img src={appSettings.logo_path} alt={appSettings.app_name || "Logo"} className={`object-contain transition-all ${isOpen ? 'max-h-[60px] w-auto' : 'max-h-10 w-auto'}`} />
                        </div>
                    ) : (
                        <div className="flex items-center justify-center">
                            <i className="text-white w-8 h-8 flex shrink-0 items-center justify-center bg-white/10 rounded-lg">
                                <span className="font-bold text-sm">{(appSettings.app_name || 'LS').substring(0, 1).toUpperCase()}</span>
                            </i>
                            {isOpen ? (
                                <span className="text-xl font-bold text-white truncate ml-2" title={appSettings.app_name || 'Lagan Studio'}>
                                    {appSettings.app_name || 'Lagan Studio'}
                                </span>
                            ) : null}
                        </div>
                    )}
                </a>
            </div>

            {/* Sidebar Scroll Area */}
            <div className="sidebar__scroll-wrapper flex-1 overflow-hidden">
                <div className="sidebar__scroll h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
                    <nav className="navigation p-4">
                        {/* Main Menu */}
                        <ul className="space-y-1 mb-6">
                            {/* Dashboard */}
                            <li className="navigation__item">
                                <Link
                                    href="/dashboard"
                                    className={getParentClass('/dashboard', true)}
                                    onClick={handleLinkClick}
                                >
                                    <span className="navigation__item__icon w-6 mr-3 shrink-0">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                        </svg>
                                    </span>
                                    {isOpen && <span className="navigation__item__title flex-1">Dashboard</span>}
                                </Link>
                            </li>

                            {/* Home Content */}
                            <li className="navigation__item">
                                <button
                                    onClick={() => toggleDropdown('home')}
                                    className={getParentClass('/home')}
                                >
                                    <span className="navigation__item__icon w-6 h-6 mr-3 shrink-0">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                        </svg>
                                    </span>
                                    {isOpen && <span className="navigation__item__title flex-1">Home Content</span>}
                                    {isOpen && (
                                        <svg
                                            className={`w-4 h-4 transition-transform duration-200 shrink-0 ${isDropdownOpen('home') ? 'rotate-90' : ''}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                        </svg>
                                    )}
                                </button>
                                {isOpen && isDropdownOpen('home') && (
                                    <div className="pl-3 py-1 mt-1 space-y-1 border-l-2 border-white/10 ml-5">
                                        <Link href="/home/banners" className={getLinkClass('/home/banners')} onClick={handleLinkClick}>Banners</Link>
                                        <Link href="/home/about" className={getLinkClass('/home/about')} onClick={handleLinkClick}>About Section</Link>
                                    </div>
                                )}
                            </li>

                            {/* Services */}
                            <li className="navigation__item">
                                <button
                                    onClick={() => toggleDropdown('services')}
                                    className={getParentClass('/services')}
                                >
                                    <span className="navigation__item__icon w-6 h-6 mr-3 shrink-0">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </span>
                                    {isOpen && <span className="navigation__item__title flex-1">Services</span>}
                                    {isOpen && (
                                        <svg
                                            className={`w-4 h-4 transition-transform duration-200 shrink-0 ${isDropdownOpen('services') ? 'rotate-90' : ''}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                        </svg>
                                    )}
                                </button>
                                {isOpen && isDropdownOpen('services') && (
                                    <div className="pl-3 py-1 mt-1 space-y-1 border-l-2 border-white/10 ml-5">
                                        <Link href="/services/all" className={getLinkClass('/services/all')} onClick={handleLinkClick}>All Services</Link>
                                        <Link href="/services/packages" className={getLinkClass('/services/packages')} onClick={handleLinkClick}>Packages</Link>
                                        <Link href="/services/faq" className={getLinkClass('/services/faq')} onClick={handleLinkClick}>FAQ</Link>
                                    </div>
                                )}
                            </li>

                            {/* Blog */}
                            <li className="navigation__item">
                                <button
                                    onClick={() => toggleDropdown('blog')}
                                    className={getParentClass('/blog')}
                                >
                                    <span className="navigation__item__icon w-6 h-6 mr-3 shrink-0">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
                                        </svg>
                                    </span>
                                    {isOpen && <span className="navigation__item__title flex-1">Blog</span>}
                                    {isOpen && (
                                        <svg
                                            className={`w-4 h-4 transition-transform duration-200 shrink-0 ${isDropdownOpen('blog') ? 'rotate-90' : ''}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                        </svg>
                                    )}
                                </button>
                                {isOpen && isDropdownOpen('blog') && (
                                    <div className="pl-3 py-1 mt-1 space-y-1 border-l-2 border-white/10 ml-5">
                                        <Link href="/blog/posts" className={getLinkClass('/blog/posts')} onClick={handleLinkClick}>All Posts</Link>
                                        <Link href="/blog/categories" className={getLinkClass('/blog/categories')} onClick={handleLinkClick}>Categories</Link>
                                        <Link href="/blog/tags" className={getLinkClass('/blog/tags')} onClick={handleLinkClick}>Tags</Link>
                                        <Link href="/blog/comments" className={getLinkClass('/blog/comments')} onClick={handleLinkClick}>Comments</Link>
                                    </div>
                                )}
                            </li>

                            {/* Portfolio */}
                            <li className="navigation__item">
                                <button
                                    onClick={() => toggleDropdown('portfolio')}
                                    className={getParentClass('/portfolio')}
                                >
                                    <span className="navigation__item__icon w-6 h-6 mr-3 shrink-0">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </span>
                                    {isOpen && <span className="navigation__item__title flex-1">Portfolio</span>}
                                    {isOpen && (
                                        <svg
                                            className={`w-4 h-4 transition-transform duration-200 shrink-0 ${isDropdownOpen('portfolio') ? 'rotate-90' : ''}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                        </svg>
                                    )}
                                </button>
                                {isOpen && isDropdownOpen('portfolio') && (
                                    <div className="pl-3 py-1 mt-1 space-y-1 border-l-2 border-white/10 ml-5">
                                        <Link href="/portfolio/images" className={getLinkClass('/portfolio/images')} onClick={handleLinkClick}>Images Gallery</Link>
                                    </div>
                                )}
                            </li>

                            {/* Queries */}
                            <li className="navigation__item">
                                <button
                                    onClick={() => toggleDropdown('queries')}
                                    className={getParentClass('/queries')}
                                >
                                    <span className="navigation__item__icon w-6 h-6 mr-3 shrink-0">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                        </svg>
                                    </span>
                                    {isOpen && <span className="navigation__item__title flex-1">Queries</span>}
                                    {isOpen && (
                                        <svg
                                            className={`w-4 h-4 transition-transform duration-200 shrink-0 ${isDropdownOpen('queries') ? 'rotate-90' : ''}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                        </svg>
                                    )}
                                </button>
                                {isOpen && isDropdownOpen('queries') && (
                                    <div className="pl-3 py-1 mt-1 space-y-1 border-l-2 border-white/10 ml-5">
                                        <Link href="/queries/contact" className={getLinkClass('/queries/contact')} onClick={handleLinkClick}>Contact Queries</Link>
                                        <Link href="/queries/support" className={getLinkClass('/queries/support')} onClick={handleLinkClick}>Support Tickets</Link>
                                        <Link href="/queries/feedback" className={getLinkClass('/queries/feedback')} onClick={handleLinkClick}>Feedback</Link>
                                    </div>
                                )}
                            </li>

                            {/* SEO */}
                            <li className="navigation__item">
                                <button
                                    onClick={() => toggleDropdown('seo')}
                                    className={getParentClass('/seo')}
                                >
                                    <span className="navigation__item__icon w-6 h-6 mr-3 shrink-0">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </span>
                                    {isOpen && <span className="navigation__item__title flex-1">SEO</span>}
                                    {isOpen && (
                                        <svg
                                            className={`w-4 h-4 transition-transform duration-200 shrink-0 ${isDropdownOpen('seo') ? 'rotate-90' : ''}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                        </svg>
                                    )}
                                </button>
                                {isOpen && isDropdownOpen('seo') && (
                                    <div className="pl-3 py-1 mt-1 space-y-1 border-l-2 border-white/10 ml-5">
                                        <Link href="/seo/dashboard" className={getLinkClass('/seo/dashboard')} onClick={handleLinkClick}>SEO Dashboard</Link>
                                        <Link href="/seo/redirects" className={getLinkClass('/seo/redirects')} onClick={handleLinkClick}>Redirects</Link>
                                    </div>
                                )}
                            </li>

                            {/* General Settings */}
                            <li className="navigation__item">
                                <Link
                                    href="/settings/general"
                                    className={getParentClass('/settings/general', true)}
                                    onClick={handleLinkClick}
                                >
                                    <span className="navigation__item__icon w-6 h-6 mr-3">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </span>
                                    {isOpen && <span className="navigation__item__title flex-1">General Settings</span>}
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </nav>
    );
}

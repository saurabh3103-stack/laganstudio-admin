import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Icon } from '@/Components/Icon';
import Breadcrumbs from '@/Components/Breadcrumbs';
import { toast } from '@/Utils/toast';

export default function SEO() {
    const [pages, setPages] = useState([
        { id: 'home', name: 'Homepage / Landing', path: '/', title: 'Lagan Studio | Elegant Indian Wedding Cinematic Photography', description: 'Experience luxury wedding cinematography and storytelling with Lagan Studio. Premium Jaipur photographers capturing timeless moments.', keywords: 'wedding, photography, cinematography, jaipur, luxury' },
        { id: 'services', name: 'Our Services & Packages', path: '/services/all', title: 'Luxury Wedding Photography Packages & Services | Lagan Studio', description: 'Browse our signature cinematic photography packages, pre-wedding sessions, and corporate videography services.', keywords: 'wedding packages, cinematic shoots, prewedding cost' },
        { id: 'portfolio', name: 'Portfolio Gallery', path: '/portfolio/images', title: 'Timeless Wedding & Pre-Wedding Portfolio | Lagan Studio', description: 'Explore our curated gallery of beautiful Indian wedding moments, bridal portraits, and romantic pre-wedding shoots.', keywords: 'indian bride portrait, jaipur prewedding photoshoot' },
        { id: 'blog', name: 'Articles & Blogs', path: '/blog/posts', title: 'Wedding Photography Tips & Trends Blog | Lagan Studio', description: 'Get professional guides on planning your wedding photography timeline, bridal look recommendations, and destination hacks.', keywords: 'bridal makeup tips, destination wedding jaipur guide' },
        { id: 'contact', name: 'Contact Inquiry', path: '/queries/contact', title: 'Schedule a Consultation | Lagan Studio Jaipur', description: 'Contact our premium cinematography helpdesk to check package rates, dates availability and custom options.', keywords: 'contact wedding photographer, jaipur studio book' }
    ]);

    const [selectedPageIdx, setSelectedPageIdx] = useState(0);
    const selectedPage = pages[selectedPageIdx];

    const [editTitle, setEditTitle] = useState(selectedPage.title);
    const [editDesc, setEditDesc] = useState(selectedPage.description);
    const [editKeywords, setEditKeywords] = useState(selectedPage.keywords);
    const [isSaving, setIsSaving] = useState(false);

    // Sync state when page choice changes
    const handleSelectPage = (index) => {
        setSelectedPageIdx(index);
        setEditTitle(pages[index].title);
        setEditDesc(pages[index].description);
        setEditKeywords(pages[index].keywords);
    };

    const handleSaveSEO = (e) => {
        e.preventDefault();
        setIsSaving(true);

        setTimeout(() => {
            const updated = [...pages];
            updated[selectedPageIdx] = {
                ...selectedPage,
                title: editTitle,
                description: editDesc,
                keywords: editKeywords
            };
            setPages(updated);
            setIsSaving(false);
            toast.success(`SEO configurations for page "${selectedPage.name}" saved!`);
        }, 1000);
    };

    return (
        <>
            <Head title="SEO Parameters Dashboard - Admin" />
            <AdminLayout>
                <div className="page bg-[#f9fafb] min-h-screen py-8 px-6">
                    <div className="max-w-8xl mx-auto space-y-8">
                        {/* Header Navigation */}
                        <div className="border-b border-gray-100 pb-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="space-y-1">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                                    Metadata Optimizations
                                </span>
                                <h1 className="text-3xl font-black text-gray-900 tracking-tight">
                                    SEO Dashboard
                                </h1>
                                <Breadcrumbs items={[{ label: 'SEO', href: '/seo/dashboard' }, { label: 'SEO Dashboard' }]} />

                            </div>

                        </div>

                        {/* Split page selector and preview editor */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Page selector pane */}
                            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4 h-fit">
                                <h3 className="text-sm font-black text-gray-800 uppercase tracking-wider">
                                    Choose Application Page
                                </h3>
                                <div className="space-y-2">
                                    {pages.map((p, idx) => (
                                        <button
                                            key={p.id}
                                            onClick={() => handleSelectPage(idx)}
                                            className={`w-full p-4 rounded-2xl border text-left transition-all ${selectedPageIdx === idx
                                                    ? 'bg-indigo-50/50 border-indigo-200 text-indigo-900 shadow-sm'
                                                    : 'bg-white border-gray-100 text-gray-700 hover:bg-gray-50/50'
                                                }`}
                                        >
                                            <span className="text-xs font-black block">{p.name}</span>
                                            <span className="text-[10px] text-gray-400 block font-semibold mt-0.5">{p.path}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Meta snippet editor and real-time simulator */}
                            <div className="lg:col-span-2 space-y-6">
                                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-6">
                                    <div className="space-y-1">
                                        <h3 className="text-sm font-black text-gray-800 uppercase tracking-wider flex items-center gap-2">
                                            <Icon name="feather__search" className="w-4 h-4 text-indigo-500" />
                                            Google Search Snippet Simulator
                                        </h3>
                                        <p className="text-[11px] text-gray-400">See exactly how this page will be displayed inside Google SERPs search results.</p>
                                    </div>

                                    {/* Google mock preview frame */}
                                    <div className="bg-gray-50 border border-gray-150 rounded-2xl p-4 space-y-1.5">
                                        <span className="text-[10px] text-gray-400 block truncate">https://laganstudio.com{selectedPage.path}</span>
                                        <span className="text-base font-medium text-[#1a0dab] hover:underline cursor-pointer block leading-tight truncate">
                                            {editTitle || 'Please enter a page title...'}
                                        </span>
                                        <p className="text-xs text-[#4d5156] leading-relaxed line-clamp-2">
                                            {editDesc || 'Please provide a meta description preview snippet...'}
                                        </p>
                                    </div>

                                    <form onSubmit={handleSaveSEO} className="space-y-6 border-t border-gray-100 pt-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Page Meta Title Tag</label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={editTitle}
                                                    onChange={(e) => setEditTitle(e.target.value)}
                                                    className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Meta Target Keywords</label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={editKeywords}
                                                    onChange={(e) => setEditKeywords(e.target.value)}
                                                    className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Meta Description Tag Snippet</label>
                                            <textarea
                                                required
                                                rows="4"
                                                value={editDesc}
                                                onChange={(e) => setEditDesc(e.target.value)}
                                                className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
                                            ></textarea>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSaving}
                                            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md shadow-indigo-100 flex items-center justify-center gap-2"
                                        >
                                            {isSaving ? 'Saving parameters...' : 'Save Meta Tag Settings'}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </AdminLayout>
        </>
    );
}

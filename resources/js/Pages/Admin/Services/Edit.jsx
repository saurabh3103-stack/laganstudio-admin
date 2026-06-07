import React, { useState } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Breadcrumbs from '@/Components/Breadcrumbs';
import RichTextEditor from '@/Components/RichTextEditor';
import { toast } from '@/Utils/toast';

export default function Edit({ service, categories }) {
    const [activeTab, setActiveTab] = useState('details');

    // -------------------------------------------------------------
    // TAB 1: General Details Form (using standard Inertia Form)
    // -------------------------------------------------------------
    const { data: generalData, setData: setGeneralData, post: submitGeneral, processing: generalProcessing, errors: generalErrors } = useForm({
        service_name: service.service_name || '',
        slug: service.slug || '',
        short_description: service.short_description || '',
        description: service.description || '',
        featured_image: null,
        banner_image: null,
        service_icon: service.service_icon || 'feather__camera',
        display_order: service.display_order || 0,
        status: service.status ?? 1,
        featured: service.featured ?? 0,

        // SEO
        meta_title: service.meta_title || '',
        meta_description: service.meta_description || '',
        meta_keywords: service.meta_keywords || '',
        canonical_url: service.canonical_url || '',
        robots: service.robots || 'index,follow',
        og_title: service.og_title || '',
        og_description: service.og_description || '',
        og_image: null,
        schema_type: service.schema_type || 'Service',
    });

    const [featuredImgPreview, setFeaturedImgPreview] = useState(service.featured_image);
    const [bannerImgPreview, setBannerImgPreview] = useState(service.banner_image);
    const [ogImgPreview, setOgImgPreview] = useState(service.og_image);

    const handleFileChange = (e, field) => {
        const file = e.target.files[0];
        if (file) {
            setGeneralData(field, file);
            const reader = new FileReader();
            reader.onloadend = () => {
                if (field === 'featured_image') setFeaturedImgPreview(reader.result);
                if (field === 'banner_image') setBannerImgPreview(reader.result);
                if (field === 'og_image') setOgImgPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleGeneralSubmit = (e) => {
        e.preventDefault();
        submitGeneral(route('services.update', service.id), {
            forceFormData: true,
            onSuccess: () => {
                toast.success('General details & SEO updated successfully.');
            },
            onError: () => {
                toast.error('Validation error. Please verify the form inputs.');
            }
        });
    };


    return (
        <>
            <Head title={`Configure Service: ${service.service_name}`} />
            <AdminLayout>
                <div className="bg-[#f9fafb] min-h-screen py-8 px-6">
                    <div className="max-w-8xl mx-auto space-y-8">

                        {/* Top Header */}
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-5 border-b border-gray-150">
                            <div>
                                <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Photography Suite</span>
                                <h1 className="text-3xl font-black text-gray-900 tracking-tight leading-tight">
                                    Edit: {service.service_name}
                                </h1>
                                <Breadcrumbs items={[
                                    { label: 'Services', href: '/services/all' },
                                    { label: 'Configure Service' }
                                ]} />
                            </div>
                            <div className="flex items-center gap-3">

                                <Link
                                    href="/services/all"
                                    className="px-4 py-2.5 bg-gray-150 hover:bg-gray-200 text-gray-700 text-xs font-bold uppercase tracking-wider rounded-xl transition-all"
                                >
                                    Back to Catalog
                                </Link>
                            </div>
                        </div>

                        {/* Tabs Navigation */}
                        <div className="flex gap-2 border-b border-gray-200 mb-6">
                            <button
                                type="button"
                                onClick={() => setActiveTab('details')}
                                className={`px-5 py-3 text-xs font-black uppercase tracking-wider border-b-2 transition-all ${activeTab === 'details'
                                    ? 'border-indigo-600 text-indigo-600'
                                    : 'border-transparent text-gray-400 hover:text-gray-700'
                                    }`}
                            >
                                Service Details
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab('seo')}
                                className={`px-5 py-3 text-xs font-black uppercase tracking-wider border-b-2 transition-all ${activeTab === 'seo'
                                    ? 'border-indigo-600 text-indigo-600'
                                    : 'border-transparent text-gray-400 hover:text-gray-700'
                                    }`}
                            >
                                SEO & Social Share
                            </button>
                        </div>

                        {/* Main Form */}
                        <form onSubmit={handleGeneralSubmit} className="space-y-8">
                            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-8">

                                {/* Tab 1: DETAILS */}
                                {activeTab === 'details' && (
                                    <div className="space-y-8 animate-fadeIn">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Service Title *</label>
                                                <input
                                                    type="text"
                                                    value={generalData.service_name}
                                                    onChange={(e) => setGeneralData('service_name', e.target.value)}
                                                    placeholder="e.g. Wedding Photography"
                                                    className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl text-xs font-bold outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all"
                                                    required
                                                />
                                                {generalErrors.service_name && <p className="text-red-500 text-[10px] font-bold">{generalErrors.service_name}</p>}
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Slug (URL endpoint)</label>
                                                <input
                                                    type="text"
                                                    value={generalData.slug}
                                                    onChange={(e) => setGeneralData('slug', e.target.value)}
                                                    placeholder="auto-generated-slug"
                                                    className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl text-xs outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all font-mono"
                                                />
                                                {generalErrors.slug && <p className="text-red-500 text-[10px] font-bold">{generalErrors.slug}</p>}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Display Order</label>
                                                <input
                                                    type="number"
                                                    value={generalData.display_order}
                                                    onChange={(e) => setGeneralData('display_order', parseInt(e.target.value) || 0)}
                                                    className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl text-xs outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Catalog Status</label>
                                                <div 
                                                    className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-xl border border-transparent hover:border-indigo-100 transition-all cursor-pointer" 
                                                    onClick={() => setGeneralData('status', generalData.status === 1 ? 0 : 1)}
                                                >
                                                    <span className="text-xs font-bold text-gray-700">{generalData.status === 1 ? 'Active' : 'Inactive'}</span>
                                                    <div className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${generalData.status === 1 ? 'bg-indigo-600' : 'bg-gray-300'}`}>
                                                        <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${generalData.status === 1 ? 'translate-x-4' : 'translate-x-1'}`} />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Featured Offering</label>
                                                <div 
                                                    className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-xl border border-transparent hover:border-amber-100 transition-all cursor-pointer" 
                                                    onClick={() => setGeneralData('featured', generalData.featured === 1 ? 0 : 1)}
                                                >
                                                    <span className="text-xs font-bold text-gray-700">{generalData.featured === 1 ? 'Featured ⭐' : 'Standard'}</span>
                                                    <div className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${generalData.featured === 1 ? 'bg-amber-500' : 'bg-gray-300'}`}>
                                                        <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${generalData.featured === 1 ? 'translate-x-4' : 'translate-x-1'}`} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Short Description</label>
                                            <textarea
                                                rows="2"
                                                value={generalData.short_description}
                                                onChange={(e) => setGeneralData('short_description', e.target.value)}
                                                placeholder="Brief 1-sentence hook to display on index pages..."
                                                className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl text-xs outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
                                            ></textarea>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Full Service Description & Content</label>
                                            <RichTextEditor
                                                value={generalData.description}
                                                onChange={(val) => setGeneralData('description', val)}
                                                placeholder="Write complete, gorgeous details about this photography service offering..."
                                            />
                                        </div>

                                        {/* Image Upload Grid */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                                            {/* Featured Cover Image */}
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Featured Image Cover</label>
                                                <div className="group relative h-48 w-full rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/50 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-300 hover:bg-white transition-all overflow-hidden">
                                                    {featuredImgPreview ? (
                                                        <div className="relative w-full h-full">
                                                            <img src={featuredImgPreview} className="absolute inset-0 w-full h-full object-cover" alt="Preview" />
                                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                                <span className="text-[9px] font-black text-white uppercase tracking-widest bg-black/50 px-4 py-2 rounded-full">Change Photo</span>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="relative z-10 flex flex-col items-center p-6 text-center">
                                                            <p className="mt-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Upload Main Card Image</p>
                                                            <span className="text-[8px] text-gray-400 mt-1">Recommended: 800 x 600 px</span>
                                                        </div>
                                                    )}
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => handleFileChange(e, 'featured_image')}
                                                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                                    />
                                                </div>
                                            </div>

                                            {/* Wide Banner Image */}
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Service Page Wide Banner</label>
                                                <div className="group relative h-48 w-full rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/50 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-300 hover:bg-white transition-all overflow-hidden">
                                                    {bannerImgPreview ? (
                                                        <div className="relative w-full h-full">
                                                            <img src={bannerImgPreview} className="absolute inset-0 w-full h-full object-cover" alt="Preview" />
                                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                                <span className="text-[9px] font-black text-white uppercase tracking-widest bg-black/50 px-4 py-2 rounded-full">Change Photo</span>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="relative z-10 flex flex-col items-center p-6 text-center">
                                                            <p className="mt-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Upload Main Header Banner</p>
                                                            <span className="text-[8px] text-gray-400 mt-1">Recommended: 1920 x 800 px</span>
                                                        </div>
                                                    )}
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => handleFileChange(e, 'banner_image')}
                                                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'seo' && (
                                    <div className="space-y-8 animate-fadeIn">
                                        <div className="border-b border-gray-50 pb-4">
                                            <h2 className="text-base font-black text-gray-800">SEO & Social Share (Open Graph) Metadata</h2>
                                            <p className="text-[10px] text-gray-400 mt-0.5">Control search engine discoverability and content templates when shared on chat apps.</p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Meta Search Title</label>
                                                <input
                                                    type="text"
                                                    value={generalData.meta_title}
                                                    onChange={(e) => setGeneralData('meta_title', e.target.value)}
                                                    placeholder="Custom title tag for search engines..."
                                                    className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl text-xs outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all font-bold"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Canonical URL override</label>
                                                <input
                                                    type="url"
                                                    value={generalData.canonical_url}
                                                    onChange={(e) => setGeneralData('canonical_url', e.target.value)}
                                                    placeholder="https://example.com/services/wedding-photography"
                                                    className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl text-xs outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all font-mono"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Robots (Index/Follow)</label>
                                                <select
                                                    value={generalData.robots}
                                                    onChange={(e) => setGeneralData('robots', e.target.value)}
                                                    className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl text-xs font-bold text-gray-600 outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all appearance-none"
                                                >
                                                    <option value="index,follow">index, follow (Default)</option>
                                                    <option value="noindex,follow">noindex, follow</option>
                                                    <option value="index,nofollow">index, nofollow</option>
                                                    <option value="noindex,nofollow">noindex, nofollow</option>
                                                </select>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Schema LD+JSON Type</label>
                                                <input
                                                    type="text"
                                                    value={generalData.schema_type}
                                                    onChange={(e) => setGeneralData('schema_type', e.target.value)}
                                                    placeholder="e.g. Service or Photography"
                                                    className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl text-xs outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Meta Keywords (Comma separated)</label>
                                                <input
                                                    type="text"
                                                    value={generalData.meta_keywords}
                                                    onChange={(e) => setGeneralData('meta_keywords', e.target.value)}
                                                    placeholder="wedding, photo, video, candid"
                                                    className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl text-xs outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Meta Search Description</label>
                                            <textarea
                                                rows="3"
                                                value={generalData.meta_description}
                                                onChange={(e) => setGeneralData('meta_description', e.target.value)}
                                                placeholder="Enter beautiful meta description (recommended 150-160 characters)..."
                                                className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl text-xs outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
                                            ></textarea>
                                        </div>

                                        {/* Social Open Graph Overrides */}
                                        <div className="pt-6 border-t border-gray-150 space-y-6">
                                            <div>
                                                <h3 className="text-sm font-black text-gray-800">Social Open Graph (OG) Tuning</h3>
                                                <p className="text-[10px] text-gray-400 mt-0.5">Control how this service is formatted when shared on WhatsApp, Facebook, or Twitter.</p>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-6">
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">OG Title Override</label>
                                                        <input
                                                            type="text"
                                                            value={generalData.og_title}
                                                            onChange={(e) => setGeneralData('og_title', e.target.value)}
                                                            placeholder="Fallback to Meta Title if blank..."
                                                            className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl text-xs outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all"
                                                        />
                                                    </div>

                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">OG Description Override</label>
                                                        <textarea
                                                            rows="3"
                                                            value={generalData.og_description}
                                                            onChange={(e) => setGeneralData('og_description', e.target.value)}
                                                            placeholder="Fallback to Meta Description if blank..."
                                                            className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl text-xs outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
                                                        ></textarea>
                                                    </div>
                                                </div>

                                                <div className="space-y-3">
                                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">OG Share Banner</label>
                                                    <div className="group relative h-44 w-full rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/50 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-300 hover:bg-white transition-all overflow-hidden">
                                                        {ogImgPreview ? (
                                                            <div className="relative w-full h-full">
                                                                <img src={ogImgPreview} className="absolute inset-0 w-full h-full object-cover" alt="Preview" />
                                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                                    <span className="text-[9px] font-black text-white uppercase tracking-widest bg-black/50 px-4 py-2 rounded-full">Change Share Card</span>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className="relative z-10 flex flex-col items-center p-6 text-center">
                                                                <p className="mt-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Upload OG Preview Card</p>
                                                                <span className="text-[8px] text-gray-400 mt-1">Recommended: 1200 x 630 px</span>
                                                            </div>
                                                        )}
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={(e) => handleFileChange(e, 'og_image')}
                                                            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Submit Footer */}
                            <div className="flex gap-4 items-center justify-end">
                                <Link
                                    href="/services/all"
                                    className="px-6 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-black uppercase tracking-widest rounded-2xl transition-all"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={generalProcessing}
                                    className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white text-xs font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-indigo-150 flex items-center gap-2"
                                >
                                    {generalProcessing ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            Saving...
                                        </>
                                    ) : (
                                        'Save Changes'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </AdminLayout>
        </>
    );
}

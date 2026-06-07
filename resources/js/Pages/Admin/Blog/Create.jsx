import React, { useState, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Icon } from '@/Components/Icon';
import Breadcrumbs from '@/Components/Breadcrumbs';
import RichTextEditor from '@/Components/RichTextEditor';
import { toast } from '@/Utils/toast';

export default function Create({ categories, tags: suggestionsList, authors }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        category_id: categories.length > 0 ? categories[0].id : '',
        content: '',
        image: null,
        tags: [],
        status: 'Published',
        published_at: '',
        author_id: authors.length > 0 ? authors[0].id : '',
        seo_title: '',
        seo_description: '',
        seo_keywords: '',
        canonical_url: '',
        robots_index: 'index',
        robots_follow: 'follow',
        schema_markup: null,
        og_title: '',
        og_description: '',
        og_image: null,
    });

    const [imagePreview, setImagePreview] = useState(null);
    const [ogImagePreview, setOgImagePreview] = useState(null);
    const [activeSeoTab, setActiveSeoTab] = useState('search'); // 'search' or 'social'

    // List of curated tag suggestions (fallback if database has none)
    const defaultTagSuggestions = [
        'PreWedding',
        'WeddingPhotography',
        'Cinematic',
        'DestinationWedding',
        'JaipurDiaries',
        'BridalLook',
        'IndianWedding',
        'CandidShots',
        'LaganStudio',
    ];

    const tagSuggestions = suggestionsList && suggestionsList.length > 0
        ? suggestionsList.map(t => t.name)
        : defaultTagSuggestions;

    // Real-time SEO and Social defaults sync
    useEffect(() => {
        if (!data.seo_title) {
            setData('seo_title', data.title);
        }
        if (!data.og_title) {
            setData('og_title', data.title);
        }
    }, [data.title]);

    useEffect(() => {
        const plainText = data.content.replace(/<[^>]*>/g, '');
        if (!data.seo_description && plainText.length > 5) {
            setData('seo_description', plainText.slice(0, 155) + (plainText.length > 155 ? '...' : ''));
        }
        if (!data.og_description && plainText.length > 5) {
            setData('og_description', plainText.slice(0, 155) + (plainText.length > 155 ? '...' : ''));
        }
    }, [data.content]);

    // Real-time Tag autogeneration based on title
    useEffect(() => {
        if (!data.title.trim()) {
            setData('tags', []);
            return;
        }

        const stopWords = new Set([
            'a', 'an', 'the', 'and', 'but', 'or', 'for', 'nor', 'on', 'at', 'to', 'from',
            'by', 'in', 'of', 'with', 'is', 'am', 'are', 'was', 'were', 'be', 'been',
            'have', 'has', 'had', 'do', 'does', 'did', 'this', 'that', 'these', 'those',
            'how', 'why', 'what', 'where', 'when', 'who', 'top', 'best', 'new', 'our',
        ]);

        const words = data.title
            .toLowerCase()
            .replace(/[^\w\s]/g, '')
            .split(/\s+/)
            .filter(word => word.length > 3 && !stopWords.has(word));

        const autoTags = Array.from(new Set(words)).map(
            word => word.charAt(0).toUpperCase() + word.slice(1)
        );

        const custom = (Array.isArray(data.tags) ? data.tags : []).filter(t => !autoTags.includes(t));
        setData('tags', [...autoTags, ...custom].slice(0, 8));
    }, [data.title]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleOgImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('og_image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setOgImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddSuggestion = (tag) => {
        if (!data.tags.includes(tag)) {
            setData('tags', [...data.tags, tag]);
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setData('tags', data.tags.filter(t => t !== tagToRemove));
    };

    const handleAddCustomTag = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const val = e.target.value.trim().replace(/[^\w]/g, '');
            if (val && !data.tags.includes(val)) {
                setData('tags', [...data.tags, val]);
                e.target.value = '';
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('blog.posts.store'), {
            forceFormData: true,
            onSuccess: () => {
                toast.success('Blog post published successfully!');
            },
            onError: (errs) => {
                const firstErr = Object.values(errs)[0];
                toast.error(firstErr || 'Failed to publish post.');
            }
        });
    };

    return (
        <>
            <Head title="Create Blog Post" />
            <AdminLayout>
                <div className="page bg-[#f9fafb] min-h-screen py-8 px-6">
                    <div className="max-w-8xl mx-auto space-y-8">

                        {/* Header Navigation */}
                        <div className="border-b border-gray-100 pb-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="space-y-1">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                                    Blog Publisher
                                </span>
                                <h1 className="text-3xl font-black text-gray-900 tracking-tight">
                                    Create New Post
                                </h1>
                                <Breadcrumbs items={[{ label: 'Blog', href: '/blog/posts' }, { label: 'Create Post' }]} />
                            </div>

                        </div>

                        {/* Creative Creation Box */}
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                            {/* Main Form Elements */}
                            <div className="lg:col-span-2 space-y-6">
                                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-6">

                                    {/* Blog Title */}
                                    <div className="space-y-2">
                                        <label htmlFor="title" className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                                            Blog Title
                                        </label>
                                        <input
                                            type="text"
                                            id="title"
                                            required
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                            placeholder="e.g. Master the Perfect Pre-Wedding Shoot: Tips & Secrets"
                                            className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-2xl text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold"
                                        />
                                        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                                        <p className="text-[10px] text-indigo-500 font-semibold italic">
                                            * Tags will auto-generate in real-time as you write the title.
                                        </p>
                                    </div>

                                    {/* Blog Category */}
                                    <div className="space-y-2">
                                        <label htmlFor="category" className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                                            Category
                                        </label>
                                        <div className="relative">
                                            <select
                                                id="category"
                                                value={data.category_id}
                                                onChange={(e) => setData('category_id', e.target.value)}
                                                className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-2xl text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none cursor-pointer font-semibold text-gray-700"
                                            >
                                                <option value="">Uncategorized</option>
                                                {categories.map((cat) => (
                                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                                ))}
                                            </select>
                                            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                            </div>
                                        </div>
                                        {errors.category_id && <p className="text-red-500 text-xs mt-1">{errors.category_id}</p>}
                                    </div>

                                    {/* Blog Content (WYSIWYG Rich Text Editor) */}
                                    <div className="space-y-2">
                                        <label htmlFor="content" className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                                            Article Body Content
                                        </label>
                                        <RichTextEditor
                                            value={data.content}
                                            onChange={(html) => setData('content', html)}
                                            placeholder="Write your beautiful article content here using formatting tools..."
                                        />
                                        {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content}</p>}
                                    </div>

                                    {/* SEO & Social Sharing Settings Section */}
                                    <div className="border-t border-gray-100 pt-6 space-y-6">

                                        {/* Tab Switcher Headers */}
                                        <div className="flex border-b border-gray-100 pb-3 items-center justify-between">
                                            <h3 className="text-sm font-black text-gray-800 uppercase tracking-wider flex items-center gap-2">
                                                <Icon name="feather__search" className="w-4 h-4 text-indigo-500" />
                                                Search & Social SEO Engine
                                            </h3>
                                            <div className="flex gap-1.5 bg-gray-155 p-1 rounded-xl">
                                                <button
                                                    type="button"
                                                    onClick={() => setActiveSeoTab('search')}
                                                    className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${activeSeoTab === 'search'
                                                        ? 'bg-white text-gray-900 shadow-sm border border-gray-100'
                                                        : 'text-gray-400 hover:text-gray-600'
                                                        }`}
                                                >
                                                    Search (Google)
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setActiveSeoTab('social')}
                                                    className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${activeSeoTab === 'social'
                                                        ? 'bg-white text-gray-900 shadow-sm border border-gray-100'
                                                        : 'text-gray-400 hover:text-gray-600'
                                                        }`}
                                                >
                                                    Social Share (Facebook/LinkedIn)
                                                </button>
                                            </div>
                                        </div>

                                        {/* Tab 1: Search Engine Controls */}
                                        {activeSeoTab === 'search' && (
                                            <div className="space-y-6">
                                                {/* Google Snippet Mock Preview */}
                                                <div className="bg-gray-50/50 border border-gray-100 rounded-2xl p-4 space-y-2">
                                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Google Search Preview</span>
                                                    <div className="space-y-1">
                                                        <span className="text-xs text-gray-400 block truncate">https://laganstudio.com › blog › {data.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-') || 'post-slug'}</span>
                                                        <span className="text-base font-medium text-[#1a0dab] hover:underline cursor-pointer block leading-tight truncate">
                                                            {data.seo_title || 'Please enter a title...'}
                                                        </span>
                                                        <p className="text-xs text-[#4d5156] leading-relaxed line-clamp-2">
                                                            {data.seo_description || 'Provide an article body to auto-generate a compelling Google meta snippet preview here...'}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">SEO Focus Title</label>
                                                        <input
                                                            type="text"
                                                            value={data.seo_title}
                                                            onChange={(e) => setData('seo_title', e.target.value)}
                                                            className="w-full px-4 py-2.5 bg-gray-50 border-transparent rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                                            placeholder="Enter custom SEO title..."
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Focus Keywords</label>
                                                        <input
                                                            type="text"
                                                            value={data.seo_keywords}
                                                            onChange={(e) => setData('seo_keywords', e.target.value)}
                                                            className="w-full px-4 py-2.5 bg-gray-50 border-transparent rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                                            placeholder="wedding, photography, cinematography, jaipur..."
                                                        />
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Meta Description</label>
                                                    <textarea
                                                        rows="3"
                                                        value={data.seo_description}
                                                        onChange={(e) => setData('seo_description', e.target.value)}
                                                        className="w-full px-4 py-2.5 bg-gray-50 border-transparent rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
                                                        placeholder="Enter custom SEO meta description..."
                                                    ></textarea>
                                                </div>

                                                {/* Canonical & Robots Controls */}
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-gray-50 pt-4">
                                                    <div className="space-y-2 md:col-span-2">
                                                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Canonical URL</label>
                                                        <input
                                                            type="url"
                                                            value={data.canonical_url}
                                                            onChange={(e) => setData('canonical_url', e.target.value)}
                                                            className="w-full px-4 py-2.5 bg-gray-50 border-transparent rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-mono"
                                                            placeholder="https://laganstudio.com/custom-canonical"
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <div className="space-y-1.5">
                                                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Indexation</label>
                                                            <select
                                                                value={data.robots_index}
                                                                onChange={(e) => setData('robots_index', e.target.value)}
                                                                className="w-full px-3 py-2 bg-gray-50 border-transparent rounded-xl text-[11px] font-semibold outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer"
                                                            >
                                                                <option value="index">INDEX</option>
                                                                <option value="noindex">NOINDEX</option>
                                                            </select>
                                                        </div>
                                                        <div className="space-y-1.5">
                                                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Follow</label>
                                                            <select
                                                                value={data.robots_follow}
                                                                onChange={(e) => setData('robots_follow', e.target.value)}
                                                                className="w-full px-3 py-2 bg-gray-50 border-transparent rounded-xl text-[11px] font-semibold outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer"
                                                            >
                                                                <option value="follow">FOLLOW</option>
                                                                <option value="nofollow">NOFOLLOW</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Tab 2: Social Sharing & OG Controls */}
                                        {activeSeoTab === 'social' && (
                                            <div className="space-y-6">
                                                {/* Facebook Post Preview Mock */}
                                                <div className="border border-gray-100 rounded-3xl overflow-hidden shadow-sm bg-white max-w-xl mx-auto">
                                                    <div className="p-4 flex items-center gap-3 bg-white">
                                                        <div className="w-10 h-10 rounded-full bg-indigo-55 bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center text-white text-xs font-black shadow-inner">LS</div>
                                                        <div className="text-left">
                                                            <span className="block text-xs font-bold text-gray-900">Lagan Studio</span>
                                                            <span className="block text-[9px] text-gray-400 font-semibold uppercase tracking-wider">Sponsored / shared 1m ago</span>
                                                        </div>
                                                    </div>

                                                    {/* Card Banner */}
                                                    <div className="aspect-video bg-gray-50 border-y border-gray-100 overflow-hidden relative">
                                                        {ogImagePreview ? (
                                                            <img src={ogImagePreview} className="w-full h-full object-cover" alt="Social SEO preview" />
                                                        ) : imagePreview ? (
                                                            <img src={imagePreview} className="w-full h-full object-cover" alt="Social SEO fallback preview" />
                                                        ) : (
                                                            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 gap-2">
                                                                <Icon name="feather__image" className="w-8 h-8" />
                                                                <span className="text-[10px] font-bold uppercase tracking-wider">Social Share Cover</span>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Card Body */}
                                                    <div className="p-4 bg-gray-50 text-left border-b border-gray-100">
                                                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-1">LAGANSTUDIO.COM</span>
                                                        <span className="block text-xs font-black text-gray-900 truncate mb-1">
                                                            {data.og_title || data.title || 'Add post title...'}
                                                        </span>
                                                        <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed">
                                                            {data.og_description || data.seo_description || 'Provide share card details to generate custom card descriptions...'}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start border-t border-gray-50 pt-6">

                                                    {/* Social Inputs */}
                                                    <div className="space-y-4">
                                                        <div className="space-y-2">
                                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Custom Share Title</label>
                                                            <input
                                                                type="text"
                                                                value={data.og_title}
                                                                onChange={(e) => setData('og_title', e.target.value)}
                                                                placeholder="e.g. Master the Perfect Pre-Wedding Shoot! 📸"
                                                                className="w-full px-4 py-2.5 bg-gray-50 border-transparent rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                                            />
                                                            <p className="text-[9px] text-gray-400 italic">Leave empty to fallback to default blog title.</p>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Custom Share Description</label>
                                                            <textarea
                                                                rows="3"
                                                                value={data.og_description}
                                                                onChange={(e) => setData('og_description', e.target.value)}
                                                                placeholder="Enter dedicated social feed teaser description..."
                                                                className="w-full px-4 py-2.5 bg-gray-50 border-transparent rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
                                                            ></textarea>
                                                        </div>
                                                    </div>

                                                    {/* Social Image Override Upload */}
                                                    <div className="space-y-4">
                                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Social Cover Image (Override)</label>
                                                        <div className="border-2 border-dashed border-gray-200 rounded-2xl p-4 text-center hover:border-indigo-400 transition-colors relative bg-gray-50/30">
                                                            {ogImagePreview ? (
                                                                <div className="relative rounded-xl overflow-hidden aspect-video max-h-36 mx-auto">
                                                                    <img src={ogImagePreview} className="w-full h-full object-cover" alt="OG Preview" />
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => {
                                                                            setData('og_image', null);
                                                                            setOgImagePreview(null);
                                                                        }}
                                                                        className="absolute top-2 right-2 p-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs"
                                                                    >
                                                                        &times;
                                                                    </button>
                                                                </div>
                                                            ) : (
                                                                <div className="space-y-2 py-2">
                                                                    <div className="inline-flex p-2 bg-white text-gray-400 rounded-xl shadow-sm border border-gray-50">
                                                                        <Icon name="feather__image" className="w-5 h-5 text-indigo-500" />
                                                                    </div>
                                                                    <div className="text-xs text-gray-500">
                                                                        <label htmlFor="og-file-upload" className="cursor-pointer font-bold text-indigo-600 hover:underline">
                                                                            Upload OG Cover
                                                                        </label>
                                                                        <input id="og-file-upload" type="file" accept="image/*" onChange={handleOgImageChange} className="hidden" />
                                                                    </div>
                                                                    <p className="text-[9px] text-gray-400">Recommended size: 1200 x 630px</p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        )}

                                    </div>

                                </div>
                            </div>

                            {/* Side panel: Media & Smart Tags Section */}
                            <div className="space-y-6">

                                {/* Publish Settings Card */}
                                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
                                    <h3 className="text-sm font-black text-gray-800 uppercase tracking-wider">Publish Controls</h3>

                                    {/* Status Selector */}
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Visibility Status</label>
                                        <div className="flex gap-2">
                                            <button
                                                type="button"
                                                onClick={() => setData('status', 'Published')}
                                                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all border ${data.status === 'Published'
                                                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm'
                                                    : 'bg-gray-50 border-transparent text-gray-500 hover:bg-gray-100'
                                                    }`}
                                            >
                                                Published
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setData('status', 'Draft')}
                                                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all border ${data.status === 'Draft'
                                                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm'
                                                    : 'bg-gray-50 border-transparent text-gray-500 hover:bg-gray-100'
                                                    }`}
                                            >
                                                Draft
                                            </button>
                                        </div>
                                    </div>

                                    {/* Scheduled Publishing */}
                                    <div className="space-y-2 pt-2 border-t border-gray-50">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Scheduled Date (Optional)</label>
                                        <input
                                            type="datetime-local"
                                            value={data.published_at}
                                            onChange={(e) => setData('published_at', e.target.value)}
                                            className="w-full px-3 py-2 bg-gray-50 border-transparent rounded-xl text-xs outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all font-semibold text-gray-600"
                                        />
                                        <p className="text-[9px] text-gray-400 italic">Leave empty to publish immediately.</p>
                                    </div>

                                    {/* Author Management (Admin only) */}
                                    {authors && authors.length > 0 && (
                                        <div className="space-y-2 pt-2 border-t border-gray-50">
                                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Assign Author</label>
                                            <select
                                                value={data.author_id}
                                                onChange={(e) => setData('author_id', e.target.value)}
                                                className="w-full px-3 py-2 bg-gray-50 border-transparent rounded-xl text-xs outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all appearance-none cursor-pointer font-bold text-gray-700"
                                            >
                                                {authors.map((author) => (
                                                    <option key={author.id} value={author.id}>{author.name} ({author.email})</option>
                                                ))}
                                            </select>
                                        </div>
                                    )}
                                </div>

                                {/* Cover Image Upload */}
                                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
                                    <h3 className="text-sm font-black text-gray-800 uppercase tracking-wider">Cover Image</h3>

                                    <div className="border-2 border-dashed border-gray-200 rounded-2xl p-4 text-center hover:border-indigo-400 transition-colors relative">
                                        {imagePreview ? (
                                            <div className="relative rounded-xl overflow-hidden aspect-video">
                                                <img src={imagePreview} className="w-full h-full object-cover" alt="Preview" />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setData('image', null);
                                                        setImagePreview(null);
                                                    }}
                                                    className="absolute top-2 right-2 p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs"
                                                >
                                                    <Icon name="feather__trash" className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="space-y-2 py-4">
                                                <div className="inline-flex p-3 bg-gray-50 text-gray-400 rounded-xl">
                                                    <Icon name="feather__image" className="w-6 h-6" />
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    <label htmlFor="file-upload" className="cursor-pointer font-bold text-indigo-600 hover:underline">
                                                        Upload a file
                                                    </label>
                                                    <input id="file-upload" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                                                </div>
                                                <p className="text-[10px] text-gray-400">PNG, JPG, WEBP up to 5MB</p>
                                            </div>
                                        )}
                                    </div>
                                    {errors.image && <p className="text-red-500 text-xs">{errors.image}</p>}
                                </div>

                                {/* Tags & Suggestions */}
                                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
                                    <h3 className="text-sm font-black text-gray-800 uppercase tracking-wider">Smart Tags</h3>

                                    {/* Active Tags */}
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                                            Selected Tags ({data.tags.length})
                                        </label>
                                        <div className="flex flex-wrap gap-2 min-h-12 p-3 bg-gray-50 rounded-2xl">
                                            {data.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-lg border border-indigo-100"
                                                >
                                                    #{tag}
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveTag(tag)}
                                                        className="text-indigo-400 hover:text-indigo-600"
                                                    >
                                                        &times;
                                                    </button>
                                                </span>
                                            ))}
                                            {data.tags.length === 0 && (
                                                <span className="text-xs text-gray-400 italic">No tags added yet. Type a title to autogenerate.</span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Custom Tag Input */}
                                    <div className="space-y-1.5">
                                        <input
                                            type="text"
                                            placeholder="Press Enter to add custom tags..."
                                            onKeyDown={handleAddCustomTag}
                                            className="w-full px-3 py-2 bg-gray-50 border-transparent rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                        />
                                    </div>

                                    {/* Tag Suggestions */}
                                    <div className="space-y-2 pt-2">
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                                            Suggestions List
                                        </span>
                                        <div className="flex flex-wrap gap-1.5">
                                            {tagSuggestions.map((suggestion) => (
                                                <button
                                                    key={suggestion}
                                                    type="button"
                                                    onClick={() => handleAddSuggestion(suggestion)}
                                                    disabled={data.tags.includes(suggestion)}
                                                    className={`px-2 py-1 rounded-lg text-[10px] font-extrabold transition-all border ${data.tags.includes(suggestion)
                                                        ? 'bg-gray-100 text-gray-400 border-transparent cursor-not-allowed'
                                                        : 'bg-white hover:bg-pink-50 text-gray-600 border-gray-200 hover:border-pink-200 hover:text-pink-600'
                                                        }`}
                                                >
                                                    +{suggestion}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                </div>

                                {/* Publish Buttons */}
                                <div className="space-y-3">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black uppercase tracking-widest rounded-2xl transition-all shadow-md shadow-indigo-100 flex items-center justify-center gap-2"
                                    >
                                        {processing ? (
                                            <>
                                                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                                                Publishing...
                                            </>
                                        ) : (
                                            <>
                                                <Icon name="feather__uploadCloud" className="w-4 h-4" />
                                                Publish Post
                                            </>
                                        )}
                                    </button>

                                    <Link
                                        href="/blog/posts"
                                        className="w-full py-3 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 text-xs font-bold uppercase tracking-wider rounded-2xl transition-all flex items-center justify-center"
                                    >
                                        Cancel
                                    </Link>
                                </div>

                            </div>

                        </form>
                    </div>
                </div>
            </AdminLayout>
        </>
    );
}

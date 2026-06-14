import React, { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Icon } from '@/Components/Icon';
import Breadcrumbs from '@/Components/Breadcrumbs';
import { toast } from '@/Utils/toast';

export default function All({ blogs, stats, categories, filters }) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [selectedStatus, setSelectedStatus] = useState(filters.status || '');
    const [selectedCategory, setSelectedCategory] = useState(filters.category || '');
    const [viewTrash, setViewTrash] = useState(filters.trash === 'true' || filters.trash === true);

    // Synchronize filters to the server
    const applyFilters = () => {
        router.get(route('blog.posts'), {
            search: searchTerm,
            status: selectedStatus,
            category: selectedCategory,
            trash: viewTrash ? 'true' : 'false'
        }, {
            preserveState: true,
            replace: true
        });
    };

    // Debounce or trigger filter update
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            applyFilters();
        }, 400);

        return () => clearTimeout(delayDebounce);
    }, [searchTerm, selectedStatus, selectedCategory, viewTrash]);

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to soft delete this blog post? You can restore it from the trash.')) {
            router.delete(route('blog.posts.destroy', id), {
                onSuccess: () => {
                    toast.success('Blog post moved to trash.');
                }
            });
        }
    };

    const handleRestore = (id) => {
        router.post(route('blog.posts.restore', id), {}, {
            onSuccess: () => {
                toast.success('Blog post restored successfully.');
            }
        });
    };

    const handleForceDelete = (id) => {
        if (confirm('WARNING: Are you sure you want to permanently delete this post? This action cannot be undone and will delete all associated comments.')) {
            router.delete(route('blog.posts.forceDelete', id), {
                onSuccess: () => {
                    toast.success('Blog post deleted permanently.');
                }
            });
        }
    };

    const handleToggleStatus = (id) => {
        router.post(route('blog.posts.toggleStatus', id), {}, {
            onSuccess: () => {
                toast.success('Post status toggled successfully.');
            }
        });
    };

    return (
        <>
            <Head title="Blog Management" />
            <AdminLayout>
                <div className="page bg-[#f9fafb] min-h-screen py-8 px-6">
                    <div className="max-w-8xl mx-auto space-y-8">

                        {/* Header Box */}
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-gray-100 pb-5">
                            <div className="space-y-1">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                                    Content Hub
                                </span>
                                <h1 className="text-3xl font-black text-gray-900 tracking-tight">
                                    Blog Posts List
                                </h1>
                                <Breadcrumbs items={[{ label: 'Blog', href: '/blog/posts' }, { label: 'All Posts' }]} />

                            </div>
                            <div className="items-center gap-3 self-end md:self-auto">
                                <Link
                                    href="/blog/posts/create"
                                    className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black uppercase tracking-wider rounded-2xl transition-all shadow-md shadow-indigo-100 flex items-center gap-2"
                                >
                                    <Icon name="feather__plus" className="w-4 h-4" />
                                    Create Blog Post
                                </Link>
                            </div>
                        </div>

                        {/* Search & Statistics */}
                        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">

                            {/* Filters row */}
                            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-1">
                                <div className="relative flex-1 max-w-md">
                                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                        <Icon name="feather__search" className="w-4 h-4" />
                                    </span>
                                    <input
                                        type="text"
                                        placeholder="Search title or content..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border-transparent rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                    />
                                </div>

                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="pl-4 pr-10 py-2.5 bg-gray-50 border-transparent rounded-xl text-xs outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer font-semibold text-gray-600"
                                >
                                    <option value="">All Categories</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>

                                <select
                                    value={selectedStatus}
                                    onChange={(e) => setSelectedStatus(e.target.value)}
                                    className="pl-4 pr-10 py-2.5 bg-gray-50 border-transparent rounded-xl text-xs outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer font-semibold text-gray-600"
                                >
                                    <option value="">All Statuses</option>
                                    <option value="Published">Published</option>
                                    <option value="Draft">Draft</option>
                                </select>

                                <button
                                    type="button"
                                    onClick={() => setViewTrash(!viewTrash)}
                                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 ${viewTrash
                                        ? 'bg-red-50 border-red-200 text-red-600'
                                        : 'bg-gray-50 border-transparent text-gray-500 hover:bg-gray-100'
                                        }`}
                                >
                                    <Icon name="feather__trash" className="w-3.5 h-3.5" />
                                    Trash ({stats.trash})
                                </button>
                            </div>

                            <div className="flex gap-8 items-center self-stretch justify-around md:justify-end md:gap-12 text-center border-t border-gray-50 pt-4 md:pt-0 md:border-t-0">
                                <div>
                                    <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Posts</span>
                                    <span className="text-2xl font-black text-gray-800">{stats.total}</span>
                                </div>
                                <div className="border-l border-gray-100 h-8 self-center"></div>
                                <div>
                                    <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Published</span>
                                    <span className="text-2xl font-black text-emerald-600">{stats.published}</span>
                                </div>
                                <div className="border-l border-gray-100 h-8 self-center"></div>
                                <div>
                                    <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Drafts</span>
                                    <span className="text-2xl font-black text-amber-500">{stats.drafts}</span>
                                </div>
                            </div>
                        </div>

                        {/* Main Grid View */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {blogs.map((blog) => (
                                <div
                                    key={blog.id}
                                    className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col group"
                                >
                                    {/* Cover Image Wrapper */}
                                    <div className="relative aspect-video bg-gray-100 overflow-hidden">
                                        <img src={blog.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={blog.title} />

                                        {/* Category Badge & Status Overlay */}
                                        <span className="absolute top-4 left-4 px-2.5 py-1 bg-white/95 text-indigo-600 text-[10px] font-black uppercase rounded-lg shadow-sm border border-indigo-50">
                                            {blog.category}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => !viewTrash && handleToggleStatus(blog.id)}
                                            className={`absolute top-4 right-4 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider rounded-lg shadow-sm transition-all ${blog.status === 'Published'
                                                ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                                                : 'bg-amber-500 hover:bg-amber-600 text-white'
                                                }`}
                                            title="Click to toggle status"
                                            disabled={viewTrash}
                                        >
                                            {blog.status}
                                        </button>
                                    </div>

                                    {/* Body Description Content */}
                                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                                        <div className="space-y-2">
                                            <h3 className="text-sm font-black text-gray-900 line-clamp-2 leading-snug group-hover:text-indigo-600 transition-colors">
                                                {blog.title}
                                            </h3>

                                            {/* Tag Section */}
                                            <div className="flex flex-wrap gap-1">
                                                {blog.tags.map((tag) => (
                                                    <span key={tag} className="text-[10px] font-semibold text-gray-400 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-md">
                                                        #{tag}
                                                    </span>
                                                ))}
                                                {blog.tags.length === 0 && (
                                                    <span className="text-[10px] text-gray-300 italic">No tags</span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t border-gray-50 flex items-center justify-between text-[11px] text-gray-400 font-bold">
                                            <div className="flex flex-col text-left">
                                                <span>By {blog.author}</span>
                                                <span className="text-[9px] font-medium text-gray-300">{blog.date} • {blog.views} Views</span>
                                            </div>

                                            <div className="flex items-center gap-1.5">
                                                {viewTrash ? (
                                                    <>
                                                        <button
                                                            onClick={() => handleRestore(blog.id)}
                                                            className="p-1.5 text-emerald-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg border border-transparent hover:border-emerald-100"
                                                            title="Restore Post"
                                                        >
                                                            <Icon name="feather__cornerUpLeft" className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleForceDelete(blog.id)}
                                                            className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg border border-transparent hover:border-red-100"
                                                            title="Delete Permanently"
                                                        >
                                                            <Icon name="feather__trash" className="w-4 h-4" />
                                                        </button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Link
                                                            href={route('blog.posts.edit', blog.id)}
                                                            className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-gray-50 rounded-lg border border-transparent hover:border-gray-100"
                                                            title="Edit Post"
                                                        >
                                                            <Icon name="feather__edit" className="w-4 h-4" />
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(blog.id)}
                                                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg border border-transparent hover:border-red-100"
                                                            title="Trash Post"
                                                        >
                                                            <Icon name="feather__trash" className="w-4 h-4" />
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {blogs.length === 0 && (
                                <div className="col-span-3 py-16 text-center text-gray-400 font-semibold text-sm">
                                    No blog posts found matching your filter criteria.
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </AdminLayout>
        </>
    );
}

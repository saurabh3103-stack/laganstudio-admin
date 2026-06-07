import React, { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Icon } from '@/Components/Icon';
import Breadcrumbs from '@/Components/Breadcrumbs';
import { toast } from '@/Utils/toast';

export default function Tags({ tags }) {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const { data, setData, post, reset, processing, errors } = useForm({
        name: '',
        color: 'indigo',
    });

    const colors = ['indigo', 'pink', 'amber', 'emerald', 'sky', 'violet', 'rose'];

    const handleCreateTag = (e) => {
        e.preventDefault();
        const formattedName = data.name.trim().replace(/[^\w]/g, '');
        if (!formattedName) {
            toast.error('Tag name cannot be empty and must contain alphanumeric characters only!');
            return;
        }

        post(route('blog.tags.store'), {
            onSuccess: () => {
                toast.success(`Tag #${formattedName} created successfully!`);
                reset();
                setIsAddModalOpen(false);
            },
            onError: (errs) => {
                toast.error(errs.name || 'Failed to save tag.');
            }
        });
    };

    const handleDeleteTag = (id, name) => {
        if (confirm(`Are you sure you want to delete the tag #${name}?`)) {
            router.delete(route('blog.tags.destroy', id), {
                onSuccess: () => {
                    toast.success(`Tag #${name} deleted successfully!`);
                },
                onError: () => {
                    toast.error('Failed to delete tag.');
                }
            });
        }
    };

    const filteredTags = tags.filter(t =>
        t.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <Head title="Manage Tags - Admin" />
            <AdminLayout>
                <div className="page bg-[#f9fafb] min-h-screen py-8 px-6">
                    <div className="max-w-8xl mx-auto space-y-8">
                        {/* Header Navigation */}
                        <div className="border-b border-gray-100 pb-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="space-y-1">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                                    Content Keywords
                                </span>
                                <h1 className="text-3xl font-black text-gray-900 tracking-tight">
                                    Blog Post Tags
                                </h1>
                                <Breadcrumbs items={[{ label: 'Blog', href: '/blog/posts' }, { label: 'Tags' }]} />
                            </div>
                            <div className="flex items-center gap-3 self-end md:self-auto">
                                <button
                                    onClick={() => setIsAddModalOpen(true)}
                                    className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black uppercase tracking-wider rounded-2xl transition-all shadow-md shadow-indigo-100 flex items-center gap-2"
                                >
                                    <Icon name="feather__plus" className="w-4 h-4" />
                                    Add New Tag
                                </button>
                            </div>
                        </div>

                        {/* Search Bar */}
                        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="relative w-full md:w-96">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                    <Icon name="feather__search" className="w-4 h-4" />
                                </span>
                                <input
                                    type="text"
                                    placeholder="Search tags..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-9 pr-4 py-2 bg-gray-50 border-transparent rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                />
                            </div>
                            <div className="text-xs text-gray-400 font-semibold">
                                Showing {filteredTags.length} of {tags.length} unique tags
                            </div>
                        </div>

                        {/* Tags Grid List */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {filteredTags.map((tag) => (
                                <div
                                    key={tag.id}
                                    className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
                                >
                                    <div className="flex items-start justify-between">
                                        <span className={`inline-flex items-center gap-1 px-3 py-1 bg-${tag.color}-50 text-${tag.color}-600 rounded-full text-xs font-bold`}>
                                            #{tag.name}
                                        </span>
                                        <button
                                            onClick={() => handleDeleteTag(tag.id, tag.name)}
                                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                                            title="Delete Tag"
                                        >
                                            <Icon name="feather__trash" className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <div className="mt-6 flex items-center justify-between text-xs text-gray-400 font-semibold border-t border-gray-50 pt-4">
                                        <span>Used in {tag.count} posts</span>
                                        <span className="text-indigo-500 group-hover:underline cursor-pointer flex items-center gap-1">
                                            View Posts
                                            <Icon name="feather__arrowRight" className="w-3.5 h-3.5" />
                                        </span>
                                    </div>
                                </div>
                            ))}
                            {filteredTags.length === 0 && (
                                <div className="col-span-full py-12 text-center text-gray-400 text-sm font-semibold">
                                    No tags found. Create some by clicking "Add New Tag"!
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Add Tag Modal Dialog Overlay */}
                {isAddModalOpen && (
                    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
                        {/* Backdrop background Blur */}
                        <div
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                            onClick={() => setIsAddModalOpen(false)}
                        ></div>

                        {/* Modal Container */}
                        <div className="relative bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100 z-10 transform transition-all">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-black text-gray-900 tracking-tight flex items-center gap-2">
                                    <Icon name="feather__plus" className="w-5 h-5 text-indigo-600" />
                                    Create New Tag
                                </h3>
                                <button
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="p-1.5 hover:bg-gray-100 rounded-xl text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    &times;
                                </button>
                            </div>

                            <form onSubmit={handleCreateTag} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                                        Tag Name (Alphanumeric only)
                                    </label>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400 font-bold">
                                            #
                                        </span>
                                        <input
                                            type="text"
                                            required
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className="w-full pl-8 pr-4 py-3 bg-gray-50 border-transparent rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold"
                                            placeholder="WeddingPhotography"
                                        />
                                    </div>
                                    {errors.name && (
                                        <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider mt-1">{errors.name}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                                        Tag Accent Color
                                    </label>
                                    <div className="flex flex-wrap gap-2 pt-1">
                                        {colors.map((c) => (
                                            <button
                                                key={c}
                                                type="button"
                                                onClick={() => setData('color', c)}
                                                className={`w-7 h-7 rounded-full border-2 transition-all ${data.color === c ? 'border-gray-900 scale-110 shadow-sm' : 'border-transparent'
                                                    }`}
                                                style={{
                                                    backgroundColor: c === 'indigo' ? '#4f46e5' : c === 'pink' ? '#db2777' : c === 'amber' ? '#d97706' : c === 'emerald' ? '#059669' : c === 'sky' ? '#0284c7' : c === 'violet' ? '#7c3aed' : '#e11d48'
                                                }}
                                            ></button>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsAddModalOpen(false)}
                                        className="flex-1 py-3 border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-bold uppercase tracking-wider rounded-xl transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md shadow-indigo-100 disabled:opacity-50"
                                    >
                                        {processing ? 'Saving...' : 'Save Tag'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </AdminLayout>
        </>
    );
}

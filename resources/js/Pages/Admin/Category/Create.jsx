import React, { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Breadcrumbs from '@/Components/Breadcrumbs';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        status: 'Active',
        description: '',
        image: null,
    });

    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('image', file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('categories.store'), {
            forceFormData: true,
        });
    };

    return (
        <>
            <Head title="Create New Category" />

            <AdminLayout>
                <section className="flex flex-col h-full bg-[#f9fafb]">
                    {/* Header */}
                    <div className="px-8 py-6 bg-white border-b border-gray-200">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                                    Creative Galleries
                                </span>
                                <h1 className="text-3xl font-black text-gray-900 tracking-tight">Create New Category</h1>
                                <p className="text-xs text-gray-400 mt-1">Add a new gallery category to organize your portfolio work.</p>
                            </div>
                            <div className="flex items-center gap-3 self-end md:self-auto">
                                <Breadcrumbs items={[{ label: 'Portfolio', href: '/portfolio/images' }, { label: 'Categories', href: route('categories.index') }, { label: 'Create' }]} />
                                <Link
                                    href={route('categories.index')}
                                    className="inline-flex items-center gap-2 px-5 py-3 bg-white hover:bg-gray-50 text-gray-700 text-xs font-bold uppercase tracking-wider rounded-2xl transition-all border border-gray-200 shadow-sm"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                                    Back to Categories
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Form Content */}
                    <div className="p-8 flex-1 overflow-y-auto">
                        <form onSubmit={submit} className="max-w-8xl mx-auto">
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                                {/* Form Header */}
                                <div className="px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                                        </div>
                                        <div>
                                            <h2 className="text-sm font-bold text-gray-900">Category Information</h2>
                                            <p className="text-xs text-gray-500 mt-0.5">Define the details of your new portfolio gallery</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Form Fields */}
                                <div className="p-8 space-y-8">
                                    {/* Cover Image */}
                                    <div className="space-y-3">
                                        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Category Cover</label>
                                        <div className="relative group aspect-[16/9] max-w-md rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-400 hover:bg-white transition-all overflow-hidden">
                                            <input type="file" name="image" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer z-20" accept="image/*" />

                                            {!imagePreview ? (
                                                <div className="text-center p-8">
                                                    <div className="w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center mx-auto mb-4 transition-transform group-hover:scale-110 border border-gray-100">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                                                    </div>
                                                    <p className="text-xs font-bold text-gray-700 tracking-wide">Upload Cover Image</p>
                                                    <p className="text-[10px] text-gray-400 mt-2 font-medium">JPG, PNG or GIF • Max 5MB</p>
                                                </div>
                                            ) : (
                                                <div className="relative w-full h-full group">
                                                    <img src={imagePreview} className="absolute inset-0 w-full h-full object-cover" alt="Preview" />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                        <span className="text-[10px] font-black text-white uppercase tracking-widest bg-black/50 px-4 py-2 rounded-full">Click to change</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        {errors.image && <p className="text-red-500 text-[10px] font-bold mt-2 uppercase tracking-widest">{errors.image}</p>}
                                    </div>

                                    {/* Category Name */}
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Category Name <span className="text-red-400">*</span></label>
                                        <input
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            type="text"
                                            placeholder="e.g. Wedding Photography"
                                            className="w-full px-5 py-4 bg-gray-50 border-transparent rounded-xl text-sm font-medium text-gray-900 placeholder:text-gray-300 outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all"
                                        />
                                        {errors.name && <p className="text-red-500 text-[10px] font-bold mt-1 uppercase tracking-widest">{errors.name}</p>}
                                    </div>

                                    {/* Status & Meta */}
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Visibility Status</label>
                                        <div className="relative">
                                            <select
                                                value={data.status}
                                                onChange={(e) => setData('status', e.target.value)}
                                                className="w-full px-5 py-4 bg-gray-50 border-transparent rounded-xl text-sm font-medium text-gray-700 outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all appearance-none"
                                            >
                                                <option value="Active">Active - Visible in portfolio</option>
                                                <option value="Inactive">Inactive - Hidden from public</option>
                                            </select>
                                            <div className="absolute inset-y-0 right-0 flex items-center pr-5 pointer-events-none text-gray-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Category Description</label>
                                        <textarea
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            rows="4"
                                            placeholder="Briefly describe the style and type of work in this gallery..."
                                            className="w-full px-5 py-4 bg-gray-50 border-transparent rounded-xl text-sm text-gray-600 placeholder:text-gray-300 outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
                                        ></textarea>
                                        {errors.description && <p className="text-red-500 text-[10px] font-bold mt-1 uppercase tracking-widest">{errors.description}</p>}
                                    </div>
                                </div>

                                {/* Form Actions */}
                                <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-4">
                                    <Link
                                        href={route('categories.index')}
                                        className="px-6 py-3 bg-white hover:bg-gray-100 text-gray-700 text-xs font-bold rounded-xl transition-all border border-gray-200 shadow-sm uppercase tracking-wider"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black rounded-xl transition-all shadow-lg shadow-indigo-100 disabled:opacity-50 uppercase tracking-wider"
                                    >
                                        {processing ? 'Creating...' : 'Create Category'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
            </AdminLayout>
        </>
    );
}

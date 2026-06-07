import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Breadcrumbs from '@/Components/Breadcrumbs';
import { toast } from '@/Utils/toast';

export default function All({ categories }) {
    const [filterText, setFilterText] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    const handleEditClick = (category) => {
        setSelectedCategory({ ...category });
        setImagePreview(category.image);
        setImageFile(null);
        setIsDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setIsDrawerOpen(false);
        setSelectedCategory(null);
        setImagePreview(null);
        setImageFile(null);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        
        // Use FormData for file upload compatibility
        const formData = new FormData();
        formData.append('name', selectedCategory.name);
        formData.append('slug', selectedCategory.slug);
        formData.append('status', selectedCategory.status);
        formData.append('description', selectedCategory.description || '');
        if (imageFile) {
            formData.append('image', imageFile);
        }

        router.post(route('categories.update', selectedCategory.id), formData, {
            forceFormData: true,
            onSuccess: () => {
                toast.success('Category updated successfully!');
                handleDrawerClose();
            },
            onError: (errs) => {
                const firstErr = Object.values(errs)[0];
                toast.error(firstErr || 'Failed to update category.');
            }
        });
    };

    const handleDelete = (id, name) => {
        if (confirm(`Are you sure you want to delete the category "${name}"? All associated posts will lose this category.`)) {
            router.delete(route('categories.destroy', id), {
                onSuccess: () => {
                    toast.success('Category deleted successfully!');
                },
                onError: () => {
                    toast.error('Failed to delete category.');
                }
            });
        }
    };

    const filteredCategories = categories.filter(cat => 
        cat.name.toLowerCase().includes(filterText.toLowerCase()) ||
        (cat.description && cat.description.toLowerCase().includes(filterText.toLowerCase()))
    );

    return (
        <>
            <Head title="Category Management" />

            <AdminLayout>
                <section className="flex flex-col h-full bg-[#f9fafb]">
                    <div className="px-8 py-6 bg-white border-b border-gray-200">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                                    Creative Galleries
                                </span>
                                <h1 className="text-3xl font-black text-gray-900 tracking-tight">Portfolio Categories</h1>
                                <p className="text-xs text-gray-400 mt-1">Organize your photography work into high-level galleries and segments.</p>
                            </div>
                            <div className="flex items-center gap-3 self-end md:self-auto">
                                <Breadcrumbs items={[{ label: 'Portfolio', href: '/portfolio/images' }, { label: 'Categories' }]} />
                                <Link
                                    href={route('categories.create')}
                                    className="inline-flex items-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black uppercase tracking-wider rounded-2xl transition-all shadow-md shadow-indigo-100 flex items-center"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                    New Category
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 flex-1 overflow-hidden">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full">
                            <div className="px-6 py-4 border-b border-gray-100 bg-white flex items-center justify-between">
                                <div className="relative flex-1 max-w-xs">
                                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                    </span>
                                    <input 
                                        type="text" 
                                        placeholder="Filter categories..." 
                                        value={filterText}
                                        onChange={(e) => setFilterText(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border-transparent rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className="overflow-x-auto flex-1">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50/50 border-b border-gray-200">
                                            <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Category Detail</th>
                                            <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-center">Posts / Items</th>
                                            <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">URL Slug</th>
                                            <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-center">Status</th>
                                            <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {filteredCategories.map((category) => (
                                            <tr key={category.id} className="hover:bg-indigo-50/20 transition-colors group">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-4">
                                                        <div className="h-14 w-20 rounded-xl bg-gray-100 border border-gray-200 overflow-hidden shrink-0 shadow-sm">
                                                            <img src={category.image} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" alt={category.name} />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="font-bold text-gray-900 text-sm tracking-tight">{category.name}</span>
                                                            <span className="text-xs text-gray-500 line-clamp-1 max-w-[280px] mt-0.5">{category.description || 'No description provided.'}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <div className="inline-flex flex-col items-center">
                                                        <span className="text-sm font-black text-indigo-600">{category.service_count}</span>
                                                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Items</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-[11px] font-mono font-medium text-indigo-500 bg-indigo-50/50 px-2.5 py-1 rounded-md border border-indigo-100">
                                                        /{category.slug}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase ${
                                                        category.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-400'
                                                    }`}>
                                                        <span className={`h-1.5 w-1.5 rounded-full mr-2 ${category.status === 'Active' ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'}`}></span>
                                                        {category.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right whitespace-nowrap">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button 
                                                            onClick={() => handleEditClick(category)}
                                                            title="Edit" 
                                                            className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-indigo-600 hover:bg-white hover:shadow-sm rounded-xl transition-all border border-transparent hover:border-gray-100"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                                        </button>
                                                        <button 
                                                            onClick={() => handleDelete(category.id, category.name)}
                                                            title="Delete" 
                                                            className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-white hover:shadow-sm rounded-xl transition-all border border-transparent hover:border-gray-100"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        {filteredCategories.length === 0 && (
                                            <tr>
                                                <td colSpan="5" className="text-center py-16 text-gray-400 text-sm font-semibold">
                                                    No categories found matching your query.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Drawer Side Panel */}
                    <aside className={`fixed right-0 top-0 h-full w-[450px] bg-white shadow-[-20px_0_50px_rgba(0,0,0,0.1)] z-50 transform transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] border-l border-gray-100 ${
                         isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}>
                        {selectedCategory && (
                            <div className="flex flex-col h-full">
                                <div className="px-8 py-7 border-b border-gray-50 flex items-center justify-between">
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900 tracking-tight">Category Setup</h2>
                                        <p className="text-xs text-gray-500 mt-0.5">Define portfolio gallery properties.</p>
                                    </div>
                                    <button 
                                        onClick={handleDrawerClose}
                                        className="p-2 bg-gray-50 text-gray-400 hover:text-gray-900 rounded-xl transition-colors"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                    </button>
                                </div>

                                <form onSubmit={handleFormSubmit} className="p-8 flex-1 overflow-y-auto space-y-8">
                                    <div className="space-y-3">
                                        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Category Cover</label>
                                        <div className="group relative h-48 w-full rounded-2xl border-2 border-dashed border-gray-100 bg-gray-50/50 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-300 hover:bg-white transition-all overflow-hidden">
                                            <input type="file" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer z-20" accept="image/*" />
                                            {imagePreview ? (
                                                <div className="relative w-full h-full">
                                                    <img src={imagePreview} className="absolute inset-0 w-full h-full object-cover" alt="Preview" />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                        <span className="text-[10px] font-black text-white uppercase tracking-widest bg-black/50 px-4 py-2 rounded-full">Change Cover</span>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="relative z-10 flex flex-col items-center">
                                                    <div className="p-4 rounded-2xl bg-white shadow-sm border border-gray-50 group-hover:scale-110 transition-transform">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="indigo" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                                                    </div>
                                                    <p className="mt-4 text-xs font-bold text-gray-500 uppercase tracking-wide">Upload Gallery Cover</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Category Name</label>
                                        <input 
                                            type="text" 
                                            required
                                            value={selectedCategory.name}
                                            onChange={(e) => setSelectedCategory({ ...selectedCategory, name: e.target.value })}
                                            placeholder="e.g. Wedding Photography" 
                                            className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl text-sm font-bold outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">URL Slug</label>
                                            <div className="relative">
                                                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-indigo-400 font-mono text-xs">/</span>
                                                <input 
                                                    type="text" 
                                                    required
                                                    value={selectedCategory.slug}
                                                    onChange={(e) => setSelectedCategory({ ...selectedCategory, slug: e.target.value })}
                                                    placeholder="wedding-films" 
                                                    className="w-full pl-7 pr-4 py-3 bg-gray-50 border-transparent rounded-xl text-xs font-mono outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Visibility</label>
                                            <select 
                                                value={selectedCategory.status}
                                                onChange={(e) => setSelectedCategory({ ...selectedCategory, status: e.target.value })}
                                                className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl text-xs font-bold outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all appearance-none"
                                            >
                                                <option value="Active">Active</option>
                                                <option value="Inactive">Inactive</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Gallery Description</label>
                                        <textarea 
                                            rows="5" 
                                            value={selectedCategory.description || ''}
                                            onChange={(e) => setSelectedCategory({ ...selectedCategory, description: e.target.value })}
                                            placeholder="Briefly explain what clients will find in this gallery..." 
                                            className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl text-sm outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
                                        ></textarea>
                                    </div>

                                    <div className="p-8 border-t border-gray-50 bg-white flex gap-4">
                                        <button type="submit" className="flex-[2] px-6 py-4 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-indigo-100">
                                            Update Category
                                        </button>
                                        <button 
                                            type="button" 
                                            onClick={handleDrawerClose}
                                            className="flex-1 px-6 py-4 bg-gray-50 hover:bg-gray-100 text-gray-500 text-sm font-bold rounded-2xl transition-all"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </aside>
                </section>
            </AdminLayout>
        </>
    );
}

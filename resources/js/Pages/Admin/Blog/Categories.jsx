import React, { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Icon } from '@/Components/Icon';
import Breadcrumbs from '@/Components/Breadcrumbs';
import { toast } from '@/Utils/toast';

export default function Categories({ categories, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [editingCategory, setEditingCategory] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [editImagePreview, setEditImagePreview] = useState(null);

    // Form for Creating a new Category
    const createForm = useForm({
        name: '',
        status: 'Active',
        description: '',
        image: null,
    });

    // Form for Editing a Category
    const editForm = useForm({
        name: '',
        slug: '',
        status: 'Active',
        description: '',
        image: null,
        _method: 'POST', // Override for file uploads inside updates
    });

    const handleSearch = (e) => {
        e.preventDefault();
        // Trigger page reload with search param
        const url = new URL(window.location.href);
        if (search) {
            url.searchParams.set('search', search);
        } else {
            url.searchParams.delete('search');
        }
        window.location.href = url.toString();
    };

    const handleCreateImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            createForm.setData('image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEditImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            editForm.setData('image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCreateSubmit = (e) => {
        e.preventDefault();
        createForm.post(route('blog.categories.store'), {
            onSuccess: () => {
                toast.success('Blog category created successfully!');
                createForm.reset();
                setImagePreview(null);
            },
            onError: (errs) => {
                const firstErr = Object.values(errs)[0];
                toast.error(firstErr || 'Failed to create category.');
            }
        });
    };

    const handleEditClick = (category) => {
        setEditingCategory(category);
        editForm.setData({
            name: category.name,
            slug: category.slug,
            status: category.status,
            description: category.description || '',
            image: null,
            _method: 'POST'
        });
        setEditImagePreview(category.image || null);
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        editForm.post(route('blog.categories.update', editingCategory.id), {
            forceFormData: true,
            onSuccess: () => {
                toast.success('Blog category updated successfully!');
                setEditingCategory(null);
                editForm.reset();
                setEditImagePreview(null);
            },
            onError: (errs) => {
                const firstErr = Object.values(errs)[0];
                toast.error(firstErr || 'Failed to update category.');
            }
        });
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this blog category? Posts in this category will become Uncategorized.')) {
            // Send delete request
            const form = useForm();
            form.delete(route('blog.categories.destroy', id), {
                onSuccess: () => {
                    toast.success('Blog category deleted successfully!');
                },
                onError: () => {
                    toast.error('Failed to delete category.');
                }
            });
        }
    };

    return (
        <>
            <Head title="Blog Category Management" />
            <AdminLayout>
                <div className="page bg-[#f9fafb] min-h-screen py-8 px-6">
                    <div className="max-w-8xl mx-auto space-y-8">

                        {/* Top Header & Navigation */}
                        <div className="border-b border-gray-100 pb-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="space-y-1">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                                    Blog settings
                                </span>
                                <h1 className="text-3xl font-black text-gray-900 tracking-tight">
                                    Blog Categories
                                </h1>
                                <Breadcrumbs items={[{ label: 'Blog', href: '/blog/posts' }, { label: 'Categories' }]} />
                            </div>
                            <div className="flex items-center gap-3 self-end md:self-auto">
                                <Link
                                    href="/blog/posts"
                                    className="px-4 py-2 border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center gap-2"
                                >
                                    <Icon name="feather__arrowLeft" className="w-4 h-4 text-gray-400" />
                                    Back to Posts
                                </Link>
                            </div>
                        </div>

                        {/* Body Layout: Left Creator, Right List */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                            {/* Left Panel: Category Creator */}
                            <div className="space-y-6 lg:col-span-1">
                                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-6 sticky top-6">
                                    <div className="space-y-1">
                                        <h3 className="text-base font-black text-gray-800 uppercase tracking-wider">
                                            Create Category
                                        </h3>
                                        <p className="text-xs text-gray-400 font-medium">Add dedicated sections for your blog posts.</p>
                                    </div>

                                    <form onSubmit={handleCreateSubmit} className="space-y-4">
                                        {/* Name */}
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Category Name</label>
                                            <input
                                                type="text"
                                                required
                                                value={createForm.data.name}
                                                onChange={(e) => createForm.setData('name', e.target.value)}
                                                placeholder="e.g. Photography Tips"
                                                className="w-full px-4 py-2.5 bg-gray-50 border-transparent rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-semibold"
                                            />
                                            {createForm.errors.name && <p className="text-red-500 text-[10px]">{createForm.errors.name}</p>}
                                        </div>

                                        {/* Description */}
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Description</label>
                                            <textarea
                                                rows="3"
                                                value={createForm.data.description}
                                                onChange={(e) => createForm.setData('description', e.target.value)}
                                                placeholder="Enter category description..."
                                                className="w-full px-4 py-2.5 bg-gray-50 border-transparent rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none font-medium"
                                            ></textarea>
                                        </div>

                                        {/* Status */}
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Status</label>
                                            <select
                                                value={createForm.data.status}
                                                onChange={(e) => createForm.setData('status', e.target.value)}
                                                className="w-full px-3 py-2.5 bg-gray-50 border-transparent rounded-xl text-xs outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all font-bold text-gray-700 cursor-pointer"
                                            >
                                                <option value="Active">Active</option>
                                                <option value="Inactive">Inactive</option>
                                            </select>
                                        </div>

                                        {/* Cover Image */}
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Cover Photo</label>
                                            <div className="border border-dashed border-gray-200 rounded-xl p-3 text-center bg-gray-50/20 relative">
                                                {imagePreview ? (
                                                    <div className="relative aspect-video max-h-32 rounded-lg overflow-hidden mx-auto">
                                                        <img src={imagePreview} className="w-full h-full object-cover" alt="Category Cover" />
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                createForm.setData('image', null);
                                                                setImagePreview(null);
                                                            }}
                                                            className="absolute top-1.5 right-1.5 p-1 bg-red-650 hover:bg-red-750 text-white rounded text-[10px]"
                                                        >
                                                            &times;
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="py-2 text-center">
                                                        <span className="cursor-pointer font-bold text-indigo-600 hover:underline text-xs block">
                                                            <label htmlFor="create-cat-img" className="cursor-pointer">Upload Thumbnail</label>
                                                        </span>
                                                        <input id="create-cat-img" type="file" accept="image/*" onChange={handleCreateImageChange} className="hidden" />
                                                        <span className="text-[9px] text-gray-400 font-medium">PNG or JPG under 5MB</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Submit button */}
                                        <button
                                            type="submit"
                                            disabled={createForm.processing}
                                            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-md shadow-indigo-100 flex items-center justify-center gap-2"
                                        >
                                            {createForm.processing ? (
                                                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                                            ) : (
                                                <>
                                                    <Icon name="feather__plus" className="w-4 h-4" />
                                                    Add Category
                                                </>
                                            )}
                                        </button>
                                    </form>
                                </div>
                            </div>

                            {/* Right Panel: Categories Listing Data Table */}
                            <div className="lg:col-span-2 space-y-6">
                                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-6">

                                    {/* Search Controls */}
                                    <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 pb-4 border-b border-gray-50">
                                        <div className="space-y-0.5">
                                            <h3 className="text-sm font-black text-gray-800 uppercase tracking-wider">
                                                All Categories ({categories.length})
                                            </h3>
                                        </div>
                                        <form onSubmit={handleSearch} className="flex gap-2">
                                            <input
                                                type="text"
                                                placeholder="Search categories..."
                                                value={search}
                                                onChange={(e) => setSearch(e.target.value)}
                                                className="px-3.5 py-2 bg-gray-50 border-transparent rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-semibold max-w-64"
                                            />
                                            <button
                                                type="submit"
                                                className="px-3.5 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-indigo-100 transition-colors"
                                            >
                                                Filter
                                            </button>
                                        </form>
                                    </div>

                                    {/* Table */}
                                    <div className="overflow-x-auto rounded-2xl border border-gray-100">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="bg-gray-50 border-b border-gray-100 select-none text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                                    <th className="px-6 py-4">Thumbnail & Name</th>
                                                    <th className="px-6 py-4">Slug</th>
                                                    <th className="px-6 py-4 text-center">Status</th>
                                                    <th className="px-6 py-4 text-center">Articles</th>
                                                    <th className="px-6 py-4 text-right">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100 text-xs font-medium text-gray-600">
                                                {categories.map((cat) => (
                                                    <tr key={cat.id} className="hover:bg-gray-50/50 transition-colors">
                                                        <td className="px-6 py-4 flex items-center gap-3">
                                                            <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-55 border border-gray-100 shadow-inner flex-shrink-0">
                                                                <img src={cat.image} className="w-full h-full object-cover" alt={cat.name} />
                                                            </div>
                                                            <div className="space-y-0.5 text-left">
                                                                <span className="block font-bold text-gray-800 text-sm">{cat.name}</span>
                                                                <span className="block text-[10px] text-gray-400 line-clamp-1 max-w-xs font-medium">{cat.description || 'No description provided.'}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 font-mono text-[10px] text-indigo-500 font-bold">{cat.slug}</td>
                                                        <td className="px-6 py-4 text-center">
                                                            <span className={`inline-flex px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${cat.status === 'Active'
                                                                ? 'bg-emerald-50 text-emerald-600'
                                                                : 'bg-rose-50 text-rose-600'
                                                                }`}>
                                                                {cat.status}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 text-center font-bold text-gray-700">{cat.post_count} posts</td>
                                                        <td className="px-6 py-4 text-right">
                                                            <div className="flex justify-end gap-1.5">
                                                                <button
                                                                    onClick={() => handleEditClick(cat)}
                                                                    className="p-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-lg transition-colors"
                                                                    title="Edit Category"
                                                                >
                                                                    <Icon name="feather__edit" className="w-4 h-4" />
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDelete(cat.id)}
                                                                    className="p-2 bg-red-50 text-red-650 hover:bg-red-100 rounded-lg transition-colors"
                                                                    title="Delete Category"
                                                                >
                                                                    <Icon name="feather__trash" className="w-4 h-4" />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                                {categories.length === 0 && (
                                                    <tr>
                                                        <td colSpan="5" className="px-6 py-12 text-center text-gray-400 italic">
                                                            No blog categories found in database.
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            </div>

                        </div>

                        {/* Edit Slider/Drawer Overlay */}
                        {editingCategory && (
                            <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex justify-end z-[9999] transition-all">
                                <div className="bg-white w-full max-w-lg h-full p-6 shadow-2xl overflow-y-auto flex flex-col space-y-6">
                                    <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                                        <h3 className="text-base font-black text-gray-800 uppercase tracking-wider flex items-center gap-2">
                                            <Icon name="feather__edit" className="w-5 h-5 text-indigo-500" />
                                            Edit Category
                                        </h3>
                                        <button
                                            onClick={() => setEditingCategory(null)}
                                            className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-xl"
                                        >
                                            &times;
                                        </button>
                                    </div>

                                    <form onSubmit={handleEditSubmit} className="space-y-4 flex-1">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Category Name</label>
                                            <input
                                                type="text"
                                                required
                                                value={editForm.data.name}
                                                onChange={(e) => editForm.setData('name', e.target.value)}
                                                className="w-full px-4 py-2.5 bg-gray-50 border-transparent rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-semibold"
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Slug</label>
                                            <input
                                                type="text"
                                                required
                                                value={editForm.data.slug}
                                                onChange={(e) => editForm.setData('slug', e.target.value)}
                                                className="w-full px-4 py-2.5 bg-gray-50 border-transparent rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-mono text-[10px]"
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Description</label>
                                            <textarea
                                                rows="4"
                                                value={editForm.data.description}
                                                onChange={(e) => editForm.setData('description', e.target.value)}
                                                className="w-full px-4 py-2.5 bg-gray-50 border-transparent rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none font-medium"
                                            ></textarea>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Status</label>
                                            <select
                                                value={editForm.data.status}
                                                onChange={(e) => editForm.setData('status', e.target.value)}
                                                className="w-full px-3 py-2.5 bg-gray-50 border-transparent rounded-xl text-xs outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all font-bold text-gray-700 cursor-pointer"
                                            >
                                                <option value="Active">Active</option>
                                                <option value="Inactive">Inactive</option>
                                            </select>
                                        </div>

                                        {/* Cover Image Override */}
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Category Cover Photo</label>
                                            <div className="border border-dashed border-gray-200 rounded-xl p-3 text-center bg-gray-50/20">
                                                {editImagePreview ? (
                                                    <div className="relative aspect-video max-h-36 rounded-lg overflow-hidden mx-auto">
                                                        <img src={editImagePreview} className="w-full h-full object-cover" alt="Edit Category Cover" />
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                editForm.setData('image', null);
                                                                setEditImagePreview(null);
                                                            }}
                                                            className="absolute top-1.5 right-1.5 p-1 bg-red-650 hover:bg-red-750 text-white rounded text-[10px]"
                                                        >
                                                            &times;
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="py-3 text-center">
                                                        <span className="cursor-pointer font-bold text-indigo-600 hover:underline text-xs block">
                                                            <label htmlFor="edit-cat-img" className="cursor-pointer">Replace cover photo</label>
                                                        </span>
                                                        <input id="edit-cat-img" type="file" accept="image/*" onChange={handleEditImageChange} className="hidden" />
                                                        <span className="text-[9px] text-gray-400 font-medium">PNG or JPG under 5MB</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t border-gray-100 flex gap-2">
                                            <button
                                                type="submit"
                                                disabled={editForm.processing}
                                                className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-md shadow-indigo-100 flex items-center justify-center gap-2"
                                            >
                                                {editForm.processing ? (
                                                    <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                                                ) : (
                                                    <>
                                                        <Icon name="feather__save" className="w-4 h-4" />
                                                        Save Changes
                                                    </>
                                                )}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setEditingCategory(null)}
                                                className="px-6 py-3 border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-bold uppercase tracking-wider rounded-xl transition-all"
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </AdminLayout>
        </>
    );
}

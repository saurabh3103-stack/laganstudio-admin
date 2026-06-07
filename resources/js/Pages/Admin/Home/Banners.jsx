import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Breadcrumbs from '@/Components/Breadcrumbs';
import { Icon } from '@/Components/Icon';
import { toast } from '@/Utils/toast';

export default function Banners({ banners }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBanner, setEditingBanner] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        subtitle: '',
        description: '',
        image: null,
        button_text: '',
        button_link: '',
        display_order: 0,
        status: true,
    });

    const openCreateModal = () => {
        setEditingBanner(null);
        reset();
        setImagePreview(null);
        setIsModalOpen(true);
    };

    const openEditModal = (banner) => {
        setEditingBanner(banner);
        setData({
            title: banner.title || '',
            subtitle: banner.subtitle || '',
            description: banner.description || '',
            image: null,
            button_text: banner.button_text || '',
            button_link: banner.button_link || '',
            display_order: banner.display_order || 0,
            status: banner.status,
        });
        setImagePreview(banner.image_path);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        reset();
        setImagePreview(null);
        setEditingBanner(null);
    };

    const handleFileChange = (e) => {
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

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingBanner) {
            post(route('home.banners.update', editingBanner.id), {
                forceFormData: true,
                onSuccess: () => {
                    toast.success('Banner updated successfully.');
                    closeModal();
                },
                onError: () => {
                    toast.error('Validation error. Please verify the form inputs.');
                }
            });
        } else {
            post(route('home.banners.store'), {
                forceFormData: true,
                onSuccess: () => {
                    toast.success('Banner created successfully.');
                    closeModal();
                },
                onError: () => {
                    toast.error('Validation error. Please verify the form inputs.');
                }
            });
        }
    };

    const deleteBanner = (id) => {
        if (confirm('Are you sure you want to delete this banner?')) {
            router.delete(route('home.banners.destroy', id), {
                onSuccess: () => toast.success('Banner deleted successfully.')
            });
        }
    };

    const toggleStatus = (id) => {
        router.post(route('home.banners.toggle', id), {}, {
            preserveScroll: true,
            onSuccess: () => toast.success('Banner status updated.')
        });
    };

    return (
        <>
            <Head title="Home Banners - Admin" />
            <AdminLayout>
                <div className="page bg-[#f9fafb] min-h-screen py-8 px-6">
                    <div className="max-w-8xl mx-auto space-y-8">
                        {/* Header Navigation */}
                        <div className="border-b border-gray-100 pb-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="space-y-1">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                                    Home Page Content
                                </span>
                                <h1 className="text-3xl font-black text-gray-900 tracking-tight">
                                    Hero Banners
                                </h1>
                                <Breadcrumbs items={[{ label: 'Home Content' }, { label: 'Banners' }]} />
                            </div>
                            <button
                                onClick={openCreateModal}
                                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black uppercase tracking-widest rounded-2xl transition-all shadow-md shadow-indigo-100 flex items-center justify-center gap-2 w-full md:w-auto"
                            >
                                <Icon name="feather__plus" className="w-4 h-4" />
                                Add New Banner
                            </button>
                        </div>

                        {/* Banner Grid */}
                        {banners.length === 0 ? (
                            <div className="p-4 bg-white rounded-3xl border border-gray-100 p-12 text-center shadow-sm">
                                <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Icon name="feather__image" className="w-10 h-10 text-indigo-500" />
                                </div>
                                <h3 className="text-lg font-black text-gray-800 mb-2">No Banners Found</h3>
                                <p className="text-gray-500 text-sm max-w-md mx-auto mb-6">Create stunning hero banners for your homepage to showcase your best work and attract clients.</p>
                                <button
                                    onClick={openCreateModal}
                                    className="px-6 py-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 text-xs font-black uppercase tracking-widest rounded-xl transition-all"
                                >
                                    Create First Banner
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {banners.map((banner) => (
                                    <div key={banner.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden group">
                                        <div className="relative h-48 bg-gray-100">
                                            <img src={banner.image_path} className="w-full h-full object-cover" alt="Banner" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                                                {banner.title && <h3 className="text-white font-bold text-lg">{banner.title}</h3>}
                                                {banner.subtitle && <p className="text-gray-300 text-xs">{banner.subtitle}</p>}
                                            </div>
                                            <div className="absolute top-4 right-4 flex gap-2">
                                                <button
                                                    onClick={() => toggleStatus(banner.id)}
                                                    className={`p-2 rounded-full shadow-sm backdrop-blur-md transition-all ${banner.status ? 'bg-green-500/90 text-white hover:bg-green-600' : 'bg-white/90 text-gray-600 hover:bg-white'}`}
                                                    title="Toggle Visibility"
                                                >
                                                    <Icon name={banner.status ? 'feather__eye' : 'feather__eye_off'} className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => openEditModal(banner)}
                                                    className="p-2 bg-white/90 hover:bg-white text-indigo-600 rounded-full shadow-sm backdrop-blur-md transition-all"
                                                >
                                                    <Icon name="feather__edit_2" className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => deleteBanner(banner.id)}
                                                    className="p-2 bg-white/90 hover:bg-red-50 text-red-600 rounded-full shadow-sm backdrop-blur-md transition-all"
                                                >
                                                    <Icon name="feather__trash_2" className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </AdminLayout>

            {/* Create/Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
                    <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col animate-fadeIn">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                            <h2 className="text-xl font-black text-gray-900">
                                {editingBanner ? 'Edit Banner' : 'Create New Banner'}
                            </h2>
                            <button onClick={closeModal} className="text-gray-400 hover:text-gray-700 transition-colors p-2 bg-gray-50 hover:bg-gray-100 rounded-xl">
                                <Icon name="feather__x" className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto custom-scrollbar">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Banner Image *</label>
                                    <div className="relative h-48 w-full rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/50 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-300 transition-all overflow-hidden">
                                        {imagePreview ? (
                                            <div className="relative w-full h-full group">
                                                <img src={imagePreview} className="absolute inset-0 w-full h-full object-cover" alt="Preview" />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <span className="text-[9px] font-black text-white uppercase tracking-widest bg-black/50 px-4 py-2 rounded-full">Change Photo</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center">
                                                <Icon name="feather__image" className="w-8 h-8 text-gray-400 mb-2" />
                                                <span className="text-xs font-bold text-gray-500">Upload Banner Image</span>
                                            </div>
                                        )}
                                        <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
                                    </div>
                                    {errors.image && <p className="text-red-500 text-[10px] font-bold">{errors.image}</p>}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Title</label>
                                        <input type="text" value={data.title} onChange={e => setData('title', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl text-xs font-bold outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500" placeholder="Main Heading" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Subtitle</label>
                                        <input type="text" value={data.subtitle} onChange={e => setData('subtitle', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl text-xs font-bold outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500" placeholder="Small Heading" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Description</label>
                                    <textarea value={data.description} onChange={e => setData('description', e.target.value)} rows="3" className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl text-xs outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 resize-none" placeholder="Short description text..."></textarea>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Button Text</label>
                                        <input type="text" value={data.button_text} onChange={e => setData('button_text', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl text-xs font-bold outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500" placeholder="e.g. Explore Our Work" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Button Link</label>
                                        <input type="text" value={data.button_link} onChange={e => setData('button_link', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl text-xs font-bold outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500" placeholder="e.g. /portfolio" />
                                    </div>
                                </div>

                                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                                    <button type="button" onClick={closeModal} className="px-6 py-3 bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-black uppercase tracking-widest rounded-xl transition-all">Cancel</button>
                                    <button type="submit" disabled={processing} className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-md shadow-indigo-100 disabled:opacity-50">
                                        {processing ? 'Saving...' : 'Save Banner'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

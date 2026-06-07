import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Icon } from '@/Components/Icon';
import Breadcrumbs from '@/Components/Breadcrumbs';
import { toast } from '@/Utils/toast';

export default function Index({ services = [], portfolios = [] }) {
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const { data, setData, post, processing, reset, errors } = useForm({
        title: '',
        service_id: services?.[0]?.id || '',
        description: '',
        cover_image: null,
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('cover_image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCreatePortfolio = (e) => {
        e.preventDefault();
        if (!data.title.trim()) {
            toast.error('Portfolio item title is required!');
            return;
        }

        if (!data.cover_image) {
            toast.error('Please select an image for the portfolio!');
            return;
        }

        post(`/services/${data.service_id}/portfolios`, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success(`Portfolio item published successfully!`);
                reset();
                setImagePreview(null);
                setIsAddOpen(false);
            },
            onError: (err) => {
                toast.error('Failed to create portfolio item.');
                console.error(err);
            }
        });
    };

    const handleDeleteItem = (id, name) => {
        if (confirm(`Are you sure you want to delete "${name}" from the portfolio gallery?`)) {
            router.delete(`/services/portfolios/${id}`, {
                preserveScroll: true,
                onSuccess: () => toast.success(`"${name}" deleted successfully!`)
            });
        }
    };

    return (
        <>
            <Head title="Portfolio Gallery - Admin" />
            <AdminLayout>
                <div className="page bg-[#f9fafb] min-h-screen py-8 px-6">
                    <div className="max-w-8xl mx-auto space-y-8">
                        {/* Header Navigation */}
                        <div className="border-b border-gray-100 pb-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="space-y-1">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                                    Creative Gallery Showcase
                                </span>
                                <h1 className="text-3xl font-black text-gray-900 tracking-tight">
                                    Portfolio Images
                                </h1>
                                <Breadcrumbs items={[{ label: 'Portfolio', href: '/portfolio/projects' }, { label: 'Images Gallery' }]} />
                            </div>
                            <div className="flex items-center gap-3 self-end md:self-auto">
                                <button
                                    onClick={() => setIsAddOpen(true)}
                                    className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black uppercase tracking-wider rounded-2xl transition-all shadow-md shadow-indigo-100 flex items-center gap-2"
                                >
                                    <Icon name="feather__plus" className="w-4 h-4" />
                                    Upload Portfolio Image
                                </button>
                            </div>
                        </div>

                        {/* Portfolio Grid Layout */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {portfolios.map(item => (
                                <div key={item.id} className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between">
                                    <div>
                                        <div className="h-56 bg-gray-100 relative overflow-hidden">
                                            <img
                                                src={item.cover_image ? `/storage/${item.cover_image.replace('/storage/', '')}` : ''}
                                                alt={item.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-md text-gray-800 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm">
                                                {services?.find(s => s.id == item.service_id)?.service_name || 'Service'}
                                            </span>
                                            <button
                                                onClick={() => handleDeleteItem(item.id, item.title)}
                                                className="absolute top-4 right-4 p-2 bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                                                title="Delete Portfolio Item"
                                            >
                                                <Icon name="feather__trash" className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <div className="p-6 space-y-2">
                                            <h3 className="text-base font-black text-gray-900 leading-snug group-hover:text-indigo-600 transition-colors">
                                                {item.title}
                                            </h3>
                                            <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">
                                                {item.description || 'No description provided.'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Add Portfolio Image Dialog Overlay */}
                {isAddOpen && (
                    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
                        <div
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                            onClick={() => setIsAddOpen(false)}
                        ></div>

                        {/* Modal Container */}
                        <div className="relative bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 z-10 transform transition-all space-y-6">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-black text-gray-900 tracking-tight flex items-center gap-2">
                                    <Icon name="feather__plus" className="w-5 h-5 text-indigo-600" />
                                    Add Portfolio Image
                                </h3>
                                <button
                                    onClick={() => setIsAddOpen(false)}
                                    className="p-1.5 hover:bg-gray-100 rounded-xl text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    &times;
                                </button>
                            </div>

                            <form onSubmit={handleCreatePortfolio} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Item Title</label>
                                        <input
                                            type="text"
                                            required
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold"
                                            placeholder="Royal Groom Shoot..."
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Choose Service</label>
                                        <select
                                            value={data.service_id}
                                            onChange={(e) => setData('service_id', e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none cursor-pointer"
                                        >
                                            {services?.map((service) => (
                                                <option key={service.id} value={service.id}>{service.service_name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Description</label>
                                    <textarea
                                        rows="3"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
                                        placeholder="Add context or stories behind this photo capture..."
                                    ></textarea>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Image Asset</label>
                                    <div className="border-2 border-dashed border-gray-200 hover:border-indigo-500/50 rounded-2xl p-4 text-center cursor-pointer transition-all relative">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        />
                                        {imagePreview ? (
                                            <div className="relative h-40 rounded-xl overflow-hidden">
                                                <img src={imagePreview} className="w-full h-full object-cover" alt="Preview" />
                                            </div>
                                        ) : (
                                            <div className="space-y-1 py-4 text-gray-400">
                                                <Icon name="feather__image" className="w-8 h-8 mx-auto opacity-60" />
                                                <p className="text-xs font-semibold">Click to upload portfolio image</p>
                                                <p className="text-[10px]">PNG, JPG up to 10MB</p>
                                            </div>
                                        )}
                                    </div>
                                    {errors.cover_image && <div className="text-red-500 text-xs mt-1">{errors.cover_image}</div>}
                                </div>

                                <div className="flex items-center gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsAddOpen(false)}
                                        className="flex-1 py-3 border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-bold uppercase tracking-wider rounded-xl transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md shadow-indigo-100"
                                    >
                                        {processing ? 'Publishing...' : 'Publish Item'}
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

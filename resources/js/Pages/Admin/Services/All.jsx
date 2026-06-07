import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Icon } from '@/Components/Icon';
import Breadcrumbs from '@/Components/Breadcrumbs';
import { toast } from '@/Utils/toast';

export default function All({ services }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this service? All associated packages, FAQs, and portfolios will be permanently deleted.')) {
            router.delete(route('services.destroy', id), {
                onSuccess: () => {
                    toast.success('Service deleted successfully.');
                }
            });
        }
    };

    const handleToggleStatus = (id) => {
        router.post(route('services.toggleStatus', id), {}, {
            onSuccess: () => {
                toast.success('Service visibility updated.');
            }
        });
    };

    const handleToggleFeatured = (id) => {
        router.post(route('services.toggleFeatured', id), {}, {
            onSuccess: () => {
                toast.success('Service featured status updated.');
            }
        });
    };

    // Filter services locally by search term
    const filteredServices = services.filter(service =>
        service.service_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (service.short_description && service.short_description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <>
            <Head title="Services & Catalog Management" />
            <AdminLayout>
                <div className="page bg-[#f9fafb] min-h-screen py-8 px-6">
                    <div className="max-w-8xl mx-auto space-y-8">

                        {/* Page Header */}
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-gray-100 pb-5">
                            <div className="space-y-1">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                                    Catalog Hub
                                </span>
                                <h1 className="text-3xl font-black text-gray-900 tracking-tight">
                                    Services Catalog
                                </h1>
                                <Breadcrumbs items={[{ label: 'Services', href: '/services/all' }, { label: 'All Services' }]} />

                            </div>
                            <div className="flex items-center gap-3 self-end md:self-auto">
                                <Link
                                    href={route('services.create')}
                                    className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black uppercase tracking-wider rounded-2xl transition-all shadow-md shadow-indigo-100 flex items-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                        <line x1="12" y1="5" x2="12" y2="19" strokeLinecap="round" strokeLinejoin="round" />
                                        <line x1="5" y1="12" x2="19" y2="12" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    Create New Service
                                </Link>
                            </div>
                        </div>

                        {/* Search & Filter Header */}
                        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="relative flex-1 max-w-md w-full">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <circle cx="11" cy="11" r="8" />
                                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                    </svg>
                                </span>
                                <input
                                    type="text"
                                    placeholder="Search services by name or description..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border-transparent rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                />
                            </div>

                            <div className="flex gap-6 items-center self-stretch justify-around md:justify-end md:gap-10 text-center border-t border-gray-50 pt-4 md:pt-0 md:border-t-0">
                                <div>
                                    <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Services</span>
                                    <span className="text-xl font-black text-gray-800">{services.length}</span>
                                </div>
                                <div className="border-l border-gray-100 h-8 self-center"></div>
                                <div>
                                    <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Active Catalog</span>
                                    <span className="text-xl font-black text-emerald-600">{services.filter(s => s.status === 1).length}</span>
                                </div>
                            </div>
                        </div>

                        {/* Main Grid View */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredServices.map((service) => (
                                <div
                                    key={service.id}
                                    className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col group"
                                >
                                    {/* Cover/Featured Image */}
                                    <div className="relative aspect-video bg-gray-100 overflow-hidden">
                                        <img
                                            src={service.featured_image || 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80'}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            alt={service.service_name}
                                        />

                                        {/* Featured Ribbon */}
                                        {service.featured === 1 && (
                                            <span className="absolute top-4 left-4 px-2.5 py-1 bg-amber-500 text-white text-[9px] font-black uppercase rounded-lg shadow-sm border border-amber-400 tracking-wider">
                                                Featured Offer
                                            </span>
                                        )}

                                        {/* Status Toggle */}
                                        <button
                                            type="button"
                                            onClick={() => handleToggleStatus(service.id)}
                                            className={`absolute top-4 right-4 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider rounded-lg shadow-sm transition-all ${service.status === 1
                                                ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                                                : 'bg-gray-400 hover:bg-gray-500 text-white'
                                                }`}
                                            title="Click to toggle status"
                                        >
                                            {service.status === 1 ? 'Active' : 'Inactive'}
                                        </button>
                                    </div>

                                    {/* Details Body */}
                                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                {service.service_icon && (
                                                    <span className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-black">
                                                        {service.service_name.charAt(0)}
                                                    </span>
                                                )}
                                                <h3 className="text-base font-black text-gray-900 leading-snug group-hover:text-indigo-600 transition-colors line-clamp-1">
                                                    {service.service_name}
                                                </h3>
                                            </div>
                                            <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                                                {service.short_description || 'No description provided.'}
                                            </p>
                                        </div>

                                        {/* Sub-counters (Packages, FAQs, Portfolios) */}
                                        <div className="pt-3 border-t border-gray-50 grid grid-cols-3 gap-2 text-center bg-gray-50/50 p-2.5 rounded-xl">
                                            <div>
                                                <span className="block text-[8px] font-black text-gray-400 uppercase tracking-widest">Packages</span>
                                                <span className="text-xs font-bold text-gray-700">{service.packages_count || 0}</span>
                                            </div>
                                            <div className="border-l border-gray-150 h-5 self-center"></div>
                                            <div>
                                                <span className="block text-[8px] font-black text-gray-400 uppercase tracking-widest">FAQs</span>
                                                <span className="text-xs font-bold text-gray-700">{service.faqs_count || 0}</span>
                                            </div>
                                            <div className="border-l border-gray-150 h-5 self-center"></div>
                                            <div>
                                                <span className="block text-[8px] font-black text-gray-400 uppercase tracking-widest">Albums</span>
                                                <span className="text-xs font-bold text-gray-700">{service.portfolios_count || 0}</span>
                                            </div>
                                        </div>

                                        {/* Actions Bar */}
                                        <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                                            <button
                                                type="button"
                                                onClick={() => handleToggleFeatured(service.id)}
                                                className={`text-[9px] font-bold uppercase px-2.5 py-1 rounded-md transition-all ${service.featured === 1
                                                    ? 'bg-amber-50 text-amber-600 border border-amber-200'
                                                    : 'bg-gray-50 text-gray-400 border border-transparent hover:bg-gray-100'
                                                    }`}
                                            >
                                                ★ {service.featured === 1 ? 'Featured' : 'Feature'}
                                            </button>

                                            <div className="flex items-center gap-1.5">
                                                <Link
                                                    href={route('services.edit', service.id)}
                                                    className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50/50 rounded-lg border border-transparent hover:border-indigo-100"
                                                    title="Configure Service Catalog, Packages, FAQs, and Portfolios"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                                    </svg>
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(service.id)}
                                                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50/50 rounded-lg border border-transparent hover:border-red-100"
                                                    title="Delete Service"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                        <polyline points="3 6 5 6 21 6" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {filteredServices.length === 0 && (
                                <div className="col-span-full bg-white rounded-3xl p-16 text-center border border-gray-100 shadow-sm space-y-4">
                                    <div className="w-16 h-16 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center mx-auto">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 012.008 1.24l.885 1.77a2.25 2.25 0 002.007 1.24h1.98a2.25 2.25 0 002.007-1.24l.885-1.77a2.25 2.25 0 012.007-1.24h3.86m-18 0h18" />
                                        </svg>
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="font-bold text-gray-800">No Services Found</h3>
                                        <p className="text-xs text-gray-400">Try adjusting your filters or create a new photography service.</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </AdminLayout>
        </>
    );
}

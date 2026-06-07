import React, { useState } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Breadcrumbs from '@/Components/Breadcrumbs';
import { toast } from '@/Utils/toast';

export default function PackageCreate({ services }) {
    const [selectedServiceId, setSelectedServiceId] = useState(services?.[0]?.id || '');
    const [showModal, setShowModal] = useState(false);
    const [editingPackage, setEditingPackage] = useState(null);
    const [featureInput, setFeatureInput] = useState('');
    const [featuresList, setFeaturesList] = useState([]);

    const selectedService = services?.find(s => s.id == selectedServiceId);

    const { data, setData, post, processing, errors, reset } = useForm({
        id: '',
        package_name: '',
        price: '',
        description: '',
        delivery_days: 30,
        display_order: 0,
        status: 1,
        features: [],
    });

    const handleOpenAdd = () => {
        setEditingPackage(null);
        setFeaturesList([]);
        reset();
        setData({
            id: '',
            package_name: '',
            price: '',
            description: '',
            delivery_days: 30,
            display_order: 0,
            status: 1,
            features: [],
        });
        setShowModal(true);
    };

    const handleOpenEdit = (pkg) => {
        setEditingPackage(pkg);
        const feats = pkg.features || [];
        setFeaturesList(feats);
        setData({
            id: pkg.id,
            package_name: pkg.package_name,
            price: pkg.price.toString(),
            description: pkg.description || '',
            delivery_days: pkg.delivery_days,
            display_order: pkg.display_order,
            status: pkg.status,
            features: feats,
        });
        setShowModal(true);
    };

    const handleAddFeature = () => {
        if (featureInput.trim()) {
            const updated = [...featuresList, featureInput.trim()];
            setFeaturesList(updated);
            setData('features', updated);
            setFeatureInput('');
        }
    };

    const handleRemoveFeature = (idx) => {
        const updated = featuresList.filter((_, i) => i !== idx);
        setFeaturesList(updated);
        setData('features', updated);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedServiceId) {
            toast.error('Please choose a service first.');
            return;
        }
        post(route('services.packages.save', selectedServiceId), {
            onSuccess: () => {
                setShowModal(false);
                toast.success('Package saved successfully.');
                reset();
                setFeaturesList([]);
            },
            onError: () => {
                toast.error('Validation error. Please check the form inputs.');
            }
        });
    };

    const handleDelete = (pkgId) => {
        if (confirm('Are you sure you want to delete this package?')) {
            router.delete(route('services.packages.delete', pkgId), {
                onSuccess: () => toast.success('Package deleted.')
            });
        }
    };

    return (
        <>
            <Head title="Manage Packages — Services" />
            <AdminLayout>
                <div className="bg-[#f9fafb] min-h-screen py-8 px-6">
                    <div className="max-w-8xl mx-auto space-y-8">

                        {/* Page Header */}
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-5 border-b border-gray-150">
                            <div>
                                <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Service Management</span>
                                <h1 className="text-3xl font-black text-gray-900 tracking-tight leading-tight">
                                    Service Packages & Pricing
                                </h1>
                                <Breadcrumbs items={[
                                    { label: 'Services', href: '/services/all' },
                                    { label: 'Packages' }
                                ]} />
                            </div>
                            <div className="flex items-center gap-3">
                                <Link
                                    href="/services/all"
                                    className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold uppercase tracking-wider rounded-xl transition-all"
                                >
                                    ← All Services
                                </Link>
                                {selectedServiceId && (
                                    <button
                                        onClick={handleOpenAdd}
                                        className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md shadow-indigo-100 flex items-center gap-2"
                                    >
                                        ＋ Add Package
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Service Selector Card */}
                        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-6">
                            <div className="border-b border-gray-50 pb-4">
                                <h2 className="text-base font-black text-gray-800">Step 1 — Choose a Service</h2>
                                <p className="text-[11px] text-gray-400 mt-0.5">Select the service for which you want to manage packages.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {services && services.map((service) => (
                                    <button
                                        key={service.id}
                                        type="button"
                                        onClick={() => setSelectedServiceId(service.id)}
                                        className={`relative flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all duration-200 ${selectedServiceId == service.id
                                            ? 'border-indigo-500 bg-indigo-50/60 shadow-md shadow-indigo-100'
                                            : 'border-gray-100 bg-gray-50/50 hover:border-indigo-200 hover:bg-indigo-50/20'
                                            }`}
                                    >
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-base font-black shrink-0 ${selectedServiceId == service.id ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'
                                            }`}>
                                            {service.service_name.charAt(0)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className={`text-xs font-black truncate ${selectedServiceId == service.id ? 'text-indigo-700' : 'text-gray-800'}`}>
                                                {service.service_name}
                                            </p>
                                            <p className="text-[10px] text-gray-400 mt-0.5">
                                                {service.packages?.length || 0} packages
                                            </p>
                                        </div>
                                        {selectedServiceId == service.id && (
                                            <div className="absolute top-3 right-3 w-4 h-4 rounded-full bg-indigo-600 flex items-center justify-center">
                                                <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>

                            {(!services || services.length === 0) && (
                                <div className="py-8 text-center text-xs text-gray-400 italic">
                                    No services found.{' '}
                                    <Link href="/services/create" className="text-indigo-600 underline font-bold">Create a service first</Link>.
                                </div>
                            )}
                        </div>

                        {/* Packages List for Selected Service */}
                        {selectedService && (
                            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-6 animate-fadeIn">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-50 pb-4">
                                    <div>
                                        <h2 className="text-base font-black text-gray-800">
                                            Packages for: <span className="text-indigo-600">{selectedService.service_name}</span>
                                        </h2>
                                        <p className="text-[11px] text-gray-400 mt-0.5">
                                            {selectedService.packages?.length || 0} package tier(s) defined.
                                        </p>
                                    </div>
                                    <div className="flex gap-2">

                                        <button
                                            type="button"
                                            onClick={handleOpenAdd}
                                            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5"
                                        >
                                            ＋ Add Package
                                        </button>
                                    </div>
                                </div>

                                {/* Packages Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                    {selectedService.packages && selectedService.packages.map((pkg) => (
                                        <div key={pkg.id} className="group relative bg-gradient-to-br from-gray-50 to-white border border-gray-100 rounded-2xl p-5 hover:border-indigo-100 hover:shadow-md transition-all duration-200 flex flex-col justify-between">
                                            <div className="space-y-3">
                                                <div className="flex items-start justify-between">
                                                    <h3 className="text-sm font-black text-gray-900">{pkg.package_name}</h3>
                                                    <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider shrink-0 ${pkg.status === 1 ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-400'}`}>
                                                        {pkg.status === 1 ? 'Active' : 'Hidden'}
                                                    </span>
                                                </div>
                                                <div className="flex items-baseline gap-1">
                                                    <span className="text-2xl font-black text-indigo-600">₹{Number(pkg.price).toLocaleString('en-IN')}</span>
                                                </div>
                                                <p className="text-[10px] text-gray-500 leading-relaxed">{pkg.description || 'No description.'}</p>

                                                <div className="space-y-1.5">
                                                    <span className="text-[9px] text-gray-400 font-black uppercase tracking-wider block">Inclusions</span>
                                                    {pkg.features && pkg.features.slice(0, 4).map((feat, i) => (
                                                        <div key={i} className="flex items-center gap-2">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"></div>
                                                            <span className="text-[10px] text-gray-600">{feat}</span>
                                                        </div>
                                                    ))}
                                                    {pkg.features && pkg.features.length > 4 && (
                                                        <span className="text-[9px] text-gray-400 italic">+ {pkg.features.length - 4} more</span>
                                                    )}
                                                    {(!pkg.features || pkg.features.length === 0) && (
                                                        <span className="text-[9px] text-gray-400 italic">No features listed.</span>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="pt-4 border-t border-gray-100 mt-4 flex items-center justify-between">
                                                <span className="text-[9px] font-bold text-gray-400">
                                                    🕐 {pkg.delivery_days} day delivery
                                                </span>
                                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={() => handleOpenEdit(pkg)}
                                                        className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                                                    >
                                                        ✏️
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(pkg.id)}
                                                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                                    >
                                                        🗑️
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    {(!selectedService.packages || selectedService.packages.length === 0) && (
                                        <div className="col-span-full py-12 text-center space-y-3">
                                            <div className="w-14 h-14 bg-indigo-50 rounded-full flex items-center justify-center mx-auto">
                                                <svg className="w-7 h-7 text-indigo-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-gray-600">No packages yet for this service</p>
                                                <p className="text-[10px] text-gray-400 mt-0.5">Create Silver, Gold, or Platinum tiers for your clients.</p>
                                            </div>
                                            <button
                                                onClick={handleOpenAdd}
                                                className="inline-flex px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all"
                                            >
                                                ＋ Create First Package
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Package Create / Edit Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black/55 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 max-w-lg w-full overflow-hidden animate-scaleUp">
                            <div className="px-6 py-5 border-b border-gray-50 flex items-center justify-between">
                                <div>
                                    <h3 className="text-sm font-black text-gray-900">
                                        {editingPackage ? 'Edit Package Tier' : 'Create Package Tier'}
                                    </h3>
                                    <p className="text-[10px] text-gray-400 mt-0.5">
                                        For service: <span className="font-bold text-indigo-600">{selectedService?.service_name}</span>
                                    </p>
                                </div>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="text-gray-400 hover:text-gray-900 text-sm font-bold p-1 transition-colors"
                                >
                                    ✕
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-5">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Tier Title *</label>
                                        <input
                                            type="text"
                                            value={data.package_name}
                                            onChange={(e) => setData('package_name', e.target.value)}
                                            placeholder="e.g. Gold Heirloom"
                                            className="w-full px-3.5 py-2.5 bg-gray-50 border-transparent rounded-xl text-xs font-bold outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all"
                                            required
                                        />
                                        {errors.package_name && <p className="text-red-500 text-[9px] font-bold">{errors.package_name}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Base Price (₹) *</label>
                                        <input
                                            type="number"
                                            value={data.price}
                                            onChange={(e) => setData('price', e.target.value)}
                                            placeholder="e.g. 150000"
                                            className="w-full px-3.5 py-2.5 bg-gray-50 border-transparent rounded-xl text-xs font-bold outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all"
                                            required
                                        />
                                        {errors.price && <p className="text-red-500 text-[9px] font-bold">{errors.price}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Delivery Days</label>
                                        <input
                                            type="number"
                                            value={data.delivery_days}
                                            onChange={(e) => setData('delivery_days', parseInt(e.target.value) || 0)}
                                            className="w-full px-3.5 py-2.5 bg-gray-50 border-transparent rounded-xl text-xs outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Display Order</label>
                                        <input
                                            type="number"
                                            value={data.display_order}
                                            onChange={(e) => setData('display_order', parseInt(e.target.value) || 0)}
                                            className="w-full px-3.5 py-2.5 bg-gray-50 border-transparent rounded-xl text-xs outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Status</label>
                                        <select
                                            value={data.status}
                                            onChange={(e) => setData('status', parseInt(e.target.value))}
                                            className="w-full px-3.5 py-2.5 bg-gray-50 border-transparent rounded-xl text-xs font-bold text-gray-600 outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all appearance-none"
                                        >
                                            <option value={1}>Active</option>
                                            <option value={0}>Inactive</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Brief Description</label>
                                    <textarea
                                        rows="2"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        placeholder="Summary of what's included in this package..."
                                        className="w-full px-3.5 py-2.5 bg-gray-50 border-transparent rounded-xl text-xs outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
                                    />
                                </div>

                                {/* Features */}
                                <div className="space-y-3 pt-3 border-t border-gray-50">
                                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block">
                                        Core Deliverables & Features
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={featureInput}
                                            onChange={(e) => setFeatureInput(e.target.value)}
                                            placeholder="e.g. Drone Coverage, 500 Edited Photos..."
                                            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddFeature(); } }}
                                            className="flex-1 px-3.5 py-2.5 bg-gray-50 border-transparent rounded-xl text-xs outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleAddFeature}
                                            className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 text-xs font-black rounded-xl transition-all whitespace-nowrap"
                                        >
                                            ＋ Add
                                        </button>
                                    </div>

                                    <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto">
                                        {featuresList.map((feat, idx) => (
                                            <span key={idx} className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-50/50 text-indigo-700 border border-indigo-100 rounded-lg text-[9px] font-bold">
                                                {feat}
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveFeature(idx)}
                                                    className="text-indigo-400 hover:text-red-600 font-extrabold text-[10px] ml-0.5"
                                                >
                                                    ✕
                                                </button>
                                            </span>
                                        ))}
                                        {featuresList.length === 0 && (
                                            <span className="text-[9px] text-gray-400 italic py-1">No deliverables added yet.</span>
                                        )}
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-50 flex justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="px-4 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-500 text-xs font-bold rounded-xl transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white text-xs font-black uppercase rounded-xl transition-all shadow-lg shadow-indigo-100"
                                    >
                                        {processing ? 'Saving...' : 'Save Package'}
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

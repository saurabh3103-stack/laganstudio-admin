import React, { useState } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Breadcrumbs from '@/Components/Breadcrumbs';
import { toast } from '@/Utils/toast';

export default function FaqIndex({ services }) {
    const [selectedServiceId, setSelectedServiceId] = useState(services?.[0]?.id || '');
    const [showModal, setShowModal] = useState(false);
    const [editingFaq, setEditingFaq] = useState(null);

    const selectedService = services?.find(s => s.id == selectedServiceId);

    const { data, setData, post, processing, errors, reset } = useForm({
        id: '',
        question: '',
        answer: '',
        display_order: 0,
        status: 1,
    });

    const handleOpenAdd = () => {
        setEditingFaq(null);
        reset();
        setData({
            id: '',
            question: '',
            answer: '',
            display_order: 0,
            status: 1,
        });
        setShowModal(true);
    };

    const handleOpenEdit = (faq) => {
        setEditingFaq(faq);
        setData({
            id: faq.id,
            question: faq.question,
            answer: faq.answer,
            display_order: faq.display_order,
            status: faq.status,
        });
        setShowModal(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedServiceId) {
            toast.error('Please choose a service first.');
            return;
        }
        post(route('services.faqs.save', selectedServiceId), {
            onSuccess: () => {
                setShowModal(false);
                toast.success('FAQ saved successfully.');
                reset();
            },
            onError: () => {
                toast.error('Validation error. Please check the form.');
            }
        });
    };

    const handleDelete = (faqId) => {
        if (confirm('Are you sure you want to delete this FAQ?')) {
            router.delete(route('services.faqs.delete', faqId), {
                onSuccess: () => toast.success('FAQ deleted.')
            });
        }
    };

    return (
        <>
            <Head title="Manage FAQs — Services" />
            <AdminLayout>
                <div className="bg-[#f9fafb] min-h-screen py-8 px-6">
                    <div className="max-w-8xl mx-auto space-y-8">

                        {/* Page Header */}
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-5 border-b border-gray-150">
                            <div>
                                <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Service Management</span>
                                <h1 className="text-3xl font-black text-gray-900 tracking-tight leading-tight">
                                    Frequently Asked Questions
                                </h1>
                                <Breadcrumbs items={[
                                    { label: 'Services', href: '/services/all' },
                                    { label: 'FAQs' }
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
                                        ＋ Add FAQ
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Service Selector Card */}
                        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-6">
                            <div className="border-b border-gray-50 pb-4">
                                <h2 className="text-base font-black text-gray-800">Step 1 — Choose a Service</h2>
                                <p className="text-[11px] text-gray-400 mt-0.5">Select the service for which you want to manage FAQs.</p>
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
                                                {service.faqs?.length || 0} FAQs
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

                        {/* FAQs List for Selected Service */}
                        {selectedService && (
                            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-6 animate-fadeIn">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-50 pb-4">
                                    <div>
                                        <h2 className="text-base font-black text-gray-800">
                                            FAQs for: <span className="text-indigo-600">{selectedService.service_name}</span>
                                        </h2>
                                        <p className="text-[11px] text-gray-400 mt-0.5">
                                            {selectedService.faqs?.length || 0} question(s) defined for this service.
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            type="button"
                                            onClick={handleOpenAdd}
                                            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5"
                                        >
                                            ＋ Add FAQ
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {selectedService.faqs && selectedService.faqs.map((faq, index) => (
                                        <div key={faq.id} className="group flex items-start gap-4 p-5 bg-gray-50/50 rounded-2xl border border-gray-100 hover:border-indigo-100 hover:bg-indigo-50/20 transition-all">
                                            <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                                                {index + 1}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-black text-gray-900 leading-relaxed">{faq.question}</p>
                                                <p className="text-[10px] text-gray-500 mt-1.5 leading-relaxed line-clamp-2">{faq.answer}</p>
                                            </div>
                                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                                                <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${faq.status === 1 ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-400'}`}>
                                                    {faq.status === 1 ? 'Active' : 'Hidden'}
                                                </span>
                                                <button
                                                    onClick={() => handleOpenEdit(faq)}
                                                    className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                                                    title="Edit FAQ"
                                                >
                                                    ✏️
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(faq.id)}
                                                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                                    title="Delete FAQ"
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        </div>
                                    ))}

                                    {(!selectedService.faqs || selectedService.faqs.length === 0) && (
                                        <div className="py-12 text-center space-y-3">
                                            <div className="w-14 h-14 bg-indigo-50 rounded-full flex items-center justify-center mx-auto">
                                                <svg className="w-7 h-7 text-indigo-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-gray-600">No FAQs yet for this service</p>
                                                <p className="text-[10px] text-gray-400 mt-0.5">Click "+ Add FAQ" to create the first question.</p>
                                            </div>
                                            <button
                                                onClick={handleOpenAdd}
                                                className="inline-flex px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all"
                                            >
                                                ＋ Add First FAQ
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* FAQ Create / Edit Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black/55 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 max-w-lg w-full overflow-hidden animate-scaleUp">
                            <div className="px-6 py-5 border-b border-gray-50 flex items-center justify-between">
                                <div>
                                    <h3 className="text-sm font-black text-gray-900">
                                        {editingFaq ? 'Edit FAQ' : 'Add New FAQ'}
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
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="col-span-2 space-y-2">
                                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Question *</label>
                                        <input
                                            type="text"
                                            value={data.question}
                                            onChange={(e) => setData('question', e.target.value)}
                                            placeholder="e.g. Do you travel outside city?"
                                            className="w-full px-3.5 py-2.5 bg-gray-50 border-transparent rounded-xl text-xs font-bold outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all"
                                            required
                                        />
                                        {errors.question && <p className="text-red-500 text-[9px] font-bold">{errors.question}</p>}
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
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Answer *</label>
                                    <textarea
                                        rows="4"
                                        value={data.answer}
                                        onChange={(e) => setData('answer', e.target.value)}
                                        placeholder="Write a detailed, helpful answer for your clients..."
                                        className="w-full px-3.5 py-2.5 bg-gray-50 border-transparent rounded-xl text-xs outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all resize-none leading-relaxed"
                                        required
                                    />
                                    {errors.answer && <p className="text-red-500 text-[9px] font-bold">{errors.answer}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Status</label>
                                    <select
                                        value={data.status}
                                        onChange={(e) => setData('status', parseInt(e.target.value))}
                                        className="w-full px-3.5 py-2.5 bg-gray-50 border-transparent rounded-xl text-xs font-bold text-gray-600 outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all appearance-none"
                                    >
                                        <option value={1}>Active (Visible)</option>
                                        <option value={0}>Hidden</option>
                                    </select>
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
                                        {processing ? 'Saving...' : 'Save FAQ'}
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

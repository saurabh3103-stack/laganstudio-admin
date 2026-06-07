import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Breadcrumbs from '@/Components/Breadcrumbs';
import { Icon } from '@/Components/Icon';
import { toast } from '@/Utils/toast';

export default function About({ about }) {
    const [imagePreview, setImagePreview] = useState(about?.image_path || null);

    const { data, setData, post, processing, errors } = useForm({
        title: about?.title || '',
        subtitle: about?.subtitle || '',
        description_1: about?.description_1 || '',
        description_2: about?.description_2 || '',
        stat_1_value: about?.stat_1_value || '',
        stat_1_label: about?.stat_1_label || '',
        stat_2_value: about?.stat_2_value || '',
        stat_2_label: about?.stat_2_label || '',
        stat_3_value: about?.stat_3_value || '',
        stat_3_label: about?.stat_3_label || '',
        stat_4_value: about?.stat_4_value || '',
        stat_4_label: about?.stat_4_label || '',
        image: null,
    });

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
        
        post(route('home.about.update'), {
            forceFormData: true,
            onSuccess: () => {
                toast.success('About section updated successfully.');
            },
            onError: () => {
                toast.error('Validation error. Please verify the form inputs.');
            }
        });
    };

    return (
        <>
            <Head title="About Section - Admin" />
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
                                    About Section
                                </h1>
                                <Breadcrumbs items={[{ label: 'Home Content' }, { label: 'About Section' }]} />
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-8">
                                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-6">
                                    <h3 className="text-sm font-black text-gray-800 uppercase tracking-wider flex items-center gap-2">
                                        <Icon name="feather__file_text" className="w-4 h-4 text-indigo-500" />
                                        Main Content
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Title Heading *</label>
                                            <input type="text" required value={data.title} onChange={e => setData('title', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl text-xs font-bold outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500" placeholder="The Royal Wedding Film Company" />
                                            {errors.title && <p className="text-red-500 text-[10px] font-bold">{errors.title}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Subtitle / Kicker *</label>
                                            <input type="text" required value={data.subtitle} onChange={e => setData('subtitle', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl text-xs font-bold outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500" placeholder="WHO WE ARE" />
                                            {errors.subtitle && <p className="text-red-500 text-[10px] font-bold">{errors.subtitle}</p>}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Description Paragraph 1 *</label>
                                        <textarea required value={data.description_1} onChange={e => setData('description_1', e.target.value)} rows="4" className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl text-xs outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 resize-none" placeholder="Founded in 2012 in Kanpur..."></textarea>
                                        {errors.description_1 && <p className="text-red-500 text-[10px] font-bold">{errors.description_1}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Description Paragraph 2</label>
                                        <textarea value={data.description_2} onChange={e => setData('description_2', e.target.value)} rows="5" className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl text-xs outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 resize-none" placeholder="Our team of passionate storytellers..."></textarea>
                                        {errors.description_2 && <p className="text-red-500 text-[10px] font-bold">{errors.description_2}</p>}
                                    </div>
                                </div>

                                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-6">
                                    <h3 className="text-sm font-black text-gray-800 uppercase tracking-wider flex items-center gap-2">
                                        <Icon name="feather__bar_chart_2" className="w-4 h-4 text-pink-500" />
                                        Statistics Counters
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-4">
                                            <div className="space-y-1">
                                                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Stat 1 Value</label>
                                                <input type="text" value={data.stat_1_value} onChange={e => setData('stat_1_value', e.target.value)} className="w-full px-3 py-2 bg-white border-transparent rounded-lg text-xs font-bold outline-none focus:ring-2 focus:ring-indigo-500" placeholder="12+" />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Stat 1 Label</label>
                                                <input type="text" value={data.stat_1_label} onChange={e => setData('stat_1_label', e.target.value)} className="w-full px-3 py-2 bg-white border-transparent rounded-lg text-xs outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Years of Excellence" />
                                            </div>
                                        </div>

                                        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-4">
                                            <div className="space-y-1">
                                                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Stat 2 Value</label>
                                                <input type="text" value={data.stat_2_value} onChange={e => setData('stat_2_value', e.target.value)} className="w-full px-3 py-2 bg-white border-transparent rounded-lg text-xs font-bold outline-none focus:ring-2 focus:ring-indigo-500" placeholder="1500+" />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Stat 2 Label</label>
                                                <input type="text" value={data.stat_2_label} onChange={e => setData('stat_2_label', e.target.value)} className="w-full px-3 py-2 bg-white border-transparent rounded-lg text-xs outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Weddings Captured" />
                                            </div>
                                        </div>

                                        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-4">
                                            <div className="space-y-1">
                                                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Stat 3 Value</label>
                                                <input type="text" value={data.stat_3_value} onChange={e => setData('stat_3_value', e.target.value)} className="w-full px-3 py-2 bg-white border-transparent rounded-lg text-xs font-bold outline-none focus:ring-2 focus:ring-indigo-500" placeholder="50+" />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Stat 3 Label</label>
                                                <input type="text" value={data.stat_3_label} onChange={e => setData('stat_3_label', e.target.value)} className="w-full px-3 py-2 bg-white border-transparent rounded-lg text-xs outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Cities Covered" />
                                            </div>
                                        </div>

                                        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-4">
                                            <div className="space-y-1">
                                                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Stat 4 Value</label>
                                                <input type="text" value={data.stat_4_value} onChange={e => setData('stat_4_value', e.target.value)} className="w-full px-3 py-2 bg-white border-transparent rounded-lg text-xs font-bold outline-none focus:ring-2 focus:ring-indigo-500" placeholder="4.9" />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Stat 4 Label</label>
                                                <input type="text" value={data.stat_4_label} onChange={e => setData('stat_4_label', e.target.value)} className="w-full px-3 py-2 bg-white border-transparent rounded-lg text-xs outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Average Rating" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-6">
                                    <h3 className="text-sm font-black text-gray-800 uppercase tracking-wider flex items-center gap-2">
                                        <Icon name="feather__image" className="w-4 h-4 text-emerald-500" />
                                        Side Image
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="relative h-96 w-full rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/50 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-300 transition-all overflow-hidden">
                                            {imagePreview ? (
                                                <div className="relative w-full h-full group">
                                                    <img src={imagePreview} className="absolute inset-0 w-full h-full object-cover" alt="Preview" />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                        <span className="text-[9px] font-black text-white uppercase tracking-widest bg-black/50 px-4 py-2 rounded-full">Change Photo</span>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center p-6 text-center">
                                                    <div className="p-3.5 rounded-2xl bg-white shadow-sm border border-gray-100 mb-3">
                                                        <Icon name="feather__camera" className="w-6 h-6 text-gray-400" />
                                                    </div>
                                                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Upload Side Image</span>
                                                    <span className="text-[9px] text-gray-400 mt-1">Recommended: Portrait orientation (e.g. 800x1200)</span>
                                                </div>
                                            )}
                                            <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
                                        </div>
                                        {errors.image && <p className="text-red-500 text-[10px] font-bold">{errors.image}</p>}
                                    </div>
                                </div>

                                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
                                    <h4 className="text-xs font-black text-gray-800 uppercase tracking-widest">Publish Changes</h4>
                                    <p className="text-xs text-gray-400 leading-relaxed">Save the content to instantly update your public about section.</p>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black uppercase tracking-widest rounded-2xl transition-all shadow-md shadow-indigo-100 flex items-center justify-center gap-2"
                                    >
                                        {processing ? 'Saving...' : 'Save About Section'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </AdminLayout>
        </>
    );
}

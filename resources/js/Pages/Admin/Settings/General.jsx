import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Icon } from '@/Components/Icon';
import Breadcrumbs from '@/Components/Breadcrumbs';
import { toast } from '@/Utils/toast';

export default function General({ settings }) {
    const [logoPreview, setLogoPreview] = useState(settings?.logo_path || 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=80&h=80&q=80');
    const [faviconPreview, setFaviconPreview] = useState(settings?.favicon_path || null);

    const { data, setData, post, processing, errors } = useForm({
        app_name: settings?.app_name || 'Lagan Studio',
        app_title: settings?.app_title || 'Lagan Studio | Elegant Indian Wedding Cinematic Photography',
        email: settings?.email || 'contact@laganstudio.com',
        phone: settings?.phone || '+91 99887 76655',
        address: settings?.address || 'Plot 45, Lal Kothi, Jaipur, Rajasthan, India',
        facebook: settings?.facebook || 'https://facebook.com/laganstudio',
        instagram: settings?.instagram || 'https://instagram.com/laganstudio',
        youtube: settings?.youtube || 'https://youtube.com/laganstudio',
        smtp_host: settings?.smtp_host || 'smtp.mailgun.org',
        smtp_port: settings?.smtp_port || '587',
        smtp_user: settings?.smtp_user || 'postmaster@mg.laganstudio.com',
        smtp_pass: settings?.smtp_pass || '••••••••••••••••••••',
        logo: null,
        favicon: null,
    });

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('logo', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoPreview(reader.result);
                toast.success('Logo preview updated!');
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFaviconChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('favicon', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setFaviconPreview(reader.result);
                toast.success('Favicon preview updated!');
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveSettings = (e) => {
        e.preventDefault();
        post(route('settings.general.update'), {
            forceFormData: true,
            onSuccess: () => {
                toast.success('General settings and Mail Configurations saved successfully!');
            },
            onError: () => {
                toast.error('Validation error. Please verify the form inputs.');
            }
        });
    };

    return (
        <>
            <Head title="General Settings - Admin" />
            <AdminLayout>
                <div className="page bg-[#f9fafb] min-h-screen py-8 px-6">
                    <div className="max-w-8xl mx-auto space-y-8">
                        {/* Header Navigation */}
                        <div className="border-b border-gray-100 pb-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="space-y-1">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                                    System Configurations
                                </span>
                                <h1 className="text-3xl font-black text-gray-900 tracking-tight">
                                    General Settings
                                </h1>
                                <Breadcrumbs items={[{ label: 'Settings', href: '/settings/general' }, { label: 'General Settings' }]} />
                            </div>
                        </div>

                        <form onSubmit={handleSaveSettings} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Main configurations */}
                            <div className="lg:col-span-2 space-y-8">
                                {/* App identity & details */}
                                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-6">
                                    <h3 className="text-sm font-black text-gray-800 uppercase tracking-wider flex items-center gap-2">
                                        <Icon name="feather__plus" className="w-4 h-4 text-indigo-500" />
                                        Application Information
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">App Display Name</label>
                                            <input
                                                type="text"
                                                required
                                                value={data.app_name}
                                                onChange={(e) => setData('app_name', e.target.value)}
                                                className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold"
                                            />
                                            {errors.app_name && <p className="text-red-500 text-[10px] font-bold">{errors.app_name}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">SEO Page Title Pattern</label>
                                            <input
                                                type="text"
                                                required
                                                value={data.app_title}
                                                onChange={(e) => setData('app_title', e.target.value)}
                                                className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                            />
                                            {errors.app_title && <p className="text-red-500 text-[10px] font-bold">{errors.app_title}</p>}
                                        </div>
                                    </div>

                                    {/* Logo Upload Block */}
                                    <div className="flex flex-col sm:flex-row items-center gap-6 p-4 bg-gray-50/50 rounded-2xl border border-gray-100">
                                        <div className="w-20 h-20 bg-white rounded-2xl border border-gray-200 overflow-hidden shrink-0 flex items-center justify-center p-2">
                                            <img src={logoPreview} className="max-w-full max-h-full object-contain rounded-xl" alt="Logo Preview" />
                                        </div>
                                        <div className="space-y-2 text-center sm:text-left">
                                            <h4 className="text-xs font-black text-gray-800 uppercase tracking-wider">App Brand Logo</h4>
                                            <p className="text-[10px] text-gray-400">Upload a high-resolution PNG transparent brand logo (Recommended 512x512px).</p>
                                            <div className="inline-block relative">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleLogoChange}
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                />
                                                <button
                                                    type="button"
                                                    className="px-4 py-2 border border-gray-200 hover:bg-gray-100 text-gray-700 text-[10px] font-black uppercase tracking-wider rounded-xl transition-all"
                                                >
                                                    Choose Logo File
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    {errors.logo && <p className="text-red-500 text-[10px] font-bold">{errors.logo}</p>}

                                    {/* Favicon Upload Block */}
                                    <div className="flex flex-col sm:flex-row items-center gap-6 p-4 bg-gray-50/50 rounded-2xl border border-gray-100 mt-4">
                                        <div className="w-16 h-16 bg-white rounded-2xl border border-gray-200 overflow-hidden shrink-0 flex items-center justify-center p-2">
                                            {faviconPreview ? (
                                                <img src={faviconPreview} className="max-w-full max-h-full object-contain rounded-lg" alt="Favicon Preview" />
                                            ) : (
                                                <Icon name="feather__globe" className="w-6 h-6 text-gray-400" />
                                            )}
                                        </div>
                                        <div className="space-y-2 text-center sm:text-left">
                                            <h4 className="text-xs font-black text-gray-800 uppercase tracking-wider">Site Favicon</h4>
                                            <p className="text-[10px] text-gray-400">Upload an icon (ICO/PNG) to display in the browser tab (Recommended 32x32px or 64x64px).</p>
                                            <div className="inline-block relative">
                                                <input
                                                    type="file"
                                                    accept="image/png, image/x-icon, image/jpeg"
                                                    onChange={handleFaviconChange}
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                />
                                                <button
                                                    type="button"
                                                    className="px-4 py-2 border border-gray-200 hover:bg-gray-100 text-gray-700 text-[10px] font-black uppercase tracking-wider rounded-xl transition-all"
                                                >
                                                    Choose Favicon File
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    {errors.favicon && <p className="text-red-500 text-[10px] font-bold">{errors.favicon}</p>}
                                </div>

                                {/* Contact Details settings */}
                                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-6">
                                    <h3 className="text-sm font-black text-gray-800 uppercase tracking-wider flex items-center gap-2">
                                        <Icon name="feather__plus" className="w-4 h-4 text-emerald-500" />
                                        Company Contact Parameters
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Public Mailbox</label>
                                            <input
                                                type="email"
                                                required
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-semibold"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Helpdesk Hotline</label>
                                            <input
                                                type="text"
                                                required
                                                value={data.phone}
                                                onChange={(e) => setData('phone', e.target.value)}
                                                className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-semibold"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Studio Headquarters Address</label>
                                        <input
                                            type="text"
                                            required
                                            value={data.address}
                                            onChange={(e) => setData('address', e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                {/* SMTP config parameters */}
                                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-6">
                                    <h3 className="text-sm font-black text-gray-800 uppercase tracking-wider flex items-center gap-2">
                                        <Icon name="feather__plus" className="w-4 h-4 text-pink-500" />
                                        SMTP Mail Server Configuration
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="md:col-span-2 space-y-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">SMTP Host Outgoing Server</label>
                                            <input
                                                type="text"
                                                value={data.smtp_host}
                                                onChange={(e) => setData('smtp_host', e.target.value)}
                                                className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">SMTP Port</label>
                                            <input
                                                type="text"
                                                value={data.smtp_port}
                                                onChange={(e) => setData('smtp_port', e.target.value)}
                                                className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">SMTP Server Username</label>
                                            <input
                                                type="text"
                                                value={data.smtp_user}
                                                onChange={(e) => setData('smtp_user', e.target.value)}
                                                className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">SMTP Access Password</label>
                                            <input
                                                type="password"
                                                value={data.smtp_pass}
                                                onChange={(e) => setData('smtp_pass', e.target.value)}
                                                className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Social parameters */}
                            <div className="space-y-8">
                                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-6">
                                    <h3 className="text-sm font-black text-gray-800 uppercase tracking-wider">
                                        Social Media Handles
                                    </h3>

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Facebook Channel</label>
                                            <div className="relative">
                                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                                    f
                                                </span>
                                                <input
                                                    type="url"
                                                    value={data.facebook}
                                                    onChange={(e) => setData('facebook', e.target.value)}
                                                    className="w-full pl-8 pr-4 py-2.5 bg-gray-50 border-transparent rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Instagram Profile</label>
                                            <div className="relative">
                                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                                    ig
                                                </span>
                                                <input
                                                    type="url"
                                                    value={data.instagram}
                                                    onChange={(e) => setData('instagram', e.target.value)}
                                                    className="w-full pl-8 pr-4 py-2.5 bg-gray-50 border-transparent rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">YouTube Channel</label>
                                            <div className="relative">
                                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                                    yt
                                                </span>
                                                <input
                                                    type="url"
                                                    value={data.youtube}
                                                    onChange={(e) => setData('youtube', e.target.value)}
                                                    className="w-full pl-8 pr-4 py-2.5 bg-gray-50 border-transparent rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
                                    <h4 className="text-xs font-black text-gray-800 uppercase tracking-widest">Publish Options</h4>
                                    <p className="text-xs text-gray-400 leading-relaxed">Ensure all modifications are correct before publishing setting updates.</p>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black uppercase tracking-widest rounded-2xl transition-all shadow-md shadow-indigo-100 flex items-center justify-center gap-2 disabled:opacity-50"
                                    >
                                        {processing ? 'Saving Configurations...' : 'Save Settings'}
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

import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Breadcrumbs from '@/Components/Breadcrumbs';

export default function NewsletterList({ subscribers, stats, filters }) {
    const [searchQuery, setSearchQuery] = useState(filters?.search || '');
    const [viewMode, setViewMode] = useState('grid'); // 'list' or 'grid'

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/queries/newsletter', { search: searchQuery }, { preserveState: true });
    };

    const toggleStatus = (id) => {
        router.post(`/queries/newsletter/${id}/toggle-status`, {}, {
            preserveScroll: true
        });
    };

    const deleteSubscriber = (id) => {
        if (confirm('Are you sure you want to delete this subscriber?')) {
            router.delete(`/queries/newsletter/${id}`, {
                preserveScroll: true
            });
        }
    };

    return (
        <AdminLayout>
            <Head title="Newsletter Subscribers | Lagan Studio" />

            <div className="min-h-[calc(100vh-64px)] bg-[#f8fafc] p-4 sm:p-6 lg:p-8">
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Header Section */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div className="space-y-1">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                                    Communications
                                </span>
                                <h1 className="text-3xl font-black text-gray-900 tracking-tight">
                                    Newsletter Subscribers
                                </h1>
                                <Breadcrumbs items={[{ label: 'Queries', href: '#' }, { label: 'Newsletter' }]} />
                            </div>

                            {/* Stats */}
                            <div className="flex items-center gap-4">
                                <div className="bg-indigo-50 px-4 py-2 rounded-xl border border-indigo-100 flex flex-col items-center justify-center">
                                    <span className="text-xs text-indigo-500 font-bold uppercase">Total</span>
                                    <span className="text-xl font-black text-indigo-700">{stats.total}</span>
                                </div>
                                <div className="bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100 flex flex-col items-center justify-center">
                                    <span className="text-xs text-emerald-500 font-bold uppercase">Active</span>
                                    <span className="text-xl font-black text-emerald-700">{stats.active}</span>
                                </div>
                            </div>
                        </div>

                        {/* Search and Filters */}
                        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100 pt-6">
                            <form onSubmit={handleSearch} className="w-full sm:w-96 relative">
                                <input
                                    type="text"
                                    placeholder="Search by email..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-gray-400 font-medium"
                                />
                                <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <button type="submit" className="hidden"></button>
                            </form>
                        </div>
                    </div>

                    {/* Content Section */}
                    {subscribers.length === 0 ? (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 flex flex-col items-center justify-center text-center">
                            <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center mb-4">
                                <svg className="w-10 h-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">No subscribers found</h3>
                            <p className="text-gray-500 font-medium max-w-sm">
                                {searchQuery ? "No subscribers match your search." : "No one has subscribed to the newsletter yet."}
                            </p>
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50/80 border-b border-gray-100 text-xs uppercase tracking-wider font-bold text-gray-500">
                                            <th className="p-4 pl-6">Email Address</th>
                                            <th className="p-4">Status</th>
                                            <th className="p-4">Subscribed At</th>
                                            <th className="p-4 pr-6 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {subscribers.map((subscriber) => (
                                            <tr 
                                                key={subscriber.id} 
                                                className="hover:bg-gray-50/50 transition-colors group"
                                            >
                                                <td className="p-4 pl-6">
                                                    <div className="font-semibold text-gray-900">{subscriber.email}</div>
                                                </td>
                                                <td className="p-4">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                                                        subscriber.status === 'Active' 
                                                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                                                            : 'bg-red-50 text-red-700 border border-red-200'
                                                    }`}>
                                                        {subscriber.status}
                                                    </span>
                                                </td>
                                                <td className="p-4">
                                                    <div className="text-sm font-medium text-gray-500">{subscriber.created_at}</div>
                                                </td>
                                                <td className="p-4 pr-6">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button
                                                            onClick={() => toggleStatus(subscriber.id)}
                                                            className={`p-2 rounded-lg transition-colors border ${
                                                                subscriber.status === 'Active'
                                                                    ? 'text-amber-600 hover:bg-amber-50 border-transparent hover:border-amber-200'
                                                                    : 'text-emerald-600 hover:bg-emerald-50 border-transparent hover:border-emerald-200'
                                                            }`}
                                                            title={subscriber.status === 'Active' ? 'Unsubscribe' : 'Resubscribe'}
                                                        >
                                                            {subscriber.status === 'Active' ? (
                                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                                                </svg>
                                                            ) : (
                                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                                </svg>
                                                            )}
                                                        </button>
                                                        <button
                                                            onClick={() => deleteSubscriber(subscriber.id)}
                                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-200"
                                                            title="Delete"
                                                        >
                                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}

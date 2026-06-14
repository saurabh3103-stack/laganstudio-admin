import React, { useState, useEffect } from 'react';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Icon } from '@/Components/Icon';
import Breadcrumbs from '@/Components/Breadcrumbs';
import Modal from '@/Components/Modal';
import { toast } from '@/Utils/toast';

export default function ContactQueries({ queries, stats, filters }) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [selectedStatus, setSelectedStatus] = useState(filters.status || '');
    const [selectedQuery, setSelectedQuery] = useState(null);

    // Synchronize filters to the server
    const applyFilters = () => {
        router.get(route('queries.contact'), {
            search: searchTerm,
            status: selectedStatus,
        }, {
            preserveState: true,
            replace: true
        });
    };

    // Debounce or trigger filter update
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            applyFilters();
        }, 400);

        return () => clearTimeout(delayDebounce);
    }, [searchTerm, selectedStatus]);

    const handleToggleStatus = (id) => {
        router.post(route('queries.contact.updateStatus', id), {}, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Query status updated.');
            }
        });
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this query?')) {
            router.delete(route('queries.contact.destroy', id), {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Query deleted successfully.');
                    setSelectedQuery(null);
                }
            });
        }
    };

    return (
        <>
            <Head title="Contact Queries" />
            <AdminLayout>
                <div className="page bg-[#f9fafb] min-h-screen py-8 px-6">
                    <div className="max-w-8xl mx-auto space-y-8">

                        {/* Header Box */}
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-gray-100 pb-5">
                            <div className="space-y-1">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                                    Communications
                                </span>
                                <h1 className="text-3xl font-black text-gray-900 tracking-tight">
                                    Contact Queries
                                </h1>
                                <Breadcrumbs items={[{ label: 'Queries', href: '#' }, { label: 'Contact' }]} />
                            </div>
                        </div>

                        {/* Search & Statistics */}
                        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">

                            {/* Filters row */}
                            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-1">
                                <div className="relative flex-1 max-w-md">
                                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                        <Icon name="feather__search" className="w-4 h-4" />
                                    </span>
                                    <input
                                        type="text"
                                        placeholder="Search name, email, phone..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border-transparent rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                    />
                                </div>

                                <select
                                    value={selectedStatus}
                                    onChange={(e) => setSelectedStatus(e.target.value)}
                                    className="pl-4 pr-10 py-2.5 bg-gray-50 border-transparent rounded-xl text-xs outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer font-semibold text-gray-600"
                                >
                                    <option value="">All Statuses</option>
                                    <option value="Unread">Unread</option>
                                    <option value="Read">Read</option>
                                </select>
                            </div>

                            <div className="flex gap-8 items-center self-stretch justify-around md:justify-end md:gap-12 text-center border-t border-gray-50 pt-4 md:pt-0 md:border-t-0">
                                <div>
                                    <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total</span>
                                    <span className="text-2xl font-black text-gray-800">{stats.total}</span>
                                </div>
                                <div className="border-l border-gray-100 h-8 self-center"></div>
                                <div>
                                    <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Unread</span>
                                    <span className="text-2xl font-black text-amber-500">{stats.unread}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-6">
                            {/* Queries List */}
                            <div className="flex-1 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-gray-50 border-b border-gray-100">
                                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Date</th>
                                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Sender</th>
                                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Subject</th>
                                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {queries.map((query) => (
                                                <tr
                                                    key={query.id}
                                                    className={`hover:bg-gray-50/50 transition-colors cursor-pointer ${selectedQuery?.id === query.id ? 'bg-indigo-50/30' : ''}`}
                                                    onClick={() => setSelectedQuery(query)}
                                                >
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {query.created_at}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="font-semibold text-gray-900 text-sm">{query.name}</div>
                                                        <div className="text-xs text-gray-500 mt-0.5">{query.email}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-700 max-w-[200px] truncate">
                                                            {query.subject || 'No Subject'}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleToggleStatus(query.id);
                                                            }}
                                                            className={`px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-lg shadow-sm transition-all ${
                                                                query.status === 'Read'
                                                                    ? 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                                                                    : 'bg-amber-500 hover:bg-amber-600 text-white'
                                                            }`}
                                                        >
                                                            {query.status}
                                                        </button>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleDelete(query.id);
                                                            }}
                                                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg border border-transparent hover:border-red-100 transition-all"
                                                            title="Delete Query"
                                                        >
                                                            <Icon name="feather__trash" className="w-4 h-4" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                            {queries.length === 0 && (
                                                <tr>
                                                    <td colSpan="5" className="px-6 py-12 text-center text-gray-400 font-medium text-sm">
                                                        No contact queries found.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Details Modal */}
                            <Modal show={!!selectedQuery} onClose={() => setSelectedQuery(null)} maxWidth="xl">
                                {selectedQuery && (
                                    <div className="bg-white rounded-2xl p-6">
                                        <div className="flex items-start justify-between mb-6 border-b border-gray-100 pb-4">
                                            <div>
                                                <h3 className="text-lg font-black text-gray-900">Query Details</h3>
                                                <p className="text-xs text-gray-500 mt-1">{selectedQuery.created_at}</p>
                                            </div>
                                            <button
                                                onClick={() => setSelectedQuery(null)}
                                                className="text-gray-400 hover:text-gray-600 transition-colors"
                                            >
                                                <Icon name="feather__x" className="w-5 h-5" />
                                            </button>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="space-y-4">
                                                <div>
                                                    <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Sender Info</span>
                                                    <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                                                        <div className="flex items-center gap-3">
                                                            <Icon name="feather__user" className="w-4 h-4 text-gray-400 shrink-0" />
                                                            <span className="text-sm font-semibold text-gray-800">{selectedQuery.name}</span>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <Icon name="feather__mail" className="w-4 h-4 text-gray-400 shrink-0" />
                                                            <a href={`mailto:${selectedQuery.email}`} className="text-sm text-indigo-600 hover:text-indigo-700 hover:underline">{selectedQuery.email}</a>
                                                        </div>
                                                        {selectedQuery.phone && (
                                                            <div className="flex items-center gap-3">
                                                                <Icon name="feather__phone" className="w-4 h-4 text-gray-400 shrink-0" />
                                                                <a href={`tel:${selectedQuery.phone}`} className="text-sm text-indigo-600 hover:text-indigo-700 hover:underline">{selectedQuery.phone}</a>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                <div>
                                                    <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Subject</span>
                                                    <div className="text-sm font-medium text-gray-800 bg-white border border-gray-100 rounded-xl p-3">
                                                        {selectedQuery.subject || 'No Subject Provided'}
                                                    </div>
                                                </div>

                                                <div>
                                                    <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Message</span>
                                                    <div className="text-sm text-gray-700 bg-white border border-gray-100 rounded-xl p-4 whitespace-pre-wrap leading-relaxed shadow-inner">
                                                        {selectedQuery.message}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex gap-3 pt-4 border-t border-gray-100">
                                                <button
                                                    onClick={() => setSelectedQuery(null)}
                                                    className="py-2.5 px-4 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2"
                                                >
                                                    Close
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        handleToggleStatus(selectedQuery.id);
                                                        // Update local state temporarily to reflect change instantly in modal
                                                        setSelectedQuery({ ...selectedQuery, status: selectedQuery.status === 'Read' ? 'Unread' : 'Read' });
                                                    }}
                                                    className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 ${
                                                        selectedQuery.status === 'Read'
                                                            ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                                                            : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700'
                                                    }`}
                                                >
                                                    <Icon name={selectedQuery.status === 'Read' ? 'feather__eyeOff' : 'feather__eye'} className="w-4 h-4" />
                                                    Mark as {selectedQuery.status === 'Read' ? 'Unread' : 'Read'}
                                                </button>
                                                <a
                                                    href={`mailto:${selectedQuery.email}`}
                                                    className="flex-1 py-2.5 px-4 bg-gray-900 hover:bg-black text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2"
                                                >
                                                    <Icon name="feather__cornerUpLeft" className="w-4 h-4" />
                                                    Reply
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </Modal>
                        </div>

                    </div>
                </div>
            </AdminLayout>
        </>
    );
}

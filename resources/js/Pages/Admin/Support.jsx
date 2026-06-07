import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Icon } from '@/Components/Icon';
import Breadcrumbs from '@/Components/Breadcrumbs';
import { toast } from '@/Utils/toast';

export default function Support() {
    const [tickets, setTickets] = useState([
        { id: 'TKT-8902', subject: 'Server slow response during asset uploads', status: 'High', date: 'Just now', handler: 'Dev Team' },
        { id: 'TKT-8711', subject: 'Inquiry forms not receiving email alerts', status: 'Medium', date: '2 hours ago', handler: 'Support Agent A' },
        { id: 'TKT-8600', subject: 'Sidebar sticky scrolling request', status: 'Low', date: 'Yesterday', handler: 'Design Team' },
    ]);

    const [subject, setSubject] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmitTicket = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        setTimeout(() => {
            const newTicket = {
                id: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
                subject,
                status: priority,
                date: 'Just now',
                handler: 'Assigning...'
            };

            setTickets(prev => [newTicket, ...prev]);
            toast.success(`Support Ticket ${newTicket.id} created successfully! Our team will contact you shortly.`);
            setSubject('');
            setMessage('');
            setIsSubmitting(false);
        }, 1200);
    };

    return (
        <>
            <Head title="Contact Support - Admin" />
            <AdminLayout>
                <div className="page bg-[#f9fafb] min-h-screen py-8 px-6">
                    <div className="max-w-8xl mx-auto space-y-8">
                        {/* Header Navigation */}
                        <div className="border-b border-gray-100 pb-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="space-y-1">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                                    Helpdesk Center
                                </span>
                                <h1 className="text-3xl font-black text-gray-900 tracking-tight">
                                    Contact Support
                                </h1>
                                <Breadcrumbs items={[{ label: 'Queries', href: '/queries/contact' }, { label: 'Support Tickets' }]} />

                            </div>

                        </div>

                        {/* Support Split Pane Layout */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Left Pane: Create Ticket Form */}
                            <div className="lg:col-span-2 space-y-6">
                                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-6">
                                    <div className="space-y-1">
                                        <h3 className="text-sm font-black text-gray-800 uppercase tracking-wider flex items-center gap-2">
                                            <Icon name="feather__plus" className="w-4 h-4 text-indigo-500" />
                                            Submit a New Support Ticket
                                        </h3>
                                        <p className="text-[11px] text-gray-400">Encountered an issue? Fill out the details below to raise an official ticket.</p>
                                    </div>

                                    <form onSubmit={handleSubmitTicket} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="md:col-span-2 space-y-2">
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Ticket Subject</label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={subject}
                                                    onChange={(e) => setSubject(e.target.value)}
                                                    className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                                    placeholder="Brief description of the problem..."
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Priority Level</label>
                                                <select
                                                    value={priority}
                                                    onChange={(e) => setPriority(e.target.value)}
                                                    className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none cursor-pointer"
                                                >
                                                    <option>High</option>
                                                    <option>Medium</option>
                                                    <option>Low</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Elaborate Message</label>
                                            <textarea
                                                required
                                                rows="6"
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                                className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
                                                placeholder="Provide step-by-step instructions of how to reproduce the issue or ask your question..."
                                            ></textarea>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md shadow-indigo-100 flex items-center justify-center gap-2"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <span className="animate-spin h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full"></span>
                                                    Submitting Ticket...
                                                </>
                                            ) : (
                                                <>
                                                    <Icon name="feather__uploadCloud" className="w-4 h-4" />
                                                    Submit Ticket
                                                </>
                                            )}
                                        </button>
                                    </form>
                                </div>

                                {/* Active Tickets Table */}
                                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
                                    <h3 className="text-sm font-black text-gray-800 uppercase tracking-wider">
                                        Your Support History
                                    </h3>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                                                    <th className="py-3 px-4">Ticket ID</th>
                                                    <th className="py-3 px-4">Subject</th>
                                                    <th className="py-3 px-4">Priority</th>
                                                    <th className="py-3 px-4">Opened</th>
                                                    <th className="py-3 px-4 text-right">Assigned To</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-50 text-xs font-semibold text-gray-600">
                                                {tickets.map(t => (
                                                    <tr key={t.id} className="hover:bg-gray-50/50 transition-colors">
                                                        <td className="py-3 px-4 font-bold text-indigo-600">{t.id}</td>
                                                        <td className="py-3 px-4 max-w-xs truncate">{t.subject}</td>
                                                        <td className="py-3 px-4">
                                                            <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${t.status === 'High' ? 'bg-red-50 text-red-600 border border-red-100' :
                                                                    t.status === 'Medium' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                                                                        'bg-emerald-50 text-emerald-600 border border-emerald-100'
                                                                }`}>
                                                                {t.status}
                                                            </span>
                                                        </td>
                                                        <td className="py-3 px-4 text-gray-400">{t.date}</td>
                                                        <td className="py-3 px-4 text-right text-gray-500">{t.handler}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            {/* Right Pane: Support Contact Options */}
                            <div className="space-y-6">
                                <div className="bg-gradient-to-br from-indigo-900 to-indigo-800 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden space-y-6">
                                    <div className="absolute right-0 bottom-0 w-32 h-32 opacity-10 pointer-events-none">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
                                            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                                        </svg>
                                    </div>
                                    <div className="space-y-2">
                                        <span className="px-2.5 py-0.5 bg-white/10 rounded-full text-[9px] font-bold uppercase tracking-wider">Emergency Hotline</span>
                                        <h3 className="text-xl font-black leading-tight tracking-tight">Need immediate technical help?</h3>
                                        <p className="text-xs text-indigo-200 leading-relaxed">Our support administrators are available 24/7 to solve critical studio server issues.</p>
                                    </div>

                                    <div className="space-y-3 pt-2 text-xs font-bold">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-white/10 rounded-xl">
                                                <Icon name="feather__search" className="w-4 h-4 text-white" />
                                            </div>
                                            <div>
                                                <span className="text-[10px] text-indigo-300 block font-semibold uppercase tracking-wider">Call Support</span>
                                                <span className="text-sm font-black">+91 99887 76655</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-white/10 rounded-xl">
                                                <Icon name="feather__plus" className="w-4 h-4 text-white" />
                                            </div>
                                            <div>
                                                <span className="text-[10px] text-indigo-300 block font-semibold uppercase tracking-wider">Email Helpdesk</span>
                                                <span className="text-sm font-black">support@laganstudio.com</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
                                    <h4 className="text-xs font-black text-gray-800 uppercase tracking-widest">General Inquiries</h4>
                                    <p className="text-xs text-gray-400 leading-relaxed">For questions regarding packages, custom shoots, and photo restoration, please check the main queries section.</p>
                                    <a
                                        href="/queries/contact"
                                        className="w-full py-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 text-xs font-bold uppercase tracking-wider rounded-2xl transition-all flex items-center justify-center gap-2"
                                    >
                                        Manage Client Queries
                                        <Icon name="feather__arrowRight" className="w-4 h-4 text-gray-400" />
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </AdminLayout>
        </>
    );
}

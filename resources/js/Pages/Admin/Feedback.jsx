import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Icon } from '@/Components/Icon';
import Breadcrumbs from '@/Components/Breadcrumbs';
import { toast } from '@/Utils/toast';

export default function Feedback() {
    const [feedbacks, setFeedbacks] = useState([
        { id: 1, client: 'Amit & Ritu Sen', rating: 5, comment: 'Breathtaking cinematic wedding videos! Absolutely loved the storytelling approach.', date: 'Just now', verified: true },
        { id: 2, client: 'Karan Malhotra', rating: 4, comment: 'Great professional service. The team was prompt and captures were outstanding.', date: '2 days ago', verified: true },
        { id: 3, client: 'Neha Aggarwal', rating: 5, comment: 'Best pre-wedding shoot experience ever in Jaipur! Real artists.', date: 'Last week', verified: true },
    ]);

    const [clientName, setClientName] = useState('');
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmitFeedback = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        setTimeout(() => {
            const newFeedback = {
                id: Date.now(),
                client: clientName,
                rating,
                comment,
                date: 'Just now',
                verified: true
            };

            setFeedbacks(prev => [newFeedback, ...prev]);
            toast.success('Thank you! Client feedback submitted and registered successfully.');
            setClientName('');
            setRating(5);
            setComment('');
            setIsSubmitting(false);
        }, 1000);
    };

    return (
        <>
            <Head title="Client Feedback & Reviews - Admin" />
            <AdminLayout>
                <div className="page bg-[#f9fafb] min-h-screen py-8 px-6">
                    <div className="max-w-8xl mx-auto space-y-8">
                        {/* Header Navigation */}
                        <div className="border-b border-gray-100 pb-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="space-y-1">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                                    Testimonial Manager
                                </span>
                                <h1 className="text-3xl font-black text-gray-900 tracking-tight">
                                    Client Feedback
                                </h1>
                                <Breadcrumbs items={[{ label: 'Queries', href: '/queries/contact' }, { label: 'Client Feedback' }]} />
                            </div>

                        </div>

                        {/* Layout Split Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Left Column: Client Reviews List */}
                            <div className="lg:col-span-2 space-y-6">
                                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-6">
                                    <h3 className="text-sm font-black text-gray-800 uppercase tracking-wider">
                                        Registered Client Testimonials
                                    </h3>

                                    <div className="space-y-4">
                                        {feedbacks.map(f => (
                                            <div key={f.id} className="p-4 bg-gray-50/50 hover:bg-white border border-gray-100 rounded-2xl transition-all duration-300 space-y-3">
                                                <div className="flex justify-between items-start">
                                                    <div className="space-y-1">
                                                        <h4 className="text-xs font-extrabold text-gray-900 flex items-center gap-1.5">
                                                            {f.client}
                                                            {f.verified && (
                                                                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-emerald-50 text-emerald-600 rounded text-[9px] font-black uppercase">
                                                                    Verified Client
                                                                </span>
                                                            )}
                                                        </h4>
                                                        <span className="text-[10px] text-gray-400 font-semibold">{f.date}</span>
                                                    </div>
                                                    <div className="flex text-amber-400">
                                                        {[...Array(5)].map((_, i) => (
                                                            <span key={i} className="text-sm">
                                                                {i < f.rating ? '★' : '☆'}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                                <p className="text-xs text-gray-600 leading-relaxed font-semibold italic">
                                                    "{f.comment}"
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Register Client Testimonial Form */}
                            <div className="space-y-6">
                                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-6">
                                    <div className="space-y-1">
                                        <h3 className="text-sm font-black text-gray-800 uppercase tracking-wider flex items-center gap-2">
                                            <Icon name="feather__plus" className="w-4 h-4 text-pink-500" />
                                            Register Testimonial
                                        </h3>
                                        <p className="text-[11px] text-gray-400">Add reviews manually from emails or social channels to highlight on website.</p>
                                    </div>

                                    <form onSubmit={handleSubmitFeedback} className="space-y-5">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Client Name(s)</label>
                                            <input
                                                type="text"
                                                required
                                                value={clientName}
                                                onChange={(e) => setClientName(e.target.value)}
                                                className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold"
                                                placeholder="e.g. Priyesh & Riya Wedding"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Rating Stars</label>
                                            <div className="flex gap-1.5 text-2xl text-amber-400">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <button
                                                        key={star}
                                                        type="button"
                                                        onClick={() => setRating(star)}
                                                        className="hover:scale-110 transition-transform focus:outline-none"
                                                    >
                                                        {star <= rating ? '★' : '☆'}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Testimonial Comment</label>
                                            <textarea
                                                required
                                                rows="5"
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                                className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
                                                placeholder="Copy paste client review text..."
                                            ></textarea>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md shadow-indigo-100 flex items-center justify-center gap-2"
                                        >
                                            {isSubmitting ? 'Registering...' : 'Save Feedback'}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </AdminLayout>
        </>
    );
}

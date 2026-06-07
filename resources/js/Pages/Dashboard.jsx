import React, { useMemo, useState } from 'react';
import { Head, usePage, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Icon } from '@/Components/Icon';

export default function Dashboard() {
    const { auth } = usePage().props;
    const userName = auth?.user?.name || 'Marla';

    const greeting = useMemo(() => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good morning';
        if (hour < 18) return 'Good afternoon';
        return 'Good evening';
    }, []);

    // Custom stats matching the request: Leads, Total Services, Blogs, Total Visitors
    const [stats, setStats] = useState([
        {
            title: 'Leads & Enquiries',
            value: '348',
            icon: 'feather__users',
            color: 'text-indigo-500 bg-indigo-50 border-indigo-100',
            change: '+12%',
            trend: 'up',
            sparkline: 'M 0 20 Q 20 5, 40 25 T 80 10 T 120 30 T 160 5 T 200 15',
        },
        {
            title: 'Total Services',
            value: '24',
            icon: 'feather__briefcase',
            color: 'text-emerald-500 bg-emerald-50 border-emerald-100',
            change: '+3 new',
            trend: 'up',
            sparkline: 'M 0 30 Q 30 10, 60 20 T 120 5 T 180 15 T 200 10',
        },
        {
            title: 'Published Blogs',
            value: '85',
            icon: 'feather__fileText',
            color: 'text-pink-500 bg-pink-50 border-pink-100',
            change: '+8%',
            trend: 'up',
            sparkline: 'M 0 10 Q 40 30, 80 15 T 120 25 T 160 10 T 200 5',
        },
        {
            title: 'Website Visitors',
            value: '84,290',
            icon: 'feather__activity',
            color: 'text-sky-500 bg-sky-50 border-sky-100',
            change: '+18%',
            trend: 'up',
            sparkline: 'M 0 25 Q 35 5, 70 30 T 140 10 T 200 2',
        },
    ]);

    // Recent enquiries with realistic photography business values
    const [enquiries, setEnquiries] = useState([
        {
            id: 1,
            name: 'Aarav Sharma',
            email: 'aarav.sharma@example.com',
            phone: '+91 98765 43210',
            service: 'Grand Wedding Cinematic',
            message: 'Looking for a premium cinematic shoot for my wedding in Jaipur this November.',
            status: 'Pending',
            date: 'Just now',
        },
        {
            id: 2,
            name: 'Priya Patel',
            email: 'priya.patel@example.com',
            phone: '+91 87654 32109',
            service: 'Heritage Pre-Wedding',
            message: 'Requesting package rates and availability for a 2-day outdoor pre-wedding session.',
            status: 'In Progress',
            date: '2 hours ago',
        },
        {
            id: 3,
            name: 'Rohan Mehta',
            email: 'rohan.mehta@example.com',
            phone: '+91 76543 21098',
            service: 'Corporate Headshots',
            message: 'Need standard corporate headshots for our leadership team of 15 members.',
            status: 'Contacted',
            date: 'Yesterday',
        },
        {
            id: 4,
            name: 'Ananya Iyer',
            email: 'ananya.iyer@example.com',
            phone: '+91 65432 10987',
            service: 'Maternity & Newborn',
            message: 'Do you offer custom themes and props for indoor newborn baby shoots?',
            status: 'Pending',
            date: '2 days ago',
        },
    ]);

    // Recent blogs with photography tips and Unsplash photos
    const [blogs, setBlogs] = useState([
        {
            id: 1,
            title: 'Top 10 Destination Wedding Venues in Rajasthan',
            category: 'Wedding Tips',
            author: 'Shivanshu',
            views: '1,450',
            date: 'May 28, 2026',
            image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=250&fit=crop',
        },
        {
            id: 2,
            title: 'Mastering Golden Hour Photography: Pro Techniques',
            category: 'Tutorials',
            author: 'Admin',
            views: '980',
            date: 'May 25, 2026',
            image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&h=250&fit=crop',
        },
        {
            id: 3,
            title: 'Trending Cinematic Video Editing Styles for 2026',
            category: 'Cinematography',
            author: 'Lagan Editor',
            views: '2,120',
            date: 'May 20, 2026',
            image: 'https://images.unsplash.com/photo-1537832816519-689ad163238b?w=400&h=250&fit=crop',
        },
    ]);

    const [enquiryFilter, setEnquiryFilter] = useState('');

    const filteredEnquiries = enquiries.filter(enq =>
        enq.name.toLowerCase().includes(enquiryFilter.toLowerCase()) ||
        enq.service.toLowerCase().includes(enquiryFilter.toLowerCase())
    );

    const handleUpdateStatus = (id, newStatus) => {
        setEnquiries(prev =>
            prev.map(enq => (enq.id === id ? { ...enq, status: newStatus } : enq))
        );
    };

    return (
        <>
            <Head title="Admin Dashboard" />
            <AdminLayout>
                <div className="page bg-[#f9fafb] min-h-screen py-8 px-6">
                    <div className="max-w-8xl mx-auto space-y-8">

                        {/* Welcome Header Hero */}
                        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="absolute right-0 bottom-0 h-full w-1/3 opacity-10 pointer-events-none">
                                <svg data-src="undraw_investment_data" className="w-full h-full text-indigo-600"></svg>
                            </div>
                            <div className="space-y-2 z-10">
                                <span className="px-3.5 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-wider">
                                    Studio Dashboard
                                </span>
                                <h1 className="text-3xl font-black text-gray-900 tracking-tight">
                                    {greeting}, {userName}!
                                </h1>
                                <p className="text-gray-500 text-sm max-w-xl">
                                    Here's what is happening at Lagan Studio today. Keep track of your client enquiries, portfolio services, and blog statistics.
                                </p>
                            </div>
                            <div className="flex gap-3 z-10">
                                <Link
                                    href={route('categories.create')}
                                    className="px-5 py-3 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-bold uppercase tracking-wider rounded-2xl transition-all shadow-sm flex items-center gap-2"
                                >
                                    <Icon name="feather__plus" className="w-4 h-4 text-gray-500" />
                                    Add Category
                                </Link>
                                <Link
                                    href="/blog/posts/create"
                                    className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black uppercase tracking-wider rounded-2xl transition-all shadow-md shadow-indigo-100 flex items-center gap-2"
                                >
                                    <Icon name="feather__filePlus" className="w-4 h-4" />
                                    New Blog
                                </Link>
                            </div>
                        </div>

                        {/* Top Performance Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {stats.map((stat, idx) => (
                                <div
                                    key={idx}
                                    className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group relative overflow-hidden"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className={`p-3 rounded-2xl border ${stat.color} transition-transform group-hover:scale-110`}>
                                            <Icon name={stat.icon} className="w-6 h-6" />
                                        </div>
                                        <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1">
                                            <Icon name="feather__arrowUpRight" className="w-3.5 h-3.5" />
                                            {stat.change}
                                        </span>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block">
                                            {stat.title}
                                        </span>
                                        <span className="text-3xl font-black text-gray-900 block">
                                            {stat.value}
                                        </span>
                                    </div>
                                    {/* Sparkline visualization for visual excellence */}
                                    <div className="mt-4 h-10 w-full opacity-60 group-hover:opacity-100 transition-opacity">
                                        <svg className="w-full h-full" viewBox="0 0 200 40">
                                            <path
                                                d={stat.sparkline}
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2.5"
                                                className={stat.title.includes('Leads') ? 'text-indigo-500' : stat.title.includes('Services') ? 'text-emerald-500' : stat.title.includes('Blogs') ? 'text-pink-500' : 'text-sky-500'}
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Middle Content split: Recent Enquiries & Recent Blogs */}
                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                            {/* Left Side: Recent Enquiries (2/3 width on large screens) */}
                            <div className="xl:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col overflow-hidden">
                                <div className="p-6 border-b border-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
                                    <div className="space-y-1 self-start">
                                        <h3 className="text-lg font-black text-gray-900 tracking-tight">Recent Client Enquiries</h3>
                                        <p className="text-xs text-gray-500">Manage leads interested in photography and cinematography services.</p>
                                    </div>
                                    <div className="relative w-full sm:w-auto shrink-0">
                                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                            <Icon name="feather__search" className="w-4 h-4" />
                                        </span>
                                        <input
                                            type="text"
                                            placeholder="Search enquiries..."
                                            value={enquiryFilter}
                                            onChange={(e) => setEnquiryFilter(e.target.value)}
                                            className="w-full sm:w-64 pl-9 pr-4 py-2 bg-gray-50 border-transparent rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Client Name</th>
                                                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Service Requested</th>
                                                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Status</th>
                                                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Time</th>
                                                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {filteredEnquiries.map((enquiry) => (
                                                <tr key={enquiry.id} className="hover:bg-indigo-50/10 transition-colors group">
                                                    <td className="px-6 py-4">
                                                        <div className="flex flex-col">
                                                            <span className="font-bold text-gray-900 text-sm tracking-tight">{enquiry.name}</span>
                                                            <span className="text-[11px] text-gray-400">{enquiry.email} • {enquiry.phone}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex flex-col">
                                                            <span className="text-xs font-bold text-indigo-600 bg-indigo-50/60 px-2.5 py-1 rounded-lg inline-block w-fit">
                                                                {enquiry.service}
                                                            </span>
                                                            <span className="text-[11px] text-gray-500 mt-1 line-clamp-1 max-w-[200px]" title={enquiry.message}>
                                                                "{enquiry.message}"
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[9px] font-black tracking-widest uppercase ${enquiry.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                                                                enquiry.status === 'In Progress' ? 'bg-sky-100 text-sky-700' : 'bg-emerald-100 text-emerald-700'
                                                            }`}>
                                                            <span className={`h-1.5 w-1.5 rounded-full mr-2 ${enquiry.status === 'Pending' ? 'bg-amber-500 animate-pulse' : enquiry.status === 'In Progress' ? 'bg-sky-500' : 'bg-emerald-500'}`}></span>
                                                            {enquiry.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-xs font-semibold text-gray-500 whitespace-nowrap">
                                                        {enquiry.date}
                                                    </td>
                                                    <td className="px-6 py-4 text-right whitespace-nowrap">
                                                        <div className="flex items-center justify-end gap-1.5">
                                                            <button
                                                                onClick={() => {
                                                                    const nextStatus = enquiry.status === 'Pending' ? 'In Progress' : enquiry.status === 'In Progress' ? 'Contacted' : 'Pending';
                                                                    handleUpdateStatus(enquiry.id, nextStatus);
                                                                }}
                                                                title="Update Status"
                                                                className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-gray-50 rounded-xl transition-all border border-transparent hover:border-gray-100"
                                                            >
                                                                <Icon name="feather__refreshCw" className="w-4 h-4" />
                                                            </button>
                                                            <a
                                                                href={`mailto:${enquiry.email}?subject=Lagan Studio Inquiry: ${enquiry.service}`}
                                                                className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-gray-50 rounded-xl transition-all border border-transparent hover:border-gray-100"
                                                            >
                                                                <Icon name="feather__externalLink" className="w-4 h-4" />
                                                            </a>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                            {filteredEnquiries.length === 0 && (
                                                <tr>
                                                    <td colSpan="5" className="px-6 py-12 text-center text-gray-400 text-xs font-semibold">
                                                        No matching enquiries found.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Right Side: Recent Blogs (1/3 width on large screens) */}
                            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 flex flex-col space-y-6">
                                <div className="space-y-1">
                                    <h3 className="text-lg font-black text-gray-900 tracking-tight">Recent Blogs</h3>
                                    <p className="text-xs text-gray-500">Track and manage your published blog posts.</p>
                                </div>

                                <div className="space-y-4 flex-1">
                                    {blogs.map((blog) => (
                                        <div
                                            key={blog.id}
                                            className="group flex gap-4 p-3 bg-gray-50/50 hover:bg-white hover:shadow-md border border-transparent hover:border-gray-100 rounded-2xl transition-all duration-300"
                                        >
                                            <div className="h-16 w-20 rounded-xl bg-gray-200 border border-gray-100 overflow-hidden shrink-0 shadow-sm relative">
                                                <img src={blog.image} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" alt={blog.title} />
                                            </div>
                                            <div className="flex flex-col justify-between py-0.5">
                                                <div className="space-y-1">
                                                    <span className="text-[9px] font-black text-pink-500 uppercase tracking-widest block">
                                                        {blog.category}
                                                    </span>
                                                    <h4 className="text-xs font-extrabold text-gray-900 leading-snug line-clamp-2 max-w-[200px] group-hover:text-indigo-600 transition-colors">
                                                        {blog.title}
                                                    </h4>
                                                </div>
                                                <div className="flex items-center gap-3 text-[10px] text-gray-400 font-semibold mt-1">
                                                    <span>By {blog.author}</span>
                                                    <span>•</span>
                                                    <span className="flex items-center gap-1">
                                                        <Icon name="feather__eye" className="w-3 h-3 text-gray-400" />
                                                        {blog.views}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <Link
                                    href="/blog/posts"
                                    className="w-full py-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 text-xs font-bold uppercase tracking-wider rounded-2xl transition-all flex items-center justify-center gap-2"
                                >
                                    Manage All Blogs
                                    <Icon name="feather__arrowRight" className="w-4 h-4 text-gray-400" />
                                </Link>
                            </div>

                        </div>
                    </div>
                </div>
            </AdminLayout>
        </>
    );
}

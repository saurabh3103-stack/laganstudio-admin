import React, { useMemo } from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Services() {
    const greeting = useMemo(() => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good morning';
        if (hour < 18) return 'Good afternoon';
        return 'Good evening';
    }, []);

    const stats = [
        {
            title: 'Total Sales',
            value: '$12,400',
            icon: 'feather__shoppingBag',
            color: 'text-indigo-500',
            change: '3%',
            trend: 'up',
        },
        {
            title: 'Total Visits',
            value: '123,540',
            icon: 'feather__users',
            color: 'text-yellow-500',
            change: '5%',
            trend: 'up',
        },
        {
            title: 'Total Expenses',
            value: '$54,300',
            icon: 'feather__shoppingCart',
            color: 'text-sky-500',
            change: '7%',
            trend: 'down',
        },
    ];

    const recentOrders = [
        {
            date: 'Oct 03, 2021',
            product: 'Nike Sporty HD',
            category: 'Shoes',
            customer: 'Ronald Moore',
            location: 'Gaza, Palestine',
            status: 'Completed',
            amount: '$1,358.75',
        },
        {
            date: 'Oct 02, 2021',
            product: 'Samsung HD TV',
            category: 'Electronics',
            customer: 'Mobel Potter',
            location: 'Kiev, Ukraine',
            status: 'Pending',
            amount: '$364.22',
        },
        {
            date: 'Oct 02, 2021',
            product: 'Gucci Shopping Bag',
            category: "Women's",
            customer: 'Lusyana Zulfa',
            location: 'Bangkok, Thailand',
            status: 'Completed',
            amount: '$539.16',
        },
    ];

    return (
        <>
            <Head title="Services" />
            <AdminLayout>
                <div data-script="dashboardEcommerce" className="page">
                    <div className="page__body">
                        <div className="grid grid-cols-6 xl:grid-cols-3 gap-8">
                            {/* Greeting + Stats */}
                            <div className="col-span-6 xl:col-span-2">
                                <div className="pb-8 xl:pb-16 relative overflow-hidden">
                                    <svg
                                        data-src="undraw_investment_data"
                                        className="absolute h-1/3 sm:h-[90%] w-auto -right-5 -bottom-[2px] z-[-1] text-scheme-400"
                                    ></svg>

                                    <div className="ml-5">
                                        <div className="text-3xl">
                                            {greeting}, Marla
                                        </div>
                                        <div className="text-xl text-gray-500">
                                            Here's what's happening at the store today.
                                        </div>
                                    </div>

                                    {/* Stats */}
                                    <div className="flex flex-wrap md:justify-around gap-8 mt-10 mr-72 ml-5">
                                        {stats.map((stat) => (
                                            <a
                                                key={stat.title}
                                                href="#"
                                                className="flex space-x-3 transform transition-transform hover:scale-105"
                                                onClick={(e) => e.preventDefault()}
                                            >
                                                <span className="flex flex-col items-center">
                                                    <i data-icon={stat.icon} className={`${stat.color} w-5 h-5`}></i>

                                                    {stat.trend === 'up' ? (
                                                        <i data-icon="feather__chevronUp" className="text-green-500 w-4 h-4 mt-2"></i>
                                                    ) : (
                                                        <i data-icon="feather__chevronDown" className="text-red-500 w-4 h-4 mt-2"></i>
                                                    )}

                                                    <span
                                                        className={`text-xs ${
                                                            stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                                                        }`}
                                                    >
                                                        {stat.change}
                                                    </span>
                                                </span>

                                                <span>
                                                    <span className="block text-sm text-gray-500 mb-2">{stat.title}</span>
                                                    <span className="text-3xl">{stat.value}</span>
                                                </span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Recent Orders */}
                            <div className="col-span-6 xl:col-span-2 card">
                                <div className="card__header">
                                    <h3 className="text-2xl">Recent Orders</h3>
                                </div>

                                <div className="card__body px-0 scrollbar" data-scrollbar data-scrollbar-auto-hide="false">
                                    <table className="table">
                                        <thead className="border-b-2 border-gray-300">
                                            <tr>
                                                <th>Date</th>
                                                <th>Product</th>
                                                <th>Customer</th>
                                                <th>Status</th>
                                                <th>Amount</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {recentOrders.map((order) => (
                                                <tr key={order.product}>
                                                    <td className="whitespace-nowrap">{order.date}</td>

                                                    <td>
                                                        <div className="flex flex-col">
                                                            <span className="text-sm">{order.product}</span>
                                                            <span className="text-gray-400 text-xs">{order.category}</span>
                                                        </div>
                                                    </td>

                                                    <td>
                                                        <div className="flex flex-col">
                                                            <span className="text-sm">{order.customer}</span>
                                                            <span className="text-gray-400 text-xs">{order.location}</span>
                                                        </div>
                                                    </td>

                                                    <td>
                                                        <span
                                                            className={`badge ${
                                                                order.status === 'Completed'
                                                                    ? 'scheme-green'
                                                                    : order.status === 'Pending'
                                                                    ? 'scheme-gray'
                                                                    : 'scheme-red'
                                                            }`}
                                                        >
                                                            {order.status}
                                                        </span>
                                                    </td>

                                                    <td className="text-xl">{order.amount}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        </>
    );
}

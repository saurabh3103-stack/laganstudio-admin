import React from 'react';
import { Link } from '@inertiajs/react';
import { Icon } from '@/Components/Icon';

export default function Breadcrumbs({ items = [] }) {
    return (
        <nav className="flex items-center space-x-2 text-xs font-semibold text-gray-400 select-none pb-2">
            <Link
                href="/dashboard"
                className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors"
            >
                <span>Dashboard</span>
            </Link>

            {items.map((item, index) => (
                <React.Fragment key={index}>
                    <span className="text-gray-300 text-sm">/</span>
                    {item.href ? (
                        <Link
                            href={item.href}
                            className="hover:text-indigo-600 transition-colors"
                        >
                            {item.label}
                        </Link>
                    ) : (
                        <span className="text-gray-600 font-extrabold">{item.label}</span>
                    )}
                </React.Fragment>
            ))}
        </nav>
    );
}
